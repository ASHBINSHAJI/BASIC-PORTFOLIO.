import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  { title: "Premium Websites", desc: "Bespoke web experiences with cinematic design and cutting-edge technology." },
  { title: "Brand Design", desc: "Complete visual identity systems — logos, guidelines, and digital brand experiences." },
  { title: "Web Applications", desc: "Full-stack applications with modern frameworks and scalable architecture." },
  { title: "Creative Campaigns", desc: "Digital marketing with cinematic storytelling and immersive content." },
];

export const FreelanceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 md:py-44 px-6 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-accent mb-6 font-medium">Services</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="heading-gradient">Freelance</span>{" "}
            <span className="text-gradient-subtle">& Agency</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl">
            Available for premium freelance projects and creative collaborations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-border">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-background p-8 md:p-10 group hover:bg-card transition-colors duration-500"
            >
              <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-500">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 section-line" />
    </section>
  );
};
