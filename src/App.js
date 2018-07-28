import React, { Component } from 'react';
import Options from './Options';
import PlayField from './PlayField';
import ThereminOscillator from './ThereminOscillator';

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
          onMouseEnter={this.thereminOscillator.playSound}
          onMouseLeave={this.thereminOscillator.stopSound}
          onMouseMove={this.handleMouseMove}
        />
      </div>
    );
  }
}

export default App;
