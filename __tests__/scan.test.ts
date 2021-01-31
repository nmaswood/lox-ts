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
    expected: E.right([T.Token.of(0, T.EOF)]),
  },
  {
    description: "variable assigned to number",
    input: "var x = 10",
    expected: E.right([
      T.Token.of(0, T.VAR),
      T.Token.of(0, T.Identifier.of("x")),
      T.Token.of(0, T.EQUAL),
      T.Token.of(0, T.Number_.of(10)),
      T.Token.of(0, T.EOF),
    ]),
  },
  {
    description: "varible assigned to string",
    input: 'var x = "hello world"',
    expected: E.right([
      T.Token.of(0, T.VAR),
      T.Token.of(0, T.Identifier.of("x")),
      T.Token.of(0, T.EQUAL),
      T.Token.of(0, T.String_.of("hello world")),
      T.Token.of(0, T.EOF),
    ]),
  },
  {
    description: "simple variable expression",
    input: "x = x - 1",
    expected: E.right([
      T.Token.of(0, T.Identifier.of("x")),
      T.Token.of(0, T.EQUAL),
      T.Token.of(0, T.Identifier.of("x")),
      T.Token.of(0, T.MINUS),
      T.Token.of(0, T.Number_.of(1)),
      T.Token.of(0, T.EOF),
    ]),
  },
  {
    description: "empty function",
    input: "fun identifier(){}",
    expected: E.right([
      T.Token.of(0, T.FUN),
      T.Token.of(0, T.Identifier.of("identifier")),
      T.Token.of(0, T.LEFT_PAREN),
      T.Token.of(0, T.RIGHT_PAREN),
      T.Token.of(0, T.LEFT_BRACE),
      T.Token.of(0, T.RIGHT_BRACE),
      T.Token.of(0, T.EOF),
    ]),
  },
  {
    description: "empty function across new lines",
    input: ` fun identifier()
        {
          }`,
    expected: E.right([
      T.Token.of(0, T.FUN),
      T.Token.of(0, T.Identifier.of("identifier")),
      T.Token.of(0, T.LEFT_PAREN),
      T.Token.of(0, T.RIGHT_PAREN),
      T.Token.of(1, T.LEFT_BRACE),
      T.Token.of(2, T.RIGHT_BRACE),
      T.Token.of(2, T.EOF),
    ]),
  },
  {
    description: "allows comments to display",
    input: ` var x = 10
    // foo bar`,
    expected: E.right([
      T.Token.of(0, T.VAR),
      T.Token.of(0, T.Identifier.of("x")),
      T.Token.of(0, T.EQUAL),
      T.Token.of(0, T.Number_.of(10)),
      T.Token.of(1, T.EOF),
    ]),
  },
  {
    description: "simple integer",
    input: "1234",
    expected: E.right([
      T.Token.of(0, T.Number_.of(1234)),
      T.Token.of(0, T.EOF),
    ]),
  },
  {
    description: "simple float",
    input: "12.34",
    expected: E.right([
      T.Token.of(0, T.Number_.of(12.34)),
      T.Token.of(0, T.EOF),
    ]),
  },
  {
    description: "addition",
    input: "add + me",
    expected: E.right([
      T.Token.of(0, T.Identifier.of("add")),
      T.Token.of(0, T.PLUS),
      T.Token.of(0, T.Identifier.of("me")),
      T.Token.of(0, T.EOF),
    ]),
  },
  {
    description: "subtraction",
    input: "subtract - me",
    expected: E.right([
      T.Token.of(0, T.Identifier.of("subtract")),
      T.Token.of(0, T.MINUS),
      T.Token.of(0, T.Identifier.of("me")),
      T.Token.of(0, T.EOF),
    ]),
  },
  {
    description: "mul",
    input: "multiply * me",
    expected: E.right([
      T.Token.of(0, T.Identifier.of("multiply")),
      T.Token.of(0, T.STAR),
      T.Token.of(0, T.Identifier.of("me")),
      T.Token.of(0, T.EOF),
    ]),
  },
  {
    description: "negate",
    input: "-me",
    expected: E.right([
      T.Token.of(0, T.MINUS),
      T.Token.of(0, T.Identifier.of("me")),
      T.Token.of(0, T.EOF),
    ]),
  },
  {
    description: "less",
    input: "less < than",
    expected: E.right([
      T.Token.of(0, T.Identifier.of("less")),
      T.Token.of(0, T.LESS),
      T.Token.of(0, T.Identifier.of("than")),
      T.Token.of(0, T.EOF),
    ]),
  },
  {
    description: "lessequal",
    input: "less <= than",
    expected: E.right([
      T.Token.of(0, T.Identifier.of("less")),
      T.Token.of(0, T.LESS_EQUAL),
      T.Token.of(0, T.Identifier.of("than")),
      T.Token.of(0, T.EOF),
    ]),
  },
  {
    description: "greaterequal",
    input: "greater >= than",
    expected: E.right([
      T.Token.of(0, T.Identifier.of("greater")),
      T.Token.of(0, T.GREATER_EQUAL),
      T.Token.of(0, T.Identifier.of("than")),
      T.Token.of(0, T.EOF),
    ]),
  },
  {
    description: "greater",
    input: "greater > than",
    expected: E.right([
      T.Token.of(0, T.Identifier.of("greater")),
      T.Token.of(0, T.GREATER),
      T.Token.of(0, T.Identifier.of("than")),
      T.Token.of(0, T.EOF),
    ]),
  },
  {
    description: "equal to ",
    input: "123 == 456",
    expected: E.right([
      T.Token.of(0, T.Number_.of(123)),
      T.Token.of(0, T.EQUAL_EQUAL),
      T.Token.of(0, T.Number_.of(456)),
      T.Token.of(0, T.EOF),
    ]),
  },
  {
    description: "basic grouping",
    input: "123 == (1 + 1)",
    expected: E.right([
      T.Token.of(0, T.Number_.of(123)),
      T.Token.of(0, T.EQUAL_EQUAL),
      T.Token.of(0, T.LEFT_PAREN),
      T.Token.of(0, T.Number_.of(1)),
      T.Token.of(0, T.PLUS),
      T.Token.of(0, T.Number_.of(1)),
      T.Token.of(0, T.RIGHT_PAREN),
      T.Token.of(0, T.EOF),
    ]),
  },
  {
    description: "print",
    input: 'print "hi"',
    expected: E.right([
      T.Token.of(0, T.PRINT),
      T.Token.of(0, T.String_.of("hi")),
      T.Token.of(0, T.EOF),
    ]),
  },
  {
    description: "empty var",
    input: "var foo;",
    expected: E.right([
      T.Token.of(0, T.VAR),
      T.Token.of(0, T.Identifier.of("foo")),
      T.Token.of(0, T.SEMICOLON),
      T.Token.of(0, T.EOF),
    ]),
  },
  {
    description: "control flow",
    input: `if (condition) {
        print "yes";
      } else {
        print "no";
      }`,
    expected: E.right([
      T.Token.of(0, T.IF),
      T.Token.of(0, T.LEFT_PAREN),
      T.Token.of(0, T.Identifier.of("condition")),
      T.Token.of(0, T.RIGHT_PAREN),
      T.Token.of(0, T.LEFT_BRACE),
      T.Token.of(1, T.PRINT),
      T.Token.of(1, T.String_.of("yes")),
      T.Token.of(1, T.SEMICOLON),
      T.Token.of(2, T.RIGHT_BRACE),
      T.Token.of(2, T.ELSE),
      T.Token.of(2, T.LEFT_BRACE),
      T.Token.of(3, T.PRINT),
      T.Token.of(3, T.String_.of("no")),
      T.Token.of(3, T.SEMICOLON),
      T.Token.of(4, T.RIGHT_BRACE),
      T.Token.of(4, T.EOF),
    ]),
  },
  {
    description: "loops",
    input: `var a = 1;
  while (a < 10) {
    print a;
    a = a + 1;
  }`,
    expected: E.right([
      T.Token.of(0, T.VAR),
      T.Token.of(0, T.Identifier.of("a")),
      T.Token.of(0, T.EQUAL),
      T.Token.of(0, T.Number_.of(1)),
      T.Token.of(0, T.SEMICOLON),
      T.Token.of(1, T.WHILE),
      T.Token.of(1, T.LEFT_PAREN),
      T.Token.of(1, T.Identifier.of("a")),
      T.Token.of(1, T.LESS),
      T.Token.of(1, T.Number_.of(10)),
      T.Token.of(1, T.RIGHT_PAREN),
      T.Token.of(1, T.LEFT_BRACE),
      T.Token.of(2, T.PRINT),
      T.Token.of(2, T.Identifier.of("a")),
      T.Token.of(2, T.SEMICOLON),
      T.Token.of(3, T.Identifier.of("a")),
      T.Token.of(3, T.EQUAL),
      T.Token.of(3, T.Identifier.of("a")),
      T.Token.of(3, T.PLUS),
      T.Token.of(3, T.Number_.of(1)),
      T.Token.of(3, T.SEMICOLON),
      T.Token.of(4, T.RIGHT_BRACE),
      T.Token.of(4, T.EOF),
    ]),
  },
  {
    description: "print fn",
    input: ` fun printSum(a, b) {
        print a + b;
      } `,
    expected: E.right([
      T.Token.of(0, T.FUN),
      T.Token.of(0, T.Identifier.of("printSum")),
      T.Token.of(0, T.LEFT_PAREN),
      T.Token.of(0, T.Identifier.of("a")),
      T.Token.of(0, T.COMMA),
      T.Token.of(0, T.Identifier.of("b")),
      T.Token.of(0, T.RIGHT_PAREN),
      T.Token.of(0, T.LEFT_BRACE),
      T.Token.of(1, T.PRINT),
      T.Token.of(1, T.Identifier.of("a")),
      T.Token.of(1, T.PLUS),
      T.Token.of(1, T.Identifier.of("b")),
      T.Token.of(1, T.SEMICOLON),
      T.Token.of(2, T.RIGHT_BRACE),
      T.Token.of(2, T.EOF),
    ]),
  },
  {
    description: "call a fn",
    input: "someFunction(Breakfast);",
    expected: E.right([
      T.Token.of(0, T.Identifier.of("someFunction")),
      T.Token.of(0, T.LEFT_PAREN),
      T.Token.of(0, T.Identifier.of("Breakfast")),
      T.Token.of(0, T.RIGHT_PAREN),
      T.Token.of(0, T.SEMICOLON),
      T.Token.of(0, T.EOF),
    ]),
  },
  {
    description: "inheritance",
    input: `class Brunch < Breakfast {
        init(meat) {
          super.init(meat);
          this.drink = "hi";
        }
      }`,
    expected: E.right([
      T.Token.of(0, T.CLASS),
      T.Token.of(0, T.Identifier.of("Brunch")),
      T.Token.of(0, T.LESS),
      T.Token.of(0, T.Identifier.of("Breakfast")),
      T.Token.of(0, T.LEFT_BRACE),
      T.Token.of(1, T.Identifier.of("init")),
      T.Token.of(1, T.LEFT_PAREN),
      T.Token.of(1, T.Identifier.of("meat")),
      T.Token.of(1, T.RIGHT_PAREN),
      T.Token.of(1, T.LEFT_BRACE),
      T.Token.of(2, T.SUPER),
      T.Token.of(2, T.DOT),
      T.Token.of(2, T.Identifier.of("init")),
      T.Token.of(2, T.LEFT_PAREN),
      T.Token.of(2, T.Identifier.of("meat")),
      T.Token.of(2, T.RIGHT_PAREN),
      T.Token.of(2, T.SEMICOLON),
      T.Token.of(3, T.THIS),
      T.Token.of(3, T.DOT),
      T.Token.of(3, T.Identifier.of("drink")),
      T.Token.of(3, T.EQUAL),
      T.Token.of(3, T.String_.of("hi")),
      T.Token.of(3, T.SEMICOLON),
      T.Token.of(4, T.RIGHT_BRACE),
      T.Token.of(5, T.RIGHT_BRACE),
      T.Token.of(5, T.EOF),
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
