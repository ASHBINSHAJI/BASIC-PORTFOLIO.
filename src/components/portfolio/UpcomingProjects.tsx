import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const upcoming = [
  {
    year: "2026",
    title: "1st Game Teaser Release",
    desc: "The first cinematic teaser from Air Epics — scripts prepared, worlds being built.",
    status: "In Development",
  },
  {
    year: "2026",
    title: "Heaven Studio",
    desc: "A premium creative studio platform — merging cinematic storytelling, design, and next-gen digital experiences.",
    status: "Releasing 2026",
    highlight: true,
  },
  {
    year: "2026",
    title: "Endeavor — E-Commerce Platform",
    desc: "A next-generation AI-powered e-commerce experience. Built with purpose. Released with precision.",
    status: "Expected Launch: 2027",
  },
  {
    year: "2026",
    title: "AIR — Brand Launch",
    desc: "The official launch of the AIR ecosystem — a multi-creative platform spanning games, tech, cinema, and innovation.",
    status: "Starting Soon",
  },
];

export const UpcomingProjects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 md:py-44 px-6 relative">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-accent mb-6 font-medium">Coming Soon</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="heading-gradient">Upcoming</span>{" "}
            <span className="text-gradient-subtle">Projects</span>
          </h2>
        </motion.div>

        {/* Status indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Active Development Pipeline
          </span>
        </motion.div>

        <div className="space-y-px">
          {upcoming.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`dark-card p-8 md:p-10 group ${
                item.highlight ? "border-primary/15" : ""
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-orbitron text-primary tracking-wider">{item.year}</span>
                    <span className="w-4 h-px bg-border" />
                    <span className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground">{item.status}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 section-line" />
    </section>
  );
};
