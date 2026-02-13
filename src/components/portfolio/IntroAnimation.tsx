import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

interface Drip {
  id: number;
  x: number;
  delay: number;
}

const DripEffect = ({ x, delay }: { x: number; delay: number }) => (
  <motion.div
    initial={{ y: 0, opacity: 0.8, scaleX: 1 }}
    animate={{
      y: [0, 40, 120],
      opacity: [0.8, 0.5, 0],
      scaleX: [1, 0.6, 0.3],
      scaleY: [1, 1.5, 2.5],
    }}
    transition={{ duration: 1.2, ease: "easeIn", delay }}
    className="absolute rounded-full"
    style={{
      left: x,
      width: 6,
      height: 12,
      background: "linear-gradient(180deg, hsl(217 91% 65%), hsl(217 91% 40%))",
      filter: "blur(1px)",
      transformOrigin: "top center",
    }}
  />
);

export const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [drips, setDrips] = useState<Record<number, Drip[]>>({});
  const letters = "PORTFOLIO".split("");

  useEffect(() => {
    const exitTimer = setTimeout(() => setIsExiting(true), 3200);
    const completeTimer = setTimeout(() => onComplete(), 4000);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const handleLetterInteraction = useCallback((index: number, e: React.PointerEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const newDrips: Drip[] = Array.from({ length: 3 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * rect.width,
      delay: i * 0.1,
    }));
    setDrips(prev => ({
      ...prev,
      [index]: [...(prev[index] || []), ...newDrips],
    }));
    // Clean up old drips
    setTimeout(() => {
      setDrips(prev => ({
        ...prev,
        [index]: (prev[index] || []).filter(d => !newDrips.includes(d)),
      }));
    }, 1500);
  }, []);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{ background: "hsl(224 50% 7%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Ambient blobs */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, hsl(217 91% 60% / 0.4), transparent 70%)",
              filter: "blur(80px)",
            }}
            animate={{ x: [0, 100, -50, 0], y: [0, -80, 60, 0], scale: [1, 1.3, 0.9, 1] }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />

          {/* PORTFOLIO letters with viscous drip */}
          <div className="relative z-10 flex gap-1 md:gap-2 cursor-pointer select-none">
            {letters.map((letter, index) => (
              <motion.div
                key={index}
                className="relative"
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
                  scaleY: { delay: index * 0.12, duration: 1.4, times: [0, 0.3, 0.5, 0.7, 1] },
                  scaleX: { delay: index * 0.12, duration: 1.4, times: [0, 0.3, 0.5, 0.7, 1] },
                }}
                whileHover={{
                  scaleY: [1, 1.4, 0.7, 1.15, 0.95, 1],
                  scaleX: [1, 0.6, 1.3, 0.85, 1.05, 1],
                  y: [0, -8, 5, -2, 0],
                  transition: { duration: 0.8, ease: "easeOut" },
                }}
                whileTap={{
                  scaleY: [1, 2, 0.5, 1.3, 0.9, 1],
                  scaleX: [1, 0.4, 1.5, 0.8, 1.1, 1],
                  y: [0, -15, 12, -4, 0],
                  transition: { duration: 1, ease: "easeOut" },
                }}
                onPointerDown={(e) => handleLetterInteraction(index, e)}
              >
                <span
                  className="text-5xl md:text-8xl font-black tracking-tight inline-block"
                  style={{
                    background: "linear-gradient(180deg, hsl(217 91% 75%) 0%, hsl(217 91% 55%) 40%, hsl(224 50% 20%) 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    transformOrigin: "bottom center",
                    filter: "drop-shadow(0 4px 20px hsl(217 91% 60% / 0.3))",
                  }}
                >
                  {letter}
                </span>

                {/* Drip particles */}
                {(drips[index] || []).map((drip) => (
                  <DripEffect key={drip.id} x={drip.x} delay={drip.delay} />
                ))}
              </motion.div>
            ))}
          </div>

          {/* Hint text */}
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
