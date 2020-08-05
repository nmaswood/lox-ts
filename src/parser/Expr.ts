import * as T from "../scanner/Token";

export type Expr =
  | Assign
  | Binary
  | Call
  | Get
  | Grouping
  | Literal
  | Logical
  | Set
  | Super
  | This
  | Unary
  | Variable;

export interface Assign {
  type: "assign";
  name: T.Identifier;
  value: Expr;
}

export interface Binary {
  type: "binary";
  left: Expr;
  right: Expr;
  operator: T.Operator;
}

export interface Call {
  type: "call";
  callee: Expr;
  paren: T.Token;
  arguments: Expr[];
}

export interface Get {
  type: "get";
  object: Expr;
  name: T.String_;
}

export interface Grouping {
  type: "grouping";
  expression: Expr;
}

export interface Literal {
  type: "literal";
  value: T.Literal;
}

export interface Logical {
  type: "logical";
  left: Expr;
  right: Expr;
  operator: T.Operator;
}

export interface Set {
  type: "set";
  object: Expr;
  name: T.String_;
  value: Expr;
}

export interface Super {
  type: "super";
  keyword: T.Token;
  method: T.Token;
}

export interface This {
  type: "this";
  keyword: T.Token;
}

export interface Unary {
  type: "unary";
  operator: T.UnaryOperator;
  right: Expr;
}

export interface Variable {
  type: "variable";
  name: T.Token;
}
