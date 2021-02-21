import { Identifier } from "./../scanner/Token";
import * as E from "fp-ts/lib/Either";
import * as O from "fp-ts/lib/Option";

import * as Ex from "./Expr";
import * as S from "./Stmt";
import * as T from "../scanner/Token";
import { Stream } from "../stream/Stream";
import * as PE from "./ParseError";
import { pipe } from "fp-ts/lib/pipeable";

interface Context {
  stream: Stream<T.Token>;
}

export function parse(tokens: T.Token[]): E.Either<PE.ParseError[], S.Stmt[]> {
  const context: Context = {
    stream: new Stream(tokens),
  };

  const stmts: S.Stmt[] = [];
  const errors: PE.ParseError[] = [];

  while (!isStreamExhausted(context.stream)) {
    if (T.Semicolon.is(context.stream.peek().token)) {
      context.stream.advance();
      continue;
    }
    const stmt = Handler.forDeclaration(context);
    if (E.isLeft(stmt)) {
      synchronize(context.stream);
      errors.push(stmt.left);
    } else {
      stmts.push(stmt.right);
    }
  }

  return errors.length ? E.left(errors) : E.right(stmts);
}

class Handler {
  static forDeclaration(context: Context): E.Either<PE.ParseError, S.Stmt> {
    return pipe(
      safeAdvance(context.stream),
      E.chain((token) => {
        switch (token.token.type) {
          case "var":
            return Handler.forVar(context);
          case "print":
            return Handler.forPrint(context);
          case "fun":
            return Handler.forFunction(context);
          case "class":
            return Handler.forClass(context);
          case "while":
            return Handler.forWhileStatement(context);
          case "if":
            return Handler.forIfStatement(context);
          case "for":
            throw new Error("cannot handle yet");
          // return Handler.forForStatement(context);
          default:
            return MISC_ERROR;
        }
      })
    );
  }

  static forExpression(context: Context): E.Either<PE.ParseError, S.Expr> {
    const checkLiteral = (tokenElement: T.TokenElement) =>
      pipe(
        tokenElement,
        O.fromPredicate(T.Literal.is),
        O.map((t) => this.forLiteral(context, t))
      );

    const checkUnary = (tokenElement: T.TokenElement) =>
      pipe(
        tokenElement,
        O.fromPredicate(T.UnaryOperator.is),
        O.map((t) =>
          pipe(
            Handler.forExpression(context),
            E.map(({ value }) => S.Expr.of(Ex.Unary.of(t, value)))
          )
        )
      );

    return pipe(
      safeAdvance(context.stream),
      E.chain((token) =>
        pipe(
          checkLiteral(token.token),
          O.altW(() => checkUnary(token.token)),
          O.getOrElseW(() => error<S.Expr>(token))
        )
      )
    );
  }

  static forLiteral(
    context: Context,
    literal: T.Literal
  ): E.Either<PE.ParseError, S.Expr> {
    const checkBinary = (tokenElement: T.TokenElement) =>
      pipe(
        tokenElement,
        O.fromPredicate(T.BinaryOperator.is),
        O.map((t) =>
          pipe(
            safeAdvance(context.stream),
            E.chain(() => Handler.forExpression(context)),
            E.map(({ value }) =>
              S.Expr.of(Ex.Binary.of(t, Ex.Literal.of(literal), value))
            )
          )
        )
      );

    return pipe(
      safePeek(context.stream),
      E.chain((token) =>
        pipe(
          checkBinary(token.token),
          O.fold(
            () => E.right(S.Expr.of(Ex.Literal.of(literal))),
            (binary) => binary
          )
        )
      )
    );
  }

  static forVar(context: Context): E.Either<PE.ParseError, S.Var> {
    return pipe(
      safeAdvance(context.stream),
      E.chain((t) =>
        t.token.type === "identifier"
          ? E.right({ token: t, identifier: t.token })
          : E.left(PE.UNEXPECTED_END)
      ),
      E.chain(assertSequence(context, "equal")),
      E.chain(({ identifier }) =>
        pipe(
          Handler.forExpression(context),
          E.map(({ value }) => S.Var.of(identifier, value))
        )
      )
    );
  }

