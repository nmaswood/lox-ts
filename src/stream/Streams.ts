import * as E from "fp-ts/lib/Either";

import { Stream } from "./Stream";
import { WithStream } from "./WithStream";

export namespace Either {
  export const safeAdvance =
    <InputT, ErrorT>(onError: () => ErrorT) =>
    (s: Stream<InputT>): E.Either<ErrorT, WithStream<InputT, InputT>> => {
      if (!s.hasNext()) {
        return E.left(onError());
      }

      const stream = s.clone();
      return E.right(WithStream.of(stream, stream.advance()));
    };

  export const safePeek =
    <InputT, ErrorT>(onError: () => ErrorT) =>
    (s: Stream<InputT>): E.Either<ErrorT, WithStream<InputT, InputT>> => {
      if (!s.hasNext()) {
        return E.left(onError());
      }

      const stream = s.clone();
      return E.right(WithStream.of(stream, stream.peek()));
    };
}

