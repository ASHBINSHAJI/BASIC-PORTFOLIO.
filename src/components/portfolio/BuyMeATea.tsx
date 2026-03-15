import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const BuyMeATea = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 md:py-44 px-6 relative">
      <div className="max-w-4xl mx-auto flex justify-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="liquid-glass-card p-10 md:p-14 flex flex-col items-center gap-6 text-center max-w-lg w-full"
        >
          <motion.span
            className="text-5xl"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            ☕
          </motion.span>
          <h3 className="text-2xl md:text-3xl font-bold">
            <span className="heading-gradient">Buy Me</span>{" "}
            <span className="text-gradient-subtle">a Tea</span>
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            If you enjoy my work and want to support the journey, consider buying me a tea. Every sip fuels the next creation.
          </p>
          <a
            href="https://www.buymeacoffee.com/ashbin"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sweep rounded-sm px-10 py-3.5 text-sm font-medium tracking-wider uppercase relative z-10 mt-2"
          >
            ☕ Buy Me a Tea
          </a>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 section-line" />
    </section>
  );
};
