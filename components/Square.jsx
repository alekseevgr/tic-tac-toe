import React from "react";
import Lottie from "lottie-react";
import animationGame from '/src/assets/game.json'

const Game = () => {
  return (
    <div>
      <Lottie animationData={animationGame} 
      loop={false}
      autoplay={true} 
      />
    </div>
  );
};

export default Game;
