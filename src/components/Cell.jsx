import Lottie from "lottie-react";
import classNames from "classnames"
import crossAnimation from "../assets/cross.json";
import ovalAnimation from "../assets/oval.json";

const Cell = ({ value, onClick, isWinning, isDraw, disabled }) => {

  const cellClass = classNames("cell", {
    blink: isWinning || isDraw,
    winCombination: isWinning,
    "draw-blink": isDraw && !isWinning,
  });
  const symbolClass = classNames("symbol-animation", {
    "symbol-x": value === "X",
    "symbol-o": value === "O",
  });

  return (
    <button className={cellClass} onClick={onClick} disabled={disabled}>
      {value && (
        <div className={symbolClass}>
          {value === "X" && <Lottie animationData={crossAnimation} loop={false} />}
          {value === "O" && <Lottie animationData={ovalAnimation} loop={false} />}
        </div>
      )}
    </button>
  );
}

export default Cell;