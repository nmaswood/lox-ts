import * as E from "fp-ts/lib/Either";

import { ParseError } from "./ParseError";
import { Token, NonLiteral } from "./Token";
import { CharacterStream } from "./CharacterStream";

export function scan(input: string): E.Either<ParseError[], Token[]> {
  const stream = new CharacterStream(input);
  const tokens: Token[] = [];
  const errors: ParseError[] = [];
  const line = 0;

  return E.right([]);
}
