import * as E from "fp-ts/lib/Either";

import { scan } from "../src/scanner/scan";

const CASES: {
  description: string;
  input: string;
  expected: ReturnType<typeof scan>;
}[] = [
  {
    description: "empty input",
    input: "",
    expected: E.right([]),
  },
  {
    description: "variable assigned to number",
    input: "var x = 10",
    expected: E.right([
      {
        line: 0,
        token: {
          type: "non_literal",
          kind: "VAR",
        },
      },
      {
        line: 0,
        token: {
          type: "literal",
          value: {
            kind: "IDENTIFIER",
            value: "x",
          },
        },
      },
      {
        line: 0,
        token: {
          type: "non_literal",
          kind: "EQUAL",
        },
      },
      {
        line: 0,
        token: {
          type: "literal",
          value: {
            kind: "NUMBER",
            value: 10,
          },
        },
      },
    ]),
  },
  {
    description: "varible assigned to string",
    input: 'var x = "hello world"',
    expected: E.right([
      {
        line: 0,
        token: {
          type: "non_literal",
          kind: "VAR",
        },
      },
      {
        line: 0,
        token: {
          type: "literal",
          value: {
            kind: "IDENTIFIER",
            value: "x",
          },
        },
      },
      {
        line: 0,
        token: {
          type: "non_literal",
          kind: "EQUAL",
        },
      },
      {
        line: 0,
        token: {
          type: "literal",
          value: {
            kind: "STRING",
            value: "hello world",
          },
        },
      },
    ]),
  },
  {
    description: "simple variable expression",
    input: "x = x - 1",
    expected: E.right([
      {
        line: 0,
        token: {
          type: "literal",
          value: {
            kind: "IDENTIFIER",
            value: "x",
          },
        },
      },
      {
        line: 0,
        token: {
          type: "non_literal",
          kind: "EQUAL",
        },
      },

      {
        line: 0,
        token: {
          type: "literal",
          value: {
            kind: "IDENTIFIER",
            value: "x",
          },
        },
      },
      {
        line: 0,
        token: {
          type: "non_literal",
          kind: "MINUS",
        },
      },
      {
        line: 0,
        token: {
          type: "literal",
          value: {
            kind: "NUMBER",
            value: 1,
          },
        },
      },
    ]),
  },
  {
    description: "empty function",
    input: "func identifier(){}",
    expected: E.right([
      {
        line: 0,
        token: {
          type: "non_literal",
          kind: "FUN",
        },
      },
      {
        line: 0,
        token: {
          type: "literal",
          value: {
            kind: "IDENTIFIER",
            value: "identifier",
          },
        },
      },
      {
        line: 0,
        token: {
          type: "non_literal",
          kind: "LEFT_PAREN",
        },
      },
      {
        line: 0,
        token: {
          type: "non_literal",
          kind: "RIGHT_PAREN",
        },
      },
      {
        line: 0,
        token: {
          type: "non_literal",
          kind: "LEFT_BRACE",
        },
      },
      {
        line: 0,
        token: {
          type: "non_literal",
          kind: "RIGHT_BRACE",
        },
      },
    ]),
  },
  {
    description: "empty function across new lines",
    input: ` function identifier()
        {
          }`,
    expected: E.right([
      {
        line: 0,
        token: {
          type: "non_literal",
          kind: "FUN",
        },
      },
      {
        line: 0,
        token: {
          type: "literal",
          value: {
            kind: "IDENTIFIER",
            value: "identifier",
          },
        },
      },
      {
        line: 0,
        token: {
          type: "non_literal",
          kind: "LEFT_PAREN",
        },
      },
      {
        line: 0,
        token: {
          type: "non_literal",
          kind: "RIGHT_PAREN",
        },
      },
      {
        line: 1,
        token: {
          type: "non_literal",
          kind: "LEFT_BRACE",
        },
      },
      {
        line: 2,
        token: {
          type: "non_literal",
          kind: "RIGHT_BRACE",
        },
      },
    ]),
  },
  {
    description: "displays a number error",
    input: ` var x = 10
    3.1a.  `,
    expected: E.left([
      {
        line: 1,
        message: "TO DO",
      },
    ]),
  },
];

describe("scan", () => {
  CASES.forEach(({ input, expected, description }) => {
    it(`correctly handles ${description}`, () =>
      expect(scan(input)).toEqual(expected));
  });
});
