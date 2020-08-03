interface Indexable<T> {
  [index: number]: T;
  length: number;
}

export class Stream<T extends Indexable<T>> {
  public input: T;
  public index = 0;

  constructor(input: T) {
    this.input = input;
  }

  hasNext(): boolean {
    return this.index < this.input.length;
  }

  peek(): T {
    const value = this.input[this.index];
    if (value === undefined) {
      throw new Error("char should not be undefined");
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
      throw new Error("char should not be undefined");
    }
    return value;
  }
}
