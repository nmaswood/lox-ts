import * as T from "./../scanner/Token";

export type ParseError = UnexpectedEnd | WrongType;

export interface WrongType {
  type: "wrong_token";
  actual: T.TokenWithContext<T.Token>;
  expected: T.Token["type"][];
}

export type UnexpectedEnd = typeof UNEXPECTED_END;
export const UNEXPECTED_END = {
  type: "unexpected_end",
} as const;

export function wrongToken<TokenT extends T.Token>(
  actual: T.TokenWithContext<TokenT>,
  ...expected: T.Token["type"][]
): WrongType {
  return {
    type: "wrong_token",
    actual,
    expected,
  };
}
