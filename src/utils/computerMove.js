import calculateWinner from "./checkWinner";

export default function getComputerMove(board) {
  const emptyCells = board
    .map((cell, index) => (cell === null ? index : null))
    .filter((index) => index !== null);

  const findMove = (symbol) => {
    for (let index of emptyCells) {
      const copyBoard = [...board];
      copyBoard[index] = symbol;
      const result = calculateWinner(copyBoard)
      if (result?.winner === symbol) {
        return index;
      }
    }
    return null;
  };

  return (
    findMove("O") ??
    findMove("X") ??
    emptyCells[Math.floor(Math.random() * emptyCells.length)]
  );
}