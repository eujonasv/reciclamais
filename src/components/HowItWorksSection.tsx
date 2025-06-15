
import React, { useState } from 'react';
import { Search, MapPin, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import RecycleLogo from './RecycleLogo';
import { AnimatePresence, motion } from 'framer-motion';

const HowItWorksSection = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      number: 1,
      icon: <Search className="h-8 w-8 text-recicla-primary" />,
      title: "Encontre um Ponto de Coleta",
      description: "Utilize nosso mapa interativo para encontrar o ponto de coleta mais próximo de você. Filtre por tipo de material que deseja reciclar.",
      image: "https://plus.unsplash.com/premium_vector-1719419318811-8c03fcdde6ef?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      number: 2,
      icon: <MapPin className="h-8 w-8 text-recicla-primary" />,
      title: "Descarte e Coleta",
      description: "Leve seus materiais recicláveis a um de nossos pontos parceiros. Nossa equipe realiza a coleta e encaminha para centros de triagem especializados.",
      image: "https://plus.unsplash.com/premium_vector-1719419318789-738cb9d164d4?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      number: 3,
      icon: <CheckCircle className="h-8 w-8 text-recicla-primary" />,
      title: "Gere Impacto e Ganhos",
      description: "Ao reciclar, você contribui para um planeta mais limpo. Pontos de coleta parceiros ainda geram uma renda extra com a venda dos materiais.",
      image: "https://plus.unsplash.com/premium_vector-1719419318935-d8c67018c35c?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  const goToStep = (index: number) => {
    setCurrentStep(index);
  };

  return (
    <section id="como-funciona" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <RecycleLogo size="md" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Como <span className="text-recicla-primary dark:text-recicla-secondary">Funciona</span>
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            Reciclar nunca foi tão fácil e recompensador. Siga estes três passos simples para começar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Step Details */}
          <div className="md:order-1">
            <div className="flex flex-col gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    currentStep === index
                      ? 'bg-white dark:bg-gray-900 shadow-lg ring-2 ring-recicla-primary/50'
                      : 'bg-transparent dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-900/70'
                  }`}
                  onClick={() => goToStep(index)}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 bg-recicla-primary/10 dark:bg-recicla-secondary/20 rounded-full">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Side - Image */}
          <div className="relative md:order-2 h-80 md:h-full min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentStep}
                src={steps[currentStep].image}
                alt={steps[currentStep].title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-contain rounded-xl"
                loading="lazy"
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <Button
            onClick={() => {
              const mapSection = document.getElementById('mapa');
              if (mapSection) mapSection.scrollIntoView({ behavior: 'smooth' });
            }}
            size="lg"
            className="bg-recicla-primary hover:bg-recicla-accent text-white py-3 px-8 rounded-lg"
          >
            Encontrar Pontos de Coleta
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
