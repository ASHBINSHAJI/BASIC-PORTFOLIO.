import { useState } from "react";
import { IntroAnimation } from "@/components/portfolio/IntroAnimation";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { ProjectIdeas } from "@/components/portfolio/ProjectIdeas";
import { Services } from "@/components/portfolio/Services";
import { BuyMeATea } from "@/components/portfolio/BuyMeATea";
import { Contact } from "@/components/portfolio/Contact";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return <IntroAnimation onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <ProjectIdeas />
      <Services />
      <BuyMeATea />
      <Contact />
    </div>
  );
};

export default Index;
