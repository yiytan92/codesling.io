import React from 'react';

const StdOut = ({ text }) => {
  return (
    <div>
      {text.split('\n').map((singleLine, idx) => (
        <div key={`stdout-singleline-idx-${idx}`}>{singleLine}</div>
      ))}
    </div>
  );
};

export default StdOut;
