const createGameOver = game => {
  const { gameOverDisplay, scoreDisplay, rowsDisplay } = game;

  gameOverDisplay.style.display = "block";
  scoreDisplay.style.color = "#FF4136";
  rowsDisplay.style.color = "#FF4136";
};

const createGameFrame = game => time => {
  const { prevTime, elapsed, player, screen } = game;

  game.elapsed += time - prevTime;
  game.prevTime = time;

  // drop player piece every second
  if (elapsed > 1000) {
    player.move(83);
  }

  screen.clear();
  board.sweep();
  board.draw(board, 0, 0); // draw game board
  board.draw(player.matrix, player.pos.x, player.pos.y); // draw player

  const { scoreDisplay, rowsDisplay } = game;

  scoreDisplay.innerText = score;
  rowsDisplay.innerText = rowsCleared;
  requestAnimationFrame(update);
};

/* updates game every frame */
const createUpdate = game => time => {
  const gameOver = createGameOver(game);
  const gameFrame = createGameFrame(game);
  game.isGameOver ? gameOver() : gameFrame(time);
};

module.exports = createUpdate;
