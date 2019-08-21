const createEmptyBoard = require("./create");

describe("create (empty) board", () => {
  const dimensions = {
    width: 10,
    height: 20
  };

  const board = createEmptyBoard(dimensions);

  const isEmpty = cell => expect(cell).toEqual(0);

  describe("first row", () => {
    const row = board[0];

    describe("column", () => {
      it("first cell is empty", () => {
        isEmpty(row[0]);
      });
    });
  });

  describe("last row", () => {
    const row = board[height - 1];

    describe("column", () => {
      it("first cell is empty", () => {
        isEmpty(row[0]);
      });
    });
  });
});
