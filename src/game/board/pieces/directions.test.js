const createDirectionMap = require("./collision");

describe("directions", () => {
  const board = {
    touchedPiece: () => 1
  };
  const game = {
    board
  };

  const directionMap = createDirectionMap(game);
  const args = { newX: 1, newY: 1 };

  describe("left", () => {
    directionMap.left(args);
  });
});
