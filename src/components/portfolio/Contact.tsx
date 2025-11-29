import { Mail, Linkedin, Github, Twitter, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Contact = () => {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-6">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
            Let's Build Something
            <br />
            <span className="text-accent">Amazing Together</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you have a project in mind or just want to chat about technology,
            I'd love to hear from you.
          </p>
        </div>

        <div className="space-y-8">
          {/* Contact methods */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-10 py-7 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <Mail className="w-5 h-5 mr-3" />
              Get In Touch
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold px-10 py-7 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <Calendar className="w-5 h-5 mr-3" />
              Book a Call
            </Button>
          </div>

          {/* Phone number */}
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <Phone className="w-5 h-5" />
            <a 
              href="tel:+1234567890" 
              className="text-lg hover:text-accent transition-colors"
            >
              +1 (234) 567-890
            </a>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-4 pt-8">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 hover:border-accent/50 hover:bg-accent/10 transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 hover:border-accent/50 hover:bg-accent/10 transition-all"
            >
              <Github className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 hover:border-accent/50 hover:bg-accent/10 transition-all"
            >
              <Twitter className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-20 text-muted-foreground">
          <p className="text-sm">
            © 2024 Vijay. Designed & Built with passion.
          </p>
          <p className="text-xs mt-2">
            Inspired by the simplicity and innovation of Steve Jobs
          </p>
        </div>
      </div>
    </section>
  );
};
