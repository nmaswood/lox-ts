import { assertNever } from "../util/assertNever";
import { MapDiscriminatedUnion } from "./../AdvancedTypes";

export interface TokenWithContext<T extends Token> {
  token: T;
  context: LexicalContext;
}

export namespace TokenWithContext {
  export const of = <T extends Token>(
    token: T,
    context: LexicalContext
  ): TokenWithContext<T> => ({
    token,
    context,
  });
}

export interface LexicalContext {
  line: number;
}

export namespace LexicalContext {
  export const of = (line: number): LexicalContext => ({
    line,
  });
}

export type TokenByType = MapDiscriminatedUnion<Token, "type">;

export type Token = NonLiteral | Literal;

export namespace Token {
  export const is = <T extends Token["type"]>(
    type: T,
    value: Token
  ): value is TokenByType[T] => type === value["type"];
}

export type Literal = Identifier | String_ | Number_ | True | False | Nil;

export type Keyword =
  | And
  | Class
  | Else
  | False
  | For
  | Fun
  | If
  | Nil
  | Or
  | Print
  | Return
  | Super
  | This
  | True
  | Var
  | While;

export type OneCharacter =
  | LeftParen
  | RightParen
  | LeftBrace
  | RightBrace
  | Comma
  | Dot
  | Minus
  | Plus
  | Semicolon
  | Star;

export type Operator = BinaryOperator | UnaryOperator;

export type BinaryOperator =
  | Minus
  | Plus
  | Slash
  | Star
  | BangEqual
  | Equal
  | EqualEqual
  | Greater
  | GreaterEqual
  | Less
  | Or
  | And
  | LessEqual;

export type UnaryOperator = Minus | Bang;
export namespace UnaryOperator {
  export function is(t: Literal | NonLiteral): t is UnaryOperator {
    switch (t.type) {
      case "minus":
      case "bang":
        return true;
      default:
        return false;
    }
  }

  export function fromString(t: "minus" | "bang"): UnaryOperator {
    switch (t) {
      case "minus":
        return MINUS;
      case "bang":
        return BANG;
      default:
        assertNever(t);
    }
  }
}

export interface Identifier {
  type: "identifier";
  value: string;
}
export namespace Identifier {
  export const of = (value: string): Identifier => ({
    type: "identifier",
    value,
  });
}

export interface String_ {
  type: "string";
  value: string;
}
export namespace String_ {
  export const of = (value: string): String_ => ({ type: "string", value });
}

export interface Number_ {
  type: "number";
  value: number;
}
export namespace Number_ {
  export const of = (value: number): Number_ => ({ type: "number", value });
}

export type NonLiteral =
  | LeftParen
  | RightParen
  | LeftBrace
  | RightBrace
  | Comma
  | Dot
  | Minus
  | Plus
  | Semicolon
  | Slash
  | Star
  | Bang
  | BangEqual
  | Equal
  | EqualEqual
  | Greater
  | GreaterEqual
  | Less
  | LessEqual
  | And
  | Class
  | Else
  | False
  | Fun
  | For
  | If
  | Nil
  | Or
  | Print
  | Return
  | Super
  | This
  | True
  | Var
  | While
  | Eof;
// Literals
export const LEFT_PAREN = {
  type: "left_paren",
} as const;
export type LeftParen = typeof LEFT_PAREN;

export const RIGHT_PAREN = {
  type: "right_paren",
} as const;
export type RightParen = typeof RIGHT_PAREN;

export const LEFT_BRACE = {
  type: "left_brace",
} as const;
export type LeftBrace = typeof LEFT_BRACE;

export const RIGHT_BRACE = {
  type: "right_brace",
} as const;
export type RightBrace = typeof RIGHT_BRACE;

export const COMMA = {
  type: "comma",
} as const;
export type Comma = typeof COMMA;

export const DOT = {
  type: "dot",
} as const;
export type Dot = typeof DOT;

export const MINUS = {
  type: "minus",
} as const;
export type Minus = typeof MINUS;

export const PLUS = {
  type: "plus",
} as const;
export type Plus = typeof PLUS;

export const SEMICOLON = {
  type: "semicolon",
} as const;

export type Semicolon = typeof SEMICOLON;

export const SLASH = {
  type: "slash",
} as const;
export type Slash = typeof SLASH;

export const STAR = {
  type: "star",
} as const;
export type Star = typeof STAR;

export const BANG = {
  type: "bang",
} as const;
export type Bang = typeof BANG;

export const BANG_EQUAL = {
  type: "bang_equal",
} as const;
export type BangEqual = typeof BANG_EQUAL;

export const EQUAL = {
  type: "equal",
} as const;
export type Equal = typeof EQUAL;

export const EQUAL_EQUAL = {
  type: "equal_equal",
} as const;
export type EqualEqual = typeof EQUAL_EQUAL;

export const GREATER = {
  type: "greater",
} as const;
export type Greater = typeof GREATER;

export const GREATER_EQUAL = {
  type: "greater_equal",
} as const;
export type GreaterEqual = typeof GREATER_EQUAL;

export const LESS = {
  type: "less",
} as const;
export type Less = typeof LESS;

export const LESS_EQUAL = {
  type: "less_equal",
} as const;
export type LessEqual = typeof LESS_EQUAL;

export const AND = {
  type: "and",
} as const;
export type And = typeof AND;

export const CLASS = {
  type: "class",
} as const;
export type Class = typeof CLASS;

export const ELSE = {
  type: "else",
} as const;
export type Else = typeof ELSE;

export const FALSE = {
  type: "false",
} as const;
export type False = typeof FALSE;

export const FUN = {
  type: "fun",
} as const;
export type Fun = typeof FUN;

export const FOR = {
  type: "for",
} as const;
export type For = typeof FOR;

export const IF = {
  type: "if",
} as const;
export type If = typeof IF;

export const NIL = {
  type: "nil",
} as const;
export type Nil = typeof NIL;

export const OR = {
  type: "or",
} as const;
export type Or = typeof OR;

export const PRINT = {
  type: "print",
} as const;
export type Print = typeof PRINT;

export const RETURN = {
  type: "return",
} as const;
export type Return = typeof RETURN;

export const SUPER = {
  type: "super",
} as const;
export type Super = typeof SUPER;

export const THIS = {
  type: "this",
} as const;
export type This = typeof THIS;

export const TRUE = {
  type: "true",
} as const;

export type True = typeof TRUE;

export const VAR = {
  type: "var",
} as const;
export type Var = typeof VAR;

export const WHILE = {
  type: "while",
} as const;
export type While = typeof WHILE;

export const EOF = {
  type: "eof",
} as const;
export type Eof = typeof EOF;
export namespace Eof {
  export function is(x: NonLiteral | Literal): x is Eof {
    return x.type === "eof";
  }
}
