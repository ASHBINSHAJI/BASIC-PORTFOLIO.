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
    <section id="contact" className="py-28 md:py-40 px-6 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] particle-glow opacity-[0.06]" />

      <div className="max-w-4xl mx-auto text-center relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-6 mb-12"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4">Let's Connect</p>
          <h2 className="text-4xl md:text-6xl font-bold">
            <span className="cinematic-text-orange">Let's Build</span>{" "}
            <span className="cinematic-text">Together</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            Whether you're a startup, collaborator, or creator with an ambitious idea — let's create something extraordinary together.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {!showForm ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => { playClickSound(); setShowForm(true); }}
                className="liquid-glass-btn rounded-full px-10 py-4 text-base font-semibold text-foreground flex items-center justify-center gap-3 group"
              >
                <Mail className="w-5 h-5 text-primary group-hover:text-primary transition-colors" />
                Get In Touch
              </button>
              <button
                onClick={() => { playClickSound(); setShowForm(true); }}
                className="liquid-glass-btn rounded-full px-10 py-4 text-base font-semibold text-foreground flex items-center justify-center gap-3 group"
              >
                <Calendar className="w-5 h-5 text-accent group-hover:text-accent transition-colors" />
                Book a Call
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <button
                onClick={() => { playClickSound(); setShowForm(false); }}
                className="liquid-glass-btn rounded-full px-6 py-2 text-sm font-medium text-foreground/70 mb-4"
              >
                ← Back
              </button>
              <BookingForm />
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-muted-foreground pt-4">
            <a href="tel:+919645013535" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" /> +91 96450 13535
            </a>
            <a href="https://wa.me/919645013535" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <a href="https://www.instagram.com/aaashbinnn_shaji?igsh=MTRzaTM5MWV6djVzcQ==" target="_blank" rel="noopener noreferrer">
              <button className="liquid-glass-btn rounded-full w-12 h-12 flex items-center justify-center" onClick={playClickSound}>
                <Instagram className="w-5 h-5 text-foreground/70" />
              </button>
            </a>
            <a href="https://github.com/ASHBINSHAJI" target="_blank" rel="noopener noreferrer">
              <button className="liquid-glass-btn rounded-full w-12 h-12 flex items-center justify-center" onClick={playClickSound}>
                <Github className="w-5 h-5 text-foreground/70" />
              </button>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="pt-20 text-muted-foreground/30"
        >
          <p className="text-sm">© 2025 Ashbin Shaji. All rights reserved.</p>
          <p className="text-xs mt-1 tracking-wider">Built with vision. Designed with purpose.</p>
        </motion.div>
      </div>
    </section>
  );
};
