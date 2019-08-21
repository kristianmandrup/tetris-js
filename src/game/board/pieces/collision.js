const createDirectionMap = require("./directions");

/* returns direction of collision, else returns empty string */
const checkCollision = game => (newX, newY) => {
  const { player } = game;
  const { board } = game;
  const { dimensions } = board;

  const directionMap = createDirectionMap(game);

  hasBlock = (x, y) => player.matrix[y][x] !== 0;
  const { length } = player.matrix;

  for (let y = 0; y < length; y++) {
    for (let x = 0; x < length; x++) {
      const coords = { x, y, newX, newY };
      const args = { ...coords, ...dimensions };

      if (hasBlock(x, y)) {
        return Object.keys(directionMap).find(key => directionMap[key](args));
      }
    }
  }
};

module.exports = checkCollision;
