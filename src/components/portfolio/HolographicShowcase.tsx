import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Sparkles,
  Hand,
  Bot,
  GitCompare,
  Star,
  ShoppingBag,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Layers,
  Cpu,
  Zap,
} from "lucide-react";

const products = [
  {
    name: "Knot Aura X1",
    tag: "Flagship",
    price: "$2,490",
    rating: 4.9,
    reviews: 1284,
    color: "#7c4dff",
    specs: [
      { label: "Material", value: "Aerospace Titanium" },
      { label: "Weight", value: "184 g" },
      { label: "Display", value: "6.4\" Holo-OLED" },
      { label: "Chip", value: "K-Neural 3nm" },
    ],
  },
  {
    name: "Knot Vantage Pro",
    tag: "Performance",
    price: "$3,180",
    rating: 4.8,
    reviews: 942,
    color: "#00d4ff",
    specs: [
      { label: "Material", value: "Carbon Mesh" },
      { label: "Weight", value: "212 g" },
      { label: "Display", value: "7.1\" Holo-OLED" },
      { label: "Chip", value: "K-Neural Ultra" },
    ],
  },
  {
    name: "Knot Lumen Edge",
    tag: "Luxury",
    price: "$4,720",
    rating: 5.0,
    reviews: 318,
    color: "#ff6a00",
    specs: [
      { label: "Material", value: "Polished Platinum" },
      { label: "Weight", value: "198 g" },
      { label: "Display", value: "6.8\" Holo-OLED" },
      { label: "Chip", value: "K-Neural Pro" },
    ],
  },
];

