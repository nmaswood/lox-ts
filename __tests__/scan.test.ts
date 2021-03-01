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
    expected: E.right([T.TokenWithContext.of(T.EOF, 0)]),
  },
  {
    description: "variable assigned to number",
    input: "var x = 10",
    expected: E.right([
      T.TokenWithContext.of(T.VAR, 0),
      T.TokenWithContext.of(T.Identifier.of("x"), 0),
      T.TokenWithContext.of(T.EQUAL, 0),
      T.TokenWithContext.of(T.Number_.of(10), 0),
      T.TokenWithContext.of(T.EOF, 0),
    ]),
  },
  {
    description: "varible assigned to string",
    input: 'var x = "hello world"',
    expected: E.right([
      T.TokenWithContext.of(T.VAR, 0),
      T.TokenWithContext.of(T.Identifier.of("x"), 0),
      T.TokenWithContext.of(T.EQUAL, 0),
      T.TokenWithContext.of(T.String_.of("hello world"), 0),
      T.TokenWithContext.of(T.EOF, 0),
    ]),
  },
  {
    description: "simple variable expression",
    input: "x = x - 1",
    expected: E.right([
      T.TokenWithContext.of(T.Identifier.of("x"), 0),
      T.TokenWithContext.of(T.EQUAL, 0),
      T.TokenWithContext.of(T.Identifier.of("x"), 0),
      T.TokenWithContext.of(T.MINUS, 0),
      T.TokenWithContext.of(T.Number_.of(1), 0),
      T.TokenWithContext.of(T.EOF, 0),
    ]),
  },
  {
    description: "empty function",
    input: "fun identifier(){}",
    expected: E.right([
      T.TokenWithContext.of(T.FUN, 0),
      T.TokenWithContext.of(T.Identifier.of("identifier"), 0),
      T.TokenWithContext.of(T.LEFT_PAREN, 0),
      T.TokenWithContext.of(T.RIGHT_PAREN, 0),
      T.TokenWithContext.of(T.LEFT_BRACE, 0),
      T.TokenWithContext.of(T.RIGHT_BRACE, 0),
      T.TokenWithContext.of(T.EOF, 0),
    ]),
  },
  {
    description: "empty function across new lines",
    input: ` fun identifier()
        {
          }`,
    expected: E.right([
      T.TokenWithContext.of(T.FUN, 0),
      T.TokenWithContext.of(T.Identifier.of("identifier"), 0),
      T.TokenWithContext.of(T.LEFT_PAREN, 0),
      T.TokenWithContext.of(T.RIGHT_PAREN, 0),
      T.TokenWithContext.of(T.LEFT_BRACE, 1),
      T.TokenWithContext.of(T.RIGHT_BRACE, 2),
      T.TokenWithContext.of(T.EOF, 2),
    ]),
  },
  {
    description: "allows comments to display",
    input: ` var x = 10
    // foo bar`,
    expected: E.right([
      T.TokenWithContext.of(T.VAR, 0),
      T.TokenWithContext.of(T.Identifier.of("x"), 0),
      T.TokenWithContext.of(T.EQUAL, 0),
      T.TokenWithContext.of(T.Number_.of(10), 0),
      T.TokenWithContext.of(T.EOF, 1),
    ]),
  },
  {
    description: "simple integer",
    input: "1234",
    expected: E.right([
      T.TokenWithContext.of(T.Number_.of(1234), 0),
      T.TokenWithContext.of(T.EOF, 0),
    ]),
  },
  {
    description: "simple float",
    input: "12.34",
    expected: E.right([
      T.TokenWithContext.of(T.Number_.of(12.34), 0),
      T.TokenWithContext.of(T.EOF, 0),
    ]),
  },
  {
    description: "addition",
    input: "add + me",
    expected: E.right([
      T.TokenWithContext.of(T.Identifier.of("add"), 0),
      T.TokenWithContext.of(T.PLUS, 0),
      T.TokenWithContext.of(T.Identifier.of("me"), 0),
      T.TokenWithContext.of(T.EOF, 0),
    ]),
  },
  {
    description: "subtraction",
    input: "subtract - me",
    expected: E.right([
      T.TokenWithContext.of(T.Identifier.of("subtract"), 0),
      T.TokenWithContext.of(T.MINUS, 0),
      T.TokenWithContext.of(T.Identifier.of("me"), 0),
      T.TokenWithContext.of(T.EOF, 0),
    ]),
  },
  {
    description: "mul",
    input: "multiply * me",
    expected: E.right([
      T.TokenWithContext.of(T.Identifier.of("multiply"), 0),
      T.TokenWithContext.of(T.STAR, 0),
      T.TokenWithContext.of(T.Identifier.of("me"), 0),
      T.TokenWithContext.of(T.EOF, 0),
    ]),
  },
  {
    description: "negate",
    input: "-me",
    expected: E.right([
      T.TokenWithContext.of(T.MINUS, 0),
      T.TokenWithContext.of(T.Identifier.of("me"), 0),
      T.TokenWithContext.of(T.EOF, 0),
    ]),
  },
  {
    description: "less",
    input: "less < than",
    expected: E.right([
      T.TokenWithContext.of(T.Identifier.of("less"), 0),
      T.TokenWithContext.of(T.LESS, 0),
      T.TokenWithContext.of(T.Identifier.of("than"), 0),
      T.TokenWithContext.of(T.EOF, 0),
    ]),
  },
  {
    description: "lessequal",
    input: "less <= than",
    expected: E.right([
      T.TokenWithContext.of(T.Identifier.of("less"), 0),
      T.TokenWithContext.of(T.LESS_EQUAL, 0),
      T.TokenWithContext.of(T.Identifier.of("than"), 0),
      T.TokenWithContext.of(T.EOF, 0),
    ]),
  },
  {
    description: "greaterequal",
    input: "greater >= than",
    expected: E.right([
      T.TokenWithContext.of(T.Identifier.of("greater"), 0),
      T.TokenWithContext.of(T.GREATER_EQUAL, 0),
      T.TokenWithContext.of(T.Identifier.of("than"), 0),
      T.TokenWithContext.of(T.EOF, 0),
    ]),
  },
  {
    description: "greater",
    input: "greater > than",
    expected: E.right([
      T.TokenWithContext.of(T.Identifier.of("greater"), 0),
      T.TokenWithContext.of(T.GREATER, 0),
      T.TokenWithContext.of(T.Identifier.of("than"), 0),
      T.TokenWithContext.of(T.EOF, 0),
    ]),
  },
  {
    description: "equal to ",
    input: "123 == 456",
    expected: E.right([
      T.TokenWithContext.of(T.Number_.of(123), 0),
      T.TokenWithContext.of(T.EQUAL_EQUAL, 0),
      T.TokenWithContext.of(T.Number_.of(456), 0),
      T.TokenWithContext.of(T.EOF, 0),
    ]),
  },
  {
    description: "basic grouping",
    input: "123 == (1 + 1)",
    expected: E.right([
      T.TokenWithContext.of(T.Number_.of(123), 0),
      T.TokenWithContext.of(T.EQUAL_EQUAL, 0),
      T.TokenWithContext.of(T.LEFT_PAREN, 0),
      T.TokenWithContext.of(T.Number_.of(1), 0),
      T.TokenWithContext.of(T.PLUS, 0),
      T.TokenWithContext.of(T.Number_.of(1), 0),
      T.TokenWithContext.of(T.RIGHT_PAREN, 0),
      T.TokenWithContext.of(T.EOF, 0),
    ]),
  },
  {
    description: "print",
    input: 'print "hi"',
    expected: E.right([
      T.TokenWithContext.of(T.PRINT, 0),
      T.TokenWithContext.of(T.String_.of("hi"), 0),
      T.TokenWithContext.of(T.EOF, 0),
    ]),
  },
  {
    description: "empty var",
    input: "var foo;",
    expected: E.right([
      T.TokenWithContext.of(T.VAR, 0),
      T.TokenWithContext.of(T.Identifier.of("foo"), 0),
      T.TokenWithContext.of(T.SEMICOLON, 0),
      T.TokenWithContext.of(T.EOF, 0),
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
      T.TokenWithContext.of(T.IF, 0),
      T.TokenWithContext.of(T.LEFT_PAREN, 0),
      T.TokenWithContext.of(T.Identifier.of("condition"), 0),
      T.TokenWithContext.of(T.RIGHT_PAREN, 0),
      T.TokenWithContext.of(T.LEFT_BRACE, 0),
      T.TokenWithContext.of(T.PRINT, 1),
      T.TokenWithContext.of(T.String_.of("yes"), 1),
      T.TokenWithContext.of(T.SEMICOLON, 1),
      T.TokenWithContext.of(T.RIGHT_BRACE, 2),
      T.TokenWithContext.of(T.ELSE, 2),
      T.TokenWithContext.of(T.LEFT_BRACE, 2),
      T.TokenWithContext.of(T.PRINT, 3),
      T.TokenWithContext.of(T.String_.of("no"), 3),
      T.TokenWithContext.of(T.SEMICOLON, 3),
      T.TokenWithContext.of(T.RIGHT_BRACE, 4),
      T.TokenWithContext.of(T.EOF, 4),
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
      T.TokenWithContext.of(T.VAR, 0),
      T.TokenWithContext.of(T.Identifier.of("a"), 0),
      T.TokenWithContext.of(T.EQUAL, 0),
      T.TokenWithContext.of(T.Number_.of(1), 0),
      T.TokenWithContext.of(T.SEMICOLON, 0),
      T.TokenWithContext.of(T.WHILE, 1),
      T.TokenWithContext.of(T.LEFT_PAREN, 1),
      T.TokenWithContext.of(T.Identifier.of("a"), 1),
      T.TokenWithContext.of(T.LESS, 1),
      T.TokenWithContext.of(T.Number_.of(10), 1),
      T.TokenWithContext.of(T.RIGHT_PAREN, 1),
      T.TokenWithContext.of(T.LEFT_BRACE, 1),
      T.TokenWithContext.of(T.PRINT, 2),
      T.TokenWithContext.of(T.Identifier.of("a"), 2),
      T.TokenWithContext.of(T.SEMICOLON, 2),
      T.TokenWithContext.of(T.Identifier.of("a"), 3),
      T.TokenWithContext.of(T.EQUAL, 3),
      T.TokenWithContext.of(T.Identifier.of("a"), 3),
      T.TokenWithContext.of(T.PLUS, 3),
      T.TokenWithContext.of(T.Number_.of(1), 3),
      T.TokenWithContext.of(T.SEMICOLON, 3),
      T.TokenWithContext.of(T.RIGHT_BRACE, 4),
      T.TokenWithContext.of(T.EOF, 4),
    ]),
  },
  {
    description: "print fn",
    input: ` fun printSum(a, b) {
        print a + b;
      } `,
    expected: E.right([
      T.TokenWithContext.of(T.FUN, 0),
      T.TokenWithContext.of(T.Identifier.of("printSum"), 0),
      T.TokenWithContext.of(T.LEFT_PAREN, 0),
      T.TokenWithContext.of(T.Identifier.of("a"), 0),
      T.TokenWithContext.of(T.COMMA, 0),
      T.TokenWithContext.of(T.Identifier.of("b"), 0),
      T.TokenWithContext.of(T.RIGHT_PAREN, 0),
      T.TokenWithContext.of(T.LEFT_BRACE, 0),
      T.TokenWithContext.of(T.PRINT, 1),
      T.TokenWithContext.of(T.Identifier.of("a"), 1),
      T.TokenWithContext.of(T.PLUS, 1),
      T.TokenWithContext.of(T.Identifier.of("b"), 1),
      T.TokenWithContext.of(T.SEMICOLON, 1),
      T.TokenWithContext.of(T.RIGHT_BRACE, 2),
      T.TokenWithContext.of(T.EOF, 2),
    ]),
  },
  {
    description: "call a fn",
    input: "someFunction(Breakfast);",
    expected: E.right([
      T.TokenWithContext.of(T.Identifier.of("someFunction"), 0),
      T.TokenWithContext.of(T.LEFT_PAREN, 0),
      T.TokenWithContext.of(T.Identifier.of("Breakfast"), 0),
      T.TokenWithContext.of(T.RIGHT_PAREN, 0),
      T.TokenWithContext.of(T.SEMICOLON, 0),
      T.TokenWithContext.of(T.EOF, 0),
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
      T.TokenWithContext.of(T.CLASS, 0),
      T.TokenWithContext.of(T.Identifier.of("Brunch"), 0),
      T.TokenWithContext.of(T.LESS, 0),
      T.TokenWithContext.of(T.Identifier.of("Breakfast"), 0),
      T.TokenWithContext.of(T.LEFT_BRACE, 0),
      T.TokenWithContext.of(T.Identifier.of("init"), 1),
      T.TokenWithContext.of(T.LEFT_PAREN, 1),
      T.TokenWithContext.of(T.Identifier.of("meat"), 1),
      T.TokenWithContext.of(T.RIGHT_PAREN, 1),
      T.TokenWithContext.of(T.LEFT_BRACE, 1),
      T.TokenWithContext.of(T.SUPER, 2),
      T.TokenWithContext.of(T.DOT, 2),
      T.TokenWithContext.of(T.Identifier.of("init"), 2),
      T.TokenWithContext.of(T.LEFT_PAREN, 2),
      T.TokenWithContext.of(T.Identifier.of("meat"), 2),
      T.TokenWithContext.of(T.RIGHT_PAREN, 2),
      T.TokenWithContext.of(T.SEMICOLON, 2),
      T.TokenWithContext.of(T.THIS, 3),
      T.TokenWithContext.of(T.DOT, 3),
      T.TokenWithContext.of(T.Identifier.of("drink"), 3),
      T.TokenWithContext.of(T.EQUAL, 3),
      T.TokenWithContext.of(T.String_.of("hi"), 3),
      T.TokenWithContext.of(T.SEMICOLON, 3),
      T.TokenWithContext.of(T.RIGHT_BRACE, 4),
      T.TokenWithContext.of(T.RIGHT_BRACE, 5),
      T.TokenWithContext.of(T.EOF, 5),
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
