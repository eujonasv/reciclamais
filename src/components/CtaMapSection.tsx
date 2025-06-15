
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Map, ArrowRight } from 'lucide-react';

const CtaMapSection = () => {
  return (
    <section id="mapa-cta" className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto text-center py-16">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-5 bg-recicla-primary/10 dark:bg-recicla-secondary/10 rounded-full animate-pulse-green">
              <Map className="w-12 h-12 text-recicla-primary dark:text-recicla-secondary" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Explore nosso Mapa Interativo
          </h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
            Encontre todos os pontos de coleta, filtre por materiais e planeje sua rota para o descarte correto dos seus recicláveis.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-recicla-primary hover:bg-recicla-accent text-white dark:bg-recicla-secondary dark:hover:bg-recicla-primary dark:text-gray-900 shadow-lg transform hover:scale-105 transition-transform"
          >
            <Link to="/mapa">
              Acessar o Mapa Completo
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaMapSection;
