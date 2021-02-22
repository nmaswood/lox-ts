import * as Expression from "./Expr";
import * as T from "../scanner/Token";

export type Stmt =
  | Expr
  | Block
  | Function_
  | If
  | Print
  | Return
  | Var
  | While
  | Class
  | For;

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

export interface Class {
  _tag: "stmt";
  type: "class";
  name: T.Identifier;
  super: T.Identifier | undefined;
  functions: Function_[];
}

export namespace Class {
  export const of = (
    name: T.Identifier,
    superName: T.Identifier | undefined,
    functions: Function_[]
  ): Class => ({
    _tag: "stmt",
    type: "class",
    name,
    super: superName,
    functions,
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
  else_: Stmt[] | undefined;
}

export namespace If {
  export const of = (
    condition: Expression.Expr,
    then: Stmt[],
    else_: Stmt[] | undefined
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
  value: Expression.Expr | undefined;
}

export namespace Return {
  export const of = (value: Expression.Expr | undefined): Return => ({
    _tag: "stmt",
    type: "return",
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

export interface For {
  _tag: "stmt";
  type: "for";
  initializer: Expression.Assign | Expression.Variable | undefined;
  cond: Expression.Expr | undefined;
  update: Expression.Expr | undefined;
  body: Stmt[];
}

export namespace For {
  export const of = (
    initializer: Expression.Assign | Expression.Variable | undefined,
    cond: Expression.Expr | undefined,
    update: Expression.Expr | undefined,
    body: Stmt[]
  ): For => ({
    _tag: "stmt",
    type: "for",
    initializer,
    cond,
    update,
    body,
  });
}
