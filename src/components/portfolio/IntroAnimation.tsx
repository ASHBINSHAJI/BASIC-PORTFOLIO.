import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { playClickSound } from "@/lib/sounds";

const PARTICLE_COUNT = 200;
const DURATION = 4000;

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  delay: number;
  orbit: number;
}

const generateLetterTargets = (canvas: HTMLCanvasElement): { x: number; y: number }[] => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return [];

  const w = canvas.width;
  const h = canvas.height;
  const fontSize = Math.min(w * 0.15, 160);

  ctx.clearRect(0, 0, w, h);
  ctx.font = `900 ${fontSize}px 'Orbitron', 'Space Grotesk', sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fff";
  ctx.fillText("ASHBIN", w / 2, h / 2);

  const imageData = ctx.getImageData(0, 0, w, h);
  const points: { x: number; y: number }[] = [];
  const step = 3;

  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const i = (y * w + x) * 4;
      if (imageData.data[i + 3] > 128) {
        points.push({ x, y });
      }
    }
  }

  const sampled: { x: number; y: number }[] = [];
  const interval = Math.max(1, Math.floor(points.length / PARTICLE_COUNT));
  for (let i = 0; i < points.length && sampled.length < PARTICLE_COUNT; i += interval) {
    sampled.push(points[i]);
  }
  return sampled;
};

// Ambient floating particles (background)
const FloatingParticle = ({ delay }: { delay: number }) => {
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const size = 1 + Math.random() * 2;
  const duration = 4 + Math.random() * 6;

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: `hsl(212 100% ${50 + Math.random() * 30}% / ${0.2 + Math.random() * 0.3})`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.6, 0.2, 0.5, 0],
        scale: [0, 1, 0.8, 1.2, 0],
        y: [0, -30, -10, -40, -60],
        x: [0, Math.random() * 20 - 10, Math.random() * 30 - 15],
      }}
      transition={{
        duration,
        delay: delay * 0.3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"scatter" | "scan" | "assemble" | "glow" | "exit">("scatter");
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
      size: 1.5 + Math.random() * 2.5,
      delay: i * 0.008,
      orbit: Math.random() * Math.PI * 2,
    }));
    setParticles(generated);

    const t0 = setTimeout(() => setPhase("scan"), 600);
    const t1 = setTimeout(() => setPhase("assemble"), 1800);
    const t2 = setTimeout(() => setPhase("glow"), 3000);
    const t3 = setTimeout(() => triggerExit(), DURATION);

    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [triggerExit]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center cursor-pointer overflow-hidden"
          style={{ background: "#0A0A0A" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          onClick={triggerExit}
        >
          <canvas ref={canvasRef} className="absolute inset-0 opacity-0 pointer-events-none" />

          {/* Ambient floating particles */}
          {Array.from({ length: 40 }).map((_, i) => (
            <FloatingParticle key={`ambient-${i}`} delay={i} />
          ))}

          {/* Scan line */}
          {phase === "scan" && (
            <motion.div
              className="absolute top-0 bottom-0 w-px"
              style={{
                background: "linear-gradient(180deg, transparent, hsl(212 100% 50%), transparent)",
                boxShadow: "0 0 30px hsl(212 100% 50% / 0.6), 0 0 80px hsl(212 100% 50% / 0.3)",
              }}
              initial={{ left: "-5%" }}
              animate={{ left: "105%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          )}

          {/* Second scan line (delayed) */}
          {phase === "scan" && (
            <motion.div
              className="absolute top-0 bottom-0 w-px"
              style={{
                background: "linear-gradient(180deg, transparent, hsl(24 100% 50% / 0.5), transparent)",
                boxShadow: "0 0 20px hsl(24 100% 50% / 0.3)",
              }}
              initial={{ left: "-5%" }}
              animate={{ left: "105%" }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.15 }}
            />
          )}

          {/* Main particles assembling into ASHBIN */}
          <div className="absolute inset-0">
            {particles.map((p, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  background:
                    phase === "glow"
                      ? `hsl(24 100% ${45 + Math.random() * 15}%)`
                      : `hsl(212 100% ${50 + Math.random() * 20}%)`,
                  boxShadow:
                    phase === "glow"
                      ? `0 0 ${p.size * 4}px hsl(24 100% 50% / 0.7), 0 0 ${p.size * 8}px hsl(24 100% 50% / 0.3)`
                      : `0 0 ${p.size * 2}px hsl(212 100% 60% / 0.5)`,
                }}
                initial={{ x: p.x, y: p.y, opacity: 0 }}
                animate={
                  phase === "scatter"
                    ? { x: p.x, y: p.y, opacity: 0 }
                    : phase === "scan"
                    ? {
                        x: p.x + Math.cos(p.orbit) * 30,
                        y: p.y + Math.sin(p.orbit) * 30,
                        opacity: [0, 0.4, 0.2],
                      }
                    : { x: p.targetX, y: p.targetY, opacity: 1 }
                }
                transition={{
                  duration: phase === "scan" ? 1 : 1.2,
                  delay: phase === "scan" ? p.delay : p.delay * 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}
          </div>

          {/* Glow burst behind text */}
          {(phase === "glow") && (
            <motion.div
              className="absolute"
              style={{
                width: "60%",
                height: "30%",
                background: "radial-gradient(ellipse, hsl(24 100% 50% / 0.08) 0%, transparent 70%)",
                top: "35%",
                left: "20%",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.1 }}
              transition={{ duration: 0.8 }}
            />
          )}

          {/* Subtitle */}
          <motion.div
            className="absolute bottom-[22%] left-0 right-0 text-center"
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
