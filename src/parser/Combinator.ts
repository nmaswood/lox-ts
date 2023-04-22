import { WithStream } from "../stream/WithStream";
import { Stream } from "../stream/Stream";
import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/function";
import { init } from "fp-ts/lib/ReadonlyNonEmptyArray";

export type CombinatorResult<InputT, ValueT, ErrorT> = E.Either<
  ErrorT,
  WithStream<InputT, ValueT>
>;

export type Combinator<InputT, ValueT, ErrorT> = (
  s: Stream<InputT>
) => CombinatorResult<InputT, ValueT, ErrorT>;

export class Combinators {
  static or2 =
    <InputT, ValueS, ValueT, ErrorT>(
      fA: Combinator<InputT, ValueS, ErrorT>,
      fB: Combinator<InputT, ValueT, ErrorT>
    ) =>
    (
      s: Stream<InputT>
    ): E.Either<ErrorT, WithStream<InputT, ValueS | ValueT>> =>
      pipe(
        fA(s),
        E.altW(() => fB(s))
      );

  static or3 =
    <InputT, ValueS, ValueT, ValueU, ErrorT>(
      fA: Combinator<InputT, ValueS, ErrorT>,
      fB: Combinator<InputT, ValueT, ErrorT>,
      fC: Combinator<InputT, ValueU, ErrorT>
    ) =>
    (
      s: Stream<InputT>
    ): E.Either<ErrorT, WithStream<InputT, ValueS | ValueT | ValueU>> =>
      pipe(
        fA(s),
        E.altW(() => fB(s)),
        E.altW(() => fC(s))
      );

  static or4 =
    <InputT, ValueS, ValueT, ValueU, ValueV, ErrorT>(
      fA: Combinator<InputT, ValueS, ErrorT>,
      fB: Combinator<InputT, ValueT, ErrorT>,
      fC: Combinator<InputT, ValueU, ErrorT>,
      fD: Combinator<InputT, ValueV, ErrorT>
    ) =>
    (
      s: Stream<InputT>
    ): E.Either<ErrorT, WithStream<InputT, ValueS | ValueT | ValueU>> =>
      pipe(
        fA(s),
        E.altW(() => fB(s)),
        E.altW(() => fC(s)),
        E.altW(() => fD(s))
      );

  static oneOf =
    <InputT, ValueS, ErrorT>(
      onError: (s: Stream<InputT>) => ErrorT,
      fs: Combinator<InputT, ValueS, ErrorT>[]
    ) =>
    (s: Stream<InputT>): E.Either<ErrorT, WithStream<InputT, ValueS>> => {
      for (const f of fs) {
        const result = f(s);
        if (E.isRight(result)) {
          return result;
        }
      }
      return E.left(onError(s));
    };

  static and2 =
    <InputT, ValueS, ValueT, ErrorT>(
      fA: Combinator<InputT, ValueS, ErrorT>,
      fB: Combinator<InputT, ValueT, ErrorT>
    ) =>
    (
      s: Stream<InputT>
    ): E.Either<ErrorT, WithStream<InputT, [ValueS, ValueT]>> =>
      pipe(
        fA(s),

        E.chain((resA) =>
          pipe(
            fB(resA.stream),
            E.map((resB) =>
              WithStream.of(resB.stream, [resA.value, resB.value])
            )
          )
        )
      );

  static and3 =
    <InputT, ValueS, ValueT, ValueU, ErrorT>(
      fA: Combinator<InputT, ValueS, ErrorT>,
      fB: Combinator<InputT, ValueT, ErrorT>,
      fC: Combinator<InputT, ValueU, ErrorT>
    ) =>
    (
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
                  WithStream.of(resC.stream, [
                    resA.value,
                    resB.value,
                    resC.value,
                  ])
                )
              )
            )
          )
        )
      );

  static zeroOrMore =
    <InputT, ValueT, ErrorT, AccT>(
      initAcc: AccT,
      onMatch: (value: ValueT, acc: AccT) => AccT,
      f: Combinator<InputT, ValueT, ErrorT>
    ) =>
    (
      initStream: Stream<InputT>
    ): E.Either<ErrorT, WithStream<InputT, AccT>> => {
      const recurse = (
        s: Stream<InputT>,
        acc: AccT
      ): E.Either<ErrorT, WithStream<InputT, AccT>> =>
        pipe(
          f(s),
          E.map(({ stream, value }) => recurse(stream, onMatch(value, acc))),
          E.getOrElseW(() => E.right(WithStream.of(s, acc)))
        );

      return recurse(initStream, initAcc);
    };

  static optional =
    <InputT, ValueT, ErrorT>(
      defaultT: ValueT,
      f: Combinator<InputT, ValueT, ErrorT>
    ): Combinator<InputT, ValueT, ErrorT> =>
    (initStream: Stream<InputT>) =>
      E.right(
        pipe(
          f(initStream),
          E.getOrElseW(() => WithStream.of(initStream, defaultT))
        )
      );
}
