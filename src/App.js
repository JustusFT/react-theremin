import React, { Component } from 'react';
import Options from './Options';
import PlayField from './PlayField';

const mockOptions = {
  volumeArea: 50,
  range: [80, 1440]
  //key: 'C',
  //scale: 'major'
};

// create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator node
var oscillator = audioCtx.createOscillator();
oscillator.type = 'sine';

var gainNode = audioCtx.createGain();
oscillator.connect(gainNode);
oscillator.start();

class App extends Component {
  constructor(props) {
    super(props);

    this.playSound = this.playSound.bind(this);
    this.stopSound = this.stopSound.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.setPitch = this.setPitch.bind(this);
    this.calculatePitch = this.calculatePitch.bind(this);
  }

  handleMouseMove(e) {
    this.setPitch(e.pageX);
  }

  playSound() {
    gainNode.connect(audioCtx.destination);
  }

  stopSound() {
    gainNode.disconnect(audioCtx.destination);
  }

  // set the oscillator's pitch based on the x position given
  setPitch(x) {
    oscillator.frequency.value = this.calculatePitch(x);
  }

  // given the mouse's x position, calculate what pitch(in hz) is to be played
  calculatePitch(x) {
    const [minHz, maxHz] = mockOptions.range;
    const rate = Math.log2(maxHz / minHz) / window.innerWidth;
    return Math.pow(2, x * rate) * minHz;
  }

  render() {
    return (
      <div>
        <Options />
        <PlayField
          options={mockOptions}
          onMouseEnter={this.playSound}
          onMouseLeave={this.stopSound}
          onMouseMove={this.handleMouseMove}
        />
      </div>
    );
  }
}

export default App;
