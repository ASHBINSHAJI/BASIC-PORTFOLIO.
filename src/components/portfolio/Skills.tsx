import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Palette, Box, Brain, Film, Cog, Wrench, Cpu, Gamepad2, Monitor } from "lucide-react";

const skills = [
  { icon: Code2, title: "Web Development", desc: "Full-stack web applications with React, TypeScript, and modern frameworks." },
  { icon: Palette, title: "UI/UX Design", desc: "Crafting intuitive, beautiful interfaces with cinematic attention to detail." },
  { icon: Box, title: "Product Architecture", desc: "Designing scalable systems and product blueprints from concept to launch." },
  { icon: Brain, title: "Prompt Engineering", desc: "Advanced AI prompt design for intelligent systems and automation." },
  { icon: Film, title: "Animation & Motion", desc: "Cinematic motion design, visual storytelling, and immersive animations." },
  { icon: Cog, title: "System Design", desc: "Complex system architectures for futuristic products and platforms." },
  { icon: Wrench, title: "Hardware Engineering", desc: "Circuit design, embedded systems, and physical computing projects." },
  { icon: Cpu, title: "Robotics", desc: "Building intelligent robotic systems with sensor integration and AI." },
  { icon: Monitor, title: "Editing & Direction", desc: "Video editing, post-production, and creative direction for visual media." },
  { icon: Gamepad2, title: "Game Development", desc: "Cinematic 3D games with story-driven narratives and immersive worlds." },
];

export const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-28 md:py-40 px-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] particle-glow opacity-[0.04]" />

      <div className="max-w-6xl mx-auto relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4">Expertise</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="cinematic-text-orange">Skills</span>{" "}
            <span className="cinematic-text">& Domains</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            A multidisciplinary skillset spanning software, hardware, design, and creative arts.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass-panel-hover rounded-2xl p-5 text-center space-y-3 group card-float"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                <skill.icon className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-xs md:text-sm font-semibold text-foreground">{skill.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
