import * as E from "fp-ts/lib/Either";
import * as T from "./Token";
import { Stream } from "./Stream";

import { ONE_CHAR, TWO_CHAR, WHITE_SPACE, KEYWORDS } from "./ScannerConstants";
import { IsChar } from "../util/IsChar";
import { LexicalContext } from "./Token";

interface ScanContext {
  stream: Stream<string>;
  line: number;
  tokensWithContext: T.TokenWithContext<T.Token>[];
  errors: ScanError[];
}
export interface ScanError {
  message: string;
  context: LexicalContext;
}

export function scan(
  input: string
): E.Either<ScanError[], T.TokenWithContext<T.Token>[]> {
  const context: ScanContext = {
    stream: new Stream(input),
    line: 0,
    tokensWithContext: [],
    errors: [],
  };

  while (context.stream.hasNext()) {
    const char = context.stream.advance();

    const oneCharToken = ONE_CHAR.get(char);
    if (oneCharToken !== undefined) {
      context.tokensWithContext.push(
        T.TokenWithContext.of(oneCharToken, T.LexicalContext.of(context.line))
      );
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
  context.tokensWithContext.push(
    T.TokenWithContext.of(T.EOF, T.LexicalContext.of(context.line))
  );
  return E.right(context.tokensWithContext);
}

class Handler {
  static forTwoCharacterTokens(
    { stream, tokensWithContext, line }: ScanContext,
    char: string
  ) {
    const nextChar = stream.peek();
    const withLine = fromLine(line);
    switch (char) {
      case "!":
        if (nextChar === "=") {
          tokensWithContext.push(withLine(T.BANG_EQUAL));
          stream.advance();
        } else {
          tokensWithContext.push(withLine(T.BANG));
        }
        break;
      case "=":
        if (nextChar === "=") {
          tokensWithContext.push(withLine(T.EQUAL_EQUAL));
          stream.advance();
        } else {
          tokensWithContext.push(withLine(T.EQUAL));
        }
        break;
      case "<":
        if (nextChar === "=") {
          tokensWithContext.push(withLine(T.LESS_EQUAL));
          stream.advance();
        } else {
          tokensWithContext.push(withLine(T.LESS));
        }
        break;
      case ">":
        if (nextChar === "=") {
          tokensWithContext.push(withLine(T.GREATER_EQUAL));

          stream.advance();
        } else {
          tokensWithContext.push(withLine(T.GREATER));
        }
        break;
      default:
        panic();
    }
  }

  static forComment({ stream, tokensWithContext, line }: ScanContext) {
    if (stream.peek() === "/") {
      while (stream.hasNext() && stream.peek() != "\n") {
        stream.advance();
      }
    } else {
      tokensWithContext.push(fromLine(line)(T.SLASH));
    }
  }

  static forString(context: ScanContext) {
    const { stream, errors, tokensWithContext } = context;
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
    tokensWithContext.push({
      line: context.line,
      token: T.String_.of(value),
    });
  }

  static forNumber({ stream, line, errors, tokensWithContext }: ScanContext) {
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

        while (stream.hasNext() && IsChar.numeric(stream.peek())) {
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
      tokensWithContext.push({
        line,
        token: T.Number_.of(asNumber),
      });
    }
  }

  static forReservedAndIdentifier({
    stream,
    line,
    tokensWithContext,
  }: ScanContext) {
    const startIndex = stream.index - 1;
    while (stream.hasNext() && IsChar.alphaNumeric(stream.peek())) {
      stream.advance();
    }
    const word = stream.input.slice(startIndex, stream.index);
    const token = KEYWORDS.get(word);
    if (token === undefined) {
      tokensWithContext.push(T.Token.of(line, T.Identifier.of(word)));
    } else {
      tokensWithContext.push(T.Token.of(line, token));
    }
  }
}

function fromLine(line: number) {
  return (token: T.NonLiteral): T.Token => ({
    line,
    token,
  });
}
