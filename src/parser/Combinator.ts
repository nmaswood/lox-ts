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

  export const oneOf = <InputT, ValueS, ErrorT>(
    onError: (s: Stream<InputT>) => ErrorT,
    fs: Combinator<InputT, ValueS, ErrorT>[]
  ) => (s: Stream<InputT>): E.Either<ErrorT, WithStream<InputT, ValueS>> => {
    for (const f of fs) {
      const result = f(s);
      if (E.isRight(result)) {
        return result;
      }
    }
    return E.left(onError(s));
  };

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
          E.map((resB) => WithStream.of(resB.stream, [resA.value, resB.value]))
        )
      )
    );

  export const and3 = <InputT, ValueS, ValueT, ValueU, ErrorT>(
    fA: Combinator<InputT, ValueS, ErrorT>,
    fB: Combinator<InputT, ValueT, ErrorT>,
    fC: Combinator<InputT, ValueU, ErrorT>
  ) => (
    s: Stream<InputT>
  ): E.Either<ErrorT, WithStream<InputT, [ValueS, ValueT, ValueU]>> =>
    pipe(
      fA(s),
      E.chain((resA) =>
        pipe(
          fB(resA.stream),
          E.chain((resB) =>
            pipe(
              fC(resB.stream),
              E.map((resC) =>
                WithStream.of(resC.stream, [resA.value, resB.value, resC.value])
              )
            )
          )
        )
      )
    );

  export const zeroOrMore = <InputT, ValueT, ErrorT, AccT>(
    initAcc: AccT,
    onMatch: (value: ValueT, acc: AccT) => AccT,
    f: Combinator<InputT, ValueT, ErrorT>
  ) => (initStream: Stream<InputT>): WithStream<InputT, AccT> => {
    const recurse = (s: Stream<InputT>, acc: AccT): WithStream<InputT, AccT> =>
      pipe(
        f(s),
        E.map(({ stream, value }) => recurse(stream, onMatch(value, acc))),
        E.getOrElseW(() => WithStream.of(s, acc))
      );

    return recurse(initStream, initAcc);
  };
}
