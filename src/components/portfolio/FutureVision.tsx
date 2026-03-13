import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Rocket, Brain, Gamepad2, Eye } from "lucide-react";

const goals = [
  { icon: Brain, title: "Advanced AI Systems", desc: "Building intelligent systems that understand, learn, and create alongside humans." },
  { icon: Eye, title: "Immersive Products", desc: "Creating digital experiences so refined they feel physical — bridging the gap between screen and reality." },
  { icon: Gamepad2, title: "Cinematic Games", desc: "Story-driven game worlds with the visual fidelity and emotional depth of cinema." },
  { icon: Rocket, title: "Global Impact", desc: "Technology and creativity combined to solve problems and inspire billions." },
];

export const FutureVision = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-28 md:py-40 px-6 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4">Looking Ahead</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="cinematic-text-orange">Future</span>{" "}
            <span className="cinematic-text">Vision</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            The long-term goal is clear — build technology that feels like magic, create experiences that inspire generations, and leave a lasting mark on how humanity interacts with the digital world.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {goals.map((goal, i) => (
            <motion.div
              key={goal.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-panel-hover rounded-2xl p-8 space-y-4 group card-float"
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <goal.icon className="w-6 h-6 text-primary/70 group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-xl font-semibold">{goal.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{goal.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
