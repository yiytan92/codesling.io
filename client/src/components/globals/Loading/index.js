import React from 'react';

import './Loading.css';

const Loading = ({ minHeight, color }) => {
  let styles = {};
  if (minHeight) {
    styles.minHeight = minHeight;
  }
  return (
    <div 
      className="loading-container"
      style={styles}
    >
      <div
        className={`spinner ${color ? `color-${color}` : ''}`}
      >
      </div>
    </div>
  );
};

export default Loading;
