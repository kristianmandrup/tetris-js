const createDirectionMap = game => {
  const { board } = game;
  const { touchedPiece } = board;

  const isTop = ({ x, y, newX, newY }) =>
    newY <= 1 && touchedPiece(x + newX, y + newY);

  const isLeft = ({ x, newX }) => x + newX < 0;
  const isRight = ({ x, newX, width }) => x + newX > width - 1;
  const isBottom = ({ x, y, newX, newY, height }) =>
    y + newY > height - 1 || touchedPiece(x + newX, y + newY);

  return {
    top: isTop,
    bottom: isBottom,
    left: isLeft,
    right: isRight
  };
};

module.exports = createDirectionMap;
