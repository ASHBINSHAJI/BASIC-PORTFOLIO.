import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ChefHat, Home, Bot, Zap } from "lucide-react";

const features = [
  { icon: ChefHat, title: "AI Kitchen Assistant", desc: "Intelligent cooking companion that learns your preferences and manages your kitchen." },
  { icon: Home, title: "Smart Home System", desc: "Seamless automation — lighting, climate, security, all unified under one interface." },
  { icon: Bot, title: "Robotics Integration", desc: "Household robotics that handle tasks with precision and care." },
  { icon: Zap, title: "Future Living", desc: "Technology that anticipates your needs before you do." },
];

export const Airnest = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="airnest" className="py-32 md:py-48 px-6 relative">
      {/* Ambient glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full particle-glow opacity-[0.05]" />

      <div className="max-w-6xl mx-auto relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4">Smart Living</p>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="liquid-shimmer">AIRNEST</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            Futuristic smart-home innovation. Technology that feels like home.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-panel-hover rounded-2xl p-8 md:p-10 space-y-4 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-accent/5 border border-accent/10 flex items-center justify-center group-hover:bg-accent/10 transition-colors shrink-0">
                  <feature.icon className="w-7 h-7 text-accent/70 group-hover:text-accent transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-1">{feature.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
