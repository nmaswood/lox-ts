import { Stream } from "./../stream/Stream";
import * as T from "./../scanner/Token";

export type TokenStream = Stream<T.TokenWithContext<T.Token>>;
