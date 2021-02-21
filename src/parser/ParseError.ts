import { Token, TokenElement } from "./../scanner/Token";

export type ParseError = UnexpectedEnd | typeof MISC_ERROR | WrongType;

export interface WrongType {
  type: "wrong_token";
  actual: Token;
  expected: TokenElement["type"][];
}

export const MISC_ERROR = {
  type: "misc",
} as const;

export type UnexpectedEnd = typeof UNEXPECTED_END;
export const UNEXPECTED_END = {
  type: "unexpected_end",
} as const;

export function wrongToken(
  actual: Token,
  ...expected: TokenElement["type"][]
): WrongType {
  return {
    type: "wrong_token",
    actual,
    expected,
  };
}
