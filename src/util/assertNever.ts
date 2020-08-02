export function assertNever(value: never): never {
  throw new Error(
    `Should be unreachable, unexpected value: ${JSON.stringify(value)}`
  );
}
