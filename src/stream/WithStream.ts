import { Stream } from "./Stream";

export interface WithStream<InputT, ValueT> {
  stream: Stream<InputT>;
  value: ValueT;
}

export namespace WithStream {
  export const of = <InputT, ValueT>(
    stream: Stream<InputT>,
    value: ValueT
  ): WithStream<InputT, ValueT> => ({
    value,
    stream,
  });
}
