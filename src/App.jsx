import React, { useState, useEffect } from "react";
import "./App.css";
import calculateWinner from "./utils/checkWinner";
import getComputerMove from "./utils/computerMove";
import FirstMoveSelector from "./components/FirstMoveSelector.jsx";
import GameOver from "./components/GameOver.jsx";
import Board from "./components/Board.jsx";


const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winnerInfo, setWinnerInfo] = useState(null);
  const [firstMoveChosen, setFirstMoveChosen] = useState(false);

  useEffect(() => {
    if (!firstMoveChosen || isPlayerTurn || winnerInfo) {
      return;
    }

    const makeMove = () => {
      const moveIndex = getComputerMove(board);
      if (moveIndex == null) return;

      const newBoard = [...board];
      newBoard[moveIndex] = "O";
      setBoard(newBoard);
      setIsPlayerTurn(true);

      const result = calculateWinner(newBoard);
      if (result) {
        setWinnerInfo(result);
      }
    };

    setTimeout(makeMove, 500);
  }, [isPlayerTurn, board, winnerInfo, firstMoveChosen]);

  const handleClick = (index) => {
    if (board[index] || !isPlayerTurn || winnerInfo || !firstMoveChosen) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsPlayerTurn(false);

    const result = calculateWinner(newBoard);

    if (result) {
      setWinnerInfo(result);
    }
  };

  const chooseFirstMove = (isPlayerFirst) => {
    setFirstMoveChosen(true);
    setIsPlayerTurn(isPlayerFirst);

    if (!isPlayerFirst) {
      const randomIndex = Math.floor(Math.random() * 9);
      const newBoard = [...board];
      newBoard[randomIndex] = "O";
      setBoard(newBoard);
      setIsPlayerTurn(true);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinnerInfo(null);
    setIsPlayerTurn(true);
    setFirstMoveChosen(false);
  };

  const isDraw = !winnerInfo && board.every((cell) => cell !== null);

  return (
    <div className="app">

      {!firstMoveChosen ? (
        <FirstMoveSelector onChoose={chooseFirstMove} />
      ) : (   
          <div className="game-area">
            <Board
              board={board}
              onCellClick={handleClick}
              winnerInfo={winnerInfo}
            />
            {(winnerInfo || isDraw) && (
              <GameOver
                winner={winnerInfo?.winner ?? null}
                onReset={resetGame}
              />
            )}
          </div>
      )}
    </div>
  );
};

export default App;
