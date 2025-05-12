import React from "react";
import Cell from "./Cell";
import Lottie from "lottie-react";
import boardAnimation from "../assets/grid.json";

const Board = ({ board, onCellClick, winnerInfo }) => {

  const isDraw = !winnerInfo && board.every((cell) => cell !== null);

  return (
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
            <Cell
              key={i}
              value={value}
              onClick={() => onCellClick(i)}
              isWinning={isWinningCell}
              isDraw={isDraw}
              disabled={!!value || winnerInfo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Board;
