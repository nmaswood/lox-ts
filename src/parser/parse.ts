import * as E from "fp-ts/lib/Either";

import * as Ex from "./Expr";
import * as S from "./Stmt";
import * as T from "../scanner/Token";
import { Stream } from "../stream/Stream";
import { ParseError } from "./ParseError";
import { pipe } from "fp-ts/lib/pipeable";

interface Context {
  stream: Stream<T.Token>;
}

export function parse(tokens: T.Token[]): E.Either<ParseError[], S.Stmt[]> {
  const context: Context = {
    stream: new Stream(tokens),
  };
  const stmts: S.Stmt[] = [];
  const errors: ParseError[] = [];

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
  static forDeclaration(context: Context): E.Either<ParseError, S.Stmt> {
    const token = context.stream.advance();

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
        return Handler.forForStatement(context);
      default:
        return error(token);
    }
  }

  static forExpression(context: Context): E.Either<ParseError, S.Expr> {
    const token = context.stream.advance();
    if (T.Literal.is(token.token)) {
      const next = context.stream.peek().token;
      if (T.BinaryOperator.is(next)) {
        context.stream.advance();
        const leftExpr = Ex.Literal.of(token.token);
        return pipe(
          Handler.forExpression(context),
          E.map(({ value }) => S.Expr.of(Ex.Binary.of(next, leftExpr, value)))
        );
      }
      return E.right(S.Expr.of(Ex.Literal.of(token.token)));
    } else if (T.UnaryOperator.is(token.token)) {
      const unaryOperator: T.UnaryOperator = token.token;
      return pipe(
        Handler.forExpression(context),
        E.map(({ value }) => S.Expr.of(Ex.Unary.of(unaryOperator, value)))
      );
    }

    return error(token);
  }

  static forVar(context: Context): E.Either<ParseError, S.Stmt> {
    const token = context.stream.advance();
    if (token.token.type !== "identifier") {
      return error(token, "identifier");
    }

    if (context.stream.advance().token.type !== "equal") {
      return error(token, "equal");
    }
    const identifier: T.Identifier = token.token;
    return pipe(
      Handler.forExpression(context),
      E.map(({ value }) => S.Expr.of(Ex.Assign.of(identifier, value)))
    );
  }

  static forFunction(context: Context): E.Either<ParseError, S.Stmt> {
    const token = context.stream.advance();
    if (token.token.type !== "identifier") {
      return error(token, "identifier");
    }

    const leftParen = context.stream.advance();
    if (leftParen.token.type !== "left_paren") {
      return error(token, "left_paren");
    }
    const paramaters: T.Identifier[] = [];
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const t = context.stream.advance();
      if (t.token.type === "identifier") {
        paramaters.push(t.token);
      } else if (t.token.type === "right_paren") {
        break;
      } else {
        return error(token, "right_paren", "identifier");
      }
    }

    const stmts: S.Stmt[] = [];

    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (context.stream.peek().token.type === "right_paren") {
        context.stream.advance();
        break;
      }
      const stmt = Handler.forDeclaration(context);
      if (E.isLeft(stmt)) {
        return stmt;
      } else {
        stmts.push(stmt.right);
      }
    }

    return E.right(S.Function_.of(token.token, paramaters, stmts));
  }

  static forPrint(context: Context): E.Either<ParseError, S.Stmt> {
    return pipe(
      Handler.forExpression(context),
      E.map(({ value }) => S.Print.of(value))
    );
  }

  static forClass(context: Context): E.Either<ParseError, S.Stmt> {
    return pipe(
      Handler.forExpression(context),
      E.map(({ value }) => S.Print.of(value))
    );
  }
  static forForStatement(context: Context): E.Either<ParseError, S.Stmt> {
    return undefined!;
  }

  static forWhileStatement(context: Context): E.Either<ParseError, S.Stmt> {
    return undefined!;
  }

  static forIfStatement(context: Context): E.Either<ParseError, S.Stmt> {
    return undefined!;
  }
}

function error<Value>(
  t: T.Token,
  ...expected: T.TokenElement["type"][]
): E.Either<ParseError, Value> {
  return E.left(ParseError.of(t, expected));
}

function synchronize(stream: Stream<T.Token>) {
  while (!isStreamExhausted(stream)) {
    throw new Error("not supposed to happen yet");
  }
}

function isStreamExhausted(s: Stream<T.Token>) {
  return T.Eof.is(s.peek().token);
}
