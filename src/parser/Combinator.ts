import { WithStream } from "../stream/WithStream";
import { Stream } from "../stream/Stream";
import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";

export type Combinator<InputT, ValueT, ErrorT> = (
  s: Stream<InputT>
) => E.Either<ErrorT, WithStream<InputT, ValueT>>;

export namespace Combinator {
  export const or2 = <InputT, ValueS, ValueT, ErrorT>(
    fA: Combinator<InputT, ValueS, ErrorT>,
    fB: Combinator<InputT, ValueT, ErrorT>
  ) => (
    s: Stream<InputT>
  ): E.Either<ErrorT, WithStream<InputT, ValueS | ValueT>> =>
    pipe(
      fA(s),
      E.altW(() => fB(s))
    );

  export const or3 = <InputT, ValueS, ValueT, ValueU, ErrorT>(
    fA: Combinator<InputT, ValueS, ErrorT>,
    fB: Combinator<InputT, ValueT, ErrorT>,
    fC: Combinator<InputT, ValueU, ErrorT>
  ) => (
    s: Stream<InputT>
  ): E.Either<ErrorT, WithStream<InputT, ValueS | ValueT | ValueU>> =>
    pipe(
      fA(s),
      E.altW(() => fB(s)),
      E.altW(() => fC(s))
    );

  export const and2 = <InputT, ValueS, ValueT, ErrorT>(
    fA: Combinator<InputT, ValueS, ErrorT>,
    fB: Combinator<InputT, ValueT, ErrorT>
  ) => (
    s: Stream<InputT>
  ): E.Either<ErrorT, WithStream<InputT, [ValueS, ValueT]>> =>
    pipe(
      fA(s),

      E.chain((resA) =>
        pipe(
          fB(resA.stream),
          E.map(
            (resB): WithStream<InputT, [ValueS, ValueT]> =>
              WithStream.of(resB.stream, [resA.value, resB.value])
          )
        )
      )
    );
}
