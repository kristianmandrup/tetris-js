module.exports = {
  createScreen
};

const createScreen = document => {
  const findElement = selector => document.querySelector(selector);

  const canvas = findElement("canvas");
  const scoreDisplay = findElement("#score");
  const rowsDisplay = findElement("#rows");
  const gameOverDisplay = findElement("#gameOver");

  const context = canvas.getContext("2d");

  const screen = {
    canvas,
    scoreDisplay,
    rowsDisplay,
    gameOverDisplay,
    context
  };

  return {
    screen,
    findElement
  };
};
