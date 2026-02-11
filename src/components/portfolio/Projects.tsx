import { ExternalLink, Github, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Projects = () => {
  const projects = [
    {
      title: "Airnext",
      description:
        "Smart home innovation reimagined. If smooth and quality had a definition, it's Airnext — automating your home beyond imagination with solutions that actually work.",
      tags: ["IoT", "AI", "Smart Home", "Automation"],
      gradient: "from-cyan-500/20 to-blue-600/20",
      comingSoon: true,
    },
    {
      title: "E-onit",
      description:
        "Project H2S — combining hearing, sensation, and stability into one. A humanoid robotics platform merging physical and mental computing with a fresh outlayer technology.",
      tags: ["Robotics", "AI", "Hardware", "R&D"],
      gradient: "from-rose-500/20 to-orange-500/20",
      comingSoon: true,
    },
    {
      title: "The Heaven Studio",
      description:
        "Your imagination deployed as reality. Focused on virtual ads, animated web experiences, and next-level editing that turns creative visions into stunning digital content.",
      tags: ["Animation", "Web", "Creative", "Ads"],
      gradient: "from-violet-500/20 to-fuchsia-500/20",
      comingSoon: true,
    },
    {
      title: "Endeavar Fitness AI",
      description:
        "All-in-one fitness platform with superfast 30-min delivery. Meet Evar — your AI companion that helps, heals, and follows you with end-to-end encryption. Free SaaS tier available.",
      tags: ["AI", "Fitness", "SaaS", "Robotics"],
      gradient: "from-blue-600/20 to-slate-900/20",
      comingSoon: true,
    },
    {
      title: "Street Outlaws Racing",
      description:
        "A street-level illegal racing game where you can exit your car to explore the city, visit dealerships, workshops, and home. Features a thrilling story mode, truck transport, multiplayer/LAN play, a deep workshop with blueprints & custom body kits, paint mixing, and a realistic petrol/diesel fuel system.",
      tags: ["Gaming", "Open World", "Multiplayer", "Racing"],
      gradient: "from-red-600/20 to-gray-900/20",
      comingSoon: true,
    },
  ];

  return (
    <section className="py-32 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="liquid-glass-subtle">Building</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ventures spanning smart homes, robotics, creative studios, AI-powered fitness, and gaming
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className="group animate-fade-in-up opacity-0"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="relative h-full p-8 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all space-y-6 overflow-hidden">
                {/* Coming soon badge */}
                {project.comingSoon && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                    <Clock className="w-3.5 h-3.5 text-accent" />
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                      Coming Soon
                    </span>
                  </div>
                )}

                {/* Project gradient header */}
                <div
                  className={`h-32 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
                >
                  <div className="text-6xl font-bold text-foreground/10">
                    {project.title.charAt(0)}
                  </div>
                </div>

                {/* Project details */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 group-hover:border-accent/50 transition-colors"
                      disabled={project.comingSoon}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {project.comingSoon ? "Coming Soon" : "View"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 group-hover:border-accent/50 transition-colors"
                      asChild
                    >
                      <a href="https://github.com/ASHBINSHAJI" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
