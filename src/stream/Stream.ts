export class Stream<T> {
  public input: T[];
  public index = 0;

  constructor(input: T[]) {
    this.input = input;
  }

  clone(): Stream<T> {
    const s = new Stream(this.input);
    s.index = this.index;
    return s;
  }

  hasNext(): boolean {
    return this.index < this.input.length;
  }

  peek(): T {
    const value = this.input[this.index];
    if (value === undefined) {
      throw new Error("value should not be undefined");
    }
    return value;
  }

  safePeek(): T | undefined {
    return this.input[this.index];
  }

  peekPrevious(): T {
    const value = this.input[this.index - 1];
    if (value === undefined) {
      throw new Error("value should not be undefined");
    }
    return value;
  }

  peekNext(): T | undefined {
    return this.input[this.index + 1];
  }

  advance(): T {
    const value = this.input[this.index];
    this.index++;
    if (value === undefined) {
      throw new Error("value should not be undefined");
    }
    return value;
  }
}
