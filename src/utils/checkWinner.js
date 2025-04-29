export const checkWinner = (board) => {
    const lines = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];
  
    for (let line of lines) {
      const [[a1, a2], [b1, b2], [c1, c2]] = line;
      if (board[a1][a2] && board[a1][a2] === board[b1][b2] && board[a1][a2] === board[c1][c2]) {
        return board[a1][a2];
      }
    }
    return null;
  };