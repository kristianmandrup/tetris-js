/* adds current player piece to game board */
const updateBoard = game => () => {
  const { player, board } = game;
  const { plane } = board;
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) plane[y + player.pos.y][x + player.pos.x] = value;
    });
  });
};

module.exports = updateBoard;
