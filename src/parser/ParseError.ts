import { Token, TokenElement } from "./../scanner/Token";

export interface ParseError {
  token: Token;
  expected: TokenElement["type"][];
}

export namespace ParseError {
  export function of(
    token: Token,
    expected: TokenElement["type"][]
  ): ParseError {
    return {
      token,
      expected,
    };
  }
}
