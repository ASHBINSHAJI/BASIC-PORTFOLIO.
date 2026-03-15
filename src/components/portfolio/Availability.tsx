import { motion, useInView } from "framer-motion";
import { useRef, useState, Suspense } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { playClickSound } from "@/lib/sounds";
import { cn } from "@/lib/utils";

const FloatingOrb = () => (
  <Float speed={2} rotationIntensity={0.4} floatIntensity={1.5}>
    <mesh>
      <icosahedronGeometry args={[1.2, 4]} />
      <MeshDistortMaterial
        color="hsl(24, 100%, 50%)"
        emissive="hsl(24, 100%, 30%)"
        emissiveIntensity={0.4}
        roughness={0.15}
        metalness={0.9}
        distort={0.3}
        speed={2}
        transparent
        opacity={0.85}
      />
    </mesh>
    <mesh>
      <icosahedronGeometry args={[1.4, 4]} />
      <meshPhysicalMaterial
        color="hsl(212, 100%, 50%)"
        transparent
        opacity={0.08}
        roughness={0}
        metalness={1}
        wireframe
      />
    </mesh>
  </Float>
);

export const Availability = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <section id="availability" className="py-32 md:py-44 px-6 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-accent mb-6 font-medium">Schedule</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="heading-gradient">Availability</span>{" "}
            <span className="text-gradient-subtle">& Booking</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-3xl leading-relaxed">
            Check availability and pick a date to connect. Let's build something extraordinary together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Calendar with liquid glass effect */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group"
          >
            {/* Liquid glass card */}
            <div className="liquid-glass-card p-6 md:p-8 relative overflow-hidden">
              {/* Glass reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6 font-medium relative z-10">
                Select a Date
              </p>
              <div className="relative z-10 flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => { playClickSound(); setDate(d); }}
                  className={cn(
                    "p-3 pointer-events-auto rounded-none",
                    "[&_.rdp-day]:text-foreground",
                    "[&_.rdp-day_button]:rounded-none [&_.rdp-day_button]:border-0",
                    "[&_.rdp-day_button:hover]:bg-accent/20 [&_.rdp-day_button:hover]:text-foreground",
                    "[&_.rdp-day_button.rdp-day_selected]:bg-primary [&_.rdp-day_button.rdp-day_selected]:text-primary-foreground",
                    "[&_.rdp-head_cell]:text-muted-foreground [&_.rdp-head_cell]:text-[10px] [&_.rdp-head_cell]:tracking-widest [&_.rdp-head_cell]:uppercase",
                    "[&_.rdp-caption_label]:font-orbitron [&_.rdp-caption_label]:text-sm [&_.rdp-caption_label]:tracking-wider",
                    "[&_.rdp-nav_button]:text-muted-foreground [&_.rdp-nav_button:hover]:text-primary",
                    "[&_.rdp-day_today]:border [&_.rdp-day_today]:border-accent/30"
                  )}
                />
              </div>

              {date && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 pt-6 border-t border-border relative z-10"
                >
                  <p className="text-xs text-muted-foreground mb-3">
                    Selected: <span className="text-primary font-medium">{date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</span>
                  </p>
                  <button
                    onClick={() => {
                      playClickSound();
                      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="btn-sweep rounded-sm px-8 py-3 text-xs font-medium tracking-wider uppercase relative z-10 w-full"
                  >
                    Book This Date
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* 3D Floating Element */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-[400px] relative"
          >
            <Suspense fallback={null}>
              <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[5, 5, 5]} intensity={1} color="hsl(24, 100%, 50%)" />
                <pointLight position={[-5, -3, 3]} intensity={0.5} color="hsl(212, 100%, 50%)" />
                <spotLight position={[0, 5, 0]} intensity={0.3} color="hsl(212, 100%, 70%)" />
                <FloatingOrb />
              </Canvas>
            </Suspense>

            {/* Info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="liquid-glass-card p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                    Available for Projects
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Currently accepting freelance work, collaborations, and creative partnerships.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 section-line" />
    </section>
  );
};
