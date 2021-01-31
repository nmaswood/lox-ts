import { Token } from "../scanner/Token";

export interface ParseError {
  token: Token;
  message: string;
}

export namespace ParseError {
  export function of(token: Token, message = "Undefined error"): ParseError {
    return {
      token,
      message,
    };
  }
}
