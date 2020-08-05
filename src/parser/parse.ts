import { Token } from "../scanner/Token";
import { Stream } from "./Stream";

export function parse(tokens: Token[]): undefined {
  const stream = new Stream(compareTokens, tokens);

  return undefined;
}

function compareTokens(t1: Token, t2: Token) {
  return t1.token.type === t2.token.type;
}
