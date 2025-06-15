
import React from 'react';
import { ChevronDown, MapPin, Recycle, Leaf } from 'lucide-react';
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
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced background with gradient and animated elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-green-50/30 to-blue-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-recicla-primary/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse-green"></div>
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-recicla-secondary/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse-green delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-300/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse-blue delay-2000"></div>
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 z-0">
        <Recycle className="absolute top-20 left-20 w-8 h-8 text-recicla-primary/20 animate-float" />
        <Leaf className="absolute top-32 right-32 w-6 h-6 text-recicla-secondary/30 animate-float delay-1000" />
        <MapPin className="absolute bottom-40 left-40 w-7 h-7 text-blue-400/20 animate-float delay-2000" />
        <Recycle className="absolute bottom-20 right-20 w-9 h-9 text-recicla-primary/15 animate-float delay-3000" />
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl mx-auto lg:ml-0 text-center lg:text-left">
            <div className="animate-fade-in">
              <div className="flex justify-center lg:justify-start mb-6">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-recicla-primary to-recicla-secondary rounded-lg blur opacity-20 animate-pulse-green"></div>
                  <RecycleLogoWithText size="xxl" className="relative animate-float" />
                </div>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-gray-900 dark:text-white leading-tight">
                Seu <span className="bg-gradient-to-r from-recicla-primary to-recicla-secondary bg-clip-text text-transparent">lixo</span>,
                <br />
                nossa <span className="bg-gradient-to-r from-recicla-secondary to-recicla-primary bg-clip-text text-transparent">solução</span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-10 text-gray-700 dark:text-gray-300 leading-relaxed">
                Conectamos pessoas e empresas a pontos de coleta de recicláveis para construir um futuro mais sustentável e consciente.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-8">
                <Button 
                  onClick={() => scrollToSection('como-funciona')}
                  size="lg"
                  className="bg-gradient-to-r from-recicla-primary to-recicla-secondary hover:from-recicla-accent hover:to-recicla-primary text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Descubra Como Funciona
                </Button>
                <Button 
                  onClick={() => scrollToSection('mapa')}
                  variant="outline"
                  size="lg"
                  className="border-2 border-recicla-primary text-recicla-primary hover:bg-recicla-primary hover:text-white dark:border-recicla-secondary dark:text-recicla-secondary dark:hover:bg-recicla-secondary dark:hover:text-gray-900 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Encontrar Pontos de Coleta
                </Button>
              </div>

              {/* Stats preview */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-recicla-primary dark:text-recicla-secondary mb-1">50+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Pontos de Coleta</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-recicla-primary dark:text-recicla-secondary mb-1">10k+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Kg Reciclados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-recicla-primary dark:text-recicla-secondary mb-1">500+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Usuários Ativos</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced hero image */}
          <div className="hidden lg:block relative animate-fade-in">
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-recicla-primary/20 to-recicla-secondary/20 filter blur-2xl animate-pulse-green"></div>
              <div className="relative bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
                <img 
                  src="https://plus.unsplash.com/premium_vector-1719419318688-8fb5853b53f1?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Sustentabilidade e Reciclagem" 
                  className="rounded-xl shadow-xl max-w-full object-cover mx-auto animate-scale-in"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={() => scrollToSection('stats')}
            aria-label="Scroll to stats section"
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <ChevronDown className="w-6 h-6 text-recicla-primary dark:text-recicla-secondary group-hover:animate-pulse" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
