import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Calendar, Phone, MessageCircle, Instagram, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingForm } from "@/components/portfolio/BookingForm";
import { playClickSound } from "@/lib/sounds";

export const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [showForm, setShowForm] = useState(false);

  return (
    <section id="contact" className="py-32 md:py-48 px-6 relative">
      <div className="max-w-4xl mx-auto text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-6 mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4">Get In Touch</p>
          <h2 className="text-5xl md:text-7xl font-bold cinematic-text">
            Let's Create
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            Whether you have a vision or just want to talk about the future — we'd love to hear from you.
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
              <Button
                size="lg"
                onClick={() => { playClickSound(); setShowForm(true); }}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-10 py-7 text-lg rounded-full"
              >
                <Mail className="w-5 h-5 mr-3" />
                Get In Touch
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => { playClickSound(); setShowForm(true); }}
                className="border border-muted-foreground/20 hover:border-accent/50 hover:bg-accent/5 font-semibold px-10 py-7 text-lg rounded-full"
              >
                <Calendar className="w-5 h-5 mr-3" />
                Book a Call
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <Button
                variant="outline"
                onClick={() => { playClickSound(); setShowForm(false); }}
                className="mb-4"
              >
                ← Back
              </Button>
              <BookingForm />
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-muted-foreground pt-4">
            <a href="tel:+919645013535" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="w-4 h-4" /> +91 96450 13535
            </a>
            <a href="https://wa.me/919645013535" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>

          <div className="flex justify-center gap-4 pt-6">
            <a href="https://www.instagram.com/aaashbinnn_shaji?igsh=MTRzaTM5MWV6djVzcQ==" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-muted-foreground/15 hover:border-accent/50 hover:bg-accent/5">
                <Instagram className="w-5 h-5" />
              </Button>
            </a>
            <a href="https://github.com/ASHBINSHAJI" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-muted-foreground/15 hover:border-accent/50 hover:bg-accent/5">
                <Github className="w-5 h-5" />
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="pt-24 text-muted-foreground/40"
        >
          <p className="text-sm">© 2025 AIR. All rights reserved.</p>
          <p className="text-xs mt-1 tracking-wider">Built with vision. Designed with purpose.</p>
        </motion.div>
      </div>
    </section>
  );
};
