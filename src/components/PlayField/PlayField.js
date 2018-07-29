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
      <GuideLines theremin={props.theremin} />
      <VolumeField height={props.theremin.options.volumeArea} />
    </div>
  );
}

export default PlayField;
