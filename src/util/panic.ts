const MESSAGE = "Oh no! An assumption you made was wrong.";
export function panic() {
  throw new Error(MESSAGE);
}
