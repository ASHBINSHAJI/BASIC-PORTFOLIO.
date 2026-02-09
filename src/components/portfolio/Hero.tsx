import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const Hero = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 animate-fade-in" />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Greeting */}
        <div className="animate-fade-in-up opacity-0" style={{ animationDelay: "0.1s" }}>
          <p className="text-muted-foreground text-lg font-medium tracking-wide">
            Hello, I'm
          </p>
        </div>

        {/* Name */}
        <h1 
          className="text-7xl md:text-9xl font-bold tracking-tighter animate-fade-in-up opacity-0 relative"
          style={{ animationDelay: "0.3s" }}
        >
          <span className="viscous-text">
            {"Ashbin".split("").map((letter, i) => (
              <motion.span
                key={i}
                className="viscous-letter"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  filter: [
                    "drop-shadow(0 0 8px rgba(0,0,0,0.4))",
                    "drop-shadow(0 0 16px rgba(255,255,255,0.6))",
                    "drop-shadow(0 0 8px rgba(0,0,0,0.4))",
                  ],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Title */}
        <div 
          className="space-y-4 animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.5s" }}
        >
          <p className="text-2xl md:text-4xl font-semibold text-balance">
            MERN Stack Developer
          </p>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Founder of <span className="text-accent font-semibold">Airnext</span> · <span className="text-accent font-semibold">E-onit</span> · <span className="text-accent font-semibold">The Heaven Studio</span>
          </p>
        </div>

        {/* Specialties */}
        <div 
          className="flex flex-wrap justify-center gap-4 text-sm md:text-base animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.7s" }}
        >
          <span className="px-4 py-2 rounded-full bg-accent/10 text-accent font-medium">
            Animation & Motion Graphics
          </span>
          <span className="px-4 py-2 rounded-full bg-accent/10 text-accent font-medium">
            AI Automation
          </span>
          <span className="px-4 py-2 rounded-full bg-accent/10 text-accent font-medium">
            Full-Stack Development
          </span>
        </div>

        {/* CTA */}
        <div 
          className="pt-8 animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.9s" }}
        >
          <Button 
            size="lg"
            onClick={scrollToContact}
            className="group bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Let's Connect
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Scroll indicator */}
        <div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-0 animate-fade-in"
          style={{ animationDelay: "1.2s" }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center p-2">
            <div className="w-1 h-3 rounded-full bg-muted-foreground/50" />
          </div>
        </div>
      </div>
    </section>
  );
};
