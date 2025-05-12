import Lottie from "lottie-react";
import crossAnimation from "../assets/cross.json";
import ovalAnimation from "../assets/oval.json";

const Cell = ({ value, onClick, isWinning, isDraw, disabled }) => (
  <button
    className={`cell ${isWinning ? "winCombination" : ""} ${isDraw ? "draw-blink" : ""}`}
    onClick={onClick}
    disabled={disabled ?? !!value} // можно явно передавать disabled извне
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

export default Cell;