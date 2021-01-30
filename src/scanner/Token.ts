export interface Token {
  line: number;
  token: NonLiteral | Literal;
}

export type Literal = Identifier | String_ | Number_ | True | False | Nil;
export namespace Literal {
  export function is(t: Literal | NonLiteral): t is Literal {
    switch (t.type) {
      case "string":
      case "number":
      case "identifier":
      case "true":
      case "false":
      case "nil":
        return true;
      default:
        return false;
    }
  }
}

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

export namespace Operator {
  export function is(x: Literal | NonLiteral): x is Operator {
    return UnaryOperator.is(x) || BinaryOperator.is(x);
  }
}

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
  | LessEqual;
export namespace BinaryOperator {
  export function is(x: Literal | NonLiteral): x is BinaryOperator {
    switch (x.type) {
      case "minus":
      case "plus":
      case "slash":
      case "star":
      case "bang_equal":
      case "equal":
      case "equal_equal":
      case "greater":
      case "greater_equal":
      case "less":
      case "less_equal":
        return true;
      default:
        return false;
    }
  }
}

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
}

export interface Identifier {
  type: "identifier";
  value: string;
}

export interface String_ {
  type: "string";
  value: string;
}

export interface Number_ {
  type: "number";
  value: number;
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
interface LeftParen {
  type: "left_paren";
}
interface RightParen {
  type: "right_paren";
}
interface LeftBrace {
  type: "left_brace";
}
interface RightBrace {
  type: "right_brace";
}
interface Comma {
  type: "comma";
}
interface Dot {
  type: "dot";
}
interface Minus {
  type: "minus";
}
interface Plus {
  type: "plus";
}
interface Semicolon {
  type: "semicolon";
}
interface Slash {
  type: "slash";
}
interface Star {
  type: "star";
}
interface Bang {
  type: "bang";
}
interface BangEqual {
  type: "bang_equal";
}
interface Equal {
  type: "equal";
}
interface EqualEqual {
  type: "equal_equal";
}
interface Greater {
  type: "greater";
}
interface GreaterEqual {
  type: "greater_equal";
}
interface Less {
  type: "less";
}
interface LessEqual {
  type: "less_equal";
}
interface And {
  type: "and";
}
interface Class {
  type: "class";
}
interface Else {
  type: "else";
}
interface False {
  type: "false";
}
interface Fun {
  type: "fun";
}
interface For {
  type: "for";
}
interface If {
  type: "if";
}
interface Nil {
  type: "nil";
}
interface Or {
  type: "or";
}
interface Print {
  type: "print";
}
interface Return {
  type: "return";
}
interface Super {
  type: "super";
}
interface This {
  type: "this";
}
interface True {
  type: "true";
}
interface Var {
  type: "var";
}
interface While {
  type: "while";
}
export interface Eof {
  type: "eof";
}
export namespace Eof {
  export function is(x: NonLiteral | Literal): x is Eof {
    return x.type === "eof";
  }
}
