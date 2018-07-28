import 'rc-slider/assets/index.css';

import './Options.css';

import React from 'react';
import Slider, { Range } from 'rc-slider';

import { KEYS, SCALES } from '../../util/constants';

function Options() {
  return (
    <div className="Options">
      <h1>Playfield</h1>
      <div>
        Frequency Range
        <Range
          allowCross={false}
          min={20}
          max={4200}
          defaultValue={[80, 1440]}
        />
      </div>
      <div>
        Volume area %
        <Slider min={1} max={100} defaultValue={50} />
      </div>
      <div>
        <div>Rate</div>
        <label>
          Linear
          <input type="radio" name="rate" />
        </label>
        <label>
          Logarithmic
          <input type="radio" name="rate" />
        </label>
      </div>
      <div>
        Invert volume axis
        <input type="checkbox" />
      </div>
      <div>
        Invert pitch axis
        <input type="checkbox" />
      </div>
      <h1>Synth</h1>
      <div>
        Max volume
        <Slider min={1} max={100} defaultValue={50} />
      </div>
      <div>
        <div>Waveform</div>
        <label>
          Sine
          <input type="radio" name="waveform" />
        </label>
        <label>
          Triangle
          <input type="radio" name="waveform" />
        </label>
        <label>
          Square
          <input type="radio" name="waveform" />
        </label>
        <label>
          Sawtooth
          <input type="radio" name="waveform" />
        </label>
      </div>
      <div>
        Filter
        <Slider min={20} max={14000} defaultValue={14000} />
      </div>
      <h1>Guidelines</h1>
      <div>
        Key
        <select>
          {KEYS.map((key, index) => <option key={index}>{key}</option>)}
        </select>
      </div>
      <div>
        Scale
        <select>
          {Object.keys(SCALES).map((scale, index) => (
            <option key={index}>{scale}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Options;
