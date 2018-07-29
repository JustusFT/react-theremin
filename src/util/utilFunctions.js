// given the mouse's x position and pitch range, calculate what pitch (in hz) is to be played
// this is the inverse function of findPitchLocation
export function calculatePitch(x, [minHz, maxHz]) {
  const rate = Math.log2(maxHz / minHz) / window.innerWidth;
  return Math.pow(2, x * rate) * minHz;
}

// for a given pitch, find the x-coordinate that produces the pitch
// this is the inverse function of calculatePitch
export function findPitchLocation(pitch, [minHz, maxHz]) {
  return (
    (window.innerWidth * Math.log2(pitch / minHz)) / Math.log2(maxHz / minHz)
  );
}

// gets the frequency (in hz) of the nth key of a piano
// formula taken from https://en.wikipedia.org/wiki/Piano_key_frequencies
export function tone(n) {
  return Math.pow(Math.pow(2, 1 / 12), n - 49) * 440;
}

// given the mouse's y position and max volume, calculate how loud the audio should play
export function calculateLoudness(y, volumeArea, maxVolume) {
  const volumeFieldHeight = (volumeArea / 100) * window.innerHeight;
  const volumeFieldY = ((1 - volumeArea / 100) / 2) * window.innerHeight;
  const relativeToVolumeY = y - volumeFieldY;
  const withCappedRange = Math.max(
    0,
    Math.min(relativeToVolumeY, volumeFieldHeight)
  );
  const relativeToVolumeFieldInPercentage = withCappedRange / volumeFieldHeight;
  return (relativeToVolumeFieldInPercentage * maxVolume) / 100;
}
