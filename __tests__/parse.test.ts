import { parse } from "../src";
import { Token } from "../src/scanner/Token";

interface Case {
  description: string;
  input: Token[];
  expected: undefined;
}

const CASES: Case[] = [
  {
    description: "noop",
    input: [],
    expected: undefined,
  },
];

describe("parse", () => {
  CASES.forEach(({ input, expected, description }) => {
    it(`correctly handles ${description}`, () => {
      expect(parse(input)).toEqual(expected);
    });
  });
});
