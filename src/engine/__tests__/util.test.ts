import { isValidPosition } from "../util";

describe("Engine - Util", () => {
  it("should return a valid position", () => {
    const dimensions = { x: 1, y: 1 };
    const position = { x: 0, y: 0 };

    const result = isValidPosition(position, dimensions);

    expect(result).toBe(true);
  });
});
