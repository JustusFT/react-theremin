import React, { Component } from 'react';
import Options from './Options';
import PlayField from './PlayField';

const mockOptions = {
  volumeArea: 50
  //range: [80, 1440],
  //key: 'C',
  //scale: 'major'
};

// create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator node
var oscillator = audioCtx.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz

var gainNode = audioCtx.createGain();
oscillator.connect(gainNode);
oscillator.start();

class App extends Component {
  constructor(props) {
    super(props);

    this.playSound = this.playSound.bind(this);
    this.stopSound = this.stopSound.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  playSound() {
    gainNode.connect(audioCtx.destination);
  }

  stopSound() {
    gainNode.disconnect(audioCtx.destination);
  }

  handleMouseMove(e) {
    console.log(e);
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
