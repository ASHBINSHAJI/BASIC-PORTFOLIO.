import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GlassCard } from "./GlassCard";

const experiments = [
  { title: "AI System Blueprints", desc: "Conceptual designs for next-generation AI-powered platforms and intelligent interfaces." },
  { title: "Embedded AI Prototypes", desc: "Hardware + software prototypes integrating machine learning at the edge." },
  { title: "Product Blueprints", desc: "Detailed system architectures and wireframes for ambitious product concepts." },
  { title: "Futuristic Concepts", desc: "Speculative design explorations — imagining technologies 5-10 years ahead." },
];

export const InnovationLab = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="innovation" className="py-32 md:py-44 px-6 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-accent mb-6 font-medium">Experimental</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="heading-gradient">Innovation</span>{" "}
            <span className="text-gradient-subtle">Lab</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl">
            Experimental ideas, product blueprints, and futuristic concepts in active exploration.
          </p>
        </motion.div>

        <div className="space-y-3">
          {experiments.map((exp, i) => (
            <GlassCard key={exp.title} delay={i * 0.1} parallaxStrength={15} glowColor={i % 2 === 0 ? "accent" : "primary"}>
              <div className="flex items-start gap-6">
                <span className="text-xs font-orbitron text-accent/30 group-hover:text-accent transition-colors duration-500 mt-1 shrink-0">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-500">{exp.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2">{exp.desc}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 section-line" />
    </section>
  );
};
