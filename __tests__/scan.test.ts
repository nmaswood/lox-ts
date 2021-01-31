import * as E from "fp-ts/lib/Either";

import * as T from "../src/scanner/Token";
import { scan } from "../src";

const CASES: {
  description: string;
  input: string;
  expected: ReturnType<typeof scan>;
}[] = [
  {
    description: "empty input",
    input: "",
    expected: E.right([withLine(0, T.EOF)]),
  },
  {
    description: "variable assigned to number",
    input: "var x = 10",
    expected: E.right([
      withLine(0, T.VAR),
      withLine(0, T.Identifier.of("x")),
      withLine(0, T.EQUAL),
      withLine(0, T.Number_.of(10)),
      withLine(0, T.EOF),
    ]),
  },
  {
    description: "varible assigned to string",
    input: 'var x = "hello world"',
    expected: E.right([
      withLine(0, T.VAR),
      withLine(0, T.Identifier.of("x")),
      withLine(0, T.EQUAL),
      withLine(0, T.String_.of("hello world")),
      withLine(0, T.EOF),
    ]),
  },
  {
    description: "simple variable expression",
    input: "x = x - 1",
    expected: E.right([
      withLine(0, T.Identifier.of("x")),
      withLine(0, T.EQUAL),
      withLine(0, T.Identifier.of("x")),
      withLine(0, T.MINUS),
      withLine(0, T.Number_.of(1)),
      withLine(0, T.EOF),
    ]),
  },
  {
    description: "empty function",
    input: "fun identifier(){}",
    expected: E.right([
      withLine(0, T.FUN),
      withLine(0, T.Identifier.of("identifier")),
      withLine(0, T.LEFT_PAREN),
      withLine(0, T.RIGHT_PAREN),
      withLine(0, T.LEFT_BRACE),
      withLine(0, T.RIGHT_BRACE),
      withLine(0, T.EOF),
    ]),
  },
  {
    description: "empty function across new lines",
    input: ` fun identifier()
        {
          }`,
    expected: E.right([
      withLine(0, T.FUN),
      withLine(0, T.Identifier.of("identifier")),
      withLine(0, T.LEFT_PAREN),
      withLine(0, T.RIGHT_PAREN),
      withLine(1, T.LEFT_BRACE),
      withLine(2, T.RIGHT_BRACE),
      withLine(2, T.EOF),
    ]),
  },
  {
    description: "allows comments to display",
    input: ` var x = 10
    // foo bar`,
    expected: E.right([
      withLine(0, T.VAR),
      withLine(0, T.Identifier.of("x")),
      withLine(0, T.EQUAL),
      withLine(0, T.Number_.of(10)),
      withLine(1, T.EOF),
    ]),
  },
];

describe("scan", () => {
  CASES.forEach(({ input, expected, description }) => {
    it(`correctly handles ${description}`, () => {
      expect(scan(input)).toEqual(expected);
    });
  });
});

function withLine(line: number, token: T.TokenElement): T.Token {
  return {
    line,
    token,
  };
}
