import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const letters = "PORTFOLIO".split("");

  useEffect(() => {
    const exitTimer = setTimeout(() => setIsExiting(true), 3200);
    const completeTimer = setTimeout(() => onComplete(), 4000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{ background: "hsl(224 50% 7%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Animated background blobs */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, hsl(217 91% 60% / 0.4), transparent 70%)",
              filter: "blur(80px)",
            }}
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -80, 60, 0],
              scale: [1, 1.3, 0.9, 1],
            }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full opacity-15"
            style={{
              background: "radial-gradient(circle, hsl(217 91% 70% / 0.3), transparent 70%)",
              filter: "blur(60px)",
            }}
            animate={{
              x: [0, -120, 80, 0],
              y: [0, 60, -40, 0],
              scale: [1, 0.8, 1.2, 1],
            }}
            transition={{ duration: 4, ease: "easeInOut", delay: 0.3 }}
          />

          {/* PORTFOLIO letters with viscous effect */}
          <div className="relative z-10 flex gap-1 md:gap-2 cursor-default select-none">
            {letters.map((letter, index) => (
              <motion.div
                key={index}
                initial={{ y: 80, opacity: 0, scaleY: 1.8, scaleX: 0.6 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  scaleY: [1.8, 0.7, 1.1, 0.95, 1],
                  scaleX: [0.6, 1.4, 0.9, 1.05, 1],
                }}
                transition={{
                  delay: index * 0.12,
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                  scaleY: {
                    delay: index * 0.12,
                    duration: 1.4,
                    times: [0, 0.3, 0.5, 0.7, 1],
                    ease: "easeOut",
                  },
                  scaleX: {
                    delay: index * 0.12,
                    duration: 1.4,
                    times: [0, 0.3, 0.5, 0.7, 1],
                    ease: "easeOut",
                  },
                }}
                whileHover={{
                  scaleY: [1, 1.3, 0.8, 1.1, 1],
                  scaleX: [1, 0.7, 1.2, 0.95, 1],
                  transition: { duration: 0.6, ease: "easeOut" },
                }}
                className="text-5xl md:text-8xl font-black tracking-tight"
                style={{
                  background: "linear-gradient(180deg, hsl(217 91% 75%) 0%, hsl(217 91% 55%) 40%, hsl(224 50% 20%) 100%)",
                  backgroundSize: "100% 200%",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  transformOrigin: "bottom center",
                  filter: "drop-shadow(0 4px 20px hsl(217 91% 60% / 0.3))",
                }}
              >
                {letter}
              </motion.div>
            ))}
          </div>

          {/* Subtle tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-1/3 text-sm md:text-base tracking-[0.3em] uppercase"
            style={{ color: "hsl(217 91% 60% / 0.5)" }}
          >
            Touch the letters
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
