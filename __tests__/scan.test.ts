import * as E from "fp-ts/lib/Either";

import { scan } from "../src/scan";

const CASES: {
  input: string;
  expected: ReturnType<typeof scan>;
}[] = [
  {
    input: "",
    expected: E.right([]),
  },
  {
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
    input: "",
    expected: E.right([]),
  },
  {
    input: "",
    expected: E.right([]),
  },
  {
    input: "",
    expected: E.right([]),
  },
];

describe("scan", () => {
  CASES.forEach(({ input, expected }) => {
    expect(scan(input)).toEqual(expected);
  });
});
