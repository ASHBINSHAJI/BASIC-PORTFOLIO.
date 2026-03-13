let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

/** Warm satisfying click — cute pop */
export function playClickSound() {
  const ctx = getCtx();
  const t = ctx.currentTime;

  // Primary warm pop
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(800, t);
  osc.frequency.exponentialRampToValueAtTime(400, t + 0.08);
  gain.gain.setValueAtTime(0.18, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
  osc.connect(gain).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.1);

  // Sparkle overtone
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(1600, t);
  osc2.frequency.exponentialRampToValueAtTime(900, t + 0.05);
  gain2.gain.setValueAtTime(0.06, t);
  gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
  osc2.connect(gain2).connect(ctx.destination);
  osc2.start(t);
  osc2.stop(t + 0.06);
}