export const HolographicShowcase = () => {
  const [index, setIndex] = useState(0);
  const [compare, setCompare] = useState(false);
  const product = products[index];

  const next = () => setIndex((i) => (i + 1) % products.length);
  const prev = () => setIndex((i) => (i - 1 + products.length) % products.length);

  return (
    <section id="holographic" className="relative py-32 px-6 overflow-hidden tech-grid">
      {/* Ambient backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-3xl opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(124,77,255,0.25) 0%, rgba(0,119,255,0.12) 40%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-sm mb-6">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-[10px] font-orbitron tracking-[0.3em] uppercase text-accent">
              Holographic Effect
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-orbitron font-black mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
              KNOT
            </span>{" "}
            <span className="bg-gradient-to-r from-primary via-[#ff8a3d] to-accent bg-clip-text text-transparent">
              SHOWCASE
            </span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto tracking-wide">
            A luxury e-commerce platform rendered in real-time hologram. Interact, rotate,
            compare, and configure — retail experience from 2040.
          </p>
        </motion.div>

        {/* Main stage */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left panel — specs */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 space-y-4"
          >
            <Panel title="Specifications" icon={<Cpu className="w-3.5 h-3.5" />}>
              <div className="space-y-3 mt-3">
                {product.specs.map((s) => (
                  <div
                    key={s.label}
                    className="flex justify-between items-baseline border-b border-border/40 pb-2"
                  >
                    <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                      {s.label}
                    </span>
                    <span className="text-xs font-medium text-foreground font-orbitron">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Reviews" icon={<Star className="w-3.5 h-3.5" />}>
              <div className="mt-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-orbitron font-bold text-foreground">
                    {product.rating}
                  </span>
                  <span className="text-[10px] text-muted-foreground tracking-widest">
                    / 5.0
                  </span>
                </div>
                <div className="flex gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating)
                          ? "text-primary fill-primary"
                          : "text-border"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground mt-2 tracking-wider">
                  {product.reviews.toLocaleString()} verified buyers
                </p>
              </div>
            </Panel>
          </motion.aside>

          {/* Center — holographic stage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-border/60 bg-gradient-to-b from-card/40 to-background/80 backdrop-blur-xl">
              {/* Scan lines */}
              <div
                className="absolute inset-0 opacity-[0.07] pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, #fff 3px)",
                }}
              />

              {/* Hologram core */}
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                  >
                    {/* Floating cube */}
                    <motion.div
                      animate={{ y: [0, -14, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="relative"
                      style={{ perspective: "1000px" }}
                    >
                      <motion.div
                        animate={{ rotateY: [0, 360] }}
                        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                        className="relative w-48 h-48 md:w-64 md:h-64"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {[
                          { t: "rotateY(0deg) translateZ(96px)" },
                          { t: "rotateY(90deg) translateZ(96px)" },
                          { t: "rotateY(180deg) translateZ(96px)" },
                          { t: "rotateY(-90deg) translateZ(96px)" },
                          { t: "rotateX(90deg) translateZ(96px)" },
                          { t: "rotateX(-90deg) translateZ(96px)" },
                        ].map((f, i) => (
                          <div
                            key={i}
                            className="absolute inset-0 border rounded-lg"
                            style={{
                              transform: f.t,
                              borderColor: product.color,
                              background: `linear-gradient(135deg, ${product.color}22, ${product.color}05)`,
                              boxShadow: `inset 0 0 40px ${product.color}55, 0 0 60px ${product.color}33`,
                            }}
                          />
                        ))}
                      </motion.div>
                    </motion.div>

                    {/* Glow ring */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-12 rounded-full border opacity-30"
                      style={{ borderColor: product.color }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Glass podium */}
              <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-center">
                <div
                  className="w-3/4 h-20 rounded-t-[50%] border-t border-x"
                  style={{
                    borderColor: `${product.color}66`,
                    background: `linear-gradient(180deg, ${product.color}22 0%, transparent 100%)`,
                    boxShadow: `0 -20px 60px ${product.color}33, inset 0 1px 0 ${product.color}88`,
                    backdropFilter: "blur(8px)",
                  }}
                />
              </div>

              {/* Floating spec tags */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 left-6 px-3 py-1.5 rounded-md border border-accent/40 bg-background/60 backdrop-blur-md"
              >
                <p className="text-[9px] tracking-[0.25em] uppercase text-accent font-orbitron">
                  {product.tag}
                </p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 right-6 px-3 py-1.5 rounded-md border border-primary/40 bg-background/60 backdrop-blur-md"
              >
                <p className="text-[9px] tracking-[0.25em] uppercase text-primary font-orbitron flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  LIVE HOLO
                </p>
              </motion.div>

              {/* Gesture indicator */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-background/70 backdrop-blur-md">
                <Hand className="w-3 h-3 text-muted-foreground" />
                <span className="text-[9px] tracking-[0.25em] uppercase text-muted-foreground">
                  Gesture Active
                </span>
              </div>

              {/* Rotate controls */}
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-border bg-background/70 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                aria-label="Previous product"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-border bg-background/70 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                aria-label="Next product"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Title bar below stage */}
            <div className="mt-6 flex items-center justify-between">
              <div>
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={product.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="text-2xl font-orbitron font-bold"
                  >
                    {product.name}
                  </motion.h3>
                </AnimatePresence>
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-1">
                  Holographic Configuration
                </p>
              </div>
              <div className="text-right">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={product.price}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="text-2xl font-orbitron font-bold text-primary"
                  >
                    {product.price}
                  </motion.p>
                </AnimatePresence>
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-1">
                  inc. lifetime sync
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right panel — AI + actions */}
          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 space-y-4"
          >
            <Panel title="AI Assistant" icon={<Bot className="w-3.5 h-3.5" />}>
              <div className="mt-3 space-y-2">
                <div className="px-3 py-2 rounded-md bg-accent/5 border border-accent/20">
                  <p className="text-[10px] text-accent tracking-wider mb-1">KNOT.AI</p>
                  <p className="text-xs text-foreground leading-relaxed">
                    Based on your style, the <span className="text-primary">{product.name}</span>{" "}
                    fits your daily workflow.
                  </p>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {["Battery", "Camera", "Build"].map((t) => (
                    <span
                      key={t}
                      className="text-[9px] px-2 py-1 rounded border border-border text-muted-foreground tracking-wider"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </Panel>

            <Panel title="Compare Mode" icon={<GitCompare className="w-3.5 h-3.5" />}>
              <button
                onClick={() => setCompare((c) => !c)}
                className="mt-3 w-full flex items-center justify-between px-3 py-2 rounded-md border border-border hover:border-accent/50 transition-colors"
              >
                <span className="text-xs text-foreground">3D Compare</span>
                <span
                  className={`w-8 h-4 rounded-full relative transition-colors ${
                    compare ? "bg-accent" : "bg-border"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-3 h-3 rounded-full bg-background transition-all ${
                      compare ? "left-4" : "left-0.5"
                    }`}
                  />
                </span>
              </button>
              <p className="text-[10px] text-muted-foreground mt-2 tracking-wider">
                Project up to 3 products side-by-side in the same holo-field.
              </p>
            </Panel>

            <button className="w-full group relative overflow-hidden rounded-lg border border-primary/40 bg-gradient-to-r from-primary/20 to-primary/5 hover:from-primary/30 hover:to-primary/10 transition-all py-3 px-4 flex items-center justify-center gap-2">
              <ShoppingBag className="w-4 h-4 text-primary" />
              <span className="text-xs font-orbitron tracking-[0.25em] uppercase text-primary">
                Acquire Hologram
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          </motion.aside>
        </div>

        {/* Feature strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {[
            { icon: RotateCw, label: "360° Rotation" },
            { icon: Layers, label: "Component Explode" },
            { icon: Zap, label: "Real-time Render" },
            { icon: Box, label: "Volumetric Display" },
          ].map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-2.5 px-4 py-3 rounded-lg border border-border/60 bg-card/30 backdrop-blur-sm hover:border-accent/40 transition-colors"
            >
              <f.icon className="w-3.5 h-3.5 text-accent" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                {f.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Panel = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="rounded-xl border border-border/60 bg-card/40 backdrop-blur-xl p-4 relative overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    <div className="flex items-center gap-2 text-muted-foreground">
      {icon}
      <span className="text-[10px] font-orbitron tracking-[0.25em] uppercase">{title}</span>
    </div>
    {children}
  </div>
);
