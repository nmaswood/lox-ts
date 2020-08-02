export class IsChar {
  static alphaNumeric(c: string): boolean {
    return IsChar.alpha(c) || IsChar.numeric(c);
  }

  static alpha(c: string): boolean {
    return (c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || c == "_";
  }

  static numeric(c: string): boolean {
    return Number.isInteger(c);
  }
}
