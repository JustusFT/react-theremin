import React from 'react';
import './VolumeField.css';

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
