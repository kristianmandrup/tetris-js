const screen = require("./screen");
const ui = require("./screen/ui")(screen);
const game = require("./game");
const player = require("./player");

const { boardWidth, boardHeight, scale } = require("./board/dimensions");

const { screen, findElement } = createScreen(document);

document.addEventListener("keydown", event => {
  movePlayer(event.which);
});

findElement("button").addEventListener("click", init);

screen.context.scale(scale, scale);

init();
