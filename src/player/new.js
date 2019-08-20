/* returns new player object with random piece type */
const newPlayer = game => () => {
  const { board } = game;
  const { dimensions } = board;
  const { width } = dimensions;
  let pieceType = "IJLOZTS"[(Math.random() * 7) | 0];
  return { matrix: pieces[pieceType], pos: { x: width / 2 - 1, y: 0 } };
};

module.exports = newPlayer;
