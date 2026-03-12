import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clapperboard, Sparkles, Palette, Eye, Film } from "lucide-react";

const areas = [
  { icon: Clapperboard, title: "Film Concepts", desc: "Original stories with cinematic vision and emotional depth." },
  { icon: Sparkles, title: "VFX", desc: "Visual effects that blur the line between reality and imagination." },
  { icon: Palette, title: "Animation", desc: "Frame-by-frame artistry, from 2D to full 3D pipelines." },
  { icon: Eye, title: "Visual Storytelling", desc: "Every frame tells a story. Every cut has purpose." },
  { icon: Film, title: "Cinematic Design", desc: "Art direction that defines the visual language of brands." },
];

export const AirzeeStudios = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="airzee" className="py-32 md:py-48 px-6 relative">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full particle-glow opacity-[0.06]" />

      <div className="max-w-6xl mx-auto relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4">Creative Division</p>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="liquid-shimmer">AIRZEE Studios</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            Cinema-centric creative studio. Where stories become spectacles.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-panel-hover rounded-2xl p-8 space-y-4 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/5 border border-accent/10 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                <area.icon className="w-7 h-7 text-accent/70 group-hover:text-accent transition-colors" />
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
