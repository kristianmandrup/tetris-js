/* returns true if player piece touches another piece */

const touchedPiece = game => (x, y) => {
  const { board } = game;
  const { dimensions, plane } = board;
  const { width, height } = dimensions;
  return y < height && x < width && y >= 0 && x >= 0 && plane[y][x] !== 0;
};

module.exports = touchedPiece;
