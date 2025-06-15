
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle } from 'lucide-react';
import RecycleLogo from './RecycleLogo';

const FaqSection = () => {
  const faqItems = [
    {
      question: "O que é a RECICLA+?",
      answer: "A RECICLA+ é uma startup inovadora que conecta pessoas e empresas a pontos de coleta de materiais recicláveis, facilitando o processo de reciclagem e promovendo a sustentabilidade de forma inteligente e eficiente."
    },
    {
      question: "Como encontrar um ponto de coleta próximo?",
      answer: "Você pode usar nosso mapa interativo na seção 'Mapa' para encontrar os pontos de coleta mais próximos de sua localização. É possível filtrar por tipo de material que deseja reciclar e visualizar informações detalhadas sobre cada ponto."
    },
    {
      question: "Quais materiais posso reciclar?",
      answer: "Depende do ponto de coleta, mas geralmente aceitamos papel, plástico, metal, vidro, eletrônicos, óleo de cozinha usado, pilhas e baterias. Cada ponto de coleta especifica quais materiais aceita em sua descrição no mapa."
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

  return (
    <section id="faq" className="section-padding bg-gradient-to-br from-gray-50 via-white to-green-50/30 dark:from-gray-800 dark:via-gray-900 dark:to-green-900/20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-recicla-primary/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-green-500/5 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-recicla-primary/10 to-green-500/10 rounded-2xl">
              <RecycleLogo size="md" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">
            Perguntas <span className="bg-gradient-to-r from-recicla-primary to-green-600 bg-clip-text text-transparent">Frequentes</span>
          </h2>
          <p className="text-xl max-w-4xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed">
            Tire suas dúvidas sobre a RECICLA+ e aprenda mais sobre como funciona nosso sistema de reciclagem inteligente.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-6">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="group border-0 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <AccordionTrigger className="px-8 py-6 hover:bg-gradient-to-r hover:from-recicla-primary/5 hover:to-green-500/5 text-left font-semibold text-lg text-gray-900 dark:text-white hover:text-recicla-primary dark:hover:text-recicla-secondary transition-all duration-300">
                  <span className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-gradient-to-r from-recicla-primary to-green-600 text-white flex items-center justify-center text-sm font-bold mr-4 group-hover:scale-110 transition-transform">
                      {index + 1}
                    </span>
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-8 py-6 text-gray-700 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700">
                  <div className="ml-12">
                    {item.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact section */}
          <div className="mt-16 bg-gradient-to-r from-recicla-primary/10 to-green-500/10 rounded-3xl p-8 md:p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-gradient-to-r from-recicla-primary to-green-600 rounded-2xl">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Ainda tem dúvidas?
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Nossa equipe está pronta para ajudar você! Entre em contato conosco e teremos prazer em esclarecer qualquer questão.
              </p>
              <Button 
                asChild
                className="bg-gradient-to-r from-recicla-primary to-green-600 hover:from-recicla-accent hover:to-green-700 text-white font-semibold px-8 py-4 rounded-xl group shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <a href="mailto:reciclamais25@gmail.com" className="flex items-center">
                  <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  reciclamais25@gmail.com
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
