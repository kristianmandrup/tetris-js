const canvas = document.querySelector("canvas");
const scoreDisplay = document.querySelector("#score");
const rowsDisplay = document.querySelector("#rows");
const gameOverDisplay = document.querySelector("#gameOver");
const context = canvas.getContext("2d");

const screen = {
  canvas,
  scoreDisplay,
  rowsDisplay,
  gameOverDisplay,
  context
};

module.exports = screen;
