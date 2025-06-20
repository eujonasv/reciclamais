
import React from 'react';
import { ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
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
    <section id="inicio" className="relative min-h-[90vh] flex items-center justify-center py-12 sm:py-20 overflow-hidden">
      {/* Enhanced background with multiple gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-green-50/50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900/20 z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-recicla-primary/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-recicla-accent/15 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-green-400/10 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-recicla-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }}></div>
        <div className="absolute top-3/4 left-3/4 w-1 h-1 bg-recicla-accent/60 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '4s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-green-500/50 rounded-full animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '3.5s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="max-w-2xl mx-auto md:ml-0 text-center md:text-left">
            <div className="animate-fade-in">
              {/* Logo with enhanced animation */}
              <div className="flex justify-center md:justify-start mb-6 sm:mb-8">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-recicla-primary/20 to-recicla-accent/20 rounded-full filter blur-xl animate-pulse"></div>
                  <RecycleLogoWithText size="xxl" className="relative animate-float scale-90 sm:scale-100" />
                </div>
              </div>

              {/* Enhanced title with gradient text */}
              <div className="relative mb-6 sm:mb-8">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight px-2 sm:px-0">
                  <span className="block text-gray-900 dark:text-white animate-fade-in">
                    Seu{' '}
                    <span className="relative inline-block">
                      <span className="bg-gradient-to-r from-recicla-primary via-recicla-accent to-emerald-500 bg-clip-text text-transparent animate-scale-in">
                        lixo
                      </span>
                      <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-recicla-primary animate-pulse" />
                    </span>
                  </span>
                  <span className="block text-gray-900 dark:text-white animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    nossa{' '}
                    <span className="bg-gradient-to-r from-emerald-500 via-recicla-accent to-recicla-primary bg-clip-text text-transparent animate-scale-in" style={{ animationDelay: '0.3s' }}>
                      solução
                    </span>
                  </span>
                </h1>
              </div>

              {/* Enhanced subtitle */}
              <p className="text-xl sm:text-2xl md:text-3xl mb-8 sm:mb-10 text-gray-700 dark:text-gray-300 px-2 sm:px-0 animate-fade-in leading-relaxed" style={{ animationDelay: '0.4s' }}>
                Conectamos pessoas e empresas a pontos de coleta de recicláveis para um{' '}
                <span className="font-semibold text-recicla-primary dark:text-recicla-secondary">
                  futuro mais sustentável
                </span>
              </p>

              {/* Enhanced call-to-action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start px-4 sm:px-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <Button 
                  onClick={() => scrollToSection('como-funciona')}
                  size="lg"
                  className="group relative bg-gradient-to-r from-recicla-primary to-recicla-accent hover:from-recicla-accent hover:to-recicla-primary text-white font-semibold px-8 py-4 rounded-xl w-full sm:w-auto text-lg h-14 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Como Funciona
                    <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </Button>
                
                <Button 
                  onClick={() => scrollToSection('mapa-cta')}
                  variant="outline"
                  size="lg"
                  className="group border-2 border-recicla-primary text-recicla-primary hover:bg-recicla-primary hover:text-white dark:border-recicla-secondary dark:text-recicla-secondary dark:hover:bg-recicla-secondary dark:hover:text-gray-900 w-full sm:w-auto text-lg h-14 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <span className="flex items-center">
                    Ver Pontos de Coleta
                    <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 sm:gap-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">100% Gratuito</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <span className="text-sm font-medium">Fácil de Usar</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <span className="text-sm font-medium">Impacto Real</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced hero image */}
          <div className="hidden md:block relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative group">
              {/* Multiple layered background effects */}
              <div className="absolute -inset-8 rounded-3xl bg-gradient-to-r from-recicla-primary/30 via-recicla-accent/20 to-emerald-500/30 filter blur-2xl animate-pulse group-hover:blur-3xl transition-all duration-500"></div>
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-white/50 to-transparent dark:from-gray-800/50 filter blur-xl"></div>
              
              <div className="relative overflow-hidden rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                <img 
                  src="https://plus.unsplash.com/premium_vector-1719419318688-8fb5853b53f1?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Sustentabilidade e Reciclagem" 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 animate-scale-in"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-recicla-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 sm:bottom-12 left-0 right-0 flex flex-col items-center animate-fade-in" style={{ animationDelay: '1s' }}>
          <span className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">
            Descubra mais
          </span>
          <button 
            onClick={() => scrollToSection('sobre')}
            aria-label="Scroll to about section"
            className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-bounce"
          >
            <ChevronDown className="w-6 h-6 text-recicla-primary dark:text-recicla-secondary group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
