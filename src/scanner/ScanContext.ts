import { ScanError } from "./ScanError";
import { Token } from "./Token";
import { CharacterStream } from "./CharacterStream";

export interface ScanContext {
  stream: CharacterStream;
  line: number;
  tokens: Token[];
  errors: ScanError[];
}
