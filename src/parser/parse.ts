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
      forDeclaration()(stream),
      E.fold(
        (left) => recurse(stmts, [...errors, left], synchronize(stream)),
        (right) => recurse([...stmts, right.value], errors, right.stream)
      )
    );
  }

  return recurse([], [], new Stream(tokensWithContext));
}

type ParserResult<ValueT> = E.Either<
  PE.ParseError,
  WithStream<T.TokenWithContext<T.Token>, ValueT>
>;

const forDeclaration =
  () =>
  (s: Types.TokenStream): ParserResult<S.Stmt> =>
    C.Combinator.oneOf(
      () => PE.UNEXPECTED_END,
      Hoist.DECLARATION_COMBINATORS
    )(s);

// varDecl → "var" IDENTIFIER ( "=" expression )? ";" ;
const forVar =
  () =>
  (s: Types.TokenStream): ParserResult<S.Var> =>
    pipe(
      s,
      C.Combinator.and2(TC.is("var"), TC.is("identifier")),
      E.chain((identifier) => {
        const expr = pipe(
          identifier.stream,
          TC.is("equal"),
          E.chain(({ stream }) => forExpression()(stream)),
          E.getOrElseW(() => WithStream.of(identifier.stream, undefined)),

          ({ value, stream }) =>
            WithStream.of(stream, S.Var.of(identifier.value[1].token, value))
        );

        return pipe(
          expr.stream,
          TC.is("semicolon"),
          E.map(({ stream }) => WithStream.of(stream, expr.value))
        );
      })
    );
// printStmt → "print" expression ";" ;
const forPrint =
  () =>
  (s: Types.TokenStream): ParserResult<S.Print> =>
    pipe(
      TC.is("print")(s),
      E.chain((print) =>
        pipe(
          forExpression()(print.stream),
          E.chain((expr) =>
            pipe(
              TC.is("semicolon")(expr.stream),
              E.map(({ stream }) =>
                WithStream.of(stream, S.Print.of(expr.value))
              )
            )
          )
        )
      )
    );

