import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { playClickSound } from "@/lib/sounds";

const PARTICLE_COUNT = 80;
const DURATION = 3500;

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  delay: number;
}

const generateLetterTargets = (canvas: HTMLCanvasElement): { x: number; y: number }[] => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return [];

  const w = canvas.width;
  const h = canvas.height;
  const fontSize = Math.min(w * 0.25, 200);

  ctx.clearRect(0, 0, w, h);
  ctx.font = `900 ${fontSize}px 'Orbitron', 'Space Grotesk', sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fff";
  ctx.fillText("ASHBIN", w / 2, h / 2);

  const imageData = ctx.getImageData(0, 0, w, h);
  const points: { x: number; y: number }[] = [];
  const step = 4;

  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const i = (y * w + x) * 4;
      if (imageData.data[i + 3] > 128) {
        points.push({ x, y });
      }
    }
  }

  // Sample down to PARTICLE_COUNT
  const sampled: { x: number; y: number }[] = [];
  const interval = Math.max(1, Math.floor(points.length / PARTICLE_COUNT));
  for (let i = 0; i < points.length && sampled.length < PARTICLE_COUNT; i += interval) {
    sampled.push(points[i]);
  }
  return sampled;
};

export const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"scan" | "assemble" | "glow" | "exit">("scan");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const hasExited = useRef(false);

  const triggerExit = useCallback(() => {
    if (hasExited.current) return;
    hasExited.current = true;
    playClickSound();
    setPhase("exit");
    setTimeout(onComplete, 900);
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const targets = generateLetterTargets(canvas);
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);

    const generated: Particle[] = targets.map((t, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      targetX: t.x,
      targetY: t.y,
      size: 2 + Math.random() * 2,
      delay: i * 0.015,
    }));
    setParticles(generated);

    // Phase timeline
    const t1 = setTimeout(() => setPhase("assemble"), 1200);
    const t2 = setTimeout(() => setPhase("glow"), 2400);
    const t3 = setTimeout(() => triggerExit(), DURATION);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [triggerExit]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center cursor-pointer"
          style={{ background: "#0A0A0A" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          onClick={triggerExit}
        >
          {/* Hidden canvas for text measurement */}
          <canvas ref={canvasRef} className="absolute inset-0 opacity-0 pointer-events-none" />

          {/* Scan line */}
          {phase === "scan" && (
            <motion.div
              className="absolute top-0 bottom-0 w-px"
              style={{
                background: "linear-gradient(180deg, transparent, hsl(212 100% 50%), transparent)",
                boxShadow: "0 0 20px hsl(212 100% 50% / 0.5), 0 0 60px hsl(212 100% 50% / 0.2)",
              }}
              initial={{ left: "-5%" }}
              animate={{ left: "105%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          )}

          {/* Particles assembling into AIR */}
          <div className="absolute inset-0">
            {particles.map((p, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  background: phase === "glow"
                    ? "hsl(24 100% 50%)"
                    : "hsl(212 100% 60%)",
                  boxShadow: phase === "glow"
                    ? `0 0 ${p.size * 3}px hsl(24 100% 50% / 0.6)`
                    : `0 0 ${p.size * 2}px hsl(212 100% 60% / 0.4)`,
                }}
                initial={{ x: p.x, y: p.y, opacity: 0 }}
                animate={
                  phase === "scan"
                    ? { x: p.x, y: p.y, opacity: [0, 0.6, 0.3] }
                    : { x: p.targetX, y: p.targetY, opacity: 1 }
                }
                transition={{
                  duration: phase === "scan" ? 0.8 : 1,
                  delay: phase === "scan" ? p.delay : p.delay * 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}
          </div>

          {/* Subtitle text */}
          <motion.div
            className="absolute bottom-[25%] left-0 right-0 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={phase === "glow" ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xs tracking-[0.5em] uppercase text-muted-foreground font-light">
              Ashbin Shaji · Creative Technologist
            </p>
          </motion.div>

          {/* Skip hint */}
          <motion.p
            className="absolute bottom-8 left-0 right-0 text-center text-[10px] tracking-[0.3em] uppercase text-muted-foreground/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            click anywhere to skip
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
