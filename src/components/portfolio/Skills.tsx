import { Clock } from "lucide-react";

export const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Next.js"],
      comingSoon: true,
    },
    {
      title: "Backend",
      skills: ["Python", "Django", "Node.js", "PostgreSQL", "REST APIs"],
      comingSoon: true,
    },
    {
      title: "Creative & Animation",
      skills: ["Blender", "After Effects", "UI/UX Design"],
      comingSoon: true,
    },
    {
      title: "AI & Tools",
      skills: ["Gemini", "AI Automation", "ChatGPT", "Lovable", "Affinity", "Zapier", "Make.com", "Git"],
      comingSoon: true,
    },
    {
      title: "DevOps",
      skills: ["Docker", "CI/CD", "Linux", "Nginx", "AWS", "Cloud Deploy"],
      comingSoon: true,
    },
    {
      title: "Robotics R&D & IoT",
      skills: ["Arduino", "Raspberry Pi", "ROS", "Sensor Integration", "PCB Design", "MQTT"],
      comingSoon: true,
    },
  ];

  return (
    <section className="py-40 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="liquid-glass-subtle">Skills & Expertise</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable, and beautiful digital experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <div
              key={category.title}
              className="space-y-4 animate-fade-in-up opacity-0 relative"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-foreground">{category.title}</h3>
                {category.comingSoon && (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20">
                    <Clock className="w-3 h-3 text-accent" />
                    <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">Soon</span>
                  </span>
                )}
              </div>
              <div className="space-y-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="px-4 py-3 rounded-lg bg-secondary/50 hover:bg-accent/10 transition-colors border border-border hover:border-accent/30"
                  >
                    <p className="font-medium">{skill}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
