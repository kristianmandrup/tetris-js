const movePlayer = game => key => {
  const { player } = game;
  let newX = player.pos.x;
  let newY = player.pos.y;

  switch (key) {
    // move left
    case 65:
      newX--;
      break;
    // move right
    case 68:
      newX++;
      break;
    // move down
    case 83:
      newY++;
      score++;
      elapsed = 0;
      break;
    // rotate
    case 69:
      rotatePlayer(player);
  }

  // prevent collision due to piece rotation
  while (checkCollision(newX, newY) === "left") newX++;
  while (checkCollision(newX, newY) === "right") newX--;

  // prevent collision due to piece movement
  switch (checkCollision(newX, newY)) {
    case "top":
      isGameOver = true;
      break;
    case "bottom":
      updateBoard();
      player = newPlayer();
      break;
    default:
      player.pos.x = newX;
      player.pos.y = newY;
  }
};

module.exports = movePlayer;
