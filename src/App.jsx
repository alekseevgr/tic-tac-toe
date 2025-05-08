import React, { useState, useEffect } from "react";
import "./App.css";
import calculateWinner from "./utils/checkWinner";
import Lottie from "lottie-react";
import boardAnimation from "./assets/grid.json";
import crossAnimation from "./assets/cross.json";
import ovalAnimation from "./assets/oval.json";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winnerInfo, setWinnerInfo] = useState(null);
  const [firstMoveChosen, setFirstMoveChosen] = useState(false);

  useEffect(() => {
    if (!firstMoveChosen || isPlayerTurn || winnerInfo) {
      return;
    }

    const makeComputerMove = () => {
      const emptyCells = board
        .map((cell, index) => (cell === null ? index : null))
        .filter((index) => index !== null);

      if (emptyCells.length === 0) {
        return;
      }

      const findMove = (symbol) => {
        for (let index of emptyCells) {
          const copyBoard = [...board];
          copyBoard[index] = symbol;
          if (calculateWinner(copyBoard) === symbol) {
            return index;
          }
        }
        return null;
      };

      let moveIndex =
        findMove("O") ??
        findMove("X") ??
        emptyCells[Math.floor(Math.random() * emptyCells.length)];

      const newBoard = [...board];
      newBoard[moveIndex] = "O";
      setBoard(newBoard);
      setIsPlayerTurn(true);

      const result = calculateWinner(newBoard);

      if (result) {
        setWinnerInfo(result);
      }
    };

    setTimeout(makeComputerMove, 500);
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
        <div className="choose-first">
          <h2>Кто ходит первым?</h2>
          <div className='buttons'>
            <button onClick={() => chooseFirstMove(true)}>Игрок</button>
            <button onClick={() => chooseFirstMove(false)}>Компьютер</button>
          </div>
        </div>
      ) : (
        <>

          <div className="board-wrapper">
            <Lottie
              animationData={boardAnimation}
              loop={false}
              className="board-animation"
            />
            <div className="board">
              {board.map((value, i) => {
                const isWinningCell = winnerInfo?.combination?.includes(i);
                return (
                  <button
                    key={i}
                    className={`cell 
                      ${isWinningCell ? "winCombination" : ""} 
                      ${!winnerInfo && board.every((cell) => cell !== null) ? "draw-blink" : ""}`
                    }
                    onClick={() => handleClick(i)}
                    disabled={!!value || winnerInfo}
                  >
                    {value === "X" && (
                      <Lottie
                        animationData={crossAnimation}
                        loop={false}
                        className="symbol-animation symbol-x"
                      />
                    )}
                    {value === "O" && (
                      <Lottie
                        animationData={ovalAnimation}
                        loop={false}
                        className="symbol-animation symbol-o"
                      />
                    )}
                  </button>
                );
              })}
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
        </>
      )}
    </div>
  );
};

export default App;
