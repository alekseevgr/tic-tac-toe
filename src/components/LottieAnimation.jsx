import React from 'react';
import Lottie from 'lottie-react';

const LottieAnimation = ({ animationData }) => (
  <Lottie animationData={animationData} loop={false} />
);

export default LottieAnimation;