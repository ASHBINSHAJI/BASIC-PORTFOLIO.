import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const team = [
  { name: "Ashbin Shaji", role: "Project Lead", title: "Developed & Directed By" },
  { name: "Bino", role: "Design Lead", title: "UX & Assistant Director" },
  { name: "Athen", role: "Engineering", title: "Development Support" },
  { name: "Nevin", role: "Engineering", title: "Development Support" },
];

export const Team = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" className="py-32 md:py-44 px-6 relative">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-accent mb-6 font-medium">The Team</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="heading-gradient">Collaboration</span>{" "}
            <span className="text-gradient-subtle">& Team</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-background p-6 md:p-8 group hover:bg-card transition-colors duration-500"
            >
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/40 mb-4">{member.title}</p>
              <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-500">{member.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 section-line" />
    </section>
  );
};
