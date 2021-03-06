import { Stream } from "./../stream/Stream";
import * as T from "./../scanner/Token";

export type TokenStream<TokenT extends T.Token> = Stream<
  T.TokenWithContext<TokenT>
>;


