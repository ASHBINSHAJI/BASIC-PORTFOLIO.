import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Monitor, Megaphone, Globe, Palette } from "lucide-react";

const services = [
  { icon: Megaphone, title: "Virtual Advertising", desc: "Next-gen ad campaigns that live in digital spaces and captivate audiences." },
  { icon: Monitor, title: "Cinematic Marketing", desc: "Brand films and campaigns crafted with movie-quality production." },
  { icon: Globe, title: "Premium Websites", desc: "Bespoke web experiences that set new standards for digital presence." },
  { icon: Palette, title: "Brand Experiences", desc: "End-to-end creative direction that defines how brands are felt." },
];

export const AirAgency = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="agency" className="py-32 md:py-48 px-6 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4">Creative Agency</p>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="liquid-shimmer">AIR Agency</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            A creative digital agency for brands that refuse to blend in.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-panel-hover rounded-2xl p-10 space-y-5 group relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-accent/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-accent/5 border border-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/10 transition-colors">
                  <service.icon className="w-6 h-6 text-accent/70 group-hover:text-accent transition-colors" />
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
