const createCheckCollision = require("./collision");

describe("collision", () => {
  const matrix = [];
  const player = {
    matrix
  };
  const game = {
    player
  };

  const checkCollision = createCheckCollision(game);
  const newX = 1;
  const newY = 1;

  checkCollision(newX, newY);
});
