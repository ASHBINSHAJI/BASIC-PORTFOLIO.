// Synthesized sound effects using Web Audio API — no external files needed

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

/** Sharp, punchy "whoosh" for the intro open */
export function playOpenSound() {
  const ctx = getCtx();

  // Main sweep
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(1200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.25);
  gain.gain.setValueAtTime(0.5, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.35);

  // Sub bass thud
  const sub = ctx.createOscillator();
  const subGain = ctx.createGain();
  sub.type = "sine";
  sub.frequency.setValueAtTime(80, ctx.currentTime);
  sub.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.2);
  subGain.gain.setValueAtTime(0.6, ctx.currentTime);
  subGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
  sub.connect(subGain).connect(ctx.destination);
  sub.start();
  sub.stop(ctx.currentTime + 0.25);

  // Noise burst
  const bufferSize = ctx.sampleRate * 0.15;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.3, ctx.currentTime);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 1500;
  noise.connect(hp).connect(noiseGain).connect(ctx.destination);
  noise.start();
  noise.stop(ctx.currentTime + 0.15);
}

/** Punchy click for buttons, links, cards, interactive elements */
export function playClickSound() {
  const ctx = getCtx();

  // Main click tone
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);
  gain.gain.setValueAtTime(0.35, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.1);

  // Click pop
  const pop = ctx.createOscillator();
  const popGain = ctx.createGain();
  pop.type = "sine";
  pop.frequency.setValueAtTime(1200, ctx.currentTime);
  pop.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.04);
  popGain.gain.setValueAtTime(0.3, ctx.currentTime);
  popGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
  pop.connect(popGain).connect(ctx.destination);
  pop.start();
  pop.stop(ctx.currentTime + 0.05);
}

/** Hover sound for cards and interactive sections */
export function playHoverSound() {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(500, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.06);
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.08);
}

/** Scroll tick — short and snappy */
let lastScrollSound = 0;
export function playScrollSound() {
  const now = Date.now();
  if (now - lastScrollSound < 80) return; // throttle
  lastScrollSound = now;

  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(400 + Math.random() * 300, ctx.currentTime);

  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.04);
}
