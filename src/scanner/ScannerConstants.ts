import { NonLiteral } from "./Token";

export const ONE_CHAR: Map<string, NonLiteral> = new Map([
  ["(", { type: "non_literal", kind: "LEFT_PAREN" }],
  [")", { type: "non_literal", kind: "RIGHT_PAREN" }],
  ["{", { type: "non_literal", kind: "LEFT_BRACE" }],
  ["}", { type: "non_literal", kind: "RIGHT_BRACE" }],
  [",", { type: "non_literal", kind: "COMMA" }],
  [".", { type: "non_literal", kind: "DOT" }],
  ["-", { type: "non_literal", kind: "MINUS" }],
  ["+", { type: "non_literal", kind: "PLUS" }],
  [";", { type: "non_literal", kind: "SEMICOLON" }],
  ["*", { type: "non_literal", kind: "STAR" }],
]);
export const TWO_CHAR: Set<string> = new Set(["!", "=", "<", ">"]);
export const WHITE_SPACE: Set<string> = new Set([" ", "\r", "\t"]);
export const KEYWORDS: Map<string, NonLiteral> = new Map([
  ["and", fromKind("AND")],
  ["class", fromKind("CLASS")],
  ["else", fromKind("ELSE")],
  ["false", fromKind("FALSE")],
  ["for", fromKind("FOR")],
  ["fun", fromKind("FUN")],
  ["if", fromKind("IF")],
  ["nil", fromKind("NIL")],
  ["or", fromKind("OR")],
  ["print", fromKind("PRINT")],
  ["return", fromKind("RETURN")],
  ["super", fromKind("SUPER")],
  ["this", fromKind("THIS")],
  ["true", fromKind("TRUE")],
  ["var", fromKind("VAR")],
  ["while", fromKind("WHILE")],
]);

function fromKind(kind: NonLiteral["kind"]): NonLiteral {
  return {
    type: "non_literal",
    kind,
  };
}
