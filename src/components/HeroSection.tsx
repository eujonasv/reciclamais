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
    <section id="inicio" className="relative min-h-[90vh] flex items-center justify-center py-20 overflow-hidden">
      {/* Background gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-gray-800 z-0"></div>
      <div className="absolute inset-0 opacity-20 dark:opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00TTMwIDM0YzAtMi4yLTEuOC00LTQtNHMtNCAxLjgtNCA0IDEuOCA0IDQgNCAgNC0xLjggNC00Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-lg mx-auto md:ml-0 text-center md:text-left">
            <div className="animate-fade-in">
              <div className="flex justify-center md:justify-start mb-4">
                <RecycleLogoWithText size="xxl" className="animate-float" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                Seu <span className="text-recicla-primary dark:text-recicla-secondary">lixo</span>,
                <br />
                nossa <span className="text-recicla-primary dark:text-recicla-secondary">solução</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300">
                Conectamos pessoas e empresas a pontos de coleta de recicláveis para um futuro mais sustentável.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button 
                  onClick={() => scrollToSection('como-funciona')}
                  size="lg"
                  className="bg-recicla-primary hover:bg-recicla-accent text-white font-medium px-6 py-3 rounded-lg"
                >
                  Como Funciona
                </Button>
                <Button 
                  onClick={() => scrollToSection('mapa')}
                  variant="outline"
                  size="lg"
                  className="border-recicla-primary text-recicla-primary hover:bg-recicla-primary/10 dark:border-recicla-secondary dark:text-recicla-secondary dark:hover:bg-recicla-secondary/10"
                >
                  Ver Pontos de Coleta
                </Button>
              </div>
            </div>
          </div>
          
          {/* Hero image or illustration */}
          <div className="hidden md:block relative animate-fade-in">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-recicla-primary/20 dark:bg-recicla-primary/30 filter blur-xl animate-pulse-green"></div>
              <img 
                src="https://plus.unsplash.com/premium_vector-1719419318688-8fb5853b53f1?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Sustentabilidade" 
                className="rounded-xl shadow-xl max-w-full object-cover mx-auto relative z-10 animate-scale-in"
              />
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <button 
            onClick={() => scrollToSection('sobre')}
            aria-label="Scroll to about section"
            className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-md"
          >
            <ChevronDown className="w-6 h-6 text-recicla-primary dark:text-recicla-secondary" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
