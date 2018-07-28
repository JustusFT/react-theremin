import './PlayField.css';

import React from 'react';

import GuideLines from '../GuideLines/GuideLines';
import VolumeField from '../VolumeField/VolumeField';

function PlayField(props) {
  return (
    <div
      className="PlayField"
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      onMouseMove={props.onMouseMove}
    >
      <GuideLines range={props.range} key={props.key} scale={props.scale} />
      <VolumeField height={props.volumeArea} />
    </div>
  );
}

export default PlayField;
