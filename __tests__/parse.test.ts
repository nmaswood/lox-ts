import * as E from "fp-ts/lib/Either";

import { parse } from "../src";
import { Token } from "../src/scanner/Token";

interface Case {
  description: string;
  input: Token[];
  expected: ReturnType<typeof parse>;
}

const CASES: Case[] = [
  {
    description: "empty input",
    input: [
      {
        line: 0,
        token: {
          type: "eof",
        },
      },
    ],
    expected: E.right([]),
  },
  {
    description: "1 + 1",
    input: [
      {
        line: 0,
        token: {
          type: "number",
          value: 1,
        },
      },
      {
        line: 0,
        token: {
          type: "plus",
        },
      },
      {
        line: 0,
        token: {
          type: "number",
          value: 1,
        },
      },
      {
        line: 0,
        token: {
          type: "eof",
        },
      },
    ],
    expected: E.right([
      {
        type: "expression",
        value: {
          type: "binary",
          left: {
            type: "literal",
            value: {
              type: "number",
              value: 1,
            },
          },
          right: {
            type: "literal",
            value: {
              type: "number",
              value: 1,
            },
          },
          operator: { type: "plus" },
        },
      },
    ]),
  },
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
