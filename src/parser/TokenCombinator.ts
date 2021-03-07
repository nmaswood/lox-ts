import { WithStream } from "./../stream/WithStream";
import * as PE from "./ParseError";
import * as Types from "./types";
import * as Streams from "../stream/Streams";

import * as T from "./../scanner/Token";
import { pipe } from "fp-ts/lib/pipeable";
import * as E from "fp-ts/lib/Either";

export const is = <TokenType extends T.Token["type"]>(type: TokenType) => (
  s: Types.TokenStream
): E.Either<
  PE.ParseError,
  WithStream<
    T.TokenWithContext<T.Token>,
    T.TokenWithContext<T.TokenByType[TokenType]>
  >
> =>
  pipe(
    s,
    Streams.Either.safeAdvance(() => PE.UNEXPECTED_END),
    E.chain(
      (
        next
      ): E.Either<
        PE.ParseError,
        WithStream<
          T.TokenWithContext<T.Token>,
          T.TokenWithContext<T.TokenByType[TokenType]>
        >
      > =>
        next.value.token.type !== type
          ? E.left(PE.wrongToken(next.value, type))
          : E.right(
              WithStream.of(
                next.stream,
                next.value as T.TokenWithContext<T.TokenByType[TokenType]>
              )
            )
    )
  );
