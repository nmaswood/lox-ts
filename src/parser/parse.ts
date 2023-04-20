import { WithStream } from "./../stream/WithStream";
import * as Types from "./types";
import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/function";
import * as Ex from "./Expr";
import * as S from "./Stmt";
import * as T from "../scanner/Token";
import { Stream } from "../stream/Stream";
import * as PE from "./ParseError";
import * as Streams from "../stream/Streams";
import * as C from "./Combinator";
import * as TC from "./TokenCombinator";

export function parse(
  tokensWithContext: T.TokenWithContext<T.Token>[]
): E.Either<PE.ParseError[], S.Stmt[]> {
  function recurse(
    stmts: S.Stmt[],
    errors: PE.ParseError[],
    stream: Types.TokenStream
  ): ReturnType<typeof parse> {
    if (isStreamExhausted(stream)) {
      return errors.length > 0 ? E.left(errors) : E.right(stmts);
    }

    return pipe(
      stream,
      forEquality,
      E.fold(
        (left) => recurse(stmts, [...errors, left], synchronize(stream)),
        (right) =>
          recurse([...stmts, S.Expr.of(right.value)], errors, right.stream)
      )
    );
  }

  return recurse([], [], new Stream(tokensWithContext));
}

const forExpression: C.Combinator<
  T.TokenWithContext<T.Token>,
  Ex.Expr,
  PE.ParseError
> = (_: Types.TokenStream) => undefined!;

const forEquality: C.Combinator<
  T.TokenWithContext<T.Token>,
  Ex.Expr,
  PE.ParseError
> = (stream: Types.TokenStream) =>
  pipe(
    stream,
    forComparison,
    E.map((term) =>
      pipe(
        term.stream,
        C.Combinators.or2(TC.is("bang_equal"), TC.is("equal_equal")),
        E.chain((withOperator) =>
          pipe(
            forComparison(withOperator.stream),
            E.map((withComparison) =>
              WithStream.of(
                withOperator.stream,
                Ex.Binary.of(
                  withOperator.value.token,
                  term.value,
                  withComparison.value
                )
              )
            )
          )
        ),
        E.getOrElse(() => term)
      )
    )
  );

const forComparison: C.Combinator<
  T.TokenWithContext<T.Token>,
  Ex.Expr,
  PE.ParseError
> = (stream: Types.TokenStream) =>
  pipe(
    stream,
    forTerm,
    E.map((term) =>
      pipe(
        term.stream,
        C.Combinators.or4(
          TC.is("less"),
          TC.is("less_equal"),
          TC.is("greater"),
          TC.is("greater_equal")
        ),
        E.chain((withOperator) =>
          pipe(
            forTerm(withOperator.stream),
            E.map((withTerm) =>
              WithStream.of(
                withOperator.stream,
                Ex.Binary.of(
                  withOperator.value.token,
                  term.value,
                  withTerm.value
                )
              )
            )
          )
        ),
        E.getOrElse(() => term)
      )
    )
  );

const forTerm: C.Combinator<
  T.TokenWithContext<T.Token>,
  Ex.Expr,
  PE.ParseError
> = (stream: Types.TokenStream) => {
  return pipe(
    stream,
    forFactor,
    E.map((factor) =>
      pipe(
        factor.stream,
        C.Combinators.or2(TC.is("plus"), TC.is("minus")),
        E.chain((withOperator) =>
          pipe(
            forFactor(withOperator.stream),
            E.map((withFactor) =>
              WithStream.of(
                withFactor.stream,
                Ex.Binary.of(
                  withOperator.value.token,
                  factor.value,
                  withFactor.value
                )
              )
            )
          )
        ),
        E.getOrElse(() => factor)
      )
    )
  );
};

const forFactor: C.Combinator<
  T.TokenWithContext<T.Token>,
  Ex.Expr,
  PE.ParseError
> = (stream: Types.TokenStream) => {
  const recurse = (
    withStream: WithStream<T.TokenWithContext<T.Token>, Ex.Expr>
  ): C.CombinatorResult<T.TokenWithContext<T.Token>, Ex.Expr, PE.ParseError> =>
    pipe(
      withStream.stream,
      C.Combinators.or2(TC.is("star"), TC.is("slash")),
      E.map((withOperator) =>
        pipe(
          forUnary(withOperator.stream),
          E.chain((withUnary) =>
            recurse(
              WithStream.of(
                withUnary.stream,
                Ex.Binary.of(
                  withOperator.value.token,
                  withStream.value,
                  withUnary.value
                )
              )
            )
          )
        )
      ),
      E.getOrElse(() => E.right(withStream))
    );

  return pipe(
    stream,
    forUnary,
    E.map((unary) =>
      pipe(
        recurse(unary),
        E.getOrElse(() => unary)
      )
    )
  );
};

const forUnary: C.Combinator<
  T.TokenWithContext<T.Token>,
  Ex.Expr,
  PE.ParseError
> = (stream: Types.TokenStream) => {
  const parseUnary = (s: Types.TokenStream) =>
    pipe(
      s,
      C.Combinators.and2(
        C.Combinators.or2(TC.is("bang"), TC.is("minus")),
        forUnary
      ),
      E.map((value) =>
        WithStream.of(
          value.stream,
          Ex.Unary.of(value.value[0].token, value.value[1])
        )
      )
    );

  return pipe(stream, C.Combinators.or2(parseUnary, forCall));
};

const forCall: C.Combinator<
  T.TokenWithContext<T.Token>,
  Ex.Expr,
  PE.ParseError
> = (stream: Types.TokenStream) => {
  return pipe(
    stream,
    // todo ARGUMENTS later
    forPrimary
  );
};

/*
 *primary
 * "true" | "false" | "nil" | "this"
 * | NUMBER | STRING | IDENTIFIER | "(" expression ")"
 * | "super" "." IDENTIFIER ;
 */

const forPrimary = (stream: Types.TokenStream) =>
  pipe(
    stream,
    Streams.Either.safeAdvance(() => PE.UNEXPECTED_END),
    E.chain((next) => {
      const token = next.value.token;

      switch (token.type) {
        case "true":
        case "false":
        case "nil":
        case "number":
        case "string":
          return E.right(WithStream.of(next.stream, Ex.Literal.of(token)));
        case "left_paren":
          return pipe(
            next.stream,
            C.Combinators.and2(forExpression, TC.is("right_paren")),

            E.map((f) => WithStream.of(f.stream, f.value[0]))
          );
        case "super":
          return pipe(
            next.stream,

            C.Combinators.and3(
              TC.is("dot"),
              TC.is("identifier"),
              TC.is("semicolon")
            ),

            E.map(({ stream, value }) =>
              WithStream.of(stream, Ex.Super.of(value[1].token))
            )
          );

        case "this":
          return E.right(WithStream.of(next.stream, Ex.This.of(token)));
        default:
          return E.left(PE.wrongToken(next.value));
      }
    })
  );

export function synchronize(stream: Types.TokenStream): Types.TokenStream {
  const copy = stream.clone();
  while (!isStreamExhausted(copy)) {
    const next = copy.advance();
    switch (next.token.type) {
      case "semicolon":
      case "class":
      case "fun":
        return copy;
      default:
        continue;
    }
  }
  return copy;
}

export function isStreamExhausted(
  s: Stream<T.TokenWithContext<T.Token>>
): boolean {
  return T.Eof.is(s.peek().token);
}
