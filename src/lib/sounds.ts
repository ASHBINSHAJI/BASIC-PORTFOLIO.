let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

/** Calm, satisfying click — warm pop with body */
export function playClickSound() {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(700, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.09);
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.12);

  const ot = ctx.createOscillator();
  const otGain = ctx.createGain();
  ot.type = "sine";
  ot.frequency.setValueAtTime(1400, ctx.currentTime);
  ot.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.05);
  otGain.gain.setValueAtTime(0.1, ctx.currentTime);
  otGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
  ot.connect(otGain).connect(ctx.destination);
  ot.start();
  ot.stop(ctx.currentTime + 0.06);
}
