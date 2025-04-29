import React, { useState, useEffect } from 'react';
import { checkWinner } from './utils/checkWinner';
import { getEmptyCells } from './utils/getEmptyCells'
import { findWinningMove } from './utils/findWinningMove';
import Square from './components/Square';

const App = () => {
  const [board, setBoard] = useState(Array(3).fill(null).map(() => Array(3).fill(null)));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [firstMoveChosen, setFirstMoveChosen] = useState(false);

  useEffect(() => {
    if (!firstMoveChosen || isPlayerTurn || winner) return;

    const makeComputerMove = () => {
      const emptyCells = getEmptyCells(board);
      if (emptyCells.length === 0) return;

      let move = findWinningMove(board, 'O') || findWinningMove(board, 'X') || emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const [i, j] = move;

      const newBoard = board.map(row => row.slice());
      newBoard[i][j] = 'O';
      setBoard(newBoard);
      setIsPlayerTurn(true);

      const gameWinner = checkWinner(newBoard);
      if (gameWinner) setWinner(gameWinner);
    };

    setTimeout(makeComputerMove, 500);
  }, [isPlayerTurn, board, winner, firstMoveChosen]);

  const handleClick = (i, j) => {
    if (board[i][j] || winner || !isPlayerTurn || !firstMoveChosen) return;

    const newBoard = board.map(row => row.slice());
    newBoard[i][j] = 'X';
    setBoard(newBoard);
    setIsPlayerTurn(false);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) setWinner(gameWinner);
  };

  const resetGame = () => {
    setBoard(Array(3).fill(null).map(() => Array(3).fill(null)));
    setWinner(null);
    setFirstMoveChosen(false);
    setIsPlayerTurn(true);
  };

  const chooseFirstMove = (isPlayerFirst) => {
    setFirstMoveChosen(true);
    setIsPlayerTurn(isPlayerFirst);

    if (!isPlayerFirst) {
      setTimeout(() => {
        const emptyCells = getEmptyCells(board);
        const move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const [i, j] = move;
        const newBoard = board.map(row => row.slice());
        newBoard[i][j] = 'O';
        setBoard(newBoard);
        setIsPlayerTurn(true);
      }, 500);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Крестики-нолики</h1>

      {!firstMoveChosen ? (
        <div>
          <h2>Кто ходит первым?</h2>
          <button onClick={() => chooseFirstMove(true)} style={{ margin: '10px', padding: '10px 20px', fontSize: 16 }}>
            Игрок
          </button>
          <button onClick={() => chooseFirstMove(false)} style={{ margin: '10px', padding: '10px 20px', fontSize: 16 }}>
            Компьютер
          </button>
        </div>
      ) : (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 80px)',
            gap: '5px',
            margin: '20px auto'
          }}>
            {board.map((row, i) =>
              row.map((_, j) => (
                <Square
                  key={`${i}-${j}`}
                  value={board[i][j]}
                  onClick={() => handleClick(i, j)}
                  disabled={board[i][j] || winner || !firstMoveChosen}
                />
              ))
            )}
          </div>

          {winner && <h2>{winner === 'X' ? 'Ты выиграл!' : 'Компьютер выиграл!'}</h2>}
          {!winner && board.every(row => row.every(cell => cell !== null)) && <h2>Ничья!</h2>}

          {(winner || board.every(row => row.every(cell => cell !== null))) && (
            <button onClick={resetGame} style={{ marginTop: 20, padding: '10px 20px', fontSize: 16 }}>
              Сыграть ещё раз
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default App;