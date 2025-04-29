import React from "react";
import Lottie from "lottie-react";
import animationGrid from '/src/assets/grid.json'

const BoardGame = () => {
  return (
    <div>
      <Lottie animationData={animationGrid}  
      loop={false}
      autoplay={true}
      />
    </div>
  );
};

export default BoardGame;