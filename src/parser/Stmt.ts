import * as Expression from "./Expr";

export type Stmt = Expr;

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
