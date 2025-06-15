
import React from 'react';
import { Search, MapPin, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Search className="h-8 w-8 text-recicla-primary" />,
      title: "1. Encontre",
      description: "Use nosso mapa interativo para achar o ponto de coleta mais próximo de você. Filtre por tipo de material.",
      image: "https://plus.unsplash.com/premium_vector-1719419318811-8c03fcdde6ef?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      icon: <MapPin className="h-8 w-8 text-recicla-primary" />,
      title: "2. Descarte",
      description: "Leve seus materiais recicláveis ao ponto de coleta. Eles serão recolhidos e enviados para reciclagem.",
      image: "https://plus.unsplash.com/premium_vector-1719419318789-738cb9d164d4?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-recicla-primary" />,
      title: "3. Transforme",
      description: "Ao reciclar, você ajuda o planeta, gera renda para coletores e fortalece a economia circular.",
      image: "https://plus.unsplash.com/premium_vector-1719419318935-d8c67018c35c?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  const scrollToMap = () => {
    const mapSection = document.getElementById('mapa');
    if (mapSection) mapSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="como-funciona" className="section-padding bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Como <span className="text-recicla-primary dark:text-recicla-secondary">Funciona</span>
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            Reciclar com a gente é simples, rápido e recompensador. Siga os 3 passos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="group bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <div className="relative h-56">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-white dark:bg-gray-700 shadow-md">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            onClick={scrollToMap}
            size="lg"
            className="bg-recicla-primary hover:bg-recicla-accent text-white font-semibold py-3 px-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Encontrar Pontos de Coleta
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
