import 'rc-slider/assets/index.css';

import './Options.css';

import React from 'react';
import Slider, { Range } from 'rc-slider';
import classNames from 'classnames';

import { KEYS, SCALES } from '../../util/constants';

class RadioGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.defaultSelectedValue
    };
  }

  selectRadio = value => {
    this.setState({ selected: value });
    this.props.onChange(value);
  };

  render() {
    const { children } = this.props;

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, {
        name: this.props.name,
        checked: this.state.selected === child.props.value,
        onChange: this.selectRadio
      })
    );

    return <div className="RadioGroup">{childrenWithProps}</div>;
  }
}

class Radio extends React.Component {
  handleChange = () => this.props.onChange(this.props.value);

  render() {
    return (
      <label className={classNames({ selected: this.props.checked })}>
        {this.props.label}
        <input
          type="radio"
          name={this.props.name}
          value={this.props.value}
          checked={this.props.checked}
          onChange={this.handleChange}
        />
      </label>
    );
  }
}

function CheckRow({ label, ...props }) {
  return (
    <div className="option-row">
      <label>
        <input type="checkbox" {...props} />
        <span className="check-label">{label}</span>
      </label>
    </div>
  );
}

// returns the value unless it exceeds the boundary, then return the boundary it went across instead
function limitBetween([min, max], value) {
  return Math.max(min, Math.min(value, max));
}

class SliderWithInput extends React.Component {
  state = {
    input: this.props.defaultValue,
    value: this.props.defaultValue
  };

  handleInputChange = e => {
    this.setState({
      input: e.target.value
    });
  };

  // correct out-of-range values once user exits input
  // TODO doesn't work when the spinners are used
  handleInputBlur = e => {
    const newValue = limitBetween(
      [this.props.min, this.props.max],
      e.target.value
    );
    this.setState(
      {
        input: newValue,
        value: newValue
      },
      newState => this.props.onAfterChange(newValue)
    );
  };

  handleSlideChange = value => {
    this.setState({
      value,
      input: value
    });
  };

  render() {
    const { label, min, max, ...props } = this.props;
    return (
      <div className="option-row">
        <label>
          {label}
          <input
            type="number"
            value={this.state.input}
            min={min}
            max={max}
            onChange={this.handleInputChange}
            onBlur={this.handleInputBlur}
          />
        </label>
        <Slider
          {...props}
          min={min}
          max={max}
          onChange={this.handleSlideChange}
          value={this.state.value}
        />
      </div>
    );
  }
}

class Options extends React.PureComponent {
  toggleOption = e =>
    (this.props.theremin.options[e.target.value] = e.target.checked);

  render() {
    return (
      <div
        className="Options"
        style={{ display: this.props.hidden ? 'none' : 'initial' }}
      >
        <h1>Playfield</h1>
        <div className="option-row">
          Frequency Range
          <Range
            onAfterChange={value => this.props.onLineChange('range', value)}
            allowCross={false}
            min={25}
            max={4200}
            defaultValue={[80, 1440]}
          />
        </div>
        <SliderWithInput
          label="Volume area %"
          onAfterChange={value => this.props.onHeightChange(value)}
          min={1}
          max={100}
          defaultValue={50}
        />
        <div className="option-row flex">
          <span>Scaling (in hz)</span>
          <span className="flex-item-right">
            <RadioGroup
              name="rate"
              defaultSelectedValue="logarithmic"
              onChange={value => this.props.onLineChange('hzScale', value)}
            >
              <Radio value="linear" label="Linear" />
              <Radio value="logarithmic" label="Logarithmic" />
            </RadioGroup>
          </span>
        </div>
        <CheckRow
          label="Invert volume axis"
          value="invertVolumeAxis"
          onChange={this.toggleOption}
        />
        <CheckRow
          label="Invert pitch axis"
          onChange={e =>
            this.props.onLineChange('invertPitchAxis', e.target.checked)
          }
        />
        <h1>Synth</h1>
        <SliderWithInput
          label="Max volume"
          onAfterChange={value =>
            (this.props.theremin.options.maxVolume = value)
          }
          min={1}
          max={100}
          defaultValue={100}
        />
        <div className="option-row flex">
          <span>Waveform</span>
          <span className="flex-item-right">
            <RadioGroup
              name="waveform"
              defaultSelectedValue="sine"
              onChange={value => (this.props.theremin.oscillator.type = value)}
            >
              <Radio value="sine" label="Sine" />
              <Radio value="triangle" label="Triangle" />
              <Radio value="square" label="Square" />
              <Radio value="sawtooth" label="Sawtooth" />
            </RadioGroup>
          </span>
        </div>
        <SliderWithInput
          label="Filter"
          onAfterChange={value =>
            (this.props.theremin.biquadFilter.frequency.value = value)
          }
          min={20}
          max={20000}
          defaultValue={20000}
        />
        <h1>Guidelines</h1>
        <div className="option-row flex">
          <span>Key</span>
          <select
            className="flex-item-right"
            onChange={e => this.props.onLineChange('key', e.target.value)}
          >
            {KEYS.map((key, index) => (
              <option key={index} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <div className="option-row flex">
          <span>Scale</span>
          <select
            className="flex-item-right"
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
