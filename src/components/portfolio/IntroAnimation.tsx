import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { playClickSound } from "@/lib/sounds";

const DURATION = 6500;

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  delay: number;
  orbit: number;
  brightness: number;
  hue: number;
}

interface GridLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
}

const generateLetterTargets = (
  screenW: number,
  screenH: number,
  particleCount: number
): { x: number; y: number }[] => {
  const canvas = document.createElement("canvas");
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
        points.push({ x: x / scale, y: y / scale });
      }
    }
  }

  for (let i = points.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [points[i], points[j]] = [points[j], points[i]];
  }

  return points.slice(0, particleCount);
};

const generateGridLines = (screenW: number, screenH: number, count: number): GridLine[] => {
  const lines: GridLine[] = [];
  const cx = screenW / 2;
  const cy = screenH / 2;
  
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
    const innerR = 30 + Math.random() * 60;
    const outerR = 120 + Math.random() * Math.min(screenW, screenH) * 0.35;
    lines.push({
      x1: cx + Math.cos(angle) * innerR,
      y1: cy + Math.sin(angle) * innerR,
      x2: cx + Math.cos(angle) * outerR,
      y2: cy + Math.sin(angle) * outerR,
      delay: i * 0.02,
    });
  }
  return lines;
};

// Spark core component
const SparkCore = ({ phase }: { phase: string }) => (
  <motion.div
    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
    style={{
      background: "radial-gradient(circle, hsl(24 100% 60%), hsl(24 100% 45%), transparent)",
    }}
    initial={{ width: 0, height: 0, opacity: 0 }}
    animate={
      phase === "spark"
        ? { width: 8, height: 8, opacity: 1 }
        : phase === "emit"
        ? { width: 16, height: 16, opacity: [1, 0.8, 1] }
        : phase === "grid"
        ? { width: 24, height: 24, opacity: 0.6 }
        : { width: 0, height: 0, opacity: 0 }
    }
    transition={{
      duration: phase === "spark" ? 0.8 : 0.6,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    {/* Inner pulse */}
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{
        boxShadow: "0 0 30px 10px hsl(24 100% 50% / 0.5), 0 0 80px 20px hsl(24 100% 50% / 0.2)",
      }}
      animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0.4, 0.8] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.div>
);

// Energy ring that expands from spark
const EnergyRing = ({ delay, size }: { delay: number; size: number }) => (
  <motion.div
    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
    style={{
      borderColor: "hsl(24 100% 50% / 0.3)",
      boxShadow: "0 0 15px hsl(24 100% 50% / 0.1), inset 0 0 15px hsl(24 100% 50% / 0.05)",
    }}
    initial={{ width: 0, height: 0, opacity: 0 }}
    animate={{ width: size, height: size, opacity: [0, 0.6, 0] }}
    transition={{ duration: 1.5, delay, ease: "easeOut" }}
  />
);

// Floating ember particles from the spark
const EmberParticle = ({ angle, delay }: { angle: number; delay: number }) => {
  const distance = 60 + Math.random() * 200;
  const size = 1.5 + Math.random() * 3;
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 rounded-full"
      style={{
        width: size,
        height: size,
        background: `hsl(${20 + Math.random() * 15} 100% ${50 + Math.random() * 20}%)`,
        boxShadow: `0 0 ${size * 3}px hsl(24 100% 50% / 0.5)`,
      }}
      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
      animate={{
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        opacity: [0, 1, 0.6, 0],
        scale: [0, 1.5, 1, 0],
      }}
      transition={{ duration: 1.5 + Math.random(), delay, ease: "easeOut" }}
    />
  );
};