//   /*
//    * function
//    *
//    * IDENTIFIER "(" parameters? ")" block ;
//    *  fun addPair(a, b) {
//    *    return a + b;
//    *   }
//    *
//    */
const forFunction =
  () =>
  (s: Types.TokenStream): ParserResult<S.Function_> =>
    pipe(
      s,
      C.Combinator.and3(TC.is("fun"), TC.is("identifier"), TC.is("left_paren")),
      E.chain((withIdentifier) =>
        pipe(
          forParameters()(withIdentifier.stream),
          E.chain((withParameters) =>
            pipe(
              forBlock()(withParameters.stream),
              E.chain((withBlock) =>
                pipe(
                  TC.is("semicolon")(withBlock.stream),
                  E.map(({ stream }) =>
                    WithStream.of(
                      stream,
                      S.Function_.of(
                        withIdentifier.value[1].token,
                        withParameters.value,
                        withBlock.value
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    );

namespace Hoist {
  export const DECLARATION_COMBINATORS: C.Combinator<
    T.TokenWithContext<T.Token>,
    S.Stmt,
    PE.ParseError
  >[] = [forVar(), forPrint(), forFunction()];
}

/*
classDecl → "class" IDENTIFIER ( "<" IDENTIFIER )?
"{" function\* "}" ;
*/
function forClass(stream: Types.TokenStream): ParserResult<S.Class> {
  return undefined!;
}

function forWhile(stream: Types.TokenStream): ParserResult<S.While> {
  return undefined!;
}

function forIf(stream: Types.TokenStream): ParserResult<S.If> {
  return undefined!;
}

function forFor(stream: Types.TokenStream): ParserResult<S.For> {
  return undefined!;
}

//parameters → IDENTIFIER ( "," IDENTIFIER )_ ;
const forParameters =
  () =>
  (s: Types.TokenStream): ParserResult<T.Identifier[]> => {
    const recurse = (
      acc: WithStream<T.TokenWithContext<T.Token>, T.Identifier[]>,
      lastSeen: "identifier" | "comma" | "left_paren"
    ): ParserResult<T.Identifier[]> =>
      pipe(
        acc.stream,
        Streams.Either.safeAdvance(() => PE.UNEXPECTED_END),

        E.chain((next) => {
          const token = next.value.token;
          switch (token.type) {
            case "identifier": {
              return lastSeen === "identifier"
                ? E.left(PE.wrongToken(next.value, "comma"))
                : recurse(
                    WithStream.of(next.stream, [...acc.value, token]),
                    token.type
                  );
            }
            case "comma":
              return lastSeen !== "identifier"
                ? E.left(PE.wrongToken(next.value, token.type))
                : recurse(WithStream.of(next.stream, acc.value), token.type);
            case "right_paren":
              return E.right(WithStream.of(next.stream, acc.value));
            default:
              return E.left(
                PE.wrongToken(next.value, "identifier", "comma", "right_paren")
              );
          }
        })
      );
    return recurse(WithStream.of(s, []), "left_paren");
  };

// arguments → expression ( "," expression )_ ;
const forArguments =
  () =>
  (s: Types.TokenStream): ParserResult<Ex.Expr[]> => {
    const recurse = (
      acc: WithStream<T.TokenWithContext<T.Token>, Ex.Expr[]>,
      lastSeen: "expression" | "comma" | "left_paren"
    ): ParserResult<Ex.Expr[]> =>
      pipe(
        acc.stream,
        Streams.Either.safePeek(() => PE.UNEXPECTED_END),
        E.chain((next) => {
          const token = next.value.token;
          switch (token.type) {
            case "comma":
              return lastSeen !== "expression"
                ? E.left(PE.wrongToken(next.value))
                : pipe(
                    next.stream,
                    Streams.Either.safeAdvance(() => PE.UNEXPECTED_END),
                    E.chain(({ stream }) =>
                      recurse(WithStream.of(stream, acc.value), "comma")
                    )
                  );

            case "right_brace":
              return lastSeen !== "expression"
                ? E.left(PE.wrongToken(next.value))
                : pipe(
                    next.stream,
                    Streams.Either.safeAdvance(() => PE.UNEXPECTED_END),
                    E.map(({ stream }) => WithStream.of(stream, acc.value))
                  );

            default:
              return pipe(
                next.stream,
                forExpression(),
                E.chain((expr) =>
                  recurse(
                    WithStream.of(expr.stream, [...acc.value, expr.value]),
                    "expression"
                  )
                )
              );
          }
        })
      );
    return recurse(WithStream.of(s, []), "left_paren");
  };

// block → "{" declaration\* "}" ;
const forBlock =
  () =>
  (s: Types.TokenStream): ParserResult<S.Stmt[]> =>
    pipe(
      TC.is("left_brace")(s),
      E.chain(({ stream }) => {
        const parameters = C.Combinator.zeroOrMore(
          [] as S.Stmt[],
          (val, acc) => [...acc, val],
          forDeclaration()
        )(stream);

        return pipe(
          parameters.stream,
          TC.is("right_brace"),
          E.map(({ stream }) => WithStream.of(stream, parameters.value))
        );
      })
    );

const forExpression =
  () =>
  (stream: Types.TokenStream): ParserResult<Ex.Expr> =>
    undefined!;

/*
 *primary
 * "true" | "false" | "nil" | "this"
 * | NUMBER | STRING | IDENTIFIER | "(" expression ")"
 * | "super" "." IDENTIFIER ;
 */
const forPrimary =
  () =>
  (stream: Types.TokenStream): ParserResult<Ex.Expr> =>
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
              C.Combinator.and2(forExpression(), TC.is("semicolon")),

              E.map((f) => WithStream.of(f.stream, f.value[0]))
            );
          case "super":
            return pipe(
              next.stream,

              C.Combinator.and3(
                TC.is("dot"),
                TC.is("identifier"),
                TC.is("semicolon")
              ),

              E.map(({ stream, value }) =>
                WithStream.of(stream, Ex.Super.of(undefined!, value[1].token))
              )
            );

          case "this":
          default:
            return E.left(PE.wrongToken(next.value));
        }
      })
    );

/*
    * expression     → assignment ;
    * assignment     → ( call "." )? IDENTIFIER "=" assignment | logic_or ;
    * logic_or       → logic_and ( "or" logic_and )* ;
    * logic_and      → equality ( "and" equality )* ;
    * equality       → comparison ( ( "!=" | "==" ) comparison )* ;
    * comparison     → term ( ( ">" | ">=" | "<" | "<=" ) term )* ;
    * term           → factor ( ( "-" | "+" ) factor )* ;
    * factor         → unary ( ( "/" | "*" ) unary )* ;
    * unary          → ( "!" | "-" ) unary | call ;
    * call           → primary ( "(" arguments? ")" | "." IDENTIFIER )* ;
    * primary        → "true" | "false" | "nil" | "this"
                       | NUMBER | STRING | IDENTIFIER | "(" expression ")"
                       | "super" "." IDENTIFIER ;
   */

function synchronize(stream: Types.TokenStream): Types.TokenStream {
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

function isStreamExhausted(s: Stream<T.TokenWithContext<T.Token>>): boolean {
  return T.Eof.is(s.peek().token);
}
