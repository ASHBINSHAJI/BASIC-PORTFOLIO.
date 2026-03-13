import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const team = [
  { name: "Ashbin Shaji", role: "Project Lead", title: "Developed & Directed By", emoji: "🎬" },
  { name: "Bino", role: "Design Lead", title: "UX & Assistant Director", emoji: "🎨" },
  { name: "Athen", role: "Engineering", title: "Development Support", emoji: "⚙️" },
  { name: "Nevin", role: "Engineering", title: "Development Support", emoji: "🛠️" },
];

export const Team = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" className="py-28 md:py-40 px-6 relative">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] particle-glow-blue opacity-[0.04]" />

      <div className="max-w-5xl mx-auto relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4">The Team</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="cinematic-text-orange">Collaboration</span>{" "}
            <span className="cinematic-text">& Team</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            The people behind the vision — building ambitious projects together.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-panel-hover rounded-2xl p-6 text-center space-y-3 group card-float"
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <div className="text-4xl">{member.emoji}</div>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/60">{member.title}</p>
              <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
              <span className="liquid-glass-btn rounded-full px-4 py-1.5 text-xs font-medium text-primary/80 inline-block">
                {member.role}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
