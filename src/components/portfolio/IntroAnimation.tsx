import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { playClickSound } from "@/lib/sounds";

const DURATION = 4500;

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  delay: number;
  orbit: number;
  brightness: number;
}

const generateLetterTargets = (
  screenW: number,
  screenH: number,
  particleCount: number
): { x: number; y: number }[] => {
  const canvas = document.createElement("canvas");
  // Use a fixed internal resolution for reliable text sampling
  const scale = 2;
  canvas.width = screenW * scale;
  canvas.height = screenH * scale;
  const ctx = canvas.getContext("2d");
  if (!ctx) return [];

  const w = canvas.width;
  const h = canvas.height;
  const isMobile = screenW < 600;
  const fontSize = isMobile
    ? Math.max(screenW * 0.2, 48) * scale
    : Math.min(screenW * 0.12, 140) * scale;

  ctx.clearRect(0, 0, w, h);
  ctx.font = `900 ${fontSize}px 'Orbitron', 'Space Grotesk', monospace, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fff";
  ctx.fillText("ASHBIN", w / 2, h / 2);

  const imageData = ctx.getImageData(0, 0, w, h);
  const points: { x: number; y: number }[] = [];
  const step = isMobile ? 2 : 3;

  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const i = (y * w + x) * 4;
      if (imageData.data[i + 3] > 128) {
        // Map back to screen coordinates
        points.push({ x: x / scale, y: y / scale });
      }
    }
  }

  // Shuffle for better distribution then sample
  for (let i = points.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [points[i], points[j]] = [points[j], points[i]];
  }

  return points.slice(0, particleCount);
};

const AmbientParticle = ({ delay, isMobile }: { delay: number; isMobile: boolean }) => {
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const size = isMobile ? 1.5 + Math.random() * 2 : 0.5 + Math.random() * 2;
  const duration = 5 + Math.random() * 8;

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
        scale: [0, 1.2, 0.8, 1.3, 0],
        y: [0, -15, -5, -25, -40],
        x: [0, Math.random() * 10 - 5, Math.random() * 15 - 7],
      }}
      transition={{
        duration,
        delay: delay * 0.2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

const NebulaLayer = () => (
  <>
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: "radial-gradient(ellipse 80% 50% at 30% 50%, hsl(212 100% 50% / 0.04), transparent)",
      }}
      animate={{ opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: "radial-gradient(ellipse 60% 40% at 70% 60%, hsl(24 100% 50% / 0.03), transparent)",
      }}
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
    />
  </>
);

export const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"scatter" | "scan" | "assemble" | "glow" | "exit">("scatter");
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const hasExited = useRef(false);

  const triggerExit = useCallback(() => {
    if (hasExited.current) return;
    hasExited.current = true;
    playClickSound();
    setPhase("exit");
    setTimeout(onComplete, 900);
  }, [onComplete]);

  useEffect(() => {
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const mobile = screenW < 600;
    setIsMobile(mobile);

    // Fewer particles on mobile for performance, but bigger
    const particleCount = mobile ? 200 : 350;
    const targets = generateLetterTargets(screenW, screenH, particleCount);

    if (targets.length === 0) {
      // Fallback: if canvas text detection fails, skip intro
      triggerExit();
      return;
    }

    const generated: Particle[] = targets.map((t, i) => ({
      x: Math.random() * screenW,
      y: Math.random() * screenH,
      targetX: t.x,
      targetY: t.y,
      size: mobile ? 2 + Math.random() * 2.5 : 1.5 + Math.random() * 2.5,
      delay: i * (mobile ? 0.004 : 0.006),
      orbit: Math.random() * Math.PI * 2,
      brightness: 45 + Math.random() * 30,
    }));
    setParticles(generated);

    const t0 = setTimeout(() => setPhase("scan"), 500);
    const t1 = setTimeout(() => setPhase("assemble"), 1600);
    const t2 = setTimeout(() => setPhase("glow"), 2800);
    const t3 = setTimeout(() => triggerExit(), DURATION);

    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [triggerExit]);

  const ambientCount = isMobile ? 20 : 50;

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
          <NebulaLayer />

          {Array.from({ length: ambientCount }).map((_, i) => (
            <AmbientParticle key={`ambient-${i}`} delay={i} isMobile={isMobile} />
          ))}

          {phase === "scan" && (
            <>
              <motion.div
                className="absolute top-0 bottom-0"
                style={{
                  width: isMobile ? 3 : 2,
                  background: "linear-gradient(180deg, transparent 10%, hsl(212 100% 60%) 50%, transparent 90%)",
                  boxShadow: "0 0 40px 8px hsl(212 100% 50% / 0.4), 0 0 100px hsl(212 100% 50% / 0.15)",
                }}
                initial={{ left: "-5%" }}
                animate={{ left: "105%" }}
                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
              />
              <motion.div
                className="absolute top-0 bottom-0 w-px"
                style={{
                  background: "linear-gradient(180deg, transparent 15%, hsl(24 100% 50% / 0.6) 50%, transparent 85%)",
                  boxShadow: "0 0 25px hsl(24 100% 50% / 0.2)",
                }}
                initial={{ left: "-5%" }}
                animate={{ left: "105%" }}
                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.12 }}
              />
              <motion.div
                className="absolute left-0 right-0 h-px"
                style={{
                  background: "linear-gradient(90deg, transparent 10%, hsl(212 100% 50% / 0.3) 50%, transparent 90%)",
                }}
                initial={{ top: "-5%" }}
                animate={{ top: "105%" }}
                transition={{ duration: 1.4, ease: "easeInOut", delay: 0.3 }}
              />
            </>
          )}

          {/* Main particles using will-change for GPU acceleration */}
          <div className="absolute inset-0" style={{ willChange: "transform" }}>
            {particles.map((p, i) => {
              const isGlow = phase === "glow";
              const isAssembled = phase === "assemble" || isGlow;
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: p.size,
                    height: p.size,
                    willChange: "transform, opacity",
                    background: isGlow
                      ? `hsl(24 100% ${p.brightness}%)`
                      : `hsl(212 100% ${p.brightness}%)`,
                    boxShadow: isGlow
                      ? `0 0 ${p.size * 4}px hsl(24 100% 50% / 0.7), 0 0 ${p.size * 10}px hsl(24 100% 50% / 0.25)`
                      : isAssembled
                      ? `0 0 ${p.size * 3}px hsl(212 100% 60% / 0.6)`
                      : `0 0 ${p.size * 1.5}px hsl(212 100% 60% / 0.4)`,
                  }}
                  initial={{ x: p.x, y: p.y, opacity: 0 }}
                  animate={
                    phase === "scatter"
                      ? { x: p.x, y: p.y, opacity: 0 }
                      : phase === "scan"
                      ? {
                          x: p.x + Math.cos(p.orbit) * (isMobile ? 20 : 40),
                          y: p.y + Math.sin(p.orbit) * (isMobile ? 20 : 40),
                          opacity: [0, 0.4, 0.2],
                        }
                      : { x: p.targetX, y: p.targetY, opacity: 1 }
                  }
                  transition={{
                    duration: phase === "scan" ? 0.8 : 1,
                    delay: phase === "scan" ? p.delay : p.delay * 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              );
            })}
          </div>

          {phase === "glow" && (
            <motion.div
              className="absolute pointer-events-none"
              style={{
                width: "80%",
                height: "40%",
                background: "radial-gradient(ellipse, hsl(24 100% 50% / 0.08) 0%, hsl(24 100% 50% / 0.03) 40%, transparent 70%)",
                top: "30%",
                left: "10%",
              }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1.15 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
          )}

          <motion.div
            className="absolute bottom-[18%] md:bottom-[22%] left-0 right-0 text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={phase === "glow" ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-[10px] md:text-xs tracking-[0.35em] md:tracking-[0.5em] uppercase text-muted-foreground font-light">
              Ashbin Shaji · Creative Technologist
            </p>
          </motion.div>

          <motion.p
            className="absolute bottom-6 md:bottom-8 left-0 right-0 text-center text-[10px] md:text-[10px] tracking-[0.3em] uppercase text-muted-foreground/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            tap anywhere to skip
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
