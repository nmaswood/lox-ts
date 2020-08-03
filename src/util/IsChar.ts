export class IsChar {
  static alphaNumeric(c: string): boolean {
    return /^[a-z0-9]+$/i.test(c);
  }

  static alpha(c: string): boolean {
    return /^[A-Z]$/i.test(c);
  }

  static numeric(c: string): boolean {
    return !Number.isNaN(Number(c));
  }
}
