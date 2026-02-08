export const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Next.js"],
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST APIs"],
    },
    {
      title: "Creative",
      skills: ["After Effects", "Premiere Pro", "Motion Graphics", "UI/UX Design"],
    },
    {
      title: "AI & Tools",
      skills: ["AI Automation", "ChatGPT", "Zapier", "Make.com", "Git"],
    },
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="liquid-glass-subtle">Skills & Expertise</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable, and beautiful digital experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, idx) => (
            <div
              key={category.title}
              className="space-y-4 animate-fade-in-up opacity-0"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <h3 className="text-2xl font-bold text-accent">{category.title}</h3>
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
