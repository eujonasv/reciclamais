
import React from 'react';
import { Button } from "@/components/ui/button";
import { MoveRight } from 'lucide-react';
import RecycleLogoWithText from '@/components/RecycleLogoWithText';

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-black" />
        <div 
            className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-recicla-secondary/20 dark:bg-recicla-secondary/30 rounded-full filter blur-3xl opacity-50 animate-pulse-green"
        />
        <div 
            className="absolute bottom-0 -right-1/4 w-2/3 h-2/3 bg-recicla-primary/20 dark:bg-recicla-primary/30 rounded-full filter blur-3xl opacity-50 animate-pulse-green"
            style={{ animationDelay: '2s' }}
        />
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
            <div className="mb-8 animate-fade-in-up">
                <RecycleLogoWithText size="xxl" />
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight tracking-tight">
                    Conectando você à <span className="text-recicla-primary">reciclagem</span>
                </h1>
                <p className="text-lg md:text-xl mb-10 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                    Encontre pontos de coleta, contribua com o meio ambiente e faça parte da mudança.
                </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <Button 
                    onClick={() => scrollToSection('mapa')}
                    size="lg"
                    className="bg-recicla-primary hover:bg-recicla-accent text-white font-semibold py-3 px-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                    Encontrar Pontos de Coleta <MoveRight className="ml-2" />
                </Button>
                <Button 
                    onClick={() => scrollToSection('como-funciona')}
                    variant="ghost"
                    size="lg"
                    className="text-recicla-primary dark:text-recicla-secondary hover:bg-recicla-primary/10 dark:hover:bg-recicla-secondary/10 font-semibold py-3 px-8 text-lg rounded-full"
                >
                    Saiba Mais
                </Button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