  static forFunction(context: Context): E.Either<PE.ParseError, S.Stmt> {
    return pipe(
      safeAdvance(context.stream),

      E.chain((token) =>
        token.token.type === "identifier"
          ? E.right(token.token)
          : E.left(PE.wrongToken(token, "identifier"))
      ),
      E.chain(assertSequence(context, "left_paren")),
      E.chain(
        (
          identifier
        ): E.Either<
          PE.ParseError,
          {
            identifier: T.Identifier;
            parameters: T.Identifier[];
          }
        > => {
          const parameters: T.Identifier[] = [];
          // eslint-disable-next-line no-constant-condition
          while (true) {
            const t = context.stream.advance();
            if (t.token.type === "identifier") {
              parameters.push(t.token);
            } else if (t.token.type === "right_paren") {
              break;
            } else {
              return error(t, "right_paren", "identifier");
            }
          }
          return E.right({ identifier, parameters });
        }
      ),
      E.chain(({ identifier, parameters }) =>
        pipe(
          this.forBlock(context),
          E.map((stmts) => S.Function_.of(identifier, parameters, stmts))
        )
      )
    );
  }

  static forBlock(context: Context): E.Either<PE.ParseError, S.Stmt[]> {
    const processBlock = (acc: S.Stmt[]) =>
      pipe(
        safePeek(context.stream),
        E.chain(
          (next): E.Either<PE.ParseError, S.Stmt[]> =>
            next.token.type === "right_brace"
              ? pipe(
                  safeAdvance(context.stream),
                  E.map(() => acc)
                )
              : pipe(
                  Handler.forDeclaration(context),
                  E.chain((stmt) => processBlock([...acc, stmt]))
                )
        )
      );

    return processBlock([]);
  }

  static forPrint(context: Context): E.Either<PE.ParseError, S.Print> {
    return pipe(
      Handler.forExpression(context),
      E.map(({ value }) => S.Print.of(value))
    );
  }

  /*
   *
   * classDecl      → "class" IDENTIFIER ( "<" IDENTIFIER )?
   * "{" function* "}" ;
   */
  static forClass(context: Context): E.Either<PE.ParseError, S.Stmt> {
    return pipe(
      Handler.forExpression(context),
      E.map(({ value }) => S.Print.of(value))
    );
  }

  // static forForStatement(context: Context): E.Either<PE.ParseError, S.For> {
  //   const forHandler = <T>(
  //     f: (context: Context) => E.Either<PE.ParseError, T>
  //   ) => () =>
  //     pipe(
  //       safePeek(context.stream),
  //       E.chain(
  //         (peeked): E.Either<PE.ParseError, T | undefined> => {
  //           if (peeked.token.type === "semicolon") {
  //             return pipe(
  //               safeAdvance(context.stream),
  //               E.map(() => undefined)
  //             );
  //           }
  //           return E.left(PE.UNEXPECTED_END);

  //         }
  //       ),
  //       E.altW(() => f(context))
  //     );

  //   const consumeSemicolon = <T>(
  //     t: () => E.Either<PE.ParseError, T>
  //   ) => (): E.Either<PE.ParseError, T> =>
  //     pipe(
  //       t(),
  //       E.chain(() => assertSequenceWithUndefined(context, "semicolon"))
  //     );

  //   const getInitializer = consumeSemicolon(forHandler(Handler.forVar));
  //   const getCond = consumeSemicolon(forHandler(Handler.forExpression));
  //   const getUpdate = forHandler(Handler.forExpression);

  //   return pipe(
  //     getInitializer(),
  //     E.chain((init) =>
  //       pipe(
  //         getCond(),
  //         E.map((cond) => ({ cond, init }))
  //       )
  //     ),
  //     E.chain(({ cond, init }) =>
  //       pipe(
  //         getUpdate(),
  //         E.map((update) => ({ cond, init, update }))
  //       )
  //     ),
  //     E.chain(({ cond, init, update }) =>
  //       pipe(
  //         this.forBlock(context),
  //         E.map((block) => S.For.of(init, cond, update, block))
  //       )
  //     )
  //   );
  // }

