export function njs([ pitch ], delay) {
  pitch = Number(pitch);
  if (isNaN(pitch) || !isFinite(pitch))
    pitch = 1;
  if (pitch === 0) return { filter: '', delay: false };
  return {
    filter: '[{0}]asetrate=' + (48000 * Math.abs(pitch)) + '[{1}]' +
      (pitch < 0 ? ';[{1}]areverse[{2}]' : ''),
    delay: delay / pitch
  };
}

export function browser([ pitch ], delay, _, input) {
  pitch = Number(pitch);
  if (isNaN(pitch) || !isFinite(pitch))
    pitch = 1;
  if (pitch === 0) return {};
  if (pitch < 0) input.buffer.reverse();
  console.log(pitch, input);

  input.playbackRate.value *= pitch;

  return {
    delay: delay / pitch,
    node: input
  };
}