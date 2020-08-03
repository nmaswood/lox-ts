export interface Token {
  line: number;
  token: NonLiteral | Literal;
}

export type Literal = Identifier | String_ | Number_;

export interface Identifier {
  type: "identifier";
  value: string;
}

export interface String_ {
  type: "string";
  value: string;
}

interface Number_ {
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
interface Eof {
  type: "eof";
}
