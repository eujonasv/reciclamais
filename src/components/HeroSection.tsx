
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Leaf, Recycle } from 'lucide-react';
import RecycleLogoWithText from "@/components/RecycleLogoWithText";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 dark:from-gray-900 dark:via-emerald-900/20 dark:to-gray-800" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Large floating circles */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-r from-emerald-300/20 to-teal-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-gradient-to-r from-green-300/20 to-emerald-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-teal-200/10 to-emerald-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Floating icons */}
        <div className="absolute top-20 left-20 animate-float">
          <Leaf className="w-8 h-8 text-emerald-400/60" />
        </div>
        <div className="absolute top-32 right-32 animate-float" style={{ animationDelay: '1s' }}>
          <Sparkles className="w-6 h-6 text-teal-400/60" />
        </div>
        <div className="absolute bottom-40 left-40 animate-float" style={{ animationDelay: '2s' }}>
          <Recycle className="w-10 h-10 text-green-400/60" />
        </div>
        <div className="absolute bottom-20 right-20 animate-float" style={{ animationDelay: '3s' }}>
          <Sparkles className="w-7 h-7 text-emerald-400/60" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Large Logo Section */}
        <div className="mb-16 animate-fade-in-up">
          <div className="relative inline-block">
            {/* Glow effect behind logo */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 blur-2xl rounded-full scale-150" />
            
            {/* Main Logo */}
            <div className="relative">
              <RecycleLogoWithText size="xxl" className="drop-shadow-2xl" />
            </div>
            
            {/* Decorative elements around logo */}
            <div className="absolute -top-8 -left-8 animate-pulse">
              <div className="w-4 h-4 bg-emerald-400 rounded-full opacity-60" />
            </div>
            <div className="absolute -bottom-6 -right-6 animate-pulse" style={{ animationDelay: '1s' }}>
              <div className="w-3 h-3 bg-teal-400 rounded-full opacity-60" />
            </div>
          </div>
        </div>

        {/* Hero Title */}
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent">
              Recicle
            </span>
            <br />
            <span className="text-gray-800 dark:text-white">
              o Futuro
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Transforme resíduos em <span className="font-semibold text-emerald-600 dark:text-emerald-400">oportunidades</span> e 
            construa um mundo mais <span className="font-semibold text-teal-600 dark:text-teal-400">sustentável</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mb-20 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              onClick={() => scrollToSection('mapa')}
              size="lg"
              className="group bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-6 px-10 text-xl rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              Começar Agora
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              onClick={() => scrollToSection('como-funciona')}
              variant="outline"
              size="lg"
              className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-400 dark:hover:text-gray-900 font-bold py-6 px-10 text-xl rounded-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Como Funciona
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">500+</div>
            <div className="text-gray-700 dark:text-gray-300 font-medium">Pontos de Coleta</div>
          </div>
          
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">10k+</div>
            <div className="text-gray-700 dark:text-gray-300 font-medium">Toneladas Recicladas</div>
          </div>
          
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">50k+</div>
            <div className="text-gray-700 dark:text-gray-300 font-medium">Usuários Ativos</div>
          </div>
        </div>
      </div>

      {/* Subtle bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="currentColor"
            className="text-white/50 dark:text-gray-900/50"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
