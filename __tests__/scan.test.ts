import * as E from "fp-ts/lib/Either";

import { scan } from "../src";

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
          type: "var",
        },
      },
      {
        line: 0,
        token: {
          type: "identifier",
          value: "x",
        },
      },
      {
        line: 0,
        token: {
          type: "equal",
        },
      },
      {
        line: 0,
        token: {
          type: "number",
          value: 10,
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
          type: "var",
        },
      },
      {
        line: 0,
        token: {
          type: "identifier",
          value: "x",
        },
      },
      {
        line: 0,
        token: {
          type: "equal",
        },
      },
      {
        line: 0,
        token: {
          type: "string",
          value: "hello world",
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
          type: "identifier",
          value: "x",
        },
      },
      {
        line: 0,
        token: {
          type: "equal",
        },
      },

      {
        line: 0,
        token: {
          type: "identifier",
          value: "x",
        },
      },
      {
        line: 0,
        token: {
          type: "minus",
        },
      },
      {
        line: 0,
        token: {
          type: "number",
          value: 1,
        },
      },
    ]),
  },
  {
    description: "empty function",
    input: "fun identifier(){}",
    expected: E.right([
      {
        line: 0,
        token: {
          type: "fun",
        },
      },
      {
        line: 0,
        token: {
          type: "identifier",
          value: "identifier",
        },
      },
      {
        line: 0,
        token: {
          type: "left_paren",
        },
      },
      {
        line: 0,
        token: {
          type: "right_paren",
        },
      },
      {
        line: 0,
        token: {
          type: "left_brace",
        },
      },
      {
        line: 0,
        token: {
          type: "right_brace",
        },
      },
    ]),
  },
  {
    description: "empty function across new lines",
    input: ` fun identifier()
        {
          }`,
    expected: E.right([
      {
        line: 0,
        token: {
          type: "fun",
        },
      },
      {
        line: 0,
        token: {
          type: "identifier",
          value: "identifier",
        },
      },
      {
        line: 0,
        token: {
          type: "left_paren",
        },
      },
      {
        line: 0,
        token: {
          type: "right_paren",
        },
      },
      {
        line: 1,
        token: {
          type: "left_brace",
        },
      },
      {
        line: 2,
        token: {
          type: "right_brace",
        },
      },
    ]),
  },
  {
    description: "allows comments to display",
    input: ` var x = 10
    // foo bar`,
    expected: E.right([
      {
        line: 0,
        token: {
          type: "var",
        },
      },
      {
        line: 0,
        token: {
          type: "identifier",
          value: "x",
        },
      },
      {
        line: 0,
        token: {
          type: "equal",
        },
      },
      {
        line: 0,
        token: {
          type: "number",
          value: 10,
        },
      },
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
