import React from "react";
import Lottie from "lottie-react";
import animationOval from '/src/assets/oval.json'

const Oval = ( ) => {
  return (
    <div>
      <Lottie animationData={animationOval}  
      loop={false}
      autoplay={true}
      />
    </div>
  );
};

export default Oval;