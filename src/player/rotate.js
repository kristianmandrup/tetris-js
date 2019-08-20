/* rotates player piece */
const rotatePlayer = game => () => {
  const { player } = game;
  // matrix transpose
  for (let y = 0; y < player.matrix.length; y++)
    for (let x = 0; x < y; x++)
      [player.matrix[y][x], player.matrix[x][y]] = [
        player.matrix[x][y],
        player.matrix[y][x]
      ];

  // matrix reverse
  player.matrix.forEach(row => row.reverse());
};

module.exports = rotatePlayer;
