import { NonLiteral } from "./Token";

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
