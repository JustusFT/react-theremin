import React from 'react';
import VolumeField from './VolumeField';
import GuideLines from './GuideLines';
import './PlayField.css';

function PlayField(props) {
  return (
    <div
      className="PlayField"
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      onMouseMove={props.onMouseMove}
    >
      <GuideLines range={props.range} />
      <VolumeField height={props.volumeArea} />
    </div>
  );
}

export default PlayField;
