import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Film, Eye, Palette, Sparkles } from "lucide-react";

const areas = [
  { icon: Film, title: "Motion UI Design", desc: "Crafting fluid, cinematic interfaces with meaningful micro-interactions and transitions." },
  { icon: Eye, title: "Visual Storytelling", desc: "Every frame tells a story — composition, timing, and emotion drive every visual decision." },
  { icon: Palette, title: "Creative Direction", desc: "Art direction that defines the visual language of brands and products." },
  { icon: Sparkles, title: "Cinematic Animation", desc: "Frame-by-frame artistry from concept to final render — 2D, 3D, and motion graphics." },
];

export const AnimationShowcase = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-28 md:py-40 px-6 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] particle-glow opacity-[0.04]" />

      <div className="max-w-6xl mx-auto relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4">Creative Arts</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="cinematic-text-orange">Animation</span>{" "}
            <span className="cinematic-text">& Visual Design</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Cinematic visual storytelling — where motion, design, and emotion converge.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {areas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-panel-hover rounded-2xl p-8 space-y-4 group card-float"
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/8 border border-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                <area.icon className="w-7 h-7 text-primary/60 group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-xl font-semibold">{area.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{area.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
