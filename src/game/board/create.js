/* returns new game board */
function createEmptyBoard(rows, cols) {
  let plane = [];
  let row = [];
  while (cols--) row.push(0);
  while (rows--) plane.push(row.slice());

  return {
    plane,
    rows,
    cols
  };
}

module.exports = createEmptyBoard;
