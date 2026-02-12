import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const Hero = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const firstName = "Ashbin";
  const lastName = "Shaji";

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 animate-fade-in" />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10">
        <div className="animate-fade-in-up opacity-0" style={{ animationDelay: "0.1s" }}>
          <p className="text-muted-foreground text-lg font-medium tracking-wide">
            Hello, I'm
          </p>
        </div>

        <h1 
          className="text-5xl md:text-8xl font-bold tracking-tighter animate-fade-in-up opacity-0 relative"
          style={{ animationDelay: "0.3s" }}
        >
          <span className="viscous-text">
            {firstName.split("").map((letter, i) => (
              <motion.span
                key={`first-${i}`}
                className="viscous-letter"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  scale: [1, 1.01, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              >
                {letter}
              </motion.span>
            ))}
            <span className="inline-block w-4 md:w-8" />
            {lastName.split("").map((letter, i) => (
              <motion.span
                key={`last-${i}`}
                className="viscous-letter"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  scale: [1, 1.01, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (firstName.length + i) * 0.4,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </h1>

        <div 
          className="space-y-4 animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.5s" }}
        >
          <p className="text-2xl md:text-4xl font-semibold text-balance">
            Python Django Developer & Entrepreneur
          </p>
        </div>

        {/* Trust quote */}
        <div 
          className="animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.6s" }}
        >
          <p className="text-lg md:text-xl text-muted-foreground italic">
            "Can I trust this guy to finish my project?"
          </p>
        </div>

        <div 
          className="flex flex-wrap justify-center gap-4 text-sm md:text-base animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.7s" }}
        >
          <span className="px-4 py-2 rounded-full bg-muted text-foreground/70 font-medium">
            Animation & Motion Graphics
          </span>
          <span className="px-4 py-2 rounded-full bg-muted text-foreground/70 font-medium">
            AI Automation
          </span>
          <span className="px-4 py-2 rounded-full bg-muted text-foreground/70 font-medium">
            Python & Django
          </span>
        </div>

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
