export class CharacterStream {
  private input: string;
  private offset: number;

  constructor(input: string, offset = 0) {
    this.input = input;
    this.offset = offset;
  }

  clone(): CharacterStream {
    return new CharacterStream(this.input, this.offset);
  }

  hasNext(): boolean {
    return this.offset < this.input.length;
  }

  next(): string | undefined {
    const value = this.input[this.offset];
    this.offset++;
    return value;
  }

  peek(): string | undefined {
    return this.input[this.offset + 1];
  }
}
