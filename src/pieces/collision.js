/* returns direction of collision, else returns empty string */
const checkCollision = game => (newX, newY) => {
  const { player } = game;
  const { board } = game;
  const { dimensions, touchedPiece } = board;
  const { width, height } = dimensions;

  for (let y = 0; y < player.matrix.length; y++) {
    for (let x = 0; x < player.matrix.length; x++) {
      if (player.matrix[y][x] !== 0) {
        if (newY <= 1 && touchedPiece(x + newX, y + newY)) return "top";
        else if (x + newX < 0) return "left";
        else if (x + newX > width - 1) return "right";
        else if (y + newY > height - 1 || touchedPiece(x + newX, y + newY))
          return "bottom";
      }
    }
  }
};

module.exports = checkCollision;
