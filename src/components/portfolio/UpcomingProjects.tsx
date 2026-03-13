import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, Rocket, Gamepad2, ShoppingCart, Zap } from "lucide-react";

const upcoming = [
  {
    year: "2026",
    title: "1st Game Teaser Release",
    desc: "The first cinematic teaser from Air Epics — scripts prepared, worlds being built.",
    icon: Gamepad2,
    status: "In Development",
  },
  {
    year: "2026",
    title: "Endeavor — E-Commerce Platform",
    desc: "The Official Air Team has committed to the Endeavor project. A next-generation AI-powered e-commerce experience. Built with purpose. Released with precision.",
    icon: ShoppingCart,
    status: "Expected Launch: 2027",
    highlight: true,
  },
  {
    year: "2026",
    title: "AIR — Brand Launch",
    desc: "The official launch of the AIR ecosystem — a multi-creative platform spanning games, tech, cinema, and innovation.",
    icon: Zap,
    status: "Starting Soon",
  },
];

export const UpcomingProjects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-28 md:py-40 px-6 relative">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] particle-glow opacity-[0.05]" />

      <div className="max-w-5xl mx-auto relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4">Coming Soon</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="cinematic-text-orange">Upcoming</span>{" "}
            <span className="cinematic-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Stay tuned — something big is coming.
          </p>
        </motion.div>

        {/* Pulsing banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="liquid-glass-btn rounded-full px-6 py-3 text-center mb-12 mx-auto max-w-md flex items-center justify-center gap-3"
        >
          <span className="w-2 h-2 rounded-full bg-primary pulse-ring" />
          <span className="text-sm tracking-[0.15em] uppercase text-foreground/80 font-medium">
            Stay Tuned · Something Big is Coming
          </span>
        </motion.div>

        <div className="space-y-6">
          {upcoming.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`glass-panel-hover rounded-3xl p-8 md:p-10 space-y-5 group card-float ${
                item.highlight ? "border-primary/20" : ""
              }`}
              style={{ animationDelay: `${i * 0.6}s` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-primary/70 group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-primary/60 mb-1">{item.year}</p>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground">{item.title}</h3>
                  </div>
                </div>
                <span className="liquid-glass-btn rounded-full px-4 py-1.5 text-xs font-medium text-foreground/70 shrink-0 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-primary/60" />
                  {item.status}
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
