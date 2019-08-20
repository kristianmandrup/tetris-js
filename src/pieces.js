// piece types
const pieces = {
  I: [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
  J: [[0, 2, 0], [0, 2, 0], [2, 2, 0]],
  L: [[0, 3, 0], [0, 3, 0], [0, 3, 3]],
  O: [[4, 4], [4, 4]],
  Z: [[5, 5, 0], [0, 5, 5], [0, 0, 0]],
  T: [[0, 0, 0], [6, 6, 6], [0, 6, 0]],
  S: [[0, 0, 0], [0, 7, 7], [7, 7, 0]]
};

module.exports = pieces;