export const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"black" | "spark" | "emit" | "grid" | "assemble" | "glow" | "exit">("black");
  const [particles, setParticles] = useState<Particle[]>([]);
  const [gridLines, setGridLines] = useState<GridLine[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const hasExited = useRef(false);

  const triggerExit = useCallback(() => {
    if (hasExited.current) return;
    hasExited.current = true;
    playClickSound();
    setPhase("exit");
    setTimeout(onComplete, 1000);
  }, [onComplete]);

  useEffect(() => {
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const mobile = screenW < 600;
    setIsMobile(mobile);

    const particleCount = mobile ? 180 : 350;
    const targets = generateLetterTargets(screenW, screenH, particleCount);
    const lines = generateGridLines(screenW, screenH, mobile ? 24 : 40);
    setGridLines(lines);

    if (targets.length === 0) {
      triggerExit();
      return;
    }

    const cx = screenW / 2;
    const cy = screenH / 2;

    const generated: Particle[] = targets.map((t, i) => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 20 + Math.random() * 80;
      return {
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        targetX: t.x,
        targetY: t.y,
        size: mobile ? 2 + Math.random() * 2.5 : 1.5 + Math.random() * 2.5,
        delay: i * (mobile ? 0.003 : 0.004),
        orbit: angle,
        brightness: 45 + Math.random() * 30,
        hue: 20 + Math.random() * 12,
      };
    });
    setParticles(generated);

    // Phase timeline: black → spark → emit → grid → assemble → glow → exit
    const t0 = setTimeout(() => setPhase("spark"), 400);
    const t1 = setTimeout(() => setPhase("emit"), 1200);
    const t2 = setTimeout(() => setPhase("grid"), 2200);
    const t3 = setTimeout(() => setPhase("assemble"), 3400);
    const t4 = setTimeout(() => setPhase("glow"), 4800);
    const t5 = setTimeout(() => triggerExit(), DURATION);

    return () => {
      clearTimeout(t0); clearTimeout(t1); clearTimeout(t2);
      clearTimeout(t3); clearTimeout(t4); clearTimeout(t5);
    };
  }, [triggerExit]);

  const emberCount = isMobile ? 20 : 40;
  const showSpark = phase === "spark" || phase === "emit" || phase === "grid";
  const showEmbers = phase === "emit" || phase === "grid";
  const showGrid = phase === "grid" || phase === "assemble" || phase === "glow";
  const showParticles = phase === "assemble" || phase === "glow";
  const isGlow = phase === "glow";

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          className="fixed inset-0 z-[100] cursor-pointer overflow-hidden"
          style={{ background: "#050505" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          onClick={triggerExit}
        >
          {/* Deep ambient nebula */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(24 100% 50% / 0.03), transparent 70%)",
            }}
            animate={showSpark ? { opacity: [0, 0.5, 0.3] } : { opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 40% 45%, hsl(212 100% 50% / 0.02), transparent 70%)",
            }}
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Spark core */}
          {showSpark && <SparkCore phase={phase} />}

          {/* Energy rings expanding from spark */}
          {showEmbers && (
            <>
              <EnergyRing delay={0} size={200} />
              <EnergyRing delay={0.3} size={350} />
              <EnergyRing delay={0.6} size={500} />
            </>
          )}

          {/* Ember particles shooting from spark */}
          {showEmbers &&
            Array.from({ length: emberCount }).map((_, i) => (
              <EmberParticle
                key={`ember-${i}`}
                angle={(Math.PI * 2 * i) / emberCount + Math.random() * 0.5}
                delay={i * 0.03}
              />
            ))}

          {/* 3D geometric grid lines */}
          {showGrid && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ willChange: "transform" }}>
              {gridLines.map((line, i) => (
                <motion.line
                  key={`grid-${i}`}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke={i % 3 === 0 ? "hsl(24 100% 50% / 0.15)" : "hsl(212 100% 50% / 0.08)"}
                  strokeWidth={0.5}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    phase === "assemble" || phase === "glow"
                      ? { pathLength: 1, opacity: [0.3, 0.1, 0] }
                      : { pathLength: 1, opacity: 0.3 }
                  }
                  transition={{
                    pathLength: { duration: 0.8, delay: line.delay, ease: "easeOut" },
                    opacity:
                      phase === "assemble" || phase === "glow"
                        ? { duration: 1.2, delay: line.delay + 0.3 }
                        : { duration: 0.5, delay: line.delay },
                  }}
                />
              ))}
              {/* Concentric grid rings */}
              {[80, 150, 240].map((r, i) => (
                <motion.circle
                  key={`ring-${i}`}
                  cx="50%"
                  cy="50%"
                  r={r}
                  fill="none"
                  stroke="hsl(212 100% 50% / 0.06)"
                  strokeWidth={0.5}
                  strokeDasharray="4 8"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    phase === "assemble" || phase === "glow"
                      ? { pathLength: 1, opacity: 0 }
                      : { pathLength: 1, opacity: 0.4 }
                  }
                  transition={{
                    pathLength: { duration: 1, delay: i * 0.15, ease: "easeOut" },
                    opacity: { duration: 1, delay: i * 0.15 + 0.5 },
                  }}
                />
              ))}
            </svg>
          )}

          {/* Main particles — assemble into ASHBIN */}
          {showParticles && (
            <div className="absolute inset-0" style={{ willChange: "transform" }}>
              {particles.map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: p.size,
                    height: p.size,
                    willChange: "transform, opacity",
                    background: isGlow
                      ? `hsl(${p.hue} 100% ${p.brightness}%)`
                      : `hsl(212 100% ${p.brightness}%)`,
                    boxShadow: isGlow
                      ? `0 0 ${p.size * 4}px hsl(24 100% 50% / 0.7), 0 0 ${p.size * 10}px hsl(24 100% 50% / 0.25)`
                      : `0 0 ${p.size * 3}px hsl(212 100% 60% / 0.5)`,
                  }}
                  initial={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
                  animate={{ x: p.targetX, y: p.targetY, opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1.2,
                    delay: p.delay,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              ))}
            </div>
          )}

          {/* Central glow burst when assembled */}
          {isGlow && (
            <>
              <motion.div
                className="absolute pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: "80%",
                  height: "40%",
                  background:
                    "radial-gradient(ellipse, hsl(24 100% 50% / 0.08) 0%, hsl(24 100% 50% / 0.03) 40%, transparent 70%)",
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.2 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              {/* Horizontal light sweep */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 h-px"
                style={{
                  background: "linear-gradient(90deg, transparent, hsl(24 100% 50% / 0.4), transparent)",
                  boxShadow: "0 0 20px hsl(24 100% 50% / 0.2)",
                }}
                initial={{ left: "20%", right: "80%", opacity: 0 }}
                animate={{ left: "10%", right: "10%", opacity: [0, 1, 0.5] }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </>
          )}

          {/* Subtitle */}
          <motion.div
            className="absolute bottom-[18%] md:bottom-[22%] left-0 right-0 text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isGlow ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-[10px] md:text-xs tracking-[0.35em] md:tracking-[0.5em] uppercase text-muted-foreground font-light">
              Ashbin Shaji · Creative Technologist
            </p>
          </motion.div>

          {/* Skip hint */}
          <motion.p
            className="absolute bottom-6 md:bottom-8 left-0 right-0 text-center text-[10px] tracking-[0.3em] uppercase text-muted-foreground/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            tap anywhere to skip
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
