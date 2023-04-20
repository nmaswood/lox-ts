import { WithStream } from "./../stream/WithStream";
import * as PE from "./ParseError";
import * as Types from "./types";
import * as Streams from "../stream/Streams";

import * as T from "./../scanner/Token";
import { pipe } from "fp-ts/function";
import * as E from "fp-ts/lib/Either";
import { Combinator, CombinatorResult } from "./Combinator";

export function is<TokenType extends T.Token["type"]>(
  type: TokenType
): Combinator<
  T.TokenWithContext<T.Token>,
  T.TokenWithContext<T.TokenByType[TokenType]>,
  PE.ParseError
> {
  return (s: Types.TokenStream) =>
    pipe(
      s,
      Streams.Either.safeAdvance(() => PE.UNEXPECTED_END),
      E.chain(
        (
          next
        ): CombinatorResult<
          T.TokenWithContext<T.Token>,
          T.TokenWithContext<T.TokenByType[TokenType]>,
          PE.ParseError
        > => {
          return next.value.token.type !== type
            ? E.left(PE.wrongToken(next.value, type))
            : E.right(
                WithStream.of(
                  next.stream,
                  next.value as T.TokenWithContext<T.TokenByType[TokenType]>
                )
              );
        }
      )
    );
}
