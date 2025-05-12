const GameOver = ({ winner, onReset }) => {
    const status =
      winner === "X"
        ? "Ты выиграл!"
        : winner === "O"
        ? "Компьютер выиграл!"
        : "Ничья!";
  
    return (
      <div className="finishGame">
        <h2 className="status">{status}</h2>
        <button onClick={onReset} className="reset-btn">
          Сыграть ещё
        </button>
      </div>
    );
  };
  
  export default GameOver;