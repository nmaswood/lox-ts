import * as E from "fp-ts/lib/Either";

import { ScanContext } from "./ScanContext";
import { Token } from "./Token";
import { CharacterStream } from "./CharacterStream";

export function scan(input: string): E.Either<ParseError[], Token[]> {
  const context: ScanContext = {
    stream: new CharacterStream(input),
    tokens: [],
    errors: [],
    line: 0,
  };

  return E.right([]);
}

function processNumber(context: ScanContext): ScanContext {
  const stream = context.stream.clone();
  const acc = [];
  let indexSeenPeriod = -1;
  let index = 0;

  while (stream.hasNext()) {
    const next = stream.next();
    //if (nex
  }

  return undefined!;
}

function processString(context: ScanContext): ScanContext {
  return undefined!;
}
