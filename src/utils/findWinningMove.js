import { checkWinner } from './checkWinner';
import { getEmptyCells } from './getEmptyCells';

export const findWinningMove = (board, symbol) => {
  const emptyCells = getEmptyCells(board);
  for (let [i, j] of emptyCells) {
    const copy = board.map(row => row.slice());
    copy[i][j] = symbol;
    if (checkWinner(copy) === symbol) {
      return [i, j];
    }
  }
  return null;
};