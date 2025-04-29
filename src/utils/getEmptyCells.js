export const getEmptyCells = (board) => {
    const empty = [];
    board.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === null) empty.push([i, j]);
      });
    });
    return empty;
  };