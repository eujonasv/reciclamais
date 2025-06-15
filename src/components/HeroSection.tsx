
import React from 'react';
import { Button } from "@/components/ui/button";
import { MoveRight, ArrowDown } from 'lucide-react';
import RecycleLogoWithText from "@/components/RecycleLogoWithText";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Animated circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-recicla-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-recicla-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-300/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Geometric shapes */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-recicla-primary rotate-45 animate-bounce" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-32 left-16 w-6 h-6 bg-recicla-secondary rounded-full animate-bounce" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-green-400 rotate-45 animate-bounce" style={{ animationDelay: '2.5s' }} />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 z-10 text-center max-w-6xl">
        {/* Hero Logo - Extra Large */}
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex justify-center mb-6">
            <div className="relative">
              <RecycleLogoWithText size="xxl" />
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 bg-recicla-primary/20 blur-xl rounded-full scale-110 -z-10" />
            </div>
          </div>
        </div>

        {/* Main Headline */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 bg-gradient-to-r from-recicla-primary via-green-600 to-recicla-secondary bg-clip-text text-transparent leading-tight">
            O Futuro Verde
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Começa com Sua <span className="text-recicla-primary">Escolha</span>
          </h2>
        </div>

        {/* Subtitle */}
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Descubra pontos de coleta próximos, transforme resíduos em recursos e seja parte da revolução sustentável que nosso planeta precisa.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              onClick={() => scrollToSection('mapa')}
              size="lg"
              className="bg-gradient-to-r from-recicla-primary to-green-600 hover:from-green-600 hover:to-recicla-primary text-white font-bold py-4 px-12 text-xl rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
            >
              Encontre Pontos Agora
              <MoveRight className="ml-3 w-6 h-6" />
            </Button>
            
            <Button 
              onClick={() => scrollToSection('como-funciona')}
              variant="outline"
              size="lg"
              className="border-2 border-recicla-primary text-recicla-primary hover:bg-recicla-primary hover:text-white dark:border-recicla-secondary dark:text-recicla-secondary dark:hover:bg-recicla-secondary dark:hover:text-white font-bold py-4 px-12 text-xl rounded-full transition-all duration-300 transform hover:-translate-y-1"
            >
              Como Funciona
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
            <p className="text-sm mb-2 font-medium">Descubra mais</p>
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="currentColor"
            className="text-white dark:text-gray-900"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
