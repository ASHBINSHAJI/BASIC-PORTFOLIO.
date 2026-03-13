import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Cpu, Layers, Rocket } from "lucide-react";

const experiments = [
  { icon: Lightbulb, title: "AI System Blueprints", desc: "Conceptual designs for next-generation AI-powered platforms and intelligent interfaces." },
  { icon: Cpu, title: "Embedded AI Prototypes", desc: "Hardware + software prototypes integrating machine learning at the edge." },
  { icon: Layers, title: "Product Blueprints", desc: "Detailed system architectures and wireframes for ambitious product concepts." },
  { icon: Rocket, title: "Futuristic Concepts", desc: "Speculative design explorations — imagining technologies 5-10 years ahead." },
];

export const InnovationLab = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="innovation" className="py-28 md:py-40 px-6 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4">Experimental</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="cinematic-text-orange">Innovation</span>{" "}
            <span className="cinematic-text">Lab</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Experimental ideas, product blueprints, and futuristic concepts in active exploration.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {experiments.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-panel-hover rounded-2xl p-8 space-y-4 group card-float"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center group-hover:bg-accent/20 transition-colors shrink-0">
                  <exp.icon className="w-6 h-6 text-accent/70 group-hover:text-accent transition-colors" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{exp.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-1">{exp.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
