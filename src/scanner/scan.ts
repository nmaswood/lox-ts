import * as E from "fp-ts/lib/Either";

import { Token, NonLiteral } from "./Token";
import { CharacterStream } from "./CharacterStream";
import { ScanError } from "./ScanError";
import { ONE_CHAR, TWO_CHAR, WHITE_SPACE, KEYWORDS } from "./ScannerConstants";
import { IsChar } from "../util/IsChar";

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
    if (ONE_CHAR.has(char)) {
      const token = ONE_CHAR.get(char);
      if (token === undefined) {
        throw new Error("Token should not be undefined");
      }
      context.tokens.push({
        line: context.line,
        token,
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
    const withLineNumber = NonLiteralBuilder.withLineNumber(line);
    switch (char) {
      case "!":
        if (nextChar === "=") {
          tokens.push(withLineNumber("BANG_EQUAL"));
          stream.advance();
        } else {
          tokens.push(withLineNumber("BANG_EQUAL"));
        }
        break;
      case "=":
        if (nextChar === "==") {
          tokens.push(withLineNumber("EQUAL_EQUAL"));
          stream.advance();
        } else {
          tokens.push(withLineNumber("EQUAL"));
        }
        break;
      case "<":
        if (nextChar === "=") {
          tokens.push(withLineNumber("LESS_EQUAL"));
          stream.advance();
        } else {
          tokens.push(withLineNumber("LESS"));
        }
        break;
      case ">":
        if (nextChar === "=") {
          tokens.push({
            line,
            token: { type: "non_literal", kind: "LESS_EQUAL" },
          });

          stream.advance();
        } else {
          tokens.push({
            line,
            token: { type: "non_literal", kind: "LESS" },
          });
        }
        break;
      default:
        throw new Error("This should not happen");
    }
  }

  static forComment({ stream, tokens, line }: ScanContext) {
    if (stream.peekNext() === "/") {
      while (stream.peek() != "\n" && stream.hasNext) {
        stream.advance();
      }
    } else {
      tokens.push(NonLiteralBuilder.withLineNumber(line)("SLASH"));
    }
  }

  static forString(context: ScanContext) {
    const { stream, errors, tokens } = context;
    const startIndex = stream.index;
    while (stream.peek() != '"' && stream.hasNext()) {
      if (stream.peek() === "\n") {
        context.line++;
      }
      stream.advance();
    }

    if (!stream.hasNext()) {
      errors.push({
        line: context.line,
        message: "Unterminated string",
      });
      return;
    }

    const value = stream.input.slice(startIndex, stream.index);
    tokens.push({
      line: context.line,
      token: {
        type: "literal",
        value: {
          kind: "STRING",
          value,
        },
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

        while (Number.isInteger(stream.peek())) {
          stream.advance();
        }
      }
    }
    const number = stream.input.slice(startIndex, stream.index);
    const asNumber = Number(number);

    if (Number.isNaN(number)) {
      errors.push({
        line,
        message: `Could not parse number from ${number}`,
      });
    } else {
      tokens.push({
        line,
        token: {
          type: "literal",
          value: {
            kind: "NUMBER",
            value: asNumber,
          },
        },
      });
    }
  }

  static forReservedAndIdentifier({
    stream,
    line,
    errors,
    tokens,
  }: ScanContext) {
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
          type: "literal",
          value: {
            kind: "IDENTIFIER",
            value: word,
          },
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

class NonLiteralBuilder {
  static withLineNumber(line: number) {
    return (kind: NonLiteral["kind"]): Token => ({
      line,
      token: {
        type: "non_literal",
        kind,
      },
    });
  }
}
