import * as E from "fp-ts/lib/Either";

import { parse } from "../src/";
import * as S from "../src/parser/Stmt";
import * as T from "../src/scanner/Token";
import * as Ex from "../src/parser/Expr";

interface Case {
  description: string;
  input: T.TokenWithContext<T.Token>[];
  expected: ReturnType<typeof parse>;
}

const CASES: Case[] = [
  {
    description: "empty input",
    input: [T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0))],
    expected: E.right([]),
  },
  {
    description: "1",
    input: [
      T.TokenWithContext.of(T.Number_.of(1), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ],
    expected: E.right([S.Expr.of(Ex.Literal.of(T.Number_.of(1)))]),
  },
  {
    description: "dog",
    input: [
      T.TokenWithContext.of(T.String_.of("dog"), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ],
    expected: E.right([S.Expr.of(Ex.Literal.of(T.String_.of("dog")))]),
  },
  {
    description: "!1",
    input: [
      T.TokenWithContext.of(T.BANG, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Number_.of(1), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ],
    expected: E.right([
      S.Expr.of(Ex.Unary.of(T.BANG, Ex.Literal.of(T.Number_.of(1)))),
    ]),
  },
  {
    description: "-1",
    input: [
      T.TokenWithContext.of(T.MINUS, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Number_.of(1), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ],
    expected: E.right([
      S.Expr.of(Ex.Unary.of(T.MINUS, Ex.Literal.of(T.Number_.of(1)))),
    ]),
  },
  {
    description: "!!1",
    input: [
      T.TokenWithContext.of(T.BANG, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.BANG, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Number_.of(1), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ],
    expected: E.right([
      S.Expr.of(
        Ex.Unary.of(T.BANG, Ex.Unary.of(T.BANG, Ex.Literal.of(T.Number_.of(1))))
      ),
    ]),
  },
  {
    description: "1 + 1",
    input: [
      T.TokenWithContext.of(T.Number_.of(1), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.PLUS, T.LexicalContext.of(0)),

      T.TokenWithContext.of(T.Number_.of(1), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ],
    expected: E.right([
      S.Expr.of(
        Ex.Binary.of(
          T.PLUS,
          Ex.Literal.of(T.Number_.of(1)),
          Ex.Literal.of(T.Number_.of(1))
        )
      ),
    ]),
  },
  {
    description: "1 - 1",
    input: [
      T.TokenWithContext.of(T.Number_.of(1), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.MINUS, T.LexicalContext.of(0)),

      T.TokenWithContext.of(T.Number_.of(1), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ],
    expected: E.right([
      S.Expr.of(
        Ex.Binary.of(
          T.MINUS,
          Ex.Literal.of(T.Number_.of(1)),
          Ex.Literal.of(T.Number_.of(1))
        )
      ),
    ]),
  },
  {
    description: "!1 + !1",
    input: [
      T.TokenWithContext.of(T.BANG, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Number_.of(1), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.PLUS, T.LexicalContext.of(0)),

      T.TokenWithContext.of(T.BANG, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Number_.of(1), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ],
    expected: E.right([
      S.Expr.of(
        Ex.Binary.of(
          T.PLUS,
          Ex.Unary.of(T.BANG, Ex.Literal.of(T.Number_.of(1))),
          Ex.Unary.of(T.BANG, Ex.Literal.of(T.Number_.of(1)))
        )
      ),
    ]),
  },
  {
    description: "1 * 1",
    input: [
      T.TokenWithContext.of(T.Number_.of(1), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.STAR, T.LexicalContext.of(0)),

      T.TokenWithContext.of(T.Number_.of(1), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ],
    expected: E.right([
      S.Expr.of(
        Ex.Binary.of(
          T.STAR,
          Ex.Literal.of(T.Number_.of(1)),
          Ex.Literal.of(T.Number_.of(1))
        )
      ),
    ]),
  },
  {
    description: "!1 * !1",
    input: [
      T.TokenWithContext.of(T.BANG, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Number_.of(1), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.STAR, T.LexicalContext.of(0)),

      T.TokenWithContext.of(T.BANG, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Number_.of(1), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ],
    expected: E.right([
      S.Expr.of(
        Ex.Binary.of(
          T.STAR,
          Ex.Unary.of(T.BANG, Ex.Literal.of(T.Number_.of(1))),
          Ex.Unary.of(T.BANG, Ex.Literal.of(T.Number_.of(1)))
        )
      ),
    ]),
  },
  {
    description: "2 + 3 * 4",
    input: [
      T.TokenWithContext.of(T.Number_.of(2), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.PLUS, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Number_.of(3), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.STAR, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Number_.of(4), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ],
    expected: E.right([
      S.Expr.of(
        Ex.Binary.of(
          T.PLUS,
          Ex.Literal.of(T.Number_.of(2)),

          Ex.Binary.of(
            T.STAR,
            Ex.Literal.of(T.Number_.of(3)),
            Ex.Literal.of(T.Number_.of(4))
          )
        )
      ),
    ]),
  },
  {
    description: "2 + 3 * !4",
    input: [
      T.TokenWithContext.of(T.Number_.of(2), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.PLUS, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Number_.of(3), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.STAR, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.BANG, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Number_.of(4), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ],
    expected: E.right([
      S.Expr.of(
        Ex.Binary.of(
          T.PLUS,
          Ex.Literal.of(T.Number_.of(2)),

          Ex.Binary.of(
            T.STAR,
            Ex.Literal.of(T.Number_.of(3)),
            Ex.Unary.of(T.BANG, Ex.Literal.of(T.Number_.of(4)))
          )
        )
      ),
    ]),
  },
  //{
  //
  //description: "var xyz = 1",
  //input: [
  //T.TokenWithContext.of(T.VAR, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.Identifier.of("xyz"), T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.EQUAL, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.Number_.of(1), T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.SEMICOLON, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
  //],
  //expected: E.right([
  //S.Expr.of(
  //Ex.Assign.of(T.Identifier.of("xyz"), Ex.Literal.of(T.Number_.of(1)))
  //),
  //]),
  //},
  //{
  //description: "var xyz = !false;",
  //input: [
  //T.TokenWithContext.of(T.VAR, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.Identifier.of("xyz"), T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.EQUAL, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.BANG, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.FALSE, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.SEMICOLON, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
  //],
  //expected: E.right([
  //S.Expr.of(
  //Ex.Assign.of(
  //T.Identifier.of("xyz"),
  //Ex.Unary.of(T.BANG, Ex.Literal.of(T.FALSE))
  //)
  //),
  //]),
  //},
  //{
  //description: "var xyz = false and false;",
  //input: [
  //T.TokenWithContext.of(T.VAR, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.Identifier.of("xyz"), T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.EQUAL, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.FALSE, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.AND, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.FALSE, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.SEMICOLON, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
  //],
  //expected: E.right([
  //S.Expr.of(
  //Ex.Assign.of(
  //T.Identifier.of("xyz"),
  //Ex.Binary.of(T.AND, Ex.Literal.of(T.FALSE), Ex.Literal.of(T.FALSE))
  //)
  //),
  //]),
  //},
  //{
  //description: "var xyz = !false;",
  //input: [
  //T.TokenWithContext.of(T.VAR, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.Identifier.of("xyz"), T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.EQUAL, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.BANG, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.FALSE, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.SEMICOLON, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
  //],
  //expected: E.right([
  //S.Expr.of(
  //Ex.Assign.of(
  //T.Identifier.of("xyz"),
  //Ex.Unary.of(T.BANG, Ex.Literal.of(T.FALSE))
  //)
  //),
  //]),
  //},
  //{
  //description: "var xyz = !false;",
  //input: [
  //T.TokenWithContext.of(T.VAR, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.Identifier.of("xyz"), T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.EQUAL, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.BANG, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.FALSE, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.SEMICOLON, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
  //],
  //expected: E.right([
  //S.Expr.of(
  //Ex.Assign.of(
  //T.Identifier.of("xyz"),
  //Ex.Unary.of(T.BANG, Ex.Literal.of(T.FALSE))
  //)
  //),
  //]),
  //},
  //{
  //description: "fun identifier(){}",
  //input: [
  //T.TokenWithContext.of(T.FUN, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(
  //T.Identifier.of("identifier"),
  //T.LexicalContext.of(0)
  //),
  //T.TokenWithContext.of(T.LEFT_PAREN, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.RIGHT_PAREN, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.LEFT_BRACE, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.RIGHT_BRACE, T.LexicalContext.of(0)),
  //T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
  //],
  //expected: E.right([S.Expr.of(Ex.Literal.of(T.FALSE))]),
  //},
];

describe("parse", () => {
  CASES.forEach(({ input, expected, description }) => {
    it(`correctly handles ${description}`, () => {
      const output = parse(input);
      console.log(JSON.stringify(output, null, 2));
      console.log(JSON.stringify(expected, null, 2));
      expect(output).toEqual(expected);
    });
  });
});
