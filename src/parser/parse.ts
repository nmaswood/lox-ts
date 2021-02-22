import * as E from "fp-ts/lib/Either";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";

import * as Ex from "./Expr";
import * as S from "./Stmt";
import * as T from "../scanner/Token";
import { Stream } from "../stream/Stream";
import * as PE from "./ParseError";

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
      E.chain(
        (token): E.Either<PE.ParseError, S.Stmt> => {
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
              return E.left(PE.MISC_ERROR);
          }
        }
      )
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
  /*
   * # TODO
   * varDecl
   * "var" IDENTIFIER ( "=" expression )? ";" ;
   *
   * var foo;
   * var foo = "bar";
   */

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

  /*
   * function
   *
   * IDENTIFIER "(" parameters? ")" block ;
   *  fun addPair(a, b) {
   *    return a + b;
   *   }
   *
   */
  static forFunction(context: Context): E.Either<PE.ParseError, S.Function_> {
    return pipe(
      safeAdvance(context.stream),
      E.map(({ token }) => token),
      E.chain((t) =>
        t.type === "identifier" ? E.right(t) : E.left(PE.MISC_ERROR)
      ),
      E.chain((identifier) =>
        pipe(
          this.forParameters(context),
          E.chain((parameters) =>
            pipe(
              this.forBlock(context),
              E.map((stmts) => S.Function_.of(identifier, parameters, stmts))
            )
          )
        )
      )
    );
  }

  /*
   * parameters
   * IDENTIFIER ( "," IDENTIFIER )* ;
   * ()
   * (a)
   * (a, b)
   */

  static forParameters(
    context: Context
  ): E.Either<PE.ParseError, T.Identifier[]> {
    const gatherParams = (
      acc: T.Identifier[]
    ): E.Either<PE.ParseError, T.Identifier[]> =>
      pipe(
        safeAdvance(context.stream),
        E.map(({ token }) => token),
        E.chain((te) => {
          switch (te.type) {
            case "right_paren":
              return E.right(acc);
            case "comma":
              return gatherParams(acc);
            case "identifier":
              return gatherParams([...acc, te]);
            default:
              return E.left(PE.MISC_ERROR);
          }
        })
      );

    return pipe(
      assertSequenceWithUndefined(context, "left_paren"),
      E.chain(() => gatherParams([]))
    );
  }

  /*
   * block
   * "{" declaration* "}
   *
   * {
   *  var i = 1;
   * }
   *
   */

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

    return pipe(
      assertSequenceWithUndefined(context, "left_brace"),
      E.chain(() => processBlock([]))
    );
  }

  /*
   * printStmt
   * "print" expression ";" ;
   *
   * print "Hello World";
   */

  static forPrint(context: Context): E.Either<PE.ParseError, S.Print> {
    return pipe(
      Handler.forExpression(context),
      E.map(({ value }) => S.Print.of(value)),
      E.chain(assertSequence(context, "semicolon"))
    );
  }

  /*
   * return
   * "return" expression ";" ;
   *
   * return "Hello World";
   */

  static forReturn(context: Context): E.Either<PE.ParseError, S.Return> {
    return pipe(
      safePeek(context.stream),
      E.map(({ token }) => token),
      E.chain(
        (te): E.Either<PE.ParseError, S.Expr | undefined> => {
          switch (te.type) {
            case "semicolon":
              return E.right(undefined);
            default:
              return pipe(
                this.forExpression(context),
                E.chain(assertSequence(context, "semicolon"))
              );
          }
        }
      ),
      E.map((value) => S.Return.of(value?.value))
    );
  }

  /*
   * classDecl
   * "class" IDENTIFIER ( "<" IDENTIFIER "{" function* "}" ;
   *
   * class Breakfast {
   *  cook() {
   *     print "Eggs a-fryin'!";
   *  }
   *
   *  serve(who) {
   *     print "Enjoy your breakfast, " + who + ".";
   *   }
   *  }
   */
  static forClass(context: Context): E.Either<PE.ParseError, S.Class> {
    const forSuperClass = (): E.Either<
      PE.ParseError,
      T.Identifier | undefined
    > =>
      pipe(
        safePeekO(context.stream),
        O.chain(O.fromPredicate((t) => t.token.type === "less")),
        O.map(() => this.forIdentifier(context)),
        O.getOrElseW(() => E.right(undefined))
      );

    const forFunctions = (
      acc: S.Function_[]
    ): E.Either<PE.ParseError, S.Function_[]> =>
      pipe(
        safePeek(context.stream),
        E.chain((t) =>
          t.token.type === "right_brace"
            ? E.right(acc)
            : pipe(
                this.forFunction(context),
                E.chain((func) => forFunctions([...acc, func]))
              )
        )
      );

    return pipe(
      Handler.forIdentifier(context),
      E.chain(assertSequence(context, "left_brace")),
      E.chain((className) =>
        pipe(
          forSuperClass(),
          E.map((superClassName) => ({
            className,
            superClassName,
          }))
        )
      ),
      E.chain(({ className, superClassName }) =>
        pipe(
          forFunctions([]),
          E.map((funcs) => S.Class.of(className, superClassName, funcs))
        )
      )
    );
  }

  static forIdentifier(
    context: Context
  ): E.Either<PE.ParseError, T.Identifier> {
    return pipe(
      safeAdvance(context.stream),
      E.chain((t) =>
        t.token.type === "identifier"
          ? E.right(t.token)
          : E.left(PE.wrongToken(t, "identifier"))
      )
    );
  }

  /*
   *
   * whileStmt
   * "while" "(" expression ")" statement ;
   *
   * while (a < 10) {
   *   print a;
   *   a = a + 1;
   * }
   */

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

  /*
   * ifStmt
   *
   * "if" "(" expression ")" statement * ( "else" statement )? ;
   *
   * if (condition) {
   *    print "yes";
   *  } else {
   *    print "no";
   *  }
   */
  static forIfStatement(context: Context): E.Either<PE.ParseError, S.If> {
    const forElse = () =>
      pipe(
        safePeekO(context.stream),
        O.chain(O.fromPredicate((t) => t.token.type === "else")),
        O.map(() =>
          pipe(
            assertSequenceWithUndefined(context, "else", "left_brace"),
            E.chain(() => this.forBlock(context)),
            E.chain(assertSequence(context, "right_brace"))
          )
        ),
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
              forElse(),
              E.map((else_) => S.If.of(cond.value, then, else_))
            )
          ),
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
