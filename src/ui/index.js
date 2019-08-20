const ui = ({ context, canvas }) => {
  const clearScreen = () => {
    context.fillStyle = "#111111";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  /* draws provided matrix on canvas */
  const draw = (matrix, offsetX, offsetY) => {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          context.fillStyle = colors[value - 1];
          context.fillRect(x + offsetX, y + offsetY, 1, 1);
        }
      });
    });
  };

  return {
    clearScreen,
    draw
  };
};

/* clears canvas */

module.exports = ui;
