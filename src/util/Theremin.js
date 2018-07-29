export default class Theremin {
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

    // options object
    this.options = {
      volumeArea: 50,
      maxVolume: 100,
      range: [80, 1440],
      key: 'C',
      scale: 'Major'
    };
  }

  playSound = () => {
    this.gainNode.connect(this.audioCtx.destination);
  };

  stopSound = () => {
    this.gainNode.disconnect(this.audioCtx.destination);
  };

  // set the volume based on the y position given
  setVolume = y => {
    this.gainNode.gain.value = this.calculateLoudness(
      y,
      this.options.volumeArea,
      this.options.maxVolume
    );
  };

  // set the oscillator's pitch based on the x position given
  setPitch = x => {
    this.oscillator.frequency.value = this.calculatePitch(
      x,
      this.options.range
    );
  };

  // for a given pitch, find the x-coordinate that produces the pitch
  // this is the inverse function of calculatePitch
  findPitchLocation = pitch => {
    const [minHz, maxHz] = this.options.range;
    return (
      (window.innerWidth * Math.log2(pitch / minHz)) / Math.log2(maxHz / minHz)
    );
  };

  // given the mouse's x position and pitch range, calculate what pitch (in hz) is to be played
  // this is the inverse function of findPitchLocation
  calculatePitch = x => {
    const [minHz, maxHz] = this.options.range;
    const rate = Math.log2(maxHz / minHz) / window.innerWidth;
    return Math.pow(2, x * rate) * minHz;
  };

  // given the mouse's y position and max volume, calculate how loud the audio should play
  calculateLoudness = y => {
    const { volumeArea, maxVolume } = this.options;
    const volumeFieldHeight = (volumeArea / 100) * window.innerHeight;
    const volumeFieldY = ((1 - volumeArea / 100) / 2) * window.innerHeight;
    const relativeToVolumeY = y - volumeFieldY;
    const withCappedRange = Math.max(
      0,
      Math.min(relativeToVolumeY, volumeFieldHeight)
    );
    const relativeToVolumeFieldInPercentage =
      withCappedRange / volumeFieldHeight;
    return (relativeToVolumeFieldInPercentage * maxVolume) / 100;
  };
}
