import './GuideLines.css';

import React from 'react';

import { PIANO_KEY_COUNT, SCALES, KEYS } from '../../util/constants';

// gets the frequency (in hz) of the nth key of a piano
// formula taken from https://en.wikipedia.org/wiki/Piano_key_frequencies
function tone(n) {
  return Math.pow(Math.pow(2, 1 / 12), n - 49) * 440;
}

// takes in a Theremin object and returns an array of guide lines as JSX elements
function generateGuideLines(theremin) {
  const { key, scale } = theremin.options;
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
    const x = Math.round(theremin.findPitchLocation(pitch));

    // don't add the guideline if its off-screen
    const isOnScreen = x >= 0 && x <= window.innerWidth;
    if (!isOnScreen) {
      continue;
    }

    guideLines.push(<div key={i} className="GuideLine" style={{ left: x }} />);
  }

  return guideLines;
}

function GuideLines({ theremin }) {
  const guideLines = generateGuideLines(theremin);
  return <div>{guideLines}</div>;
}

export default GuideLines;
