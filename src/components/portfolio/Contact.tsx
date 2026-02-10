import { Mail, Github, Phone, Calendar, MessageCircle, Instagram, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingForm } from "./BookingForm";
import { useState } from "react";

export const Contact = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-6">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
            <span className="liquid-glass-subtle">Let's Build Something</span>
            <br />
            <span className="liquid-glass">Amazing Together</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you have a project in mind or just want to chat about technology,
            I'd love to hear from you.
          </p>
        </div>

        <div className="space-y-8">
          {!showForm ? (
            <>
              {/* Contact methods */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-10 py-7 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
                  onClick={() => setShowForm(true)}
                >
                  <Mail className="w-5 h-5 mr-3" />
                  Get In Touch
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold px-10 py-7 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
                  onClick={() => setShowForm(true)}
                >
                  <Calendar className="w-5 h-5 mr-3" />
                  Book a Call
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <Button
                variant="outline"
                onClick={() => setShowForm(false)}
                className="mb-4"
              >
                ← Back
              </Button>
              <BookingForm />
            </div>
          )}

          {/* Phone & WhatsApp */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5" />
              <a 
                href="tel:+919645023535" 
                className="text-lg hover:text-accent transition-colors"
              >
                +91 96450 23535
              </a>
            </div>
            <a
              href="https://wa.me/919645023535"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-lg hover:text-accent transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-4 pt-8">
            <a href="https://www.instagram.com/aaashbinnn_shaji?igsh=MTRzaTM5MWV6djVzcQ==" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 hover:border-accent/50 hover:bg-accent/10 transition-all"
              >
                <Instagram className="w-5 h-5" />
              </Button>
            </a>
            <a href="https://github.com/ASHBINSHAJI" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 hover:border-accent/50 hover:bg-accent/10 transition-all"
              >
                <Github className="w-5 h-5" />
              </Button>
            </a>
          </div>
        </div>

        {/* Buy Me a Tea */}
        <div className="pt-12">
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-secondary/50 border border-border">
            <span className="text-4xl">☕</span>
            <h3 className="text-xl font-bold">Buy Me a Tea</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              If you enjoy my work and want to support me, consider buying me a tea!
            </p>
            <a
              href="https://www.buymeacoffee.com/ashbin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-5 rounded-full">
                ☕ Buy Me a Tea
              </Button>
            </a>
          </div>
        </div>

        {/* Under Construction */}
        <div className="pt-12">
          <div className="relative overflow-hidden rounded-2xl border border-accent/30">
            <div className="absolute inset-0 opacity-10" style={{
              background: 'repeating-linear-gradient(45deg, hsl(40 60% 50%) 0px, hsl(40 60% 50%) 10px, transparent 10px, transparent 20px, hsl(20 8% 7%) 20px, hsl(20 8% 7%) 30px, transparent 30px, transparent 40px)',
              backgroundSize: '56.57px 56.57px',
              animation: 'stripe-scroll 3s linear infinite',
            }} />
            <div className="relative z-10 p-8 flex flex-col items-center gap-4 text-center">
              <div className="relative">
                <Construction className="w-10 h-10 text-accent" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
              </div>
              <h3 className="text-xl font-bold">Work Under Construction</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                This portfolio is a work in progress. Exciting updates coming soon — stay tuned!
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-12 text-muted-foreground">
          <p className="text-sm">
            © 2025 Ashbin. Designed & Built with passion.
          </p>
          <p className="text-xs mt-2">
            Inspired by the simplicity and innovation of Steve Jobs
          </p>
        </div>
      </div>
    </section>
  );
};
