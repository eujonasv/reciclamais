
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import RecycleLogoWithText from './RecycleLogoWithText';

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[90vh] flex items-center justify-center py-20 overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-[#051F13] dark:via-[#10181B] dark:to-[#14261A]">
      {/* Glassmorphism gradient blob */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-green-200/40 dark:bg-green-700/30 rounded-full blur-3xl pointer-events-none z-0 animate-[pulse_4s_ease-in-out_infinite]" />
      <div className="absolute -bottom-40 right-0 w-96 h-96 bg-recicla-primary/30 dark:bg-recicla-secondary/30 rounded-full blur-3xl pointer-events-none z-0 animate-[pulse_5s_ease-in-out_infinite]" />
      {/* Overlay design lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[110%] w-px bg-gradient-to-b from-recicla-secondary/30 via-transparent to-recicla-primary/40 z-1" />
      <div className="container mx-auto px-4 z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="max-w-lg mx-auto md:ml-0 text-center md:text-left">
            <div className="animate-fade-in">
              <div className="flex justify-center md:justify-start mb-4">
                <RecycleLogoWithText size="xxl" className="animate-float" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight whitespace-pre-line drop-shadow-xl">
                Seu <span className="text-recicla-primary dark:text-recicla-secondary">lixo</span>,
                <br />
                nossa <span className="text-recicla-primary dark:text-recicla-secondary">solução</span>
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-gray-700 dark:text-gray-300 transition-all">
                Conectamos pessoas e empresas a pontos de coleta de recicláveis para um futuro mais sustentável.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button
                  onClick={() => scrollToSection('como-funciona')}
                  size="lg"
                  className="bg-recicla-primary/90 hover:bg-recicla-primary text-white font-semibold px-7 py-4 rounded-2xl shadow-md backdrop-blur-xl transition-transform duration-150 hover:scale-105"
                >
                  Como Funciona
                </Button>
                <Button
                  onClick={() => scrollToSection('sobre')}
                  variant="outline"
                  size="lg"
                  className="border-recicla-primary text-recicla-primary hover:bg-recicla-primary/10 dark:border-recicla-secondary dark:text-recicla-secondary dark:hover:bg-recicla-secondary/10 rounded-2xl bg-white/80 dark:bg-gray-900/80 shadow-md"
                >
                  Saiba Mais
                </Button>
              </div>
            </div>
          </div>
          {/* Hero illustration */}
          <div className="hidden md:block relative animate-fade-in">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-recicla-primary/25 dark:bg-recicla-primary/30 filter blur-2xl animate-pulse-green" />
              <img
                src="https://plus.unsplash.com/premium_vector-1719419318688-8fb5853b53f1?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Sustentabilidade"
                className="rounded-3xl shadow-2xl max-w-full object-cover mx-auto relative z-10 animate-scale-in border-2 border-recicla-primary/10"
              />
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <button
            onClick={() => scrollToSection('sobre')}
            aria-label="Scroll to about section"
            className="bg-white/90 dark:bg-gray-800/80 rounded-full p-2 shadow-lg ring-1 ring-recicla-primary/20"
          >
            <ChevronDown className="w-7 h-7 text-recicla-primary dark:text-recicla-secondary" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
