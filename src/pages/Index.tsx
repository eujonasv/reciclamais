
import React from "react";
import MainLayout from "@/layouts/MainLayout";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import MapSection from "@/components/MapSection";
import FaqSection from "@/components/FaqSection";
import EducationalSection from "@/components/EducationalSection";
import CtaSection from "@/components/CtaSection";

// Import fonts
import "@fontsource-variable/montserrat";
import "@fontsource/roboto";

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <AboutSection />
      <HowItWorksSection />
      <MapSection />
      <EducationalSection />
      <FaqSection />
      <CtaSection />
    </MainLayout>
  );
};

export default Index;
