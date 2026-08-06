import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GlassCard } from "./GlassCard";

const skills = [
  { title: "Automation", desc: "Workflows & AI Agents" },
  { title: "Web Development", desc: "React, TypeScript, Full-Stack" },
  { title: "App Development", desc: "Cross-Platform Mobile Apps" },
  { title: "Prompt Engineering", desc: "AI Automation" },
  { title: "Backend & APIs", desc: "Databases, Auth, Integrations" },
  { title: "System Design", desc: "Scalable Architectures" },
];


export const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 md:py-44 px-6 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-accent mb-6 font-medium">Expertise</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="heading-gradient">Skills</span>{" "}
            <span className="text-gradient-subtle">& Domains</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {skills.map((skill, i) => (
            <GlassCard key={skill.title} delay={i * 0.04} parallaxStrength={10} glowColor={i % 3 === 0 ? "primary" : "accent"}>
              <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-500">
                {skill.title}
              </h3>
              <p className="text-xs text-muted-foreground">{skill.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 section-line" />
    </section>
  );
};
