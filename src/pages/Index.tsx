import { Navbar } from "@/components/air/Navbar";
import { HeroSection } from "@/components/air/HeroSection";
import { VisionSection } from "@/components/air/VisionSection";
import { AirzeeStudios } from "@/components/air/AirzeeStudios";
import { AirEpics } from "@/components/air/AirEpics";
import { Airnest } from "@/components/air/Airnest";
import { AirAgency } from "@/components/air/AirAgency";
import { ContactSection } from "@/components/air/ContactSection";
import { playClickSound } from "@/lib/sounds";
import { useEffect } from "react";

const Index = () => {
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <VisionSection />
      <AirzeeStudios />
      <AirEpics />
      <Airnest />
      <AirAgency />
      <ContactSection />
    </div>
  );
};

export default Index;
