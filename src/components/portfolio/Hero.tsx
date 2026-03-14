import { motion } from "framer-motion";

const FloatingOrb = () => (
  <div className="relative w-full h-full flex items-center justify-center animate-float-orb">
    {/* Outer ring */}
    <motion.div
      className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full border border-accent/10"
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    />
    {/* Middle ring */}
    <motion.div
      className="absolute w-48 h-48 md:w-60 md:h-60 rounded-full border border-primary/10"
      animate={{ rotate: -360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
    {/* Core orb */}
    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full"
      style={{
        background: "radial-gradient(circle at 35% 35%, hsl(24 100% 55% / 0.2), hsl(212 100% 50% / 0.08), transparent 70%)",
        boxShadow: "0 0 80px hsl(24 100% 50% / 0.1), 0 0 160px hsl(212 100% 50% / 0.05), inset 0 0 60px hsl(24 100% 50% / 0.05)",
      }}
    >
      {/* Inner glow */}
      <motion.div
        className="absolute inset-4 rounded-full"
        style={{
          background: "radial-gradient(circle at 40% 40%, hsl(24 100% 50% / 0.3), transparent 60%)",
        }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
    {/* Orbital dots */}
    {[0, 120, 240].map((deg) => (
      <motion.div
        key={deg}
        className="absolute w-1.5 h-1.5 rounded-full bg-accent/40"
        style={{ transformOrigin: "0 0" }}
        animate={{ rotate: [deg, deg + 360] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-accent/40"
          style={{ transform: `translateX(${120}px)` }}
        />
      </motion.div>
    ))}
  </div>
);

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden tech-grid">
      {/* Ambient glow - top left */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(24 100% 50% / 0.04), transparent 70%)" }}
      />
      {/* Ambient glow - bottom right */}
      <div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(212 100% 50% / 0.03), transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left - Text */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="space-y-2">
            <p className="text-xs tracking-[0.4em] uppercase text-accent font-medium">
              Creative Technologist
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95]">
              <span className="heading-gradient">Ashbin</span>
              <br />
              <span className="text-gradient-subtle">Shaji</span>
            </h1>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-lg">
            Building systems, worlds, and interactive experiences at the intersection of technology, design, and cinema.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <a
              href="#projects"
              className="btn-sweep rounded-sm px-8 py-3 text-sm font-medium tracking-wider uppercase relative z-10"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Work
            </a>
            <a
              href="#contact"
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-500 tracking-wider uppercase"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get in Touch →
            </a>
          </div>

          {/* Quote */}
          <motion.blockquote
            className="pt-8 border-l border-primary/20 pl-6 max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="text-sm text-muted-foreground/60 italic leading-relaxed">
              "People who are crazy enough to think they can change the world are the ones who do."
            </p>
            <footer className="mt-2 text-[10px] tracking-[0.3em] uppercase text-muted-foreground/30">
              — Steve Jobs
            </footer>
          </motion.blockquote>
        </motion.div>

        {/* Right - Floating Orb */}
        <motion.div
          className="hidden lg:flex items-center justify-center h-[500px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <FloatingOrb />
        </motion.div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 section-line" />
    </section>
  );
};
