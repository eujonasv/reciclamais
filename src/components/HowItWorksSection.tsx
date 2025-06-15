
import React, { useState } from 'react';
import { Search, MapPin, CheckCircle, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import RecycleLogo from './RecycleLogo';

const HowItWorksSection = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      number: 1,
      icon: <Search className="h-12 w-12 text-white" />,
      title: "Encontre um ponto de coleta",
      description: "Utilize nosso mapa interativo para encontrar o ponto de coleta mais próximo de você. Filtre por tipo de material que deseja reciclar.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10"
    },
    {
      number: 2,
      icon: <MapPin className="h-12 w-12 text-white" />,
      title: "Coleta e Reciclagem",
      description: "Descarte seus materiais recicláveis em um dos nossos pontos de coleta parceiros. Após isso, os materiais são recolhidos e enviados para um centro especializado em reciclagem.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-500/10 to-emerald-500/10"
    },
    {
      number: 3,
      icon: <CheckCircle className="h-12 w-12 text-white" />,
      title: "Ganhos",
      description: "Se você é um ponto de coleta, recebe uma porcentagem da venda dos materiais reciclados.",
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-gradient-to-br from-purple-500/10 to-violet-500/10"
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
    <section id="como-funciona" className="section-padding bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-800 dark:via-gray-900 dark:to-blue-900/20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-recicla-primary/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-500/5 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-recicla-primary/10 to-blue-500/10 rounded-2xl">
              <RecycleLogo size="md" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">
            Como <span className="bg-gradient-to-r from-recicla-primary to-blue-600 bg-clip-text text-transparent">Funciona</span>
          </h2>
          <p className="text-xl max-w-4xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed">
            Reciclar nunca foi tão fácil. Siga estes três passos simples para começar sua jornada de reciclagem.
          </p>
        </div>

        {/* Steps for Desktop */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <Card 
                className={`cursor-pointer transition-all duration-500 transform hover:-translate-y-4 ${
                  currentStep === index 
                    ? 'ring-2 ring-recicla-primary shadow-2xl scale-105' 
                    : 'hover:shadow-xl'
                } bg-white dark:bg-gray-800 border-0 overflow-hidden`}
                onClick={() => goToStep(index)}
              >
                {/* Step number badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-sm`}>
                    {step.number}
                  </div>
                </div>

                <CardContent className="p-8">
                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-recicla-primary dark:group-hover:text-recicla-secondary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>

                {/* Hover effect overlay */}
                <div className={`absolute inset-0 ${step.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
              </Card>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center">
                    <ChevronRight className="h-5 w-5 text-recicla-primary dark:text-recicla-secondary" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Steps for Mobile - Carousel */}
        <div className="md:hidden mb-16">
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-xl overflow-hidden">
            {/* Step number indicator */}
            <div className="absolute top-4 right-4 z-10">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${steps[currentStep].color} flex items-center justify-center text-white font-bold`}>
                {steps[currentStep].number}
              </div>
            </div>

            <CardContent className="p-8">
              {/* Icon */}
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${steps[currentStep].color} flex items-center justify-center mb-6 mx-auto`}>
                {steps[currentStep].icon}
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {steps[currentStep].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {steps[currentStep].description}
                </p>
              </div>
            </CardContent>

            {/* Navigation */}
            <div className="flex justify-between items-center p-6 border-t border-gray-100 dark:border-gray-700">
              <Button
                onClick={prevStep}
                variant="ghost"
                className="flex items-center text-recicla-primary dark:text-recicla-secondary"
              >
                <ChevronLeft className="mr-1" size={16} /> Anterior
              </Button>

              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToStep(index)}
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${
                      currentStep === index
                        ? 'bg-recicla-primary dark:bg-recicla-secondary scale-125'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={nextStep}
                variant="ghost"
                className="flex items-center text-recicla-primary dark:text-recicla-secondary"
              >
                Próximo <ChevronRight className="ml-1" size={16} />
              </Button>
            </div>
          </Card>
        </div>

        {/* Call to action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-recicla-primary/10 to-blue-500/10 rounded-3xl p-8 md:p-12">
            <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Pronto para começar?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Encontre o ponto de coleta mais próximo e comece a fazer a diferença hoje mesmo!
            </p>
            <Button
              onClick={() => {
                const mapSection = document.getElementById('mapa');
                if (mapSection) mapSection.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-recicla-primary to-blue-600 hover:from-recicla-accent hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl group shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Encontrar Pontos de Coleta
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
