export function createPlayback(onChange, intervalMs = 500) {
  let frames = [], position = 0, timer = null, delay = intervalMs;
  const publish = () => onChange({ frames, position, state: frames[position] ?? null, playing: timer !== null });
  const stop = () => { if (timer !== null) clearInterval(timer); timer = null; };
  const api = {
    load(nextFrames) { stop(); frames = nextFrames.map((frame) => frame.slice()); position = 0; publish(); },
    play() { if (!frames.length || timer !== null) return; timer = setInterval(() => { if (position >= frames.length - 1) stop(); else position++; publish(); }, delay); publish(); },
    pause() { stop(); publish(); },
    next() { stop(); position = Math.min(position + 1, Math.max(frames.length - 1, 0)); publish(); },
    previous() { stop(); position = Math.max(0, position - 1); publish(); },
    reset() { stop(); position = 0; publish(); },
    setSpeed(ms) { delay = ms; if (timer !== null) { stop(); api.play(); } },
    destroy() { stop(); },
  };
  return api;
}
