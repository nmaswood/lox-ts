import * as E from "fp-ts/lib/Either";

import * as Ex from "./Expr";
import * as S from "./Stmt";
import * as T from "../scanner/Token";
import { Stream } from "../stream/Stream";
import { ParseError } from "./ParseError";

interface Context {
  stream: Stream<T.Token>;
  stmts: S.Stmt[];
  errors: ParseError[];
}

export function parse(tokens: T.Token[]): E.Either<ParseError[], S.Stmt[]> {
  const context: Context = {
    stream: new Stream(tokens),
    stmts: [],
    errors: [],
  };

  while (!isStreamExhausted(context.stream)) {
    if (T.Semicolon.is(context.stream.peek().token)) {
      context.stream.advance();
      continue;
    }
    const stmt = Handler.forDeclaration(context);
    if (E.isLeft(stmt)) {
      synchronize(context.stream);
      context.errors.push(stmt.left);
    } else {
      context.stmts.push(stmt.right);
    }
  }

  return context.errors.length
    ? E.left(context.errors)
    : E.right(context.stmts);
}

function isStreamExhausted(s: Stream<T.Token>) {
  return T.Eof.is(s.peek().token);
}
namespace Handler {
  export function forDeclaration(
    context: Context
  ): E.Either<ParseError, S.Stmt> {
    // eslint-disable-next-line no-debugger
    const token = context.stream.advance();

    if (token.token.type === "var") {
      return Handler.forVar(context);
    }

    return E.left(ParseError.of(token, "not supported"));
  }

  export function forExpression(
    context: Context
  ): E.Either<ParseError, S.Stmt> {
    const token = context.stream.advance();
    if (T.Literal.is(token.token)) {
      return E.right(S.Expr.of(Ex.Literal.of(token.token)));
    } else if (T.UnaryOperator.is(token.token)) {
      const rest = forExpression(context);
      if (E.isLeft(rest)) {
        return rest;
      }

      return E.right(S.Expr.of(Ex.Unary.of(token.token, rest.right.value)));
    }

    return E.left({
      token: token,
      message: "not foo supported",
    });
  }

  export function forVar(context: Context): E.Either<ParseError, S.Stmt> {
    const token = context.stream.advance();
    if (token.token.type !== "identifier") {
      return E.left(
        ParseError.of(
          token,
          `Was expecting identifier saw ${token.token.type} instead`
        )
      );
    }

    if (context.stream.advance().token.type !== "equal") {
      return E.left(
        ParseError.of(
          token,
          `Was expecting "equal" saw ${token.token.type} instead`
        )
      );
    }

    const exprValue = forExpression(context);

    if (E.isLeft(exprValue)) {
      return exprValue;
    }

    return E.right(
      S.Expr.of({
        type: "assign",
        name: token.token,
        value: exprValue.right.value,
      })
    );
  }
}

function synchronize(stream: Stream<T.Token>) {
  while (!isStreamExhausted(stream)) {
    throw new Error("not supposed to happen yet");
  }
}
