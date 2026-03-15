import { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { Philosophy } from "@/components/portfolio/Philosophy";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { UpcomingProjects } from "@/components/portfolio/UpcomingProjects";
import { GameVision } from "@/components/portfolio/GameVision";
import { AnimationShowcase } from "@/components/portfolio/AnimationShowcase";
import { InnovationLab } from "@/components/portfolio/InnovationLab";
import { FreelanceSection } from "@/components/portfolio/FreelanceSection";

import { FutureVision } from "@/components/portfolio/FutureVision";
import { Contact } from "@/components/portfolio/Contact";
import { IntroAnimation } from "@/components/portfolio/IntroAnimation";
import { playClickSound } from "@/lib/sounds";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
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
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleIntroComplete = useCallback(() => setShowIntro(false), []);

  if (showIntro) {
    return <IntroAnimation onComplete={handleIntroComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Philosophy />
      <Skills />
      <Projects />
      <UpcomingProjects />
      <GameVision />
      <AnimationShowcase />
      <InnovationLab />
      <FreelanceSection />
      <Team />
      <FutureVision />
      <Contact />
    </div>
  );
};

export default Index;
