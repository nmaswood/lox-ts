import * as T from "./../scanner/Token";

export type ParseError<TokenT extends T.Token> =
  | UnexpectedEnd
  | WrongType<TokenT>;

export interface WrongType<TokenT extends T.Token> {
  type: "wrong_token";
  actual: T.TokenWithContext<TokenT>;
  expected: T.Token["type"][];
}

export type UnexpectedEnd = typeof UNEXPECTED_END;
export const UNEXPECTED_END = {
  type: "unexpected_end",
} as const;

export function wrongToken<TokenT extends T.Token>(
  actual: T.TokenWithContext<TokenT>,
  ...expected: T.Token["type"][]
): WrongType<TokenT> {
  return {
    type: "wrong_token",
    actual,
    expected,
  };
}
