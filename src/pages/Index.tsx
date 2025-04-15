
import React from "react";
import { ThemeProvider } from "next-themes";
import MainLayout from "@/layouts/MainLayout";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import MapSection from "@/components/MapSection";
import FaqSection from "@/components/FaqSection";

// Import fonts
import "@fontsource-variable/montserrat";
import "@fontsource/roboto";

const Index = () => {
  return (
    <ThemeProvider attribute="class">
      <MainLayout>
        <HeroSection />
        <AboutSection />
        <HowItWorksSection />
        <MapSection />
        <FaqSection />
      </MainLayout>
    </ThemeProvider>
  );
};

export default Index;
