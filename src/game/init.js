/* initialize game */
const init = ({ factories, game }) => () => {
  const { board, update } = game;
  const { dimensions } = board;
  const { width, height } = dimensions;
  const { createBoard, newPlayer } = factories;

  board = createBoard(height, width);
  player = newPlayer();
  score = 0;
  rowsCleared = 0;
  isGameOver = false;
  gameOverDisplay.style.display = "none";
  scoreDisplay.style.color = "#0074D9";
  rowsDisplay.style.color = "#0074D9";
  update(0);
};

module.exports = init;
