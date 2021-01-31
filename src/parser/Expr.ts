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
export namespace Assign {
  export const of = (name: T.Identifier, value: Expr): Assign => ({
    type: "assign",
    name,
    value,
  });
}

export interface Binary {
  type: "binary";
  left: Expr;
  right: Expr;
  operator: T.Operator;
}
export namespace Binary {
  export const of = (
    left: Expr,
    right: Expr,
    operator: T.Operator
  ): Binary => ({
    type: "binary",
    left,
    right,
    operator,
  });
}

export interface Call {
  type: "call";
  callee: Expr;
  paren: T.Token;
  arguments: Expr[];
}
export namespace Call {
  export const of = (
    callee: Expr,
    paren: T.Token,
    arguments_: Expr[]
  ): Call => ({
    type: "call",
    callee,
    paren,
    arguments: arguments_,
  });
}
export interface Get {
  type: "get";
  object: Expr;
  name: T.String_;
}
export namespace Get {
  export const of = (object: Expr, name: T.String_): Get => ({
    type: "get",
    object,
    name,
  });
}

export interface Grouping {
  type: "grouping";
  expression: Expr;
}
export namespace Grouping {
  export const of = (expression: Expr): Grouping => ({
    type: "grouping",
    expression,
  });
}

export interface Literal {
  type: "literal";
  value: T.Literal;
}
export namespace Literal {
  export const of = (value: T.Literal): Literal => ({
    type: "literal",
    value,
  });
}

export interface Logical {
  type: "logical";
  left: Expr;
  right: Expr;
  operator: T.Operator;
}
export namespace Logical {
  export const of = (
    left: Expr,
    right: Expr,
    operator: T.Operator
  ): Logical => ({
    type: "logical",
    left,
    right,
    operator,
  });
}

export interface Set {
  type: "set";
  object: Expr;
  name: T.String_;
  value: Expr;
}
export namespace Set {
  export const of = (object: Expr, name: T.String_, value: Expr): Set => ({
    type: "set",
    object,
    name,
    value,
  });
}

export interface Super {
  type: "super";
  keyword: T.Token;
  method: T.Token;
}
export namespace Super {
  export const of = (keyword: T.Token, method: T.Token): Super => ({
    type: "super",
    keyword,
    method,
  });
}

export interface This {
  type: "this";
  keyword: T.Token;
}
export namespace This {
  export const of = (keyword: T.Token): This => ({
    type: "this",
    keyword,
  });
}

export interface Unary {
  type: "unary";
  operator: T.UnaryOperator;
  right: Expr;
}
export namespace Unary {
  export const of = (operator: T.UnaryOperator, right: Expr): Unary => ({
    type: "unary",
    operator,
    right,
  });
}

export interface Variable {
  type: "variable";
  name: T.Token;
}
export namespace Variable {
  export const of = (name: T.Token): Variable => ({
    type: "variable",
    name,
  });
}
