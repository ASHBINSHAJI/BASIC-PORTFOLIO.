import { motion } from "framer-motion";

const Particle = ({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      background: `radial-gradient(circle, hsl(25 95% 55% / 0.25), transparent 70%)`,
    }}
    animate={{ y: [0, -25, 0], opacity: [0.15, 0.4, 0.15], scale: [1, 1.2, 1] }}
    transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, ease: "easeInOut", delay }}
  />
);

export const Hero = () => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 4 + Math.random() * 8,
    delay: Math.random() * 3,
  }));

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="particle-glow w-[600px] h-[600px] -top-40 -left-40"
          animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.2, 0.9, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: 0.12 }}
        />
        <motion.div
          className="particle-glow-blue w-[500px] h-[500px] -bottom-20 -right-20"
          animate={{ x: [0, -40, 20, 0], y: [0, 30, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: 0.08 }}
        />
      </div>

      {particles.map((p) => (
        <Particle key={p.id} delay={p.delay} x={p.x} y={p.y} size={p.size} />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto text-center px-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm tracking-[0.4em] uppercase text-accent mb-6">Creator · Builder · Visionary</p>
          <h1 className="text-6xl md:text-[9rem] font-black tracking-tight leading-none">
            <span className="cinematic-text-orange text-glow-orange">Ashbin</span>
            <br />
            <span className="cinematic-text">Shaji</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Building futuristic digital systems and experiences at the intersection of technology, animation, and design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="pt-4"
        >
          <blockquote className="max-w-xl mx-auto">
            <p className="text-base md:text-lg italic text-muted-foreground/60 font-light leading-relaxed">
              "People who are crazy enough to think they can change the world are the ones who do."
            </p>
            <footer className="mt-3 text-xs text-muted-foreground/30 tracking-[0.3em] uppercase">
              — Steve Jobs
            </footer>
          </blockquote>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="pt-12"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border border-primary/20 mx-auto flex justify-center pt-2"
          >
            <div className="w-1 h-2.5 rounded-full bg-primary/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
