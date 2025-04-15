
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import RecycleLogo from './RecycleLogo';

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
      question: "Preciso lavar os materiais antes de reciclar?",
      answer: "Sim, é recomendável lavar levemente os materiais como embalagens de alimentos, garrafas e latas para remover resíduos de comida. Isso evita mau cheiro e contaminação de outros materiais recicláveis."
    },
    {
      question: "Como devo separar os materiais?",
      answer: "O ideal é separar por tipo: papel, plástico, metal e vidro. Se possível, separe também por cor (vidros) e tipo específico (PET, PP, PEAD para plásticos). Mantenha eletrônicos e pilhas em separado dos demais materiais."
    },
    {
      question: "A RECICLA+ coleta em residências?",
      answer: "Em algumas regiões, temos parceiros que fazem coleta domiciliar. Consulte o mapa ou entre em contato conosco para verificar a disponibilidade em sua área."
    },
    {
      question: "Como me tornar um parceiro da RECICLA+?",
      answer: "Empresas, cooperativas e coletores individuais podem se tornar parceiros. Entre em contato através do email parcerias@reciclamais.com.br para mais informações."
    },
    {
      question: "A RECICLA+ emite certificado de descarte correto?",
      answer: "Sim, para empresas que precisam de documentação para conformidade ambiental, emitimos certificados de descarte correto. Solicite esta opção ao entregar seus materiais."
    }
  ];

  return (
    <section id="faq" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <RecycleLogo size="md" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Perguntas <span className="text-recicla-primary dark:text-recicla-secondary">Frequentes</span>
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            Tire suas dúvidas sobre a RECICLA+ e aprenda mais sobre como funciona nosso sistema de reciclagem.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 text-left font-medium text-gray-900 dark:text-white">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Ainda tem dúvidas? Entre em contato conosco.
            </p>
            <a 
              href="mailto:contato@reciclamais.com.br" 
              className="inline-block mt-4 text-recicla-primary dark:text-recicla-secondary hover:underline font-medium"
            >
              contato@reciclamais.com.br
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
