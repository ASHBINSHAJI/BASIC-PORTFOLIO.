import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Calendar, Phone, MessageCircle, Instagram, Github } from "lucide-react";
import { BookingForm } from "@/components/portfolio/BookingForm";
import { playClickSound } from "@/lib/sounds";

export const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [showForm, setShowForm] = useState(false);

  return (
    <section id="contact" className="py-32 md:py-44 px-6 relative">
      <div className="max-w-4xl mx-auto text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-accent mb-6 font-medium">Let's Connect</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="heading-gradient">Let's Build</span>{" "}
            <span className="text-gradient-subtle">Together</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            Whether you're a startup, collaborator, or creator with an ambitious idea — let's create something extraordinary.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {!showForm ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => { playClickSound(); setShowForm(true); }}
                className="btn-sweep rounded-sm px-10 py-4 text-sm font-medium tracking-wider uppercase flex items-center justify-center gap-3 relative z-10"
              >
                <Mail className="w-4 h-4" />
                Get In Touch
              </button>
              <button
                onClick={() => { playClickSound(); setShowForm(true); }}
                className="btn-sweep rounded-sm px-10 py-4 text-sm font-medium tracking-wider uppercase flex items-center justify-center gap-3 relative z-10"
              >
                <Calendar className="w-4 h-4" />
                Book a Call
              </button>
            </div>
          ) : (
            <div className="space-y-6 text-left max-w-lg mx-auto">
              <button
                onClick={() => { playClickSound(); setShowForm(false); }}
                className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back
              </button>
              <BookingForm />
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-muted-foreground mt-8">
            <a href="tel:+919645013535" className="flex items-center gap-2 text-sm hover:text-primary transition-colors duration-500">
              <Phone className="w-4 h-4" /> +91 96450 13535
            </a>
            <a href="https://wa.me/919645013535" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors duration-500">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            <a href="https://www.instagram.com/aaashbinnn_shaji?igsh=MTRzaTM5MWV6djVzcQ==" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 border border-border flex items-center justify-center hover:border-accent/30 hover:text-foreground text-muted-foreground transition-all duration-500"
              onClick={playClickSound}
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://github.com/ASHBINSHAJI" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 border border-border flex items-center justify-center hover:border-accent/30 hover:text-foreground text-muted-foreground transition-all duration-500"
              onClick={playClickSound}
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="pt-24 text-muted-foreground/20"
        >
          <p className="text-xs">© 2025 Ashbin Shaji. All rights reserved.</p>
          <p className="text-[10px] mt-1 tracking-[0.2em]">Built with vision. Designed with purpose.</p>
        </motion.div>
      </div>
    </section>
  );
};
