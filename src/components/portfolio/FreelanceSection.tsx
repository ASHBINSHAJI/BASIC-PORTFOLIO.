import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Palette, Code2, Megaphone } from "lucide-react";

const services = [
  { icon: Globe, title: "Premium Websites", desc: "Bespoke web experiences with cinematic design, smooth animations, and cutting-edge technology." },
  { icon: Palette, title: "Brand Design", desc: "Complete visual identity systems — logos, guidelines, and digital brand experiences." },
  { icon: Code2, title: "Web Applications", desc: "Full-stack applications built with modern frameworks, scalable architecture, and clean code." },
  { icon: Megaphone, title: "Creative Campaigns", desc: "Digital marketing with cinematic storytelling, motion graphics, and immersive content." },
];

export const FreelanceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-28 md:py-40 px-6 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] particle-glow-blue opacity-[0.04]" />

      <div className="max-w-6xl mx-auto relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4">Services</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="cinematic-text-orange">Freelance</span>{" "}
            <span className="cinematic-text">& Agency</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Available for premium freelance projects and creative collaborations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-panel-hover rounded-2xl p-8 md:p-10 space-y-5 group relative overflow-hidden card-float"
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary/70 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
