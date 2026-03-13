import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Gamepad2, Clock, Sparkles } from "lucide-react";

const games = [
  { title: "Project Zenith", genre: "Action RPG", status: "In Development" },
  { title: "Phantom Circuit", genre: "Cyberpunk Adventure", status: "In Development" },
  { title: "Eclipse Protocol", genre: "Tactical Shooter", status: "Concept Phase" },
  { title: "Aether Drift", genre: "Open World Racing", status: "Concept Phase" },
];

export const GameVision = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="games" className="py-28 md:py-40 px-6 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4">Air Epics · Game Division</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="liquid-shimmer">Game Development</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            Creating cinematic, story-driven games inspired by real-world environments and high-end visual design. 
            4 original game projects currently in development. Scripts are prepared — the first teaser launches in 2026.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-panel rounded-2xl p-8 md:p-10 mb-10 text-center"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div>
              <p className="text-5xl md:text-6xl font-black cinematic-text-orange">4</p>
              <p className="text-sm text-muted-foreground mt-2 tracking-wider uppercase">Original Projects</p>
            </div>
            <div className="w-px h-12 bg-border hidden md:block" />
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <p className="text-lg text-muted-foreground font-light">
                First teaser: <span className="text-primary font-semibold">2026</span>
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {games.map((game, i) => (
            <motion.div
              key={game.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="glass-panel-hover rounded-2xl p-7 space-y-4 group relative overflow-hidden card-float"
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">{game.title}</h3>
                  <p className="text-muted-foreground text-sm">{game.genre}</p>
                </div>
                <span className="liquid-glass-btn rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 shrink-0">
                  <Clock className="w-3 h-3 text-primary/60" />
                  <span className="text-foreground/70">{game.status}</span>
                </span>
              </div>
              <div className="relative z-10 h-20 rounded-xl bg-secondary/50 flex items-center justify-center">
                <Gamepad2 className="w-7 h-7 text-muted-foreground/15" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
