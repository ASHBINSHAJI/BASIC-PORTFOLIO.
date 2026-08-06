import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { playClickSound } from "@/lib/sounds";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Skills", href: "#skills" },
  { label: "Showcase", href: "#holographic" },
  { label: "Innovation", href: "#innovation" },
  { label: "Availability", href: "#availability" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("#home");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = [...navItems.map((n) => n.href), "#contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.querySelector(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = (href: string) => {
    playClickSound();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* scroll progress line */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] bg-gradient-to-r from-primary via-accent to-primary"
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-3 md:top-5 left-0 right-0 z-50 px-4 md:px-6"
      >
        <div
          className={`max-w-5xl mx-auto flex items-center justify-between gap-4 rounded-full border transition-all duration-500 ${
            scrolled
              ? "bg-background/70 border-border backdrop-blur-xl shadow-[0_8px_40px_-12px_hsl(var(--primary)/0.35)] px-4 md:px-5 py-2.5"
              : "bg-background/30 border-border/40 backdrop-blur-md px-4 md:px-5 py-3"
          }`}
        >
          <button
            onClick={() => handleClick("#home")}
            className="flex items-center gap-2 shrink-0 group"
            aria-label="Go to top"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-70 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-orbitron text-sm font-bold tracking-[0.25em] text-foreground group-hover:text-primary transition-colors">
              AIR
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.href;
              return (
                <button
                  key={item.label}
                  onClick={() => handleClick(item.href)}
                  className={`relative px-3.5 py-1.5 rounded-full text-[11px] font-medium tracking-[0.14em] uppercase transition-colors duration-300 ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-primary/12 border border-primary/30"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleClick("#contact")}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Contact
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              className="md:hidden text-foreground p-1"
              aria-label="Toggle menu"
              onClick={() => {
                playClickSound();
                setMobileOpen(!mobileOpen);
              }}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/97 backdrop-blur-xl flex flex-col items-center justify-center gap-6"
          >
            {[...navItems, { label: "Contact", href: "#contact" }].map((item, i) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleClick(item.href)}
                className={`text-xl font-medium tracking-wider uppercase transition-colors ${
                  active === item.href ? "text-primary" : "text-foreground hover:text-primary"
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
