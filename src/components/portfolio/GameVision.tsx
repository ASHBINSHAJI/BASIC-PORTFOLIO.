import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
    <section id="games" className="py-32 md:py-44 px-6 relative tech-grid">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-accent mb-6 font-medium">Air Epics · Game Division</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="heading-gradient">Game</span>{" "}
            <span className="text-gradient-subtle">Development</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-3xl leading-relaxed">
            Creating cinematic, story-driven games inspired by real-world environments.
            4 original game projects in development. First teaser launches in 2026.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-12 mb-16"
        >
          <div>
            <p className="text-4xl font-bold font-orbitron text-primary">4</p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1">Projects</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div>
            <p className="text-sm text-muted-foreground">
              First teaser: <span className="text-primary font-medium">2026</span>
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-border">
          {games.map((game, i) => (
            <motion.div
              key={game.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="bg-background p-8 group hover:bg-card transition-colors duration-500"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-500">{game.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{game.genre}</p>
                </div>
                <span className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground/60 border border-border px-2 py-1">
                  {game.status}
                </span>
              </div>
              <div className="h-16 bg-muted/30 flex items-center justify-center">
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/20">Preview Coming Soon</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 section-line" />
    </section>
  );
};
