import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [phase, setPhase] = useState(0);
  const letters = "PORTFOLIO".split("");

  useEffect(() => {
    // Cycle through phases for the cutting effect
    const interval = setInterval(() => {
      setPhase(prev => (prev + 1) % 4);
    }, 500);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      onComplete();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  // Determine panel positions based on phase
  // Phase 0: Black left, White right (closed)
  // Phase 1: Both split outward
  // Phase 2: White left, Black right (closed)
  // Phase 3: Both split outward again
  const isEvenPhase = phase % 2 === 0;
  const isSwapped = phase >= 2;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Left side - black panel approaching from left */}
      <motion.div
        animate={{
          x: isEvenPhase ? "0%" : "-100%",
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="absolute top-0 left-0 w-1/2 h-full"
        style={{
          background: isSwapped
            ? "hsl(0 0% 100%)"
            : "hsl(0 0% 5%)",
        }}
      />

      {/* Right side - black panel approaching from right */}
      <motion.div
        animate={{
          x: isEvenPhase ? "0%" : "100%",
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="absolute top-0 right-0 w-1/2 h-full"
        style={{
          background: isSwapped
            ? "hsl(0 0% 5%)"
            : "hsl(0 0% 100%)",
        }}
      />

      {/* Second layer - panels that appear when first ones split */}
      <motion.div
        animate={{
          x: isEvenPhase ? "-100%" : "0%",
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="absolute top-0 left-0 w-1/2 h-full"
        style={{
          background: isSwapped
            ? "hsl(0 0% 5%)"
            : "hsl(0 0% 100%)",
        }}
      />

      <motion.div
        animate={{
          x: isEvenPhase ? "100%" : "0%",
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="absolute top-0 right-0 w-1/2 h-full"
        style={{
          background: isSwapped
            ? "hsl(0 0% 100%)"
            : "hsl(0 0% 5%)",
        }}
      />

      {/* Falling letters */}
      <div className="relative z-10 flex gap-2 md:gap-4">
        {letters.map((letter, index) => (
          <motion.div
            key={index}
            initial={{ y: -200, opacity: 0, rotateX: -90 }}
            animate={{
              y: 0,
              opacity: 1,
              rotateX: 0,
            }}
            transition={{
              delay: index * 0.2,
              duration: 0.8,
              type: "spring",
              stiffness: 80,
              damping: 12,
            }}
            className="text-4xl md:text-7xl font-bold"
            style={{
              color: isEvenPhase
                ? isSwapped ? "hsl(0 0% 5%)" : "hsl(0 0% 100%)"
                : isSwapped ? "hsl(0 0% 100%)" : "hsl(0 0% 5%)",
              textShadow: isEvenPhase
                ? "0 4px 12px rgba(0,0,0,0.3)"
                : "0 4px 12px rgba(255,255,255,0.3)",
              transition: "color 0.3s ease, text-shadow 0.3s ease",
            }}
          >
            {letter}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
