
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Map, ArrowRight } from 'lucide-react';

const CtaMapSection = () => {
  return (
    <section id="mapa-cta" className="section-padding bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="relative rounded-2xl overflow-hidden p-8 md:p-16 bg-gradient-to-br from-recicla-primary to-recicla-accent dark:from-recicla-secondary dark:to-recicla-primary shadow-2xl animate-fade-in">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-64 h-64 bg-white/10 dark:bg-white/5 rounded-full filter blur-2xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-72 h-72 bg-white/10 dark:bg-white/5 rounded-full filter blur-3xl animate-pulse"></div>

          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left animate-fade-in">
              <div className="inline-block mb-6 p-4 bg-white/20 rounded-full animate-scale-in">
                <Map className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white animate-fade-in">
                Explore nosso Mapa Interativo
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in">
                Encontre todos os pontos de coleta, filtre por materiais e planeje sua rota para o descarte correto.
              </p>
            </div>
            
            <div className="flex justify-center md:justify-end animate-fade-in">
              <Button 
                asChild 
                size="lg" 
                className="group bg-white hover:bg-gray-100 text-recicla-primary dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-recicla-secondary font-bold text-lg py-4 px-8 shadow-lg transform hover:scale-110 transition-transform duration-300 animate-scale-in"
              >
                <Link to="/mapa">
                  Acessar o Mapa
                  <ArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaMapSection;
