
import React, { useState } from 'react';
import { Search, MapPin, CheckCircle, ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import RecycleLogo from './RecycleLogo';
import { useNavigate } from 'react-router-dom';

const HowItWorksSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      number: 1,
      icon: <Search className="h-10 w-10 text-white" />,
      title: "Encontre um ponto de coleta",
      description: "Utilize nosso mapa interativo para encontrar o ponto de coleta mais próximo de você. Filtre por tipo de material que deseja reciclar.",
      image: "https://images.unsplash.com/photo-1526778548025-14e753442582?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      number: 2,
      icon: <MapPin className="h-10 w-10 text-white" />,
      title: "Coleta e Reciclagem",
      description: "Descarte seus materiais recicláveis em um dos nossos pontos de coleta parceiros. Após isso, os materiais são recolhidos e enviados para um centro especializado em reciclagem.",
      image: "https://images.unsplash.com/photo-1599782243623-749c3f81152d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      number: 3,
      icon: <CheckCircle className="h-10 w-10 text-white" />,
      title: "Ganhos",
      description: "Se você é um ponto de coleta, recebe uma porcentagem da venda dos materiais reciclados.",
      image: "https://images.unsplash.com/photo-1622630962432-aa25cc31d4e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
  };

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
            Reciclar nunca foi tão fácil. Siga estes três passos simples para começar sua jornada de reciclagem.
          </p>
        </div>

        {/* Steps for Desktop */}
        <div className="hidden md:flex justify-center gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center max-w-sm relative">
              {/* Step Card */}
              <div
                className={`w-full rounded-xl shadow-md overflow-hidden bg-white/60 dark:bg-gray-800/80 backdrop-blur-xl border border-recicla-primary/10 dark:border-recicla-secondary/20 transition-all duration-300 hover:-translate-y-2 cursor-pointer hover:shadow-2xl hover:shadow-recicla-primary/20 dark:hover:shadow-recicla-secondary/20 hover:ring-2 hover:ring-recicla-primary/20 dark:hover:ring-recicla-secondary/20 ${
                  currentStep === index ? 'ring-2 ring-recicla-primary dark:ring-recicla-secondary' : ''
                }`}
                onClick={() => goToStep(index)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-4 w-full">
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
              </div>

              {/* Arrow */}
              {index < steps.length - 1 && (
                <div className="absolute right-[-1.5rem] top-1/2 transform -translate-y-1/2">
                  <ArrowDown className="-rotate-90 text-recicla-primary dark:text-recicla-secondary h-6 w-6" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Steps for Mobile */}
        <div className="md:hidden">
          <div className="relative rounded-xl shadow-md overflow-hidden bg-white/60 dark:bg-gray-800/80 backdrop-blur-xl border border-recicla-primary/10 dark:border-recicla-secondary/20 transition-all duration-300 hover:shadow-2xl hover:shadow-recicla-primary/20 dark:hover:shadow-recicla-secondary/20 hover:ring-2 hover:ring-recicla-primary/20 dark:hover:ring-recicla-secondary/20">
            {/* Step Number */}
            <div className="absolute top-4 left-4 z-10 text-white text-xl font-bold">
              {steps[currentStep].number}
            </div>

            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={steps[currentStep].image}
                alt={steps[currentStep].title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 w-full">
                  <h3 className="text-2xl font-bold text-white">{steps[currentStep].title}</h3>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-400">{steps[currentStep].description}</p>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center p-4 border-t border-gray-100 dark:border-gray-700">
              <Button
                onClick={prevStep}
                variant="ghost"
                className="flex items-center text-recicla-primary dark:text-recicla-secondary hover:text-recicla-accent"
              >
                <ChevronLeft className="mr-1" size={16} /> Anterior
              </Button>

              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToStep(index)}
                    className={`h-2.5 w-2.5 rounded-full transition-colors ${
                      currentStep === index
                        ? 'bg-recicla-primary dark:bg-recicla-secondary'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    aria-label={`Go to step ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                onClick={nextStep}
                variant="ghost"
                className="flex items-center text-recicla-primary dark:text-recicla-secondary hover:text-recicla-accent"
              >
                Próximo <ChevronRight className="ml-1" size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <Button
            size="lg"
            onClick={() => navigate('/mapa')}
            className="bg-recicla-primary hover:bg-recicla-primary/90 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-transform hover:scale-105"
          >
            Encontrar Pontos de Coleta
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
