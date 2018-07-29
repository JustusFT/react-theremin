import './GuideLines.css';

import React from 'react';

function GuideLines({ theremin }) {
  const guideLines = theremin
    .getNotePositions()
    .map((x, index) => (
      <div key={index} className="GuideLine" style={{ left: x }} />
    ));
  return <div>{guideLines}</div>;
}

export default GuideLines;
