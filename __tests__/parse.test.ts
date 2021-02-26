import * as E from "fp-ts/lib/Either";

import { parse } from "../src";
import * as S from "../src/parser/Stmt";
import * as T from "../src/scanner/Token";
import * as Ex from "../src/parser/Expr";

interface Case {
  description: string;
  input: T.Token[];
  expected: ReturnType<typeof parse>;
}

const CASES: Case[] = [
  {
    description: "empty input",
    input: [T.Token.of(0, T.EOF)],
    expected: E.right([]),
  },
  // {
  //   description: "var xyz = 1",
  //   input: [
  //     T.Token.of(0, T.VAR),
  //     T.Token.of(0, T.Identifier.of("xyz")),
  //     T.Token.of(0, T.EQUAL),
  //     T.Token.of(0, T.Number_.of(1)),
  //     T.Token.of(0, T.SEMICOLON),
  //     T.Token.of(0, T.EOF),
  //   ],
  //   expected: E.right([
  //     S.Expr.of(
  //       Ex.Assign.of(T.Identifier.of("xyz"), Ex.Literal.of(T.Number_.of(1)))
  //     ),
  //   ]),
  // },
  // {
  //   description: "var xyz = !false;",
  //   input: [
  //     T.Token.of(0, T.VAR),
  //     T.Token.of(0, T.Identifier.of("xyz")),
  //     T.Token.of(0, T.EQUAL),
  //     T.Token.of(0, T.BANG),
  //     T.Token.of(0, T.FALSE),
  //     T.Token.of(0, T.SEMICOLON),
  //     T.Token.of(0, T.EOF),
  //   ],
  //   expected: E.right([
  //     S.Expr.of(
  //       Ex.Assign.of(
  //         T.Identifier.of("xyz"),
  //         Ex.Unary.of(T.BANG, Ex.Literal.of(T.FALSE))
  //       )
  //     ),
  //   ]),
  // },
  // {
  //   description: "var xyz = false and false;",
  //   input: [
  //     T.Token.of(0, T.VAR),
  //     T.Token.of(0, T.Identifier.of("xyz")),
  //     T.Token.of(0, T.EQUAL),
  //     T.Token.of(0, T.FALSE),
  //     T.Token.of(0, T.AND),
  //     T.Token.of(0, T.FALSE),
  //     T.Token.of(0, T.SEMICOLON),
  //     T.Token.of(0, T.EOF),
  //   ],
  //   expected: E.right([
  //     S.Expr.of(
  //       Ex.Assign.of(
  //         T.Identifier.of("xyz"),
  //         Ex.Binary.of(T.AND, Ex.Literal.of(T.FALSE), Ex.Literal.of(T.FALSE))
  //       )
  //     ),
  //   ]),
  // },
  // {
  //   description: "var xyz = !false;",
  //   input: [
  //     T.Token.of(0, T.VAR),
  //     T.Token.of(0, T.Identifier.of("xyz")),
  //     T.Token.of(0, T.EQUAL),
  //     T.Token.of(0, T.BANG),
  //     T.Token.of(0, T.FALSE),
  //     T.Token.of(0, T.SEMICOLON),
  //     T.Token.of(0, T.EOF),
  //   ],
  //   expected: E.right([
  //     S.Expr.of(
  //       Ex.Assign.of(
  //         T.Identifier.of("xyz"),
  //         Ex.Unary.of(T.BANG, Ex.Literal.of(T.FALSE))
  //       )
  //     ),
  //   ]),
  // },
  // {
  //   description: "var xyz = !false;",
  //   input: [
  //     T.Token.of(0, T.VAR),
  //     T.Token.of(0, T.Identifier.of("xyz")),
  //     T.Token.of(0, T.EQUAL),
  //     T.Token.of(0, T.BANG),
  //     T.Token.of(0, T.FALSE),
  //     T.Token.of(0, T.SEMICOLON),
  //     T.Token.of(0, T.EOF),
  //   ],
  //   expected: E.right([
  //     S.Expr.of(
  //       Ex.Assign.of(
  //         T.Identifier.of("xyz"),
  //         Ex.Unary.of(T.BANG, Ex.Literal.of(T.FALSE))
  //       )
  //     ),
  //   ]),
  // },

  // {
  //   description: "fun identifier(){}",
  //   input: [
  //     T.Token.of(0, T.FUN),
  //     T.Token.of(0, T.Identifier.of("identifier")),
  //     T.Token.of(0, T.LEFT_PAREN),
  //     T.Token.of(0, T.RIGHT_PAREN),
  //     T.Token.of(0, T.LEFT_BRACE),
  //     T.Token.of(0, T.RIGHT_BRACE),
  //     T.Token.of(0, T.EOF),
  //   ],
  //   expected: E.right([S.Expr.of(Ex.Literal.of(T.FALSE))]),
  // },
];

describe("parse", () => {
  CASES.forEach(({ input, expected, description }) => {
    it(`correctly handles ${description}`, () => {
      expect(parse(input)).toEqual(expected);
    });
  });
});
