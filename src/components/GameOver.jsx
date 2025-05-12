const getStatusText = (winner) => {
  switch (winner) {
    case "X":
      return "Ты выиграл!";
    case "O":
      return "Компьютер выиграл!";
    default:
      return "Ничья!";
  }
};


const GameOver = ({ winner, onReset }) => {

    return (
      <div className="finishGame">
        <h2 className="status">{getStatusText(winner)}</h2>
        <button onClick={onReset} className="reset-btn">
          Сыграть ещё
        </button>
      </div>
    );
  };
  
  export default GameOver;