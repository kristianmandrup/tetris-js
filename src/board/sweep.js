/* removes filled rows and updates score */
const sweepBoard = game => () => {
  const { board } = game;
  const { dimensions, plane } = board;
  const { width } = dimensions;

  let scoreMult = 4;
  const length = plane.length;

  for (let y = length - 1; y > 0; y--) {
    let sweepRow = true;
    for (let x = 0; x < width; x++) {
      if (board[y][x] === 0) {
        sweepRow = false;
      }
    }

    if (sweepRow) {
      plane.splice(y, 1); // delete row
      plane.unshift(Array(width).fill(0)); // add new empty row at top
      game.score += width * scoreMult;
      scoreMult *= 4;
      game.rowsCleared++;
    }
  }
};

module.exports = sweepBoard;
