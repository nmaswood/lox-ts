import * as E from "fp-ts/lib/Either";
import * as T from "./Token";
import { CharacterStream } from "./CharacterStream";
import { ScanError } from "./ScanError";
import { ONE_CHAR, TWO_CHAR, WHITE_SPACE, KEYWORDS } from "./ScannerConstants";
import { IsChar } from "../util/IsChar";
import { panic } from "../util/panic";

interface ScanContext {
  stream: CharacterStream;
  line: number;
  tokens: T.Token[];
  errors: ScanError[];
}

export function scan(input: string): E.Either<ScanError[], T.Token[]> {
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

  if (context.errors.length !== 0) {
    return E.left(context.errors);
  }
  context.tokens.push({ line: context.line, token: T.EOF });
  return E.right(context.tokens);
}

class Handler {
  static forTwoCharacterTokens(
    { stream, tokens, line }: ScanContext,
    char: string
  ) {
    const nextChar = stream.peekNext();
    const withLine = fromLine(line);
    switch (char) {
      case "!":
        if (nextChar === "=") {
          tokens.push(withLine(T.BANG_EQUAL));
          stream.advance();
        } else {
          tokens.push(withLine(T.BANG));
        }
        break;
      case "=":
        if (nextChar === "==") {
          tokens.push(withLine(T.EQUAL_EQUAL));
          stream.advance();
        } else {
          tokens.push(withLine(T.EQUAL));
        }
        break;
      case "<":
        if (nextChar === "=") {
          tokens.push(withLine(T.LESS_EQUAL));
          stream.advance();
        } else {
          tokens.push(withLine(T.LESS));
        }
        break;
      case ">":
        if (nextChar === "=") {
          tokens.push(withLine(T.GREATER_EQUAL));

          stream.advance();
        } else {
          tokens.push(withLine(T.GREATER_EQUAL));
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
      tokens.push(fromLine(line)(T.SLASH));
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
      token: T.String_.of(value),
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
        token: T.Number_.of(asNumber),
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
        token: T.Identifier.of(word),
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
  return (token: T.NonLiteral): T.Token => ({
    line,
    token,
  });
}
