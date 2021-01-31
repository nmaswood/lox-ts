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
    input: [withLine(T.EOF)],
    expected: E.right([]),
  },
  {
    description: "var xyz = 1",
    input: [
      withLine(T.VAR),
      withLine(T.Identifier.of("xyz")),
      withLine(T.EQUAL),
      withLine(T.Number_.of(1)),
      withLine(T.SEMICOLON),
      withLine(T.EOF),
    ],
    expected: E.right([
      S.Expr.of(
        Ex.Assign.of(T.Identifier.of("xyz"), Ex.Literal.of(T.Number_.of(1)))
      ),
    ]),
  },
  {
    description: "var xyz = !false;",
    input: [
      withLine(T.VAR),
      withLine(T.Identifier.of("xyz")),
      withLine(T.EQUAL),
      withLine(T.BANG),
      withLine(T.FALSE),
      withLine(T.SEMICOLON),
      withLine(T.EOF),
    ],
    expected: E.right([
      S.Expr.of(
        Ex.Assign.of(
          T.Identifier.of("xyz"),
          Ex.Unary.of(T.BANG, Ex.Literal.of(T.FALSE))
        )
      ),
    ]),
  },
  // {
  //   description: "var xyz = false and false;",
  //   input: [
  //     withLine(T.VAR),
  //     withLine(T.Identifier.of("xyz")),
  //     withLine(T.EQUAL),
  //     withLine(T.BANG),
  //     withLine(T.FALSE),
  //     withLine(T.AND),
  //     withLine(T.FALSE),
  //     withLine(T.SEMICOLON),
  //     withLine(T.EOF),
  //   ],
  //   expected: E.right([
  //     S.Expr.of(
  //       Ex.Assign.of(
  //         T.Identifier.of("xyz"),
  //         Ex.Binary.of(T.AND,
  //           Ex.Literal.of(T.FALSE),
  //           Ex.Literal.of(T.FALSE)
  //           )
  //       )
  //     ),
  //   ]),
  // },

  // {
  //   description: "var xyz = !false",
  //   input: [
  //     {
  //       line: 0,
  //       token: {
  //         type: "var",
  //       },
  //     },
  //     {
  //       line: 0,
  //       token: {
  //         type: "identifier",
  //         value: "xyz",
  //       },
  //     },
  //     {
  //       line: 0,
  //       token: {
  //         type: "equal",
  //       },
  //     },
  //     {
  //       line: 0,
  //       token: {
  //         type: "true",
  //       },
  //     },
  //     {
  //       line: 0,
  //       token: {
  //         type: "true",
  //       },
  //     },
  //     { line: 0, token: { type: "semicolon" } },
  //     { line: 0, token: { type: "eof" } },
  //   ],
  //   expected: E.right([
  //     S.Expr.of({
  //       type: "assign",
  //       name: {
  //         type: "identifier",
  //         value: "xyz",
  //       },
  //       value: {
  //         type: "literal",
  //         value: {
  //           type: "number",
  //           value: 1,
  //         },
  //       },
  //     }),
  //   ]),
  // },
  // {
  //   description: "1 + 1",
  //   input: [
  //     {
  //       line: 0,
  //       token: {
  //         type: "number",
  //         value: 1,
  //       },
  //     },
  //     {
  //       line: 0,
  //       token: {
  //         type: "plus",
  //       },
  //     },
  //     {
  //       line: 0,
  //       token: {
  //         type: "number",
  //         value: 1,
  //       },
  //     },
  //     {
  //       line: 0,
  //       token: {
  //         type: "eof",
  //       },
  //     },
  //   ],
  //   expected: E.right([
  //     {
  //       type: "expression",
  //       value: {
  //         type: "binary",
  //         left: {
  //           type: "literal",
  //           value: {
  //             type: "number",
  //             value: 1,
  //           },
  //         },
  //         right: {
  //           type: "literal",
  //           value: {
  //             type: "number",
  //             value: 1,
  //           },
  //         },
  //         operator: { type: "plus" },
  //       },
  //     },
  //   ]),
  // },
  // {
  //   description: "var x = 10",
  //   input: [
  //     {
  //       line: 0,
  //       token: {
  //         type: "var",
  //       },
  //     },
  //     {
  //       line: 0,
  //       token: {
  //         type: "identifier",
  //         value: "x",
  //       },
  //     },
  //     {
  //       line: 0,
  //       token: {
  //         type: "equal",
  //       },
  //     },
  //     {
  //       line: 0,
  //       token: {
  //         type: "number",
  //         value: 10,
  //       },
  //     },
  //   ],
  //   expected: {
  //     type: "assign",
  //     name: {
  //       type: "identifier",
  //       value: "x",
  //     },
  //     value: {
  //       type: "literal",
  //       value: {
  //         type: "number",
  //         value: 10,
  //       },
  //     },
  //   },
  // },
];

describe("parse", () => {
  CASES.forEach(({ input, expected, description }) => {
    it(`correctly handles ${description}`, () => {
      expect(parse(input)).toEqual(expected);
    });
  });
});

function withLine(token: T.TokenElement): T.Token {
  return {
    line: 0,
    token,
  };
}
