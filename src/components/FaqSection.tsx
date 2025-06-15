
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import RecycleLogo from './RecycleLogo';

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

const FaqSection = () => {
  return (
    <section id="faq" className="section-padding bg-gradient-to-b from-green-100/50 via-white to-gray-50 dark:from-green-900/10 dark:via-gray-900 dark:to-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <RecycleLogo size="md" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-5 text-gray-900 dark:text-white">
            Perguntas <span className="text-recicla-primary dark:text-recicla-secondary">Frequentes</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            Tire suas dúvidas sobre a RECICLA+ e aprenda mais sobre como funciona nosso sistema de reciclagem.
          </p>
        </div>
        <div className="max-w-3xl mx-auto rounded-xl bg-white/80 dark:bg-gray-900/70 shadow-lg p-6">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}
                className="border rounded-xl overflow-hidden bg-green-50/50 dark:bg-green-950/10 border-green-200 dark:border-green-900 shadow [&[data-state=open]]:border-recicla-primary [&[data-state=open]]:shadow-recicla-primary/10 transition-all duration-200"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-recicla-primary/10 dark:hover:bg-recicla-secondary/10 text-left text-lg font-medium text-gray-900 dark:text-white">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Ainda tem dúvidas? Entre em contato conosco.
            </p>
            <a 
              href="mailto:reciclamais25@gmail.com" 
              className="inline-block mt-3 text-recicla-primary dark:text-recicla-secondary hover:underline font-medium"
            >
              reciclamais25@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
