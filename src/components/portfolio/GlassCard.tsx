import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  parallaxStrength?: number;
  glowColor?: "primary" | "accent";
  delay?: number;
}

export const GlassCard = ({
  children,
  className = "",
  parallaxStrength = 30,
  glowColor = "accent",
  delay = 0,
}: GlassCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [parallaxStrength, -parallaxStrength]);

  const glowHsl = glowColor === "primary" ? "24 100% 50%" : "212 100% 50%";

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative group ${className}`}
    >
      {/* Glass card body */}
      <div
        className="relative overflow-hidden rounded-lg p-6 md:p-8 transition-all duration-700"
        style={{
          background: "hsl(0 0% 6% / 0.8)",
          border: "1px solid hsl(0 0% 14%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: `
            inset 0 1px 0 hsl(0 0% 100% / 0.04),
            0 8px 32px hsl(0 0% 0% / 0.5),
            0 0 0 0 hsl(${glowHsl} / 0)
          `,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = `hsl(${glowHsl} / 0.2)`;
          (e.currentTarget as HTMLDivElement).style.boxShadow = `
            inset 0 1px 0 hsl(0 0% 100% / 0.06),
            0 12px 40px hsl(0 0% 0% / 0.6),
            0 0 60px hsl(${glowHsl} / 0.04)
          `;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "hsl(0 0% 14%)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = `
            inset 0 1px 0 hsl(0 0% 100% / 0.04),
            0 8px 32px hsl(0 0% 0% / 0.5),
            0 0 0 0 hsl(${glowHsl} / 0)
          `;
        }}
      >
        {/* Top reflection line */}
        <div
          className="absolute top-0 left-[10%] right-[10%] h-px opacity-30 group-hover:opacity-50 transition-opacity duration-700"
          style={{
            background: `linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.15), transparent)`,
          }}
        />
        {children}
      </div>
    </motion.div>
  );
};
