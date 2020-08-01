import * as E from "fp-ts/lib/Either";

import { ParseError } from "./ParseError";
import { Token } from "./Token";

export function scan(_: readonly string): E.Either<ParseError[], Token[]> {
  return E.right([]);
}
