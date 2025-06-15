
import React, { useState } from 'react';
import { Search, MapPin, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import RecycleLogo from './RecycleLogo';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: <Search className="h-8 w-8 text-recicla-primary dark:text-recicla-secondary" />,
    title: "Encontre um ponto de coleta",
    description: "Utilize nosso mapa interativo para encontrar o ponto de coleta mais próximo de você. Filtre por tipo de material.",
    image: "https://plus.unsplash.com/premium_vector-1719419318811-8c03fcdde6ef?q=80&w=600&auto=format&fit=crop"
  },
  {
    icon: <MapPin className="h-8 w-8 text-recicla-primary dark:text-recicla-secondary" />,
    title: "Descarte e Recicle",
    description: "Leve seus recicláveis até um ponto parceiro. Cuidamos do destino correto dos materiais para a reciclagem.",
    image: "https://plus.unsplash.com/premium_vector-1719419318789-738cb9d164d4?q=80&w=600&auto=format&fit=crop"
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-recicla-primary dark:text-recicla-secondary" />,
    title: "Ganhos",
    description: "Se for um ponto de coleta, você recebe uma porcentagem da venda do material reciclado.",
    image: "https://plus.unsplash.com/premium_vector-1719419318935-d8c67018c35c?q=80&w=600&auto=format&fit=crop"
  }
];

const HowItWorksSection = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <motion.section 
      id="como-funciona" 
      className="section-padding bg-gradient-to-b from-recicla-primary/10 via-green-50/90 to-white dark:from-gray-800 dark:via-green-950/20 dark:to-gray-900"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <RecycleLogo size="md" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-5 text-gray-900 dark:text-white">
            Como <span className="text-recicla-primary dark:text-recicla-secondary">Funciona</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            Reciclar nunca foi tão fácil. Siga estes passos simples e faça parte do ciclo sustentável.
          </p>
        </div>

        {/* Timeline (desktop) */}
        <div className="hidden md:grid grid-cols-3 gap-8 mb-12">
          {steps.map((step, i) => (
            <motion.div 
              key={i} 
              className={`relative bg-white/90 dark:bg-gray-900/70 border border-green-100 dark:border-green-900/60 shadow-lg rounded-xl p-7 flex flex-col items-center transition-all duration-300 hover:scale-105 hover:shadow-xl`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 border-4 border-white dark:border-gray-900 rounded-full bg-recicla-primary dark:bg-recicla-secondary p-2">
                {step.icon}
              </div>
              <img src={step.image} alt={step.title} className="rounded-lg shadow-md mb-6 mt-6 h-32 object-cover w-full" />
              <h3 className="text-xl font-semibold mb-2 text-recicla-primary dark:text-recicla-secondary">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute right-[-24px] top-1/2 -translate-y-1/2 w-12 h-1 bg-green-300 dark:bg-green-900/40 rounded opacity-70"></div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Carousel (mobile) */}
        <div className="md:hidden">
          <div className="relative bg-white/90 dark:bg-gray-900/70 border border-green-100 dark:border-green-900/40 rounded-xl shadow-lg overflow-hidden max-w-sm mx-auto">
            <div className="absolute top-4 left-4 bg-recicla-primary dark:bg-recicla-secondary rounded-full p-2">
              {steps[currentStep].icon}
            </div>
            <img src={steps[currentStep].image} alt={steps[currentStep].title} className="h-40 w-full object-cover rounded-t-xl" />
            <div className="p-5 pt-3">
              <h3 className="text-lg font-bold text-recicla-primary dark:text-recicla-secondary">{steps[currentStep].title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{steps[currentStep].description}</p>
              <div className="flex justify-between items-center">
                <Button size="sm" variant="ghost" onClick={() => setCurrentStep(s => s === 0 ? steps.length - 1 : s - 1)}>
                  <ChevronLeft /> Anterior
                </Button>
                <div className="flex gap-1">
                  {steps.map((_, idx) => (
                    <div key={idx}
                      className={`h-2 w-2 rounded-full transition-all ${currentStep === idx ? "bg-recicla-primary dark:bg-recicla-secondary scale-110" : "bg-gray-300 dark:bg-gray-800"}`}
                    />
                  ))}
                </div>
                <Button size="sm" variant="ghost" onClick={() => setCurrentStep(s => s === steps.length - 1 ? 0 : s + 1)}>
                  Próximo <ChevronRight />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button
            onClick={() => {
              const mapSection = document.getElementById('mapa');
              if (mapSection) mapSection.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-recicla-primary hover:bg-recicla-accent text-white py-3 px-8 rounded-lg shadow"
          >
            Encontrar Pontos de Coleta
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

export default HowItWorksSection;
