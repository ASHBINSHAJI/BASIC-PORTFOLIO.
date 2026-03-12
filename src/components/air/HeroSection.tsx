import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const Particle = ({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      background: `radial-gradient(circle, hsl(210 100% 70% / 0.3), transparent 70%)`,
    }}
    animate={{
      y: [0, -30, 0],
      opacity: [0.2, 0.5, 0.2],
      scale: [1, 1.3, 1],
    }}
    transition={{
      duration: 4 + Math.random() * 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

export const HeroSection = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 4 + Math.random() * 8,
    delay: Math.random() * 3,
  }));

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Deep ambient glows */}
      <div className="absolute inset-0">
        <motion.div
          className="particle-glow w-[800px] h-[800px] -top-40 -left-40"
          animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0], scale: [1, 1.2, 0.9, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: 0.15 }}
        />
        <motion.div
          className="particle-glow w-[600px] h-[600px] -bottom-20 -right-20"
          animate={{ x: [0, -60, 30, 0], y: [0, 50, -30, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: 0.1 }}
        />
      </div>

      {/* Floating particles */}
      {particles.map((p) => (
        <Particle key={p.id} delay={p.delay} x={p.x} y={p.y} size={p.size} />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-8xl md:text-[12rem] font-black tracking-[0.15em] cinematic-text text-glow leading-none">
            AIR
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl font-light text-muted-foreground tracking-[0.15em] uppercase"
        >
          Build the future. Design the impossible.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="pt-8"
        >
          <blockquote className="max-w-2xl mx-auto">
            <p className="text-lg md:text-xl italic text-muted-foreground/70 font-light leading-relaxed">
              "People who are crazy enough to think they can change the world are the ones who do."
            </p>
            <footer className="mt-4 text-sm text-muted-foreground/40 tracking-widest uppercase">
              — Steve Jobs
            </footer>
          </blockquote>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="pt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border border-muted-foreground/20 mx-auto flex justify-center pt-2"
          >
            <div className="w-1 h-2.5 rounded-full bg-muted-foreground/30" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
