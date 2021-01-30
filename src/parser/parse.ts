import * as E from "fp-ts/lib/Either";

import { Stmt } from "./Stmt";
import { Token, Eof } from "../scanner/Token";
import { Stream } from "../stream/Stream";

interface Context {
  stream: Stream<Token>;
  stmts: Stmt[];
  errors: ParseError[];
}
interface ParseError {
  token: Token;
  message: string;
}

export function parse(tokens: Token[]): E.Either<ParseError[], Stmt[]> {
  const context: Context = {
    stream: new Stream(tokens),
    stmts: [],
    errors: [],
  };

  while (!isStreamExhausted(context.stream)) {
    Handler.forDeclaration(context);
  }

  return context.errors ? E.left(context.errors) : E.right(context.stmts);
}

function isStreamExhausted(s: Stream<Token>) {
  return Eof.is(s.peek().token);
}
namespace Handler {
  export function forDeclaration(context: Context) {
    const token = context.stream.advance();
  }

  export function forLiteral(context: Context) {
    const token = context.stream.advance();
  }

  export function forUnaryOperator(context: Context) {
    const token = context.stream.advance();
  }
}

function synchronize(stream: Stream<Token>) {
  while (!isStreamExhausted(stream)) {
    return;
  }
}
