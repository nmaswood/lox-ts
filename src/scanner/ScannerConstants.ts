import { NonLiteral } from "./Token";

export const ONE_CHAR: Map<string, NonLiteral> = new Map([
  ["(", { type: "left_paren" }],
  [")", { type: "right_paren" }],
  ["{", { type: "left_brace" }],
  ["}", { type: "right_brace" }],
  [",", { type: "comma" }],
  [".", { type: "dot" }],
  ["-", { type: "minus" }],
  ["+", { type: "plus" }],
  [";", { type: "semicolon" }],
  ["*", { type: "star" }],
]);
export const TWO_CHAR: Set<string> = new Set(["!", "=", "<", ">"]);
export const WHITE_SPACE: Set<string> = new Set([" ", "\r", "\t"]);
export const KEYWORDS: Map<string, NonLiteral> = new Map([
  ["and", { type: "and" }],
  ["class", { type: "class" }],
  ["else", { type: "else" }],
  ["false", { type: "false" }],
  ["for", { type: "for" }],
  ["fun", { type: "fun" }],
  ["if", { type: "if" }],
  ["nil", { type: "nil" }],
  ["or", { type: "or" }],
  ["print", { type: "print" }],
  ["return", { type: "return" }],
  ["super", { type: "super" }],
  ["this", { type: "this" }],
  ["true", { type: "true" }],
  ["var", { type: "var" }],
  ["while", { type: "while" }],
]);
