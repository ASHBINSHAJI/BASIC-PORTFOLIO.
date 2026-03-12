import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Gamepad2, Clock } from "lucide-react";

const games = [
  { title: "Project Zenith", genre: "Action RPG", status: "In Development" },
  { title: "Phantom Circuit", genre: "Cyberpunk Adventure", status: "In Development" },
  { title: "Eclipse Protocol", genre: "Tactical Shooter", status: "Concept Phase" },
  { title: "Aether Drift", genre: "Open World Racing", status: "Concept Phase" },
];

export const AirEpics = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="epics" className="py-32 md:py-48 px-6 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4">Game Division</p>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="liquid-shimmer">AIR EPICS</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            High-end cinematic games. Immersive worlds. Unforgettable experiences.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-panel rounded-2xl p-8 md:p-12 mb-12 text-center"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div>
              <p className="text-5xl md:text-6xl font-black cinematic-text-accent">4</p>
              <p className="text-sm text-muted-foreground mt-2 tracking-wider uppercase">Original Projects</p>
            </div>
            <div className="w-px h-12 bg-border hidden md:block" />
            <div>
              <p className="text-lg text-muted-foreground font-light">
                First teaser releasing <span className="text-accent font-semibold">late 2026</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Game cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {games.map((game, i) => (
            <motion.div
              key={game.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="glass-panel-hover rounded-2xl p-8 space-y-4 group relative overflow-hidden"
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{game.title}</h3>
                  <p className="text-muted-foreground text-sm">{game.genre}</p>
                </div>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/15 shrink-0">
                  <Clock className="w-3 h-3 text-accent" />
                  <span className="text-xs font-medium text-accent">{game.status}</span>
                </span>
              </div>
              
              <div className="relative z-10 h-24 rounded-xl bg-secondary/50 flex items-center justify-center">
                <Gamepad2 className="w-8 h-8 text-muted-foreground/20" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
