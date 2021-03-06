import * as PE from "./ParseError";
import * as Types from "./types";
import * as Streams from "../stream/Streams";

import * as T from "./../scanner/Token";
import { pipe } from "fp-ts/lib/pipeable";
import * as E from "fp-ts/lib/Either";

export const is = <TokenType extends T.Token["type"]>(type: TokenType) => (
  s: Types.TokenStream
): E.Either<PE.ParseError, T.TokenWithContext<T.TokenByType[TokenType]>> =>
  pipe(
    s,
    Streams.Either.safeAdvance(() => PE.UNEXPECTED_END),
    E.chain((next) => {
      if (next.value.token.type !== type) {
        return E.left<
          PE.ParseError,
          T.TokenWithContext<T.TokenByType[TokenType]>
        >(PE.wrongToken(next.value, type));
      }
      return E.right(
        next.value as T.TokenWithContext<T.TokenByType[TokenType]>
      );
    })
  );
