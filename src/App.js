import React, { Component } from 'react';

import Options from './components/Options/Options';
import PlayField from './components/PlayField/PlayField';
import ThereminOscillator from './util/ThereminOscillator';

class App extends Component {
  constructor(props) {
    super(props);

    this.thereminOscillator = new ThereminOscillator();
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleOptionsChange = this.handleOptionsChange.bind(this);
  }

  handleMouseMove(e) {
    this.thereminOscillator.setPitch(e.pageX);
    this.thereminOscillator.setVolume(e.pageY);
  }

  handleOptionsChange(key, value, { forceUpdate = false } = {}) {
    this.thereminOscillator.options[key] = value;
    if (forceUpdate) {
      this.forceUpdate();
    }
  }

  render() {
    const { options } = this.thereminOscillator;
    return (
      <div>
        <Options onOptionsChange={this.handleOptionsChange} />
        <PlayField
          range={options.range}
          volumeArea={options.volumeArea}
          musicKey={options.key}
          scale={options.scale}
          onMouseEnter={this.thereminOscillator.playSound}
          onMouseLeave={this.thereminOscillator.stopSound}
          onMouseMove={this.handleMouseMove}
        />
        <button onClick={() => this.forceUpdate()}>Update</button>
      </div>
    );
  }
}

export default App;
