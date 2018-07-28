import React, { Component } from 'react';

import Options from './components/Options/Options';
import PlayField from './components/PlayField/PlayField';
import ThereminOscillator from './util/ThereminOscillator';

class App extends Component {
  constructor(props) {
    super(props);

    this.thereminOscillator = new ThereminOscillator();
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseMove(e) {
    this.thereminOscillator.setPitch(e.pageX);
  }

  render() {
    const { options } = this.thereminOscillator;
    return (
      <div>
        <Options />
        <PlayField
          range={options.range}
          volumeArea={options.volumeArea}
          key={options.key}
          scale={options.scale}
          onMouseEnter={this.thereminOscillator.playSound}
          onMouseLeave={this.thereminOscillator.stopSound}
          onMouseMove={this.handleMouseMove}
        />
      </div>
    );
  }
}

export default App;
