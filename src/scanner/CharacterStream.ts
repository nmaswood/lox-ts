export class CharacterStream {
  public input: string;
  public index = 0;

  constructor(input: string) {
    this.input = input;
  }

  hasNext(): boolean {
    return this.index < this.input.length;
  }

  peek(): string {
    const value = this.input[this.index];
    if (value === undefined) {
      throw new Error("char should not be undefined");
    }
    return value;
  }

  peekNext(): string | undefined {
    return this.input[this.index + 1];
  }

  advance(): string {
    const value = this.input[this.index];
    this.index++;
    if (value === undefined) {
      throw new Error("char should not be undefined");
    }
    return value;
  }
}
