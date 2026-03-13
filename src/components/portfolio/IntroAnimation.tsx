import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { playClickSound } from "@/lib/sounds";

export const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"logo" | "exit">("logo");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("exit");
      setTimeout(onComplete, 800);
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "hsl(220 40% 6%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          onClick={() => {
            playClickSound();
            setPhase("exit");
            setTimeout(onComplete, 800);
          }}
        >
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, hsl(25 95% 55% / 0.15), transparent 70%)", filter: "blur(60px)" }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="relative text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-7xl md:text-9xl font-black tracking-[0.2em] cinematic-text-orange text-glow-orange">
                A.S
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-sm tracking-[0.4em] uppercase text-muted-foreground"
            >
              Creator · Builder · Visionary
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="text-xs tracking-[0.2em] uppercase text-muted-foreground cursor-pointer"
            >
              tap to enter
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
