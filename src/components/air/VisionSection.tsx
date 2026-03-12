import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Film, Cpu, Wrench } from "lucide-react";

const pillars = [
  { icon: Lightbulb, title: "Innovation", desc: "Pushing boundaries of what's possible through technology and design." },
  { icon: Film, title: "Cinematic Storytelling", desc: "Every brand experience crafted like a visual masterpiece." },
  { icon: Cpu, title: "Future Technology", desc: "Building tomorrow's tools with today's most advanced systems." },
  { icon: Wrench, title: "Creative Engineering", desc: "Where art meets engineering — precision with soul." },
];

export const VisionSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="vision" className="py-32 md:py-48 px-6 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4">About / Vision</p>
          <h2 className="text-5xl md:text-7xl font-bold cinematic-text mb-8">
            The AIR Ecosystem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            AIR is a multi-creative ecosystem built at the intersection of cinema, technology, 
            and design. We don't follow trends — we create them.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-panel-hover rounded-2xl p-8 text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto">
                <pillar.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
