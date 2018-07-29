import './GuideLines.css';

import React from 'react';

import { PIANO_KEY_COUNT, SCALES, KEYS } from '../../util/constants';
import { tone, findPitchLocation } from '../../util/utilFunctions';

// returns an array of guide lines as JSX elements
function generateGuideLines(range, key, scale) {
  const selectedKey = KEYS.indexOf(key);
  const selectedScale = SCALES[scale];

  const guideLines = [];

  for (let i = 0; i < PIANO_KEY_COUNT; i++) {
    // skip notes that are not part of the scale
    const offset = (i - 4 - selectedKey) % 12;
    const isPartOfScale = selectedScale[offset] === 1;
    if (!isPartOfScale) {
      continue;
    }

    // find the x-position of the guideline
    const pitch = tone(i);
    const x = Math.round(findPitchLocation(pitch, range));

    // don't add the guideline if its off-screen
    const isOnScreen = x >= 0 && x <= window.innerWidth;
    if (!isOnScreen) {
      continue;
    }

    guideLines.push(<div key={i} className="GuideLine" style={{ left: x }} />);
  }

  return guideLines;
}

function GuideLines({ range, musicKey, scale }) {
  const guideLines = generateGuideLines(range, musicKey, scale);
  return <div>{guideLines}</div>;
}

export default GuideLines;
