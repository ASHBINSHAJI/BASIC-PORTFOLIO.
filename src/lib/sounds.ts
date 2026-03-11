// Optimized synthesized sound effects using Web Audio API

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

/** Calm but full intro whoosh — smooth sweep with warm sub */
export function playOpenSound() {
  const ctx = getCtx();

  // Smooth sweep (not harsh)
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(3000, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.4);

  osc.type = "sine";
  osc.frequency.setValueAtTime(900, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.35);
  gain.gain.setValueAtTime(0.4, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
  osc.connect(filter).connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.45);

  // Warm sub thud
  const sub = ctx.createOscillator();
  const subGain = ctx.createGain();
  sub.type = "sine";
  sub.frequency.setValueAtTime(70, ctx.currentTime);
  sub.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.3);
  subGain.gain.setValueAtTime(0.45, ctx.currentTime);
  subGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
  sub.connect(subGain).connect(ctx.destination);
  sub.start();
  sub.stop(ctx.currentTime + 0.35);

  // Soft air layer
  const bufferSize = ctx.sampleRate * 0.12;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.15, ctx.currentTime);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 2000;
  bp.Q.value = 0.8;
  noise.connect(bp).connect(noiseGain).connect(ctx.destination);
  noise.start();
  noise.stop(ctx.currentTime + 0.12);
}

/** Calm, satisfying click — warm pop with body */
export function playClickSound() {
  const ctx = getCtx();

  // Warm pop
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

  // Subtle overtone for fullness
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

/** Gentle hover */
export function playHoverSound() {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(500, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(650, ctx.currentTime + 0.06);
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.07);
}

/** Scroll tick — stops INSTANTLY when scrolling stops */
let scrollOsc: OscillatorNode | null = null;
let scrollGain: GainNode | null = null;
let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
let lastScrollTime = 0;

export function playScrollSound() {
  const now = Date.now();
  const ctx = getCtx();

  // If already playing, just extend. Otherwise start fresh.
  if (now - lastScrollTime < 60) {
    // Already ticking — just reset the stop timer
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(stopScrollSound, 50);
    lastScrollTime = now;
    return;
  }
  lastScrollTime = now;

  // Stop any lingering sound
  stopScrollSound();

  // Create new tick
  scrollOsc = ctx.createOscillator();
  scrollGain = ctx.createGain();
  scrollOsc.type = "triangle";
  scrollOsc.frequency.setValueAtTime(350 + Math.random() * 200, ctx.currentTime);
  scrollGain.gain.setValueAtTime(0.15, ctx.currentTime);
  scrollOsc.connect(scrollGain).connect(ctx.destination);
  scrollOsc.start();

  // Auto-stop after very short duration or when scroll stops
  scrollTimeout = setTimeout(stopScrollSound, 50);
}

function stopScrollSound() {
  if (scrollGain && scrollOsc) {
    try {
      const ctx = getCtx();
      scrollGain.gain.cancelScheduledValues(ctx.currentTime);
      scrollGain.gain.setValueAtTime(scrollGain.gain.value, ctx.currentTime);
      scrollGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.015);
      scrollOsc.stop(ctx.currentTime + 0.02);
    } catch {
      // Already stopped
    }
    scrollOsc = null;
    scrollGain = null;
  }
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
    scrollTimeout = null;
  }
}
