import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Hand,
  Bot,
  GitCompare,
  Star,
  ShoppingBag,
  RotateCw,
  Layers,
  Cpu,
  Zap,
  Box,
  Fingerprint,
} from "lucide-react";
import knotBag from "@/assets/knot-bag.png";
import knotCloth from "@/assets/knot-cloth.png";
import knotShoe from "@/assets/knot-shoe.png";
import knotWatch from "@/assets/knot-watch.png";

const products = [
  {
    name: "Knot Vantage Pack",
    category: "Bag",
    image: knotBag,
    tag: "Utility",
    price: "$1,290",
    rating: 4.9,
    reviews: 1284,
    color: "#0e7c5a",
    specs: [
      { label: "Material", value: "Recycled Nylon" },
      { label: "Capacity", value: "26 L" },
      { label: "Weight", value: "780 g" },
      { label: "Series", value: "RE:CANNOT" },
    ],
  },
  {
    name: "Knot Krea Shirt",
    category: "Apparel",
    image: knotCloth,
    tag: "Statement",
    price: "$340",
    rating: 4.8,
    reviews: 612,
    color: "#a8a39b",
    specs: [
      { label: "Material", value: "Organic Cotton" },
      { label: "Fit", value: "Oversized" },
      { label: "Print", value: "Hand-Screened" },
      { label: "Series", value: "KREA Vol.2" },
    ],
  },
  {
    name: "Knot Air SB Low",
    category: "Footwear",
    image: knotShoe,
    tag: "Limited",
    price: "$520",
    rating: 4.9,
    reviews: 2104,
    color: "#ff6a00",
    specs: [
      { label: "Upper", value: "Tumbled Leather" },
      { label: "Sole", value: "Vulcanized" },
      { label: "Drop", value: "Friday 09:00" },
      { label: "Series", value: "FX001" },
    ],
  },
  {
    name: "Knot Hublot Classic",
    category: "Timepiece",
    image: knotWatch,
    tag: "Luxury",
    price: "$8,720",
    rating: 5.0,
    reviews: 318,
    color: "#2dd4a8",
    specs: [
      { label: "Case", value: "Titanium 40mm" },
      { label: "Movement", value: "Automatic" },
      { label: "Dial", value: "Emerald Sunray" },
      { label: "Series", value: "Integral" },
    ],
  },
];

