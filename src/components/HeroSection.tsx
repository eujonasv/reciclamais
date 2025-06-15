
import React from 'react';
import { ChevronDown, MapPin, Recycle, Users, Leaf } from 'lucide-react';
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
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900"></div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-16 w-16 h-16 bg-green-300/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-emerald-400/25 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-60 left-1/3 w-8 h-8 bg-green-500/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Logo principal */}
          <div className="mb-8 animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-20 blur-xl animate-pulse-green"></div>
                <RecycleLogoWithText size="xxl" className="relative z-10 animate-float" />
              </div>
            </div>
          </div>

          {/* Título principal */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 bg-clip-text text-transparent dark:from-emerald-400 dark:via-green-400 dark:to-emerald-500">
                Transforme
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">
                o futuro
              </span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 font-light">
              Conectamos você aos pontos de coleta para um mundo mais sustentável
            </p>
          </div>

          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              onClick={() => scrollToSection('mapa')}
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Encontrar Pontos de Coleta
            </Button>
            <Button 
              onClick={() => scrollToSection('como-funciona')}
              variant="outline"
              size="lg"
              className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-400 dark:hover:text-gray-900 font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Como Funciona
            </Button>
          </div>

          {/* Pilares principais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-200/50 dark:border-emerald-700/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-emerald-100 dark:bg-emerald-900/50 rounded-full p-4 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/70 transition-colors duration-300">
                  <MapPin className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Localização Inteligente</h3>
              <p className="text-gray-600 dark:text-gray-400">Encontre os pontos de coleta mais próximos usando nossa tecnologia de mapeamento</p>
            </div>
            
            <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-200/50 dark:border-emerald-700/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-green-100 dark:bg-green-900/50 rounded-full p-4 group-hover:bg-green-200 dark:group-hover:bg-green-800/70 transition-colors duration-300">
                  <Recycle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Reciclagem Eficiente</h3>
              <p className="text-gray-600 dark:text-gray-400">Conectamos diferentes tipos de materiais aos coletores especializados</p>
            </div>
            
            <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-200/50 dark:border-emerald-700/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-emerald-100 dark:bg-emerald-900/50 rounded-full p-4 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/70 transition-colors duration-300">
                  <Users className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Comunidade Sustentável</h3>
              <p className="text-gray-600 dark:text-gray-400">Faça parte de uma rede que valoriza a sustentabilidade e o meio ambiente</p>
            </div>
          </div>

          {/* Valores principais */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-600/50">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">Acessibilidade</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Fácil de usar</p>
            </div>
            
            <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-600/50">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Recycle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">Sustentabilidade</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Impacto positivo</p>
            </div>
            
            <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-600/50">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">Comunidade</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Conectados</p>
            </div>
            
            <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-600/50">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Leaf className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">Futuro Verde</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Preservação</p>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <button 
            onClick={() => scrollToSection('sobre')}
            aria-label="Scroll to about section"
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronDown className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
