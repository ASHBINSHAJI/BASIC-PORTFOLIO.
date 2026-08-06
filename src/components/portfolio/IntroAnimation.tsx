import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { playClickSound } from "@/lib/sounds";

const DURATION = 3400;

export const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [exiting, setExiting] = useState(false);
  const hasExited = useRef(false);

  const triggerExit = useCallback(() => {
    if (hasExited.current) return;
    hasExited.current = true;
    playClickSound();
    setExiting(true);
    setTimeout(onComplete, 700);
  }, [onComplete]);

  useEffect(() => {
    const t = setTimeout(triggerExit, DURATION);
    return () => clearTimeout(t);
  }, [triggerExit]);

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          className="fixed inset-0 z-[100] cursor-pointer overflow-hidden flex flex-col items-center justify-center"
          style={{ background: "#050505" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          onClick={triggerExit}
        >
          {/* Soft ambient glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 50% 50%, hsl(24 100% 50% / 0.07), transparent 70%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {/* Name */}
          <motion.h1
            className="relative font-orbitron text-4xl md:text-7xl font-bold tracking-[0.25em] text-foreground"
            initial={{ opacity: 0, y: 14, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.25em" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            ASHBIN
          </motion.h1>

          {/* Underline sweep */}
          <motion.div
            className="relative mt-6 h-px w-40 md:w-64"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(24 100% 50% / 0.7), transparent)",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
          />

          {/* Subtitle */}
          <motion.p
            className="relative mt-6 text-[10px] md:text-xs tracking-[0.35em] md:tracking-[0.5em] uppercase text-muted-foreground font-light text-center px-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Ashbin Shaji · Creative Technologist
          </motion.p>

          {/* Skip hint */}
          <motion.p
            className="absolute bottom-8 left-0 right-0 text-center text-[10px] tracking-[0.3em] uppercase text-muted-foreground/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            tap anywhere to skip
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
