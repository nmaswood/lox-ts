export interface Token {
  line: number;
  token: NonLiteral | Literal;
}

export interface NonLiteral {
  type: "non_literal";
  kind:
    | "LEFT_PAREN"
    | "RIGHT_PAREN"
    | "LEFT_BRACE"
    | "RIGHT_BRACE"
    | "COMMA"
    | "DOT"
    | "MINUS"
    | "PLUS"
    | "SEMICOLON"
    | "SLASH"
    | "STAR"
    | "BANG"
    | "BANG_EQUAL"
    | "EQUAL"
    | "EQUAL_EQUAL"
    | "GREATER"
    | "GREATER_EQUAL"
    | "LESS"
    | "LESS_EQUAL"
    | "AND"
    | "CLASS"
    | "ELSE"
    | "FALSE"
    | "FUN"
    | "FOR"
    | "IF"
    | "NIL"
    | "OR"
    | "PRINT"
    | "RETURN"
    | "SUPER"
    | "THIS"
    | "TRUE"
    | "VAR"
    | "WHILE"
    | "EOF";
}

export type Literal = Identifier | String_ | Number_;

export interface Identifier {
  type: "literal";
  value: {
    kind: "IDENTIFIER";
    value: string;
  };
}

export interface String_ {
  type: "literal";
  value: {
    kind: "STRING";
    value: string;
  };
}

export interface Number_ {
  type: "literal";
  value: {
    kind: "NUMBER";
    value: number;
  };
}
