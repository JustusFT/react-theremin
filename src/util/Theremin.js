import { PIANO_KEY_COUNT, SCALES, KEYS } from './constants';

// gets the frequency (in hz) of the nth key of a piano
// formula taken from https://en.wikipedia.org/wiki/Piano_key_frequencies
function tone(n) {
  return Math.pow(Math.pow(2, 1 / 12), n - 49) * 440;
}

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

  // get an array of x values where the pitch will be on key
  getNotePositions = () => {
    const selectedKey = KEYS.indexOf(this.options.key);
    const selectedScale = SCALES[this.options.scale];

    const guideLines = [];

    for (let i = 0; i < PIANO_KEY_COUNT; i++) {
      // skip notes that are not part of the scale
      const offset = (i - 4 - selectedKey) % 12;
      const isPartOfScale = selectedScale[offset] === 1;
      if (!isPartOfScale) {
        continue;
      }

      // find the x-position of the guideline
      const pitch = tone(i);
      const x = Math.round(this.findPitchLocation(pitch));

      // don't add the guideline if its off-screen
      const isOnScreen = x >= 0 && x <= window.innerWidth;
      if (!isOnScreen) {
        continue;
      }

      guideLines.push(x);
    }

    return guideLines;
  };
}
