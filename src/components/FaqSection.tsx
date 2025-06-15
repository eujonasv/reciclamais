
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import RecycleLogo from './RecycleLogo';
import { HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const FaqSection = () => {
  const faqItems = [
    {
      question: "O que é a RECICLA+?",
      answer: "A RECICLA+ é uma startup que conecta pessoas e empresas a pontos de coleta de materiais recicláveis, facilitando o processo de reciclagem e promovendo a sustentabilidade."
    },
    {
      question: "Como encontrar um ponto de coleta próximo?",
      answer: "Você pode usar nosso mapa interativo na seção 'Mapa' para encontrar os pontos de coleta mais próximos de sua localização. É possível filtrar por tipo de material que deseja reciclar."
    },
    {
      question: "Quais materiais posso reciclar?",
      answer: "Depende do ponto de coleta, mas geralmente aceitamos papel, plástico, metal, vidro, eletrônicos, óleo de cozinha usado, pilhas e baterias. Cada ponto de coleta especifica quais materiais aceita."
    },
    {
      question: "Como minha empresa pode se tornar um ponto de coleta?",
      answer: "Para participar, basta se cadastrar em nossa plataforma e indicar o espaço disponível para receber materiais recicláveis. Após a aprovação, seu comércio estará visível no nosso mapa de pontos de coleta."
    },
    {
      question: "Como devo separar os materiais?",
      answer: "O ideal é separar por tipo: papel, plástico, metal e vidro. Se possível, separe também por cor (vidros) e tipo específico (PET, PP, PEAD para plásticos). Mantenha eletrônicos e pilhas em separado dos demais materiais."
    },
    {
      question: "Como funciona a coleta dos materiais?",
      answer: "Periodicamente, nossa equipe agenda a retirada dos recicláveis em cada ponto de coleta cadastrado. Você será notificado previamente para organizar a entrega dos materiais."
    },
    {
      question: "Como minha empresa recebe dinheiro pela reciclagem?",
      answer: "Após a coleta e venda dos recicláveis para centros especializados, uma porcentagem do valor arrecadado é repassada para os pontos de coleta parceiros, garantindo uma renda extra sustentável."
    },
    {
      question: "Posso cancelar minha participação a qualquer momento?",
      answer: "Sim! Caso não queira mais ser um ponto de coleta, basta solicitar o desligamento pelo painel do usuário ou entrar em contato com nosso suporte."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="faq" className="section-padding bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <RecycleLogo size="md" />
          </div>
          <h2 aria-level={2} className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Perguntas <span className="text-recicla-primary dark:text-recicla-secondary">Frequentes</span>
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            Tire suas dúvidas sobre a RECICLA+ e aprenda mais sobre como funciona nosso sistema de reciclagem.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <AccordionItem 
                    value={`item-${index}`}
                    className="border-none rounded-lg bg-gray-50 dark:bg-gray-800/50 shadow-sm transition-all hover:shadow-md"
                  >
                    <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-800 dark:text-gray-100 hover:no-underline data-[state=open]:text-recicla-primary dark:data-[state=open]:text-recicla-secondary">
                      <div className="flex items-center gap-4">
                        <HelpCircle className="h-5 w-5 text-recicla-primary/80 dark:text-recicla-secondary/80" />
                        <span className="flex-1 text-left">{item.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-0 text-gray-600 dark:text-gray-300">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          <div className="mt-16 text-center bg-gray-50 dark:bg-gray-800/50 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Ainda tem dúvidas?</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2 mb-4">
              Nossa equipe de suporte está pronta para ajudar.
            </p>
            <a 
              href="mailto:reciclamais25@gmail.com" 
              className="inline-block text-lg text-recicla-primary dark:text-recicla-secondary hover:underline font-medium"
            >
              Entre em contato conosco
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
