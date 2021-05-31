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
    expected: E.right([T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0))]),
  },
  {
    description: "variable assigned to number",
    input: "var x = 10",
    expected: E.right([
      T.TokenWithContext.of(T.VAR, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Identifier.of("x"), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EQUAL, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Number_.of(10), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ]),
  },
  {
    description: "varible assigned to string",
    input: 'var x = "hello world"',
    expected: E.right([
      T.TokenWithContext.of(T.VAR, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Identifier.of("x"), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EQUAL, T.LexicalContext.of(0)),
      T.TokenWithContext.of(
        T.String_.of("hello world"),
        T.LexicalContext.of(0)
      ),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ]),
  },
  {
    description: "simple variable expression",
    input: "x = x - 1",
    expected: E.right([
      T.TokenWithContext.of(T.Identifier.of("x"), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EQUAL, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Identifier.of("x"), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.MINUS, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Number_.of(1), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ]),
  },
  {
    description: "empty function",
    input: "fun identifier(){}",
    expected: E.right([
      T.TokenWithContext.of(T.FUN, T.LexicalContext.of(0)),
      T.TokenWithContext.of(
        T.Identifier.of("identifier"),
        T.LexicalContext.of(0)
      ),
      T.TokenWithContext.of(T.LEFT_PAREN, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.RIGHT_PAREN, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.LEFT_BRACE, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.RIGHT_BRACE, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ]),
  },
  {
    description: "empty function across new lines",
    input: ` fun identifier()
        {
          }`,
    expected: E.right([
      T.TokenWithContext.of(T.FUN, T.LexicalContext.of(0)),
      T.TokenWithContext.of(
        T.Identifier.of("identifier"),
        T.LexicalContext.of(0)
      ),
      T.TokenWithContext.of(T.LEFT_PAREN, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.RIGHT_PAREN, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.LEFT_BRACE, T.LexicalContext.of(1)),
      T.TokenWithContext.of(T.RIGHT_BRACE, T.LexicalContext.of(2)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(2)),
    ]),
  },
  {
    description: "allows comments to display",
    input: ` var x = 10
    // foo bar`,
    expected: E.right([
      T.TokenWithContext.of(T.VAR, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Identifier.of("x"), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EQUAL, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Number_.of(10), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(1)),
    ]),
  },
  {
    description: "simple integer",
    input: "1234",
    expected: E.right([
      T.TokenWithContext.of(T.Number_.of(1234), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ]),
  },
  {
    description: "simple float",
    input: "12.34",
    expected: E.right([
      T.TokenWithContext.of(T.Number_.of(12.34), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ]),
  },
  {
    description: "addition",
    input: "add + me",
    expected: E.right([
      T.TokenWithContext.of(T.Identifier.of("add"), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.PLUS, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Identifier.of("me"), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ]),
  },
  {
    description: "subtraction",
    input: "subtract - me",
    expected: E.right([
      T.TokenWithContext.of(
        T.Identifier.of("subtract"),
        T.LexicalContext.of(0)
      ),
      T.TokenWithContext.of(T.MINUS, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Identifier.of("me"), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ]),
  },
  {
    description: "mul",
    input: "multiply * me",
    expected: E.right([
      T.TokenWithContext.of(
        T.Identifier.of("multiply"),
        T.LexicalContext.of(0)
      ),
      T.TokenWithContext.of(T.STAR, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Identifier.of("me"), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ]),
  },
  {
    description: "negate",
    input: "-me",
    expected: E.right([
      T.TokenWithContext.of(T.MINUS, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Identifier.of("me"), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ]),
  },
  {
    description: "less",
    input: "less < than",
    expected: E.right([
      T.TokenWithContext.of(T.Identifier.of("less"), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.LESS, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Identifier.of("than"), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ]),
  },
  {
    description: "lessequal",
    input: "less <= than",
    expected: E.right([
      T.TokenWithContext.of(T.Identifier.of("less"), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.LESS_EQUAL, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Identifier.of("than"), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ]),
  },
  {
    description: "greaterequal",
    input: "greater >= than",
    expected: E.right([
      T.TokenWithContext.of(T.Identifier.of("greater"), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.GREATER_EQUAL, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Identifier.of("than"), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ]),
  },
  {
    description: "greater",
    input: "greater > than",
    expected: E.right([
      T.TokenWithContext.of(T.Identifier.of("greater"), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.GREATER, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Identifier.of("than"), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ]),
  },
  {
    description: "equal to ",
    input: "123 == 456",
    expected: E.right([
      T.TokenWithContext.of(T.Number_.of(123), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EQUAL_EQUAL, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Number_.of(456), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ]),
  },
  {
    description: "basic grouping",
    input: "123 == (1 + 1)",
    expected: E.right([
      T.TokenWithContext.of(T.Number_.of(123), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EQUAL_EQUAL, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.LEFT_PAREN, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Number_.of(1), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.PLUS, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Number_.of(1), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.RIGHT_PAREN, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ]),
  },
  {
    description: "print",
    input: 'print "hi"',
    expected: E.right([
      T.TokenWithContext.of(T.PRINT, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.String_.of("hi"), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
    ]),
  },
  {
    description: "empty var",
    input: "var foo;",
    expected: E.right([
      T.TokenWithContext.of(T.VAR, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Identifier.of("foo"), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.SEMICOLON, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
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
      T.TokenWithContext.of(T.IF, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.LEFT_PAREN, T.LexicalContext.of(0)),
      T.TokenWithContext.of(
        T.Identifier.of("condition"),
        T.LexicalContext.of(0)
      ),
      T.TokenWithContext.of(T.RIGHT_PAREN, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.LEFT_BRACE, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.PRINT, T.LexicalContext.of(1)),
      T.TokenWithContext.of(T.String_.of("yes"), T.LexicalContext.of(1)),
      T.TokenWithContext.of(T.SEMICOLON, T.LexicalContext.of(1)),
      T.TokenWithContext.of(T.RIGHT_BRACE, T.LexicalContext.of(2)),
      T.TokenWithContext.of(T.ELSE, T.LexicalContext.of(2)),
      T.TokenWithContext.of(T.LEFT_BRACE, T.LexicalContext.of(2)),
      T.TokenWithContext.of(T.PRINT, T.LexicalContext.of(3)),
      T.TokenWithContext.of(T.String_.of("no"), T.LexicalContext.of(3)),
      T.TokenWithContext.of(T.SEMICOLON, T.LexicalContext.of(3)),
      T.TokenWithContext.of(T.RIGHT_BRACE, T.LexicalContext.of(4)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(4)),
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
      T.TokenWithContext.of(T.VAR, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Identifier.of("a"), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EQUAL, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Number_.of(1), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.SEMICOLON, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.WHILE, T.LexicalContext.of(1)),
      T.TokenWithContext.of(T.LEFT_PAREN, T.LexicalContext.of(1)),
      T.TokenWithContext.of(T.Identifier.of("a"), T.LexicalContext.of(1)),
      T.TokenWithContext.of(T.LESS, T.LexicalContext.of(1)),
      T.TokenWithContext.of(T.Number_.of(10), T.LexicalContext.of(1)),
      T.TokenWithContext.of(T.RIGHT_PAREN, T.LexicalContext.of(1)),
      T.TokenWithContext.of(T.LEFT_BRACE, T.LexicalContext.of(1)),
      T.TokenWithContext.of(T.PRINT, T.LexicalContext.of(2)),
      T.TokenWithContext.of(T.Identifier.of("a"), T.LexicalContext.of(2)),
      T.TokenWithContext.of(T.SEMICOLON, T.LexicalContext.of(2)),
      T.TokenWithContext.of(T.Identifier.of("a"), T.LexicalContext.of(3)),
      T.TokenWithContext.of(T.EQUAL, T.LexicalContext.of(3)),
      T.TokenWithContext.of(T.Identifier.of("a"), T.LexicalContext.of(3)),
      T.TokenWithContext.of(T.PLUS, T.LexicalContext.of(3)),
      T.TokenWithContext.of(T.Number_.of(1), T.LexicalContext.of(3)),
      T.TokenWithContext.of(T.SEMICOLON, T.LexicalContext.of(3)),
      T.TokenWithContext.of(T.RIGHT_BRACE, T.LexicalContext.of(4)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(4)),
    ]),
  },
  {
    description: "print fn",
    input: ` fun printSum(a, b) {
        print a + b;
      } `,
    expected: E.right([
      T.TokenWithContext.of(T.FUN, T.LexicalContext.of(0)),
      T.TokenWithContext.of(
        T.Identifier.of("printSum"),
        T.LexicalContext.of(0)
      ),
      T.TokenWithContext.of(T.LEFT_PAREN, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Identifier.of("a"), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.COMMA, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Identifier.of("b"), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.RIGHT_PAREN, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.LEFT_BRACE, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.PRINT, T.LexicalContext.of(1)),
      T.TokenWithContext.of(T.Identifier.of("a"), T.LexicalContext.of(1)),
      T.TokenWithContext.of(T.PLUS, T.LexicalContext.of(1)),
      T.TokenWithContext.of(T.Identifier.of("b"), T.LexicalContext.of(1)),
      T.TokenWithContext.of(T.SEMICOLON, T.LexicalContext.of(1)),
      T.TokenWithContext.of(T.RIGHT_BRACE, T.LexicalContext.of(2)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(2)),
    ]),
  },
  {
    description: "call a fn",
    input: "someFunction(Breakfast);",
    expected: E.right([
      T.TokenWithContext.of(
        T.Identifier.of("someFunction"),
        T.LexicalContext.of(0)
      ),
      T.TokenWithContext.of(T.LEFT_PAREN, T.LexicalContext.of(0)),
      T.TokenWithContext.of(
        T.Identifier.of("Breakfast"),
        T.LexicalContext.of(0)
      ),
      T.TokenWithContext.of(T.RIGHT_PAREN, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.SEMICOLON, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(0)),
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
      T.TokenWithContext.of(T.CLASS, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Identifier.of("Brunch"), T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.LESS, T.LexicalContext.of(0)),
      T.TokenWithContext.of(
        T.Identifier.of("Breakfast"),
        T.LexicalContext.of(0)
      ),
      T.TokenWithContext.of(T.LEFT_BRACE, T.LexicalContext.of(0)),
      T.TokenWithContext.of(T.Identifier.of("init"), T.LexicalContext.of(1)),
      T.TokenWithContext.of(T.LEFT_PAREN, T.LexicalContext.of(1)),
      T.TokenWithContext.of(T.Identifier.of("meat"), T.LexicalContext.of(1)),
      T.TokenWithContext.of(T.RIGHT_PAREN, T.LexicalContext.of(1)),
      T.TokenWithContext.of(T.LEFT_BRACE, T.LexicalContext.of(1)),
      T.TokenWithContext.of(T.SUPER, T.LexicalContext.of(2)),
      T.TokenWithContext.of(T.DOT, T.LexicalContext.of(2)),
      T.TokenWithContext.of(T.Identifier.of("init"), T.LexicalContext.of(2)),
      T.TokenWithContext.of(T.LEFT_PAREN, T.LexicalContext.of(2)),
      T.TokenWithContext.of(T.Identifier.of("meat"), T.LexicalContext.of(2)),
      T.TokenWithContext.of(T.RIGHT_PAREN, T.LexicalContext.of(2)),
      T.TokenWithContext.of(T.SEMICOLON, T.LexicalContext.of(2)),
      T.TokenWithContext.of(T.THIS, T.LexicalContext.of(3)),
      T.TokenWithContext.of(T.DOT, T.LexicalContext.of(3)),
      T.TokenWithContext.of(T.Identifier.of("drink"), T.LexicalContext.of(3)),
      T.TokenWithContext.of(T.EQUAL, T.LexicalContext.of(3)),
      T.TokenWithContext.of(T.String_.of("hi"), T.LexicalContext.of(3)),
      T.TokenWithContext.of(T.SEMICOLON, T.LexicalContext.of(3)),
      T.TokenWithContext.of(T.RIGHT_BRACE, T.LexicalContext.of(4)),
      T.TokenWithContext.of(T.RIGHT_BRACE, T.LexicalContext.of(5)),
      T.TokenWithContext.of(T.EOF, T.LexicalContext.of(5)),
    ]),
  },
];
describe.only("scan", () => {
  CASES.forEach(({ input, expected, description }) => {
    it(`correctly handles ${description}`, () => {
      expect(scan(input)).toEqual(expected);
    });
  });
});
