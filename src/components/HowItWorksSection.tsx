import React, { useState } from 'react';
import { Search, MapPin, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import RecycleLogo from './RecycleLogo';

const HowItWorksSection = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      number: 1,
      icon: Search,
      title: "Encontre um ponto de coleta",
      description: "Utilize nosso mapa interativo para encontrar o ponto de coleta mais próximo de você. Filtre por tipo de material que deseja reciclar.",
      image: "https://plus.unsplash.com/premium_vector-1719419318811-8c03fcdde6ef?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      number: 2,
      icon: MapPin,
      title: "Coleta e Reciclagem",
      description: "Descarte seus materiais recicláveis em um dos nossos pontos de coleta parceiros. Após isso, os materiais são recolhidos e enviados para um centro especializado em reciclagem.",
      image: "https://plus.unsplash.com/premium_vector-1719419318789-738cb9d164d4?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      number: 3,
      icon: CheckCircle,
      title: "Ganhos",
      description: "Se você é um ponto de coleta, recebe uma porcentagem da venda dos materiais reciclados.",
      image: "https://plus.unsplash.com/premium_vector-1719419318935-d8c67018c35c?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
            <RecycleLogo size="lg" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Como <span className="text-recicla-primary dark:text-recicla-secondary">Funciona</span>
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            Reciclar nunca foi tão fácil. Siga estes três passos simples para começar sua jornada de reciclagem.
          </p>
        </div>

        {/* Steps for Desktop */}
        <div className="hidden md:flex md:flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center text-center max-w-xs animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                  {/* Icon with number */}
                  <div className="flex items-center justify-center w-24 h-24 rounded-full bg-recicla-light dark:bg-gray-700 mb-6 relative">
                    <div className="flex items-center justify-center w-20 h-20 rounded-full hero-gradient text-white shadow-lg">
                      <Icon className="w-10 h-10" />
                    </div>
                    <div className="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 rounded-full bg-recicla-accent text-white font-bold text-sm shadow-md">
                      {step.number}
                    </div>
                  </div>
                  {/* Title and Description */}
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
                
                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className="w-px h-16 bg-gray-200 dark:bg-gray-700 my-4 lg:w-24 lg:h-px lg:my-0 lg:mt-12"></div>
                )}
              </React.Fragment>
            )
          })}
        </div>

        {/* Steps for Mobile */}
        <div className="md:hidden">
          <div className="relative rounded-xl shadow-md overflow-hidden bg-white dark:bg-gray-900">
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

        {/* Call to action was here */}
      </div>
    </section>
  );
};

export default HowItWorksSection;
