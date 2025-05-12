import React, { useState, useEffect } from "react";
import "./App.css";
import calculateWinner from "./utils/checkWinner";
import getComputerMove from "./utils/computerMove";
import FirstMoveSelector from "./components/FirstMoveSelector.jsx";
import Cell from "./components/Cell.jsx";
import Lottie from "lottie-react";
import boardAnimation from "./assets/grid.json";

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

  return (
    <div className="app">
      <h1 className="title">Крестики-нолики</h1>

      {!firstMoveChosen ? (
        <FirstMoveSelector onChoose={chooseFirstMove} />
      ) : (
        <>
          <div className="game-area">
            <div className="board-wrapper">
              <Lottie
                animationData={boardAnimation}
                loop={false}
                className="board-animation"
              />
              <div className="board">
                {board.map((value, i) => (
                  <Cell
                    key={i}
                    value={value}
                    onClick={() => handleClick(i)}
                    isWinning={winnerInfo?.combination?.includes(i)}
                    isDraw={!winnerInfo && board.every((cell) => cell !== null)}
                    disabled={!!value || winnerInfo}
                  />
                ))}
              </div>
            </div>

            {(winnerInfo || board.every((cell) => cell !== null)) && (
              <div className="finishGame">
                <h2 className="status">
                  {winnerInfo?.winner === "X"
                    ? "Ты выиграл!"
                    : winnerInfo?.winner === "O"
                    ? "Компьютер выиграл!"
                    : "Ничья!"}
                </h2>
                <button onClick={resetGame} className="reset-btn">
                  Сыграть ещё
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
