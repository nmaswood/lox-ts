import * as E from "fp-ts/lib/Either";

import { Token, NonLiteral } from "./Token";
import { CharacterStream } from "./CharacterStream";
import { ScanError } from "./ScanError";
import { ONE_CHAR, TWO_CHAR, WHITE_SPACE, KEYWORDS } from "./ScannerConstants";
import { IsChar } from "../util/IsChar";
import { panic } from "../util/panic";

interface ScanContext {
  stream: CharacterStream;
  line: number;
  tokens: Token[];
  errors: ScanError[];
}

export function scan(input: string): E.Either<ScanError[], Token[]> {
  const context: ScanContext = {
    stream: new CharacterStream(input),
    line: 0,
    tokens: [],
    errors: [],
  };

  while (context.stream.hasNext()) {
    const char = context.stream.advance();

    const oneCharToken = ONE_CHAR.get(char);
    if (oneCharToken !== undefined) {
      context.tokens.push({
        line: context.line,
        token: oneCharToken,
      });
    } else if (TWO_CHAR.has(char)) {
      Handler.forTwoCharacterTokens(context, char);
    } else if (char === "/") {
      Handler.forComment(context);
    } else if (WHITE_SPACE.has(char)) {
      // pass
    } else if (char === "\n") {
      context.line++;
    } else if (char === '"') {
      Handler.forString(context);
    } else if (IsChar.numeric(char)) {
      Handler.forNumber(context);
    } else if (IsChar.alpha(char)) {
      Handler.forReservedAndIdentifier(context);
    } else {
      context.errors.push({
        line: context.line,
        message: `Unexpected char ${char}`,
      });
    }
  }

  return context.errors.length === 0
    ? E.right(context.tokens)
    : E.left(context.errors);
}

class Handler {
  static forTwoCharacterTokens(
    { stream, tokens, line }: ScanContext,
    char: string
  ) {
    const nextChar = stream.peekNext();
    const fromType = fromLine(line);
    switch (char) {
      case "!":
        if (nextChar === "=") {
          tokens.push(fromType("bang_equal"));
          stream.advance();
        } else {
          tokens.push(fromType("bang_equal"));
        }
        break;
      case "=":
        if (nextChar === "==") {
          tokens.push(fromType("equal_equal"));
          stream.advance();
        } else {
          tokens.push(fromType("equal"));
        }
        break;
      case "<":
        if (nextChar === "=") {
          tokens.push(fromType("less_equal"));
          stream.advance();
        } else {
          tokens.push(fromType("less"));
        }
        break;
      case ">":
        if (nextChar === "=") {
          tokens.push({
            line,
            token: { type: "less_equal" },
          });

          stream.advance();
        } else {
          tokens.push({
            line,
            token: { type: "less" },
          });
        }
        break;
      default:
        panic();
    }
  }

  static forComment({ stream, tokens, line }: ScanContext) {
    if (stream.peek() === "/") {
      while (stream.hasNext() && stream.peek() != "\n") {
        stream.advance();
      }
    } else {
      tokens.push(fromLine(line)("slash"));
    }
  }

  static forString(context: ScanContext) {
    const { stream, errors, tokens } = context;
    const startIndex = stream.index;
    let seenEndQuote = false;
    while (stream.hasNext() && !seenEndQuote) {
      if (stream.peek() === "\n") {
        context.line++;
      }

      if (stream.peek() === '"') {
        seenEndQuote = true;
      }
      stream.advance();
    }

    if (!seenEndQuote) {
      errors.push({
        line: context.line,
        message: "Unterminated string",
      });
      return;
    }

    const value = stream.input.slice(startIndex, stream.index - 1);
    tokens.push({
      line: context.line,
      token: {
        type: "string",
        value,
      },
    });
  }

  static forNumber({ stream, line, errors, tokens }: ScanContext) {
    const startIndex = stream.index - 1;
    while (stream.hasNext() && IsChar.numeric(stream.peek())) {
      stream.advance();
    }

    if (stream.hasNext()) {
      const peekedNext = stream.peekNext();
      if (
        stream.peek() === "." &&
        peekedNext !== undefined &&
        IsChar.numeric(peekedNext)
      ) {
        stream.advance();

        while (IsChar.numeric(stream.peek())) {
          stream.advance();
        }
      }
    }
    const number = stream.input.slice(startIndex, stream.index);
    const asNumber = Number(number);

    if (Number.isNaN(asNumber)) {
      errors.push({
        line,
        message: `Could not parse number from ${number}`,
      });
    } else {
      tokens.push({
        line,
        token: {
          type: "number",
          value: asNumber,
        },
      });
    }
  }

  static forReservedAndIdentifier({ stream, line, tokens }: ScanContext) {
    const startIndex = stream.index - 1;
    while (IsChar.alphaNumeric(stream.peek())) {
      stream.advance();
    }
    const word = stream.input.slice(startIndex, stream.index);
    const token = KEYWORDS.get(word);
    if (token === undefined) {
      tokens.push({
        line,
        token: {
          type: "identifier",
          value: word,
        },
      });
    } else {
      tokens.push({
        line,
        token,
      });
    }
  }
}

function fromLine(line: number) {
  return function fromType(
    type: NonLiteral["type"]
  ): {
    line: number;
    token: NonLiteral;
  } {
    return {
      line,
      token: { type } as NonLiteral,
    };
  };
}
