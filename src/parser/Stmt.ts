import * as Expression from "./Expr";
import * as T from "../scanner/Token";

export type Stmt = Expr | Block | Function_ | If | Print | Return | Var | While;

export interface Expr {
  type: "expression";
  value: Expression.Expr;
}

export namespace Expr {
  export const of = (value: Expression.Expr): Expr => ({
    type: "expression",
    value,
  });
}

export interface Block {
  _tag: "stmt";
  type: "block";
  stmts: Stmt[];
}

export namespace Block {
  export const of = (stmts: Stmt[]): Block => ({
    _tag: "stmt",
    type: "block",
    stmts,
  });
}

export interface Function_ {
  _tag: "stmt";
  type: "function";
  name: T.Identifier;
  parameters: T.Identifier[];
  body: Stmt[];
}

export namespace Function_ {
  export const of = (
    name: T.Identifier,
    parameters: T.Identifier[],
    body: Stmt[]
  ): Function_ => ({
    _tag: "stmt",
    type: "function",
    name,
    parameters,
    body,
  });
}

export interface If {
  _tag: "stmt";
  type: "if";
  condition: Expression.Expr;
  then: Stmt[];
  else_: Stmt[];
}

export namespace If {
  export const of = (
    condition: Expression.Expr,
    then: Stmt[],
    else_: Stmt[]
  ): If => ({
    _tag: "stmt",
    type: "if",
    condition,
    then,
    else_,
  });
}
export interface Print {
  _tag: "stmt";
  type: "print";
  expression: Expression.Expr;
}

export namespace Print {
  export const of = (expression: Expression.Expr): Print => ({
    _tag: "stmt",
    type: "print",
    expression,
  });
}
export interface Return {
  _tag: "stmt";
  type: "return";
  keyword: T.Identifier;
  value: Expression.Expr;
}

export namespace Return {
  export const of = (
    keyword: T.Identifier,
    value: Expression.Expr
  ): Return => ({
    _tag: "stmt",
    type: "return",
    keyword,
    value,
  });
}
export interface Var {
  _tag: "stmt";
  type: "var";
  name: T.Identifier;
  value: Expression.Expr;
}

export namespace Var {
  export const of = (name: T.Identifier, value: Expression.Expr): Var => ({
    _tag: "stmt",
    type: "var",
    name,
    value,
  });
}

export interface While {
  _tag: "stmt";
  type: "while";
  cond: Expression.Expr;
  body: Stmt[];
}

export namespace While {
  export const of = (cond: Expression.Expr, body: Stmt[]): While => ({
    _tag: "stmt",
    type: "while",
    cond,
    body,
  });
}
