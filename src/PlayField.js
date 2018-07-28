import React from 'react';
import VolumeField from './VolumeField';
import './PlayField.css';

function PlayField({ options }) {
  return (
    <div className="PlayField">
      <VolumeField height={options.volumeArea} />
    </div>
  );
}

export default PlayField;
