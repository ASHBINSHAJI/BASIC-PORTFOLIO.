import { Lock } from "lucide-react";

const ideas = [
  {
    title: "AI-Powered Resume Builder",
    description: "Smart resume generator with ATS scoring, real-time suggestions, and professional templates.",
    tags: ["AI", "SaaS", "Web App"],
  },
  {
    title: "Smart Inventory System",
    description: "IoT-based warehouse management with barcode scanning, stock alerts, and analytics dashboard.",
    tags: ["IoT", "Django", "Dashboard"],
  },
  {
    title: "Freelancer Marketplace",
    description: "A platform connecting developers with clients, featuring escrow payments and project tracking.",
    tags: ["Marketplace", "Payments", "SaaS"],
  },
  {
    title: "Health Monitoring Dashboard",
    description: "Real-time health metrics visualization with wearable device integration and AI insights.",
    tags: ["Health", "AI", "IoT"],
  },
  {
    title: "Event Management Platform",
    description: "End-to-end event planning with ticketing, seating arrangements, and live streaming.",
    tags: ["Events", "Streaming", "Web App"],
  },
  {
    title: "Drone Delivery System",
    description: "Autonomous delivery network with route optimization, real-time tracking, and fleet management.",
    tags: ["Robotics", "AI", "Logistics"],
  },
];

export const ProjectIdeas = () => {
  return (
    <section className="py-40 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="liquid-glass-subtle">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upcoming projects currently in the pipeline
          </p>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ideas.map((idea, idx) => (
              <div
                key={idea.title}
                className="relative p-6 rounded-2xl bg-card border border-border space-y-4 select-none"
                style={{ filter: "blur(5px)" }}
              >
                <h3 className="text-xl font-bold">{idea.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {idea.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {idea.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Coming Soon overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 px-8 py-6 rounded-2xl bg-card/90 border border-accent/30 backdrop-blur-sm shadow-lg">
              <Lock className="w-8 h-8 text-accent" />
              <span className="text-2xl font-bold">Coming Soon</span>
              <p className="text-sm text-muted-foreground text-center max-w-xs">
                These projects are currently being developed. Stay tuned for updates!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
