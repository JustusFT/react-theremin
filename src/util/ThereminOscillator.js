import { calculatePitch, calculateLoudness } from './utilFunctions';

export default class ThereminOscillator {
  constructor() {
    // create web audio api context
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // oscillator node
    this.oscillator = this.audioCtx.createOscillator();
    this.oscillator.type = 'sine';

    // gain node
    this.gainNode = this.audioCtx.createGain();
    this.oscillator.connect(this.gainNode);

    // activate
    this.oscillator.start();

    // bindings
    this.playSound = this.playSound.bind(this);
    this.stopSound = this.stopSound.bind(this);
    this.setPitch = this.setPitch.bind(this);

    // options object
    this.options = {
      volumeArea: 50,
      maxVolume: 1,
      range: [80, 1440],
      key: 'C',
      scale: 'Major'
    };
  }

  playSound() {
    this.gainNode.connect(this.audioCtx.destination);
  }

  stopSound() {
    this.gainNode.disconnect(this.audioCtx.destination);
  }

  // set the volume based on the y position given
  setVolume(y) {
    this.gainNode.gain.value = calculateLoudness(
      y,
      this.options.volumeArea,
      this.options.maxVolume
    );
  }

  // set the oscillator's pitch based on the x position given
  setPitch(x) {
    this.oscillator.frequency.value = calculatePitch(x, this.options.range);
  }
}
