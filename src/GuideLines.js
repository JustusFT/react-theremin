import React from 'react';
import './GuideLines.css';

import { tone, findPitchLocation } from './util';

// returns an array of guide lines as JSX elements
function generateGuideLines(range) {
  const guideLines = [];
  // iterate through the 88 keys of the piano
  for (let i = 0; i < 88; i++) {
    const pitch = tone(i);
    const x = Math.round(findPitchLocation(pitch, range));
    const isInView = x >= 0 && x <= window.innerWidth;
    if (isInView) {
      guideLines.push(
        <div key={i} className="GuideLine" style={{ left: x }} />
      );
    }
  }
  return guideLines;
}

function GuideLines({ range }) {
  const guideLines = generateGuideLines(range);
  return <div>{guideLines}</div>;
}

export default GuideLines;
