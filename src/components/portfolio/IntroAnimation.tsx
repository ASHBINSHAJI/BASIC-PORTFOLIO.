import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";

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
  const [splitting, setSplitting] = useState(false);
  const [drips, setDrips] = useState<Record<number, Drip[]>>({});
  const letters = "PORTFOLIO".split("");
  const midPoint = Math.ceil(letters.length / 2); // 5 — "PORTF" left, "OLIO" right

  const handleOpen = useCallback(() => {
    if (splitting) return;
    setSplitting(true);
    setTimeout(() => onComplete(), 900);
  }, [splitting, onComplete]);

  const handleLetterHover = useCallback((index: number, e: React.PointerEvent) => {
    if (splitting) return;
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
    setTimeout(() => {
      setDrips(prev => ({
        ...prev,
        [index]: (prev[index] || []).filter(d => !newDrips.includes(d)),
      }));
    }, 1500);
  }, [splitting]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!splitting ? (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden cursor-pointer"
          style={{ background: "hsl(224 50% 7%)" }}
          onClick={handleOpen}
        >
          {/* Ambient blob */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, hsl(217 91% 60% / 0.4), transparent 70%)",
              filter: "blur(80px)",
            }}
            animate={{ x: [0, 100, -50, 0], y: [0, -80, 60, 0], scale: [1, 1.3, 0.9, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* PORTFOLIO letters */}
          <div className="relative z-10 flex gap-1 md:gap-2 select-none">
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
                  delay: index * 0.1,
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                  scaleY: { delay: index * 0.1, duration: 1.2, times: [0, 0.3, 0.5, 0.7, 1] },
                  scaleX: { delay: index * 0.1, duration: 1.2, times: [0, 0.3, 0.5, 0.7, 1] },
                }}
                whileHover={{
                  scaleY: [1, 1.4, 0.7, 1.15, 0.95, 1],
                  scaleX: [1, 0.6, 1.3, 0.85, 1.05, 1],
                  y: [0, -8, 5, -2, 0],
                  transition: { duration: 0.8, ease: "easeOut" },
                }}
                onPointerEnter={(e) => handleLetterHover(index, e)}
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
                {(drips[index] || []).map((drip) => (
                  <DripEffect key={drip.id} x={drip.x} delay={drip.delay} />
                ))}
              </motion.div>
            ))}
          </div>

          {/* Hint */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="relative z-10 mt-12 text-sm md:text-base tracking-[0.3em] uppercase"
            style={{ color: "hsl(217 91% 60% / 0.5)" }}
          >
            Tap to enter
          </motion.p>
        </motion.div>
      ) : (
        /* Split animation — letters fly left/right, background fades */
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-none"
          style={{ background: "hsl(224 50% 7%)" }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeIn" }}
        >
          <div className="relative z-10 flex gap-1 md:gap-2 select-none">
            {letters.map((letter, index) => {
              const isLeft = index < midPoint;
              const distance = isLeft
                ? -(midPoint - index) * 120 - 300
                : (index - midPoint + 1) * 120 + 300;

              return (
                <motion.span
                  key={index}
                  initial={{ x: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: distance,
                    opacity: 0,
                    scale: 0.6,
                    rotateY: isLeft ? -45 : 45,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.6, 0, 0.2, 1],
                    delay: Math.abs(index - midPoint + 0.5) * 0.03,
                  }}
                  className="text-5xl md:text-8xl font-black tracking-tight inline-block"
                  style={{
                    background: "linear-gradient(180deg, hsl(217 91% 75%) 0%, hsl(217 91% 55%) 40%, hsl(224 50% 20%) 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 4px 20px hsl(217 91% 60% / 0.3))",
                  }}
                >
                  {letter}
                </motion.span>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
