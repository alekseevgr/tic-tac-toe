const FirstMoveSelector = ({ onChoose }) => (
    <div className="choose-first">
      <h2>Кто ходит первым?</h2>
      <div className="buttons">
        <button onClick={() => onChoose(true)}>Игрок</button>
        <button onClick={() => onChoose(false)}>Компьютер</button>
      </div>
    </div>
  );
  
  export default FirstMoveSelector;