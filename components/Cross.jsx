import React from "react";
import Lottie from "lottie-react";
import animationCross from '/src/assets/cross.json'

const Cross = () => {
  return (
    <div>
      <Lottie animationData={animationCross}  
      loop={false}
      autoplay={true}
      />
    </div>
  );
};

export default Cross;