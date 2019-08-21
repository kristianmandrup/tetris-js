const { createMovePlayer, createMoves } = require("./move");

const matrix = [];
const player = {
  matrix
};
const game = {
  player
};

describe("createMovePlayer", () => {
  const move = createMovePlayer(game);

  describe("move", () => {
    move();
    const newX = 1;
    const newY = 1;

    checkCollision(newX, newY);

    it("moves", () => {});
  });
});

describe("createMoves", () => {
  const moves = createMoves(game);
});
