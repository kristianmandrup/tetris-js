const screen = require("./screen");
const colors = require("./colors");
const pieces = require("./colors");
const { boardWidth, boardHeight, scale } = require("./dimensions");

document.addEventListener("keydown", event => {
  movePlayer(event.which);
});

document.querySelector("button").addEventListener("click", init);

context.scale(scale, scale);
init();
