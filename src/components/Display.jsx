import React from 'react';

const Display = ({ value }) => {
  return (
    <div className="calculator-display">
      <div className="display-screen">{value || "0"}</div>
    </div>
  );
};

export default Display;