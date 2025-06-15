
import React from "react";
import MainLayout from "@/layouts/MainLayout";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import MapSection from "@/components/MapSection";
import FaqSection from "@/components/FaqSection";
import EducationalSection from "@/components/EducationalSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CallToActionSection from "@/components/CallToActionSection";

// Import fonts
import "@fontsource-variable/montserrat";
import "@fontsource/roboto";

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <HowItWorksSection />
      <MapSection />
      <TestimonialsSection />
      <EducationalSection />
      <FaqSection />
      <CallToActionSection />
    </MainLayout>
  );
};

export default Index;
