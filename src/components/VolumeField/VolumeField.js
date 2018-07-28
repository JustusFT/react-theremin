import './VolumeField.css';

import React from 'react';

function VolumeField({ height }) {
  return (
    <div
      className="VolumeField"
      style={{
        height: `${height}vh`
      }}
    />
  );
}

export default VolumeField;