  static forWhileStatement(context: Context): E.Either<PE.ParseError, S.While> {
    return pipe(
      assertSequenceWithUndefined(context, "left_paren"),
      E.chain(() => this.forExpression(context)),
      E.chain(assertSequence(context, "right_paren", "left_brace")),
      E.chain((cond) =>
        pipe(
          this.forBlock(context),
          E.map((stmts) => S.While.of(cond.value, stmts))
        )
      ),
      E.chain(assertSequence(context, "right_brace"))
    );
  }

  static forIfStatement(context: Context): E.Either<PE.ParseError, S.If> {
    const extractElse = () =>
      pipe(
        this.forElseStatement(context),
        O.fold(
          () => E.right<PE.ParseError, S.Stmt[] | undefined>(undefined),
          (y) => y
        )
      );

    return pipe(
      assertSequenceWithUndefined(context, "left_paren"),
      E.chain(() => this.forExpression(context)),
      E.chain(assertSequence(context, "right_paren", "left_brace")),
      E.chain((cond) =>
        pipe(
          this.forBlock(context),
          E.chain((then) =>
            pipe(
              extractElse(),
              E.map((else_) => S.If.of(cond.value, then, else_))
            )
          ),
          E.chain(assertSequence(context, "right_brace"))
        )
      )
    );
  }

  static forElseStatement(
    context: Context
  ): O.Option<E.Either<PE.ParseError, S.Stmt[]>> {
    return pipe(
      safePeekO(context.stream),
      O.chain(O.fromPredicate((t) => t.token.type === "else")),
      O.map(() =>
        pipe(
          assertSequenceWithUndefined(context, "else", "left_brace"),
          E.chain(() => this.forBlock(context)),
          E.chain(assertSequence(context, "right_brace"))
        )
      )
    );
  }
}

function assertSequenceWithUndefined<T>(
  context: Context,
  ...expected: T.TokenElement["type"][]
): E.Either<PE.ParseError, T> {
  {
    return assertSequence<T>(context, ...expected)(undefined!);
  }
}

function assertSequence<T>(
  context: Context,
  ...expected: T.TokenElement["type"][]
) {
  return (value: T): E.Either<PE.ParseError, T> => {
    const f = ([first, ...rest]: T.TokenElement["type"][]): E.Either<
      PE.ParseError,
      T
    > =>
      first === undefined
        ? E.right(value)
        : pipe(
            safeAdvance(context.stream),
            E.chain((t) => (t.token.type !== first ? error(t, first) : f(rest)))
          );

    return f(expected);
  };
}

function error<Value>(
  t: T.Token,
  ...expected: T.TokenElement["type"][]
): E.Either<PE.ParseError, Value> {
  return E.left(PE.wrongToken(t, ...expected));
}

function synchronize(stream: Stream<T.Token>) {
  while (!isStreamExhausted(stream)) {
    throw new Error("not supposed to happen yet");
  }
}

const MISC_ERROR = E.left(PE.MISC_ERROR);

function isStreamExhausted(s: Stream<T.Token>) {
  return T.Eof.is(s.peek().token);
}

function safePeek(s: Stream<T.Token>): E.Either<PE.UnexpectedEnd, T.Token> {
  const result = s.safePeek();
  return result === undefined ? E.left(PE.UNEXPECTED_END) : E.right(result);
}

function safePeekO(s: Stream<T.Token>): O.Option<T.Token> {
  const result = s.safePeek();
  return result === undefined ? O.none : O.some(result);
}

function safeAdvance(s: Stream<T.Token>): E.Either<PE.ParseError, T.Token> {
  return s.hasNext() ? E.right(s.advance()) : E.left(PE.UNEXPECTED_END);
}
