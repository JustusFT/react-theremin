import 'rc-slider/assets/index.css';

import './Options.css';

import React from 'react';
import Slider, { Range } from 'rc-slider';

import { KEYS, SCALES } from '../../util/constants';

class Options extends React.PureComponent {
  setWaveform = e => (this.props.theremin.oscillator.type = e.target.value);
  toggleOption = e =>
    (this.props.theremin.options[e.target.value] = e.target.checked);

  render() {
    return (
      <div
        className="Options"
        style={{ display: this.props.hidden ? 'none' : 'initial' }}
      >
        <h1>Playfield</h1>
        <div>
          Frequency Range
          <Range
            onAfterChange={value => this.props.onLineChange('range', value)}
            allowCross={false}
            min={25}
            max={4200}
            defaultValue={[80, 1440]}
          />
        </div>
        <div>
          Volume area %
          <Slider
            onAfterChange={value => this.props.onHeightChange(value)}
            min={1}
            max={100}
            defaultValue={50}
          />
        </div>
        <div>
          <div>Scaling (in hz)</div>
          <label>
            Linear
            <input
              type="radio"
              name="rate"
              onChange={() => this.props.onLineChange('hzScale', 'linear')}
            />
          </label>
          <label>
            Logarithmic
            <input
              type="radio"
              name="rate"
              onChange={() => this.props.onLineChange('hzScale', 'logarithmic')}
              defaultChecked={true}
            />
          </label>
        </div>
        <div>
          Invert volume axis
          <input
            type="checkbox"
            value="invertVolumeAxis"
            onChange={this.toggleOption}
          />
        </div>
        <div>
          Invert pitch axis
          <input
            type="checkbox"
            onChange={e =>
              this.props.onLineChange('invertPitchAxis', e.target.checked)
            }
          />
        </div>
        <h1>Synth</h1>
        <div>
          Max volume
          <Slider
            onChange={value => (this.props.theremin.options.maxVolume = value)}
            min={1}
            max={100}
            defaultValue={100}
          />
        </div>
        <div>
          <div>Waveform</div>
          <label>
            Sine
            <input
              type="radio"
              name="waveform"
              value="sine"
              onChange={this.setWaveform}
              defaultChecked={true}
            />
          </label>
          <label>
            Triangle
            <input
              type="radio"
              name="waveform"
              value="triangle"
              onChange={this.setWaveform}
            />
          </label>
          <label>
            Square
            <input
              type="radio"
              name="waveform"
              value="square"
              onChange={this.setWaveform}
            />
          </label>
          <label>
            Sawtooth
            <input
              type="radio"
              name="waveform"
              value="sawtooth"
              onChange={this.setWaveform}
            />
          </label>
        </div>
        <div>
          Filter
          <Slider
            min={20}
            max={20000}
            defaultValue={20000}
            onAfterChange={value =>
              (this.props.theremin.biquadFilter.frequency.value = value)
            }
          />
        </div>
        <h1>Guidelines</h1>
        <div>
          Key
          <select
            onChange={e => this.props.onLineChange('key', e.target.value)}
          >
            {KEYS.map((key, index) => (
              <option key={index} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <div>
          Scale
          <select
            onChange={e => this.props.onLineChange('scale', e.target.value)}
          >
            {Object.keys(SCALES).map((scale, index) => (
              <option key={index} value={scale}>
                {scale}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default Options;
