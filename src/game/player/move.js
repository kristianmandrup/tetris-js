const { keyDirectionMap } = require("./keys");

const createCollide = game => newMove => {
  const { newX, newY } = newMove;
  // prevent collision due to piece rotation
  while (checkCollision(newX, newY) === "left") newX++;
  while (checkCollision(newX, newY) === "right") newX--;

  const collisionDirection = checkCollision(newX, newY);

  const top = game => (game.isGameOver = true);
  const bottom = game => {
    game.updateBoard();
    game.player = newPlayer();
  };

  // default
  const _ = ({ player }) => {
    player.pos.x = newX;
    player.pos.y = newY;
  };

  const collisions = {
    top,
    bottom
  };

  // prevent collision due to piece movement
  collisions[collisionDirection || "_"](game);
};

const playerMove = ({ pos }) => {
  return {
    newX: pos.x,
    newY: pos.y,
    score,
    elapsed,
    player
  };
};

const createMoves = game => {
  const { rotatePlayer, score } = game;
  left = move => ({ ...move, newX: newX-- });
  right = move => ({ ...move, newX: newX++ });
  down = move => ({ ...move, newY: newY++, score: score++, elapsed: 0 });
  rotate = move => rotatePlayer(move.player);
  return {
    left,
    right,
    down,
    rotate
  };
};

const createMovePlayer = game => key => {
  const { player } = game;

  const move = playerMove(player);
  const moves = createMoves(game);

  const direction = keyDirectionMap[key];
  const newMove = moves[direction](move);

  const collide = createCollide(game);

  collide(newMove);
};

module.exports = {
  createMovePlayer,
  createMoves,
  playerMove,
  createCollide
};
