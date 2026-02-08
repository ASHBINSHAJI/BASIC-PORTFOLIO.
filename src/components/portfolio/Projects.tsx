import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Projects = () => {
  const projects = [
    {
      title: "AIRNEST Platform",
      description: "A comprehensive AI automation platform that streamlines business workflows and enhances productivity through intelligent automation.",
      tags: ["React", "Node.js", "AI", "Automation"],
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "Motion Portfolio",
      description: "An animated portfolio showcase featuring cutting-edge motion graphics and interactive elements built with modern web technologies.",
      tags: ["React", "Framer Motion", "Three.js"],
      gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      title: "Full-Stack E-Commerce",
      description: "A complete e-commerce solution with secure payments, real-time inventory, and an intuitive admin dashboard built on MERN stack.",
      tags: ["MERN", "Stripe", "MongoDB"],
      gradient: "from-green-500/20 to-emerald-500/20",
    },
  ];

  return (
    <section className="py-32 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="liquid-glass-subtle">Featured Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work combining development, design, and innovation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className="group animate-fade-in-up opacity-0"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="h-full p-8 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all space-y-6">
                {/* Project gradient header */}
                <div className={`h-32 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                  <div className="text-6xl font-bold text-white/20">
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
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 group-hover:border-accent/50 transition-colors"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
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
