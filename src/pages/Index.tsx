
import React from "react";
import MainLayout from "@/layouts/MainLayout";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import BenefitsSection from "@/components/BenefitsSection";
import EducationalSection from "@/components/EducationalSection";
import CallToActionSection from "@/components/CallToActionSection";
import FaqSection from "@/components/FaqSection";

// Font imports
import "@fontsource-variable/montserrat";
import "@fontsource/roboto";

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <AboutSection />
      <BenefitsSection />
      <HowItWorksSection />
      <EducationalSection />
      <CallToActionSection />
      <FaqSection />
    </MainLayout>
  );
};

export default Index;
