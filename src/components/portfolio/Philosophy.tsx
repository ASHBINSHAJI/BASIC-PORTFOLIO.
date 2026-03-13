import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Film, Cpu, Wrench } from "lucide-react";

const pillars = [
  { icon: Lightbulb, title: "Innovation First", desc: "Pushing boundaries of what's possible through technology and relentless creativity." },
  { icon: Film, title: "Cinematic Vision", desc: "Every product experience crafted like a visual masterpiece — intentional, immersive." },
  { icon: Cpu, title: "Future Technology", desc: "Building tomorrow's tools with today's most advanced systems and AI." },
  { icon: Wrench, title: "Creative Engineering", desc: "Where art meets engineering — precision with soul, function with beauty." },
];

export const Philosophy = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="philosophy" className="py-28 md:py-40 px-6 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4">Philosophy</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="cinematic-text-orange">Think Different.</span>{" "}
            <span className="cinematic-text">Build Different.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            Inspired by visionary thinkers like Steve Jobs — the philosophy is simple: technology should merge creativity and engineering to create experiences that move people.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-panel-hover rounded-2xl p-7 text-center space-y-4 card-float"
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                <p.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
