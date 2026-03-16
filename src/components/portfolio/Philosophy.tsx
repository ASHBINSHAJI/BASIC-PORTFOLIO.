import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GlassCard } from "./GlassCard";

const pillars = [
  { num: "01", title: "Innovation First", desc: "Pushing boundaries of what's possible through technology and relentless creativity." },
  { num: "02", title: "Cinematic Vision", desc: "Every product experience crafted like a visual masterpiece — intentional and immersive." },
  { num: "03", title: "Future Technology", desc: "Building tomorrow's tools with today's most advanced systems and AI." },
  { num: "04", title: "Creative Engineering", desc: "Where art meets engineering — precision with soul, function with beauty." },
];

export const Philosophy = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="philosophy" className="py-32 md:py-44 px-6 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-accent mb-6 font-medium">Philosophy</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="heading-gradient">Think Different.</span>
            <br />
            <span className="text-gradient-subtle">Build Different.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-2xl">
            Inspired by visionary thinkers like Steve Jobs — technology should merge creativity and engineering to create experiences that move people.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p, i) => (
            <GlassCard key={p.title} delay={i * 0.1} parallaxStrength={15 + i * 5} glowColor={i % 2 === 0 ? "accent" : "primary"}>
              <div className="space-y-4">
                <span className="text-xs font-orbitron text-accent/40 group-hover:text-accent transition-colors duration-500">{p.num}</span>
                <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 section-line" />
    </section>
  );
};
