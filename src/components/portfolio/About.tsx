import { Sparkles, Rocket, Code2 } from "lucide-react";

export const About = () => {
  return (
    <section className="py-40 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span className="liquid-glass-subtle">About Me</span>
            </h2>
            <div className="space-y-5 text-lg text-muted-foreground leading-loose">
              <p>
                I'm a passionate <span className="text-foreground font-semibold">Python Django Developer</span> who 
                believes in the power of technology to transform ideas into reality.
              </p>
              <p>
                As the founder of <span className="text-foreground font-semibold">Airnext</span>, <span className="text-foreground font-semibold">E-onit</span>, and <span className="text-foreground font-semibold">The Heaven Studio</span>, I'm building 
                innovative solutions across smart home automation, humanoid robotics, and creative digital experiences.
              </p>
              <p>
                Inspired by Steve Jobs' philosophy of simplicity and innovation, I strive to create 
                digital experiences that are both beautiful and functional.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all group">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <Code2 className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Python & Django</h3>
                  <p className="text-muted-foreground">
                    Building scalable web applications with Python, Django, PostgreSQL, and REST APIs
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all group">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Motion & Animation</h3>
                  <p className="text-muted-foreground">
                    Creating stunning visual experiences that bring interfaces to life
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all group">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <Rocket className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI Automation</h3>
                  <p className="text-muted-foreground">
                    Leveraging artificial intelligence to streamline workflows and boost productivity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
