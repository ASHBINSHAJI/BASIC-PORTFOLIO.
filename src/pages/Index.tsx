import { useState, useEffect } from "react";
import { IntroAnimation } from "@/components/portfolio/IntroAnimation";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { ProjectIdeas } from "@/components/portfolio/ProjectIdeas";
import { Services } from "@/components/portfolio/Services";
import { BuyMeATea } from "@/components/portfolio/BuyMeATea";
import { Contact } from "@/components/portfolio/Contact";
import { playScrollSound, playClickSound } from "@/lib/sounds";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (showIntro) return;

    // Scroll sound
    const handleScroll = () => playScrollSound();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Click sound on interactive elements
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']")
      ) {
        playClickSound();
      }
    };
    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick);
    };
  }, [showIntro]);

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