export const HolographicShowcase = () => {
  const [index, setIndex] = useState(0);
  const [compare, setCompare] = useState(false);
  const product = products[index];

  return (
    <section id="holographic" className="relative py-32 px-6 overflow-hidden tech-grid">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-3xl opacity-40 transition-all duration-700"
          style={{
            background: `radial-gradient(circle, ${product.color}40 0%, ${product.color}15 40%, transparent 70%)`,
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
              Touchable Hologram
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
            Tap a product orbiting the holo-stage. The center hologram materializes
            instantly — the new way to browse luxury commerce.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left specs */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 space-y-4 order-2 lg:order-1"
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

          {/* Center — touchable hologram stage with 4 orbiting products */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 order-1 lg:order-2"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-border/60 bg-gradient-to-b from-card/40 to-background/80 backdrop-blur-xl">
              {/* scan lines */}
              <div
                className="absolute inset-0 opacity-[0.07] pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, #fff 3px)",
                }}
              />

              {/* central hologram */}
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
                    transition={{ duration: 0.6 }}
                    className="relative w-1/2 aspect-square"
                  >
                    <motion.div
                      animate={{ y: [0, -14, 0], rotateY: [-8, 8, -8] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="relative w-full h-full"
                      style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain drop-shadow-2xl"
                        style={{
                          filter: `drop-shadow(0 0 40px ${product.color}aa) drop-shadow(0 20px 30px rgba(0,0,0,0.6))`,
                        }}
                      />
                      {/* holographic chromatic tint */}
                      <div
                        className="absolute inset-0 mix-blend-overlay opacity-40 pointer-events-none"
                        style={{
                          background: `linear-gradient(135deg, ${product.color}40, transparent 50%, ${product.color}30)`,
                        }}
                      />
                    </motion.div>

                    {/* rotating glow ring */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-8 rounded-full border opacity-30"
                      style={{ borderColor: product.color, borderStyle: "dashed" }}
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-16 rounded-full border opacity-20"
                      style={{ borderColor: product.color }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* glass podium */}
              <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-center pointer-events-none">
                <div
                  className="w-3/4 h-20 rounded-t-[50%] border-t border-x transition-all duration-700"
                  style={{
                    borderColor: `${product.color}66`,
                    background: `linear-gradient(180deg, ${product.color}22 0%, transparent 100%)`,
                    boxShadow: `0 -20px 60px ${product.color}33, inset 0 1px 0 ${product.color}88`,
                    backdropFilter: "blur(8px)",
                  }}
                />
              </div>

              {/* 4 orbiting product thumbs — top / right / bottom / left */}
              {products.map((p, i) => {
                const positions = [
                  "top-4 left-1/2 -translate-x-1/2",
                  "right-4 top-1/2 -translate-y-1/2",
                  "bottom-4 left-1/2 -translate-x-1/2",
                  "left-4 top-1/2 -translate-y-1/2",
                ];
                const active = i === index;
                return (
                  <motion.button
                    key={p.name}
                    onClick={() => setIndex(i)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    animate={active ? { y: [0, -4, 0] } : {}}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className={`absolute ${positions[i]} w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 backdrop-blur-md transition-all group`}
                    style={{
                      borderColor: active ? p.color : `${p.color}44`,
                      background: `linear-gradient(135deg, ${p.color}22, ${p.color}05)`,
                      boxShadow: active
                        ? `0 0 30px ${p.color}aa, inset 0 0 20px ${p.color}33`
                        : `0 0 12px ${p.color}33`,
                    }}
                    aria-label={`View ${p.name}`}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                    <span className="absolute bottom-1 left-0 right-0 text-center text-[8px] font-orbitron tracking-[0.2em] uppercase text-foreground">
                      {p.category}
                    </span>
                    {active && (
                      <motion.span
                        layoutId="active-dot"
                        className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
                        style={{ background: p.color, boxShadow: `0 0 8px ${p.color}` }}
                      />
                    )}
                  </motion.button>
                );
              })}

              {/* corner tags */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="w-[78%] aspect-square rounded-full border border-dashed opacity-20"
                  style={{ borderColor: product.color }}
                />
              </div>

              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-6 right-1/2 translate-x-[140%] px-2.5 py-1 rounded-md border border-primary/40 bg-background/70 backdrop-blur-md"
              >
                <p className="text-[8px] tracking-[0.25em] uppercase text-primary font-orbitron flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  LIVE HOLO
                </p>
              </motion.div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-background/70 backdrop-blur-md">
                <Fingerprint className="w-3 h-3 text-accent" />
                <span className="text-[9px] tracking-[0.25em] uppercase text-muted-foreground">
                  Touch to Materialize
                </span>
              </div>
            </div>

            {/* title bar */}
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
                  <span style={{ color: product.color }}>● </span>
                  {product.tag} · {product.category}
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

          {/* Right — AI */}
          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 space-y-4 order-3"
          >
            <Panel title="AI Assistant" icon={<Bot className="w-3.5 h-3.5" />}>
              <div className="mt-3 space-y-2">
                <div className="px-3 py-2 rounded-md bg-accent/5 border border-accent/20">
                  <p className="text-[10px] text-accent tracking-wider mb-1">KNOT.AI</p>
                  <p className="text-xs text-foreground leading-relaxed">
                    Based on your style, the <span className="text-primary">{product.name}</span>{" "}
                    pairs perfectly with your last 3 visits.
                  </p>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {["Drop", "Sync", "Build"].map((t) => (
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
                Project all 4 products side-by-side in the same holo-field.
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
            { icon: Hand, label: "Touch Reactive" },
            { icon: RotateCw, label: "360° Rotation" },
            { icon: Layers, label: "Component Explode" },
            { icon: Zap, label: "Real-time Render" },
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
