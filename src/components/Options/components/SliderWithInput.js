import React from 'react';
import Slider from 'rc-slider';

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
          <div className="flex">
            <span>{label}</span>
            <input
              className="flex-item-right"
              type="number"
              value={this.state.input}
              min={min}
              max={max}
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
            />
          </div>
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

export default SliderWithInput;
