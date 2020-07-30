export type Token = NonLiteral | Literal;

interface NonLiteral {
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

interface Literal {
  type: "literal";
  value:
    | {
        kind: "IDENTIFIER";
        value: string;
      }
    | {
        kind: "STRING";
        value: string;
      }
    | {
        kind: "NUMBER";
        value: number;
      };
}
