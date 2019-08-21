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

  checkCollision(newX, newY);
});
