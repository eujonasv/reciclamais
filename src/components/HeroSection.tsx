
import React from 'react';
import { Button } from "@/components/ui/button";
import { MoveRight } from 'lucide-react';
import RecycleLogoWithText from "@/components/RecycleLogoWithText";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-950">
      {/* Fundo redesenhado com gradientes e animações suaves */}
      <div className="absolute inset-0 z-0">
        <div 
            className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-recicla-secondary/10 dark:bg-recicla-secondary/20 rounded-full filter blur-3xl opacity-60 animate-float"
            style={{ animationDuration: '12s' }}
        />
        <div 
            className="absolute -bottom-1/4 -right-1/4 w-2/3 h-2/3 bg-recicla-primary/10 dark:bg-recicla-primary/20 rounded-full filter blur-3xl opacity-60 animate-float"
            style={{ animationDelay: '2s', animationDuration: '15s' }}
        />
        <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-green-200/10 dark:bg-green-500/10 rounded-full filter blur-2xl opacity-50 animate-float"
            style={{ animationDelay: '4s', animationDuration: '18s' }}
        />
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto">
          {/* LOGO */}
          <div className="flex justify-center mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <RecycleLogoWithText size="lg" />
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-5 text-gray-900 dark:text-white leading-tight tracking-tight">
              Transforme lixo em <span className="text-recicla-primary">oportunidade</span>.
            </h1>
            <p className="text-lg md:text-xl mb-10 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Conectamos você a pontos de coleta para um descarte consciente e um futuro mais verde.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button 
              onClick={() => scrollToSection('mapa')}
              size="lg"
              className="bg-recicla-primary hover:bg-recicla-accent text-white font-bold py-3 px-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Encontrar Pontos <MoveRight className="ml-2" />
            </Button>
            <Button 
              onClick={() => scrollToSection('como-funciona')}
              variant="outline"
              size="lg"
              className="border-recicla-primary/50 text-recicla-primary hover:bg-recicla-primary/10 hover:text-recicla-primary dark:border-recicla-secondary/50 dark:text-recicla-secondary dark:hover:bg-recicla-secondary/10 dark:hover:text-recicla-secondary font-bold py-3 px-8 text-lg rounded-full"
            >
              Como Funciona
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
