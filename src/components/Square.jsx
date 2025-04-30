// components/Square.jsx
import React from 'react';
import LottieAnimation from './LottieAnimation';
import xAnim from '../assets/cross.json';
import oAnim from '../assets/oval.json';


const Square = ({ value, onClick, disabled }) => {
  const renderContent = () => {
    if (value === 'X') return <LottieAnimation animationData={xAnim} />;
    if (value === 'O') return <LottieAnimation animationData={oAnim} />;
    return null;
  };

  return (
    <>
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 80,
        height: 80,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
      }}
    >
      {renderContent()}
    </button>
    </>
  );
};

export default Square;
