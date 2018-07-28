import React from 'react';
import VolumeField from './VolumeField';
import './PlayField.css';

function PlayField({ options, ...props }) {
  return (
    <div
      className="PlayField"
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      onMouseMove={props.onMouseMove}
    >
      <VolumeField height={options.volumeArea} />
    </div>
  );
}

export default PlayField;
