import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Home, ShoppingCart, Gamepad2, Cpu, ChefHat, Bot, Zap, Lock, Brain, BarChart3, CreditCard, Star, Film, Wrench } from "lucide-react";

const projects = [
  {
    title: "AirNest",
    subtitle: "Futuristic Smart Home Ecosystem",
    desc: "A complete smart home ecosystem with AI-powered modules for kitchen, rooms, bathroom, security locks, and voice assistant — redefining future living.",
    features: [
      { icon: ChefHat, label: "AI Kitchen Assistant" },
      { icon: Home, label: "Smart Room System" },
      { icon: Lock, label: "Smart Lock" },
      { icon: Bot, label: "Voice Assistant" },
      { icon: Zap, label: "Smart Bathroom" },
      { icon: Cpu, label: "Robotics Integration" },
    ],
    color: "primary",
  },
  {
    title: "AI Ecommerce Platform",
    subtitle: "Next-Generation Shopping Experience",
    desc: "An AI-powered ecommerce concept featuring intelligent product discovery, smart cart systems, advanced animation UI, secure payments, AI reviews, and user satisfaction analytics.",
    features: [
      { icon: Brain, label: "AI Product Discovery" },
      { icon: ShoppingCart, label: "Intelligent Cart" },
      { icon: CreditCard, label: "Secure Payments" },
      { icon: Star, label: "AI Reviews" },
      { icon: BarChart3, label: "Satisfaction Analytics" },
      { icon: Zap, label: "Animation UI" },
    ],
    color: "accent",
  },
  {
    title: "Air Games Studio",
    subtitle: "Cinematic Game Development",
    desc: "A game development initiative focused on cinematic 3D real-world inspired games with high-end visual design and immersive storytelling.",
    features: [
      { icon: Gamepad2, label: "3D Games" },
      { icon: Film, label: "Cinematic Stories" },
    ],
    color: "primary",
  },
  {
    title: "Aironit",
    subtitle: "Hardware Engineering & Robotics",
    desc: "Advanced hardware engineering and robotics projects — building intelligent physical systems with embedded AI, sensor networks, and precision mechanics.",
    features: [
      { icon: Cpu, label: "Embedded Systems" },
      { icon: Bot, label: "Robotics" },
      { icon: Wrench, label: "Hardware Design" },
    ],
    color: "accent",
  },
];

export const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-28 md:py-40 px-6 relative">
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] particle-glow-blue opacity-[0.04]" />

      <div className="max-w-6xl mx-auto relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4">Portfolio</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="cinematic-text-orange">Major</span>{" "}
            <span className="cinematic-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Ambitious projects spanning smart homes, AI platforms, games, and robotics.
          </p>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="glass-panel-hover rounded-3xl p-8 md:p-12 space-y-6 group card-float"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-2">
                  <h3 className={`text-3xl md:text-4xl font-bold ${project.color === "primary" ? "text-primary" : "text-accent"}`}>
                    {project.title}
                  </h3>
                  <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground">{project.subtitle}</p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed max-w-3xl">{project.desc}</p>

              <div className="flex flex-wrap gap-3">
                {project.features.map((f) => (
                  <span
                    key={f.label}
                    className="liquid-glass-btn rounded-full px-4 py-2 text-xs font-medium text-foreground/80 flex items-center gap-2"
                  >
                    <f.icon className="w-3.5 h-3.5 text-primary/70" />
                    {f.label}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
