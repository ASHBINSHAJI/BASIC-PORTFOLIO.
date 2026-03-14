import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const areas = [
  { num: "01", title: "Motion UI Design", desc: "Crafting fluid, cinematic interfaces with meaningful micro-interactions and transitions." },
  { num: "02", title: "Visual Storytelling", desc: "Every frame tells a story — composition, timing, and emotion drive every visual decision." },
  { num: "03", title: "Creative Direction", desc: "Art direction that defines the visual language of brands and products." },
  { num: "04", title: "Cinematic Animation", desc: "Frame-by-frame artistry from concept to final render — 2D, 3D, and motion graphics." },
];

export const AnimationShowcase = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 md:py-44 px-6 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-accent mb-6 font-medium">Creative Arts</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="heading-gradient">Animation</span>{" "}
            <span className="text-gradient-subtle">& Visual Design</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-border">
          {areas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-background p-8 md:p-10 group hover:bg-card transition-colors duration-500 blue-line-glow"
            >
              <span className="text-xs font-orbitron text-accent/30 group-hover:text-accent transition-colors duration-500">{area.num}</span>
              <h3 className="text-xl font-semibold mt-4 mb-3 text-foreground">{area.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{area.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 section-line" />
    </section>
  );
};
