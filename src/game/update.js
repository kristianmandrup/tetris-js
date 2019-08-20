/* updates game every frame */
function update(time) {
  if (!isGameOver) {
    elapsed += time - prevTime;
    prevTime = time;

    // drop player piece every second
    if (elapsed > 1000) {
      movePlayer(83);
    }

    clearScreen();
    sweepBoard();
    draw(board, 0, 0); // draw game board
    draw(player.matrix, player.pos.x, player.pos.y); // draw player
    scoreDisplay.innerText = score;
    rowsDisplay.innerText = rowsCleared;
    requestAnimationFrame(update);
  } else {
    gameOverDisplay.style.display = "block";
    scoreDisplay.style.color = "#FF4136";
    rowsDisplay.style.color = "#FF4136";
  }
}

module.exports = update;
