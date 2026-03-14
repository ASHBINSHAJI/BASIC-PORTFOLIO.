import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "AirNest",
    subtitle: "Smart Home Ecosystem",
    desc: "A complete smart home ecosystem with AI-powered modules for kitchen, rooms, bathroom, security locks, and voice assistant.",
    tags: ["AI Kitchen", "Smart Room", "Smart Lock", "Voice Assistant", "Robotics"],
    accent: "primary",
  },
  {
    title: "AI Ecommerce Platform",
    subtitle: "Next-Gen Shopping Experience",
    desc: "An AI-powered ecommerce concept featuring intelligent product discovery, smart cart systems, secure payments, AI reviews, and satisfaction analytics.",
    tags: ["AI Discovery", "Smart Cart", "Payments", "Analytics", "Animation UI"],
    accent: "accent",
  },
  {
    title: "Air Games Studio",
    subtitle: "Cinematic Game Development",
    desc: "A game development initiative focused on cinematic 3D real-world inspired games with high-end visual design and immersive storytelling.",
    tags: ["3D Games", "Cinematic Stories", "Unreal Engine"],
    accent: "primary",
  },
  {
    title: "Aironit",
    subtitle: "Hardware & Robotics",
    desc: "Advanced hardware engineering and robotics — intelligent physical systems with embedded AI, sensor networks, and precision mechanics.",
    tags: ["Embedded Systems", "Robotics", "Hardware Design"],
    accent: "accent",
  },
];

export const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 md:py-44 px-6 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-accent mb-6 font-medium">Portfolio</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="heading-gradient">Major</span>{" "}
            <span className="text-gradient-subtle">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl">
            Ambitious projects spanning smart homes, AI platforms, games, and robotics.
          </p>
        </motion.div>

        <div className="space-y-px">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="dark-card p-8 md:p-12 group relative overflow-hidden"
            >
              {/* Hover glow */}
              <div
                className={`absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${
                  project.accent === "primary"
                    ? "bg-primary/[0.03]"
                    : "bg-accent/[0.03]"
                }`}
                style={{ filter: "blur(60px)" }}
              />

              <div className="relative z-10 space-y-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <h3 className={`text-2xl md:text-3xl font-bold ${
                      project.accent === "primary" ? "text-primary" : "text-accent"
                    }`}>
                      {project.title}
                    </h3>
                    <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">{project.subtitle}</p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed max-w-3xl text-sm">{project.desc}</p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 border border-border text-muted-foreground hover:border-accent/30 hover:text-foreground transition-all duration-500"
                    >
                      {tag}
                    </span>
                  ))}
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
