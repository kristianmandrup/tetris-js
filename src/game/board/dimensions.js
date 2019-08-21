const screen = require("../screen/create");
const scale = 25;

const board = {
  dimensions: {
    width: screen.canvas.width / scale,
    height = screen.canvas.height / scale
  }
}

module.exports = {
  board,
  scale
};
