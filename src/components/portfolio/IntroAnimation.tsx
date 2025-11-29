import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [showWhite, setShowWhite] = useState(true);
  const letters = "PORTFOLIO".split("");

  useEffect(() => {
    // Alternate between black and white every 400ms (slower)
    const interval = setInterval(() => {
      setShowWhite(prev => !prev);
    }, 400);

    // Complete animation after 5 seconds (longer)
    const timeout = setTimeout(() => {
      clearInterval(interval);
      onComplete();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Parallel split effect */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: showWhite ? 0 : "-100%" }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="absolute inset-0 w-1/2 bg-background"
      />
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: showWhite ? "100%" : 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="absolute inset-0 left-1/2 w-1/2 bg-foreground"
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
              color: showWhite ? "hsl(var(--foreground))" : "hsl(var(--background))",
              textShadow: showWhite 
                ? "0 4px 12px rgba(0,0,0,0.3)" 
                : "0 4px 12px rgba(255,255,255,0.3)",
            }}
          >
            {letter}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
