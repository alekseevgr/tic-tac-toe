const Square = ({ value, onClick, disabled }) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        style={{
          width: 80,
          height: 80,
          fontSize: 30,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f0f0f0',
          border: '1px solid #ccc',
          cursor: disabled ? 'default' : 'pointer'
        }}
      >
        {value}
      </button>
    );
  };

export default Square
  