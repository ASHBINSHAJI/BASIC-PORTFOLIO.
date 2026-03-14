import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const goals = [
  { title: "Advanced AI Systems", desc: "Building intelligent systems that understand, learn, and create alongside humans." },
  { title: "Immersive Products", desc: "Digital experiences so refined they feel physical — bridging screen and reality." },
  { title: "Cinematic Games", desc: "Story-driven game worlds with the visual fidelity and emotional depth of cinema." },
  { title: "Global Impact", desc: "Technology and creativity combined to solve problems and inspire billions." },
];

export const FutureVision = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 md:py-44 px-6 relative tech-grid">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-accent mb-6 font-medium">Looking Ahead</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="heading-gradient">Future</span>{" "}
            <span className="text-gradient-subtle">Vision</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-3xl leading-relaxed">
            Build technology that feels like magic, create experiences that inspire generations, and leave a lasting mark on the digital world.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-border">
          {goals.map((goal, i) => (
            <motion.div
              key={goal.title}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-background p-8 md:p-10 group hover:bg-card transition-colors duration-500"
            >
              <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-500">{goal.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{goal.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 section-line" />
    </section>
  );
};
