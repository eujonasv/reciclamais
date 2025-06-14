
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import RecycleLogo from './RecycleLogo';
import { useLanguage } from '@/contexts/LanguageContext';

const FaqSection = () => {
  const { translations: t } = useLanguage();

  const faqItems = [
    { question: t['faq.q1'], answer: t['faq.a1'] },
    { question: t['faq.q2'], answer: t['faq.a2'] },
    { question: t['faq.q3'], answer: t['faq.a3'] },
    { question: t['faq.q4'], answer: t['faq.a4'] },
    { question: t['faq.q5'], answer: t['faq.a5'] },
    { question: t['faq.q6'], answer: t['faq.a6'] },
    { question: t['faq.q7'], answer: t['faq.a7'] },
    { question: t['faq.q8'], answer: t['faq.a8'] },
  ];

  return (
    <section id="faq" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <RecycleLogo size="md" />
          </div>
          <h2 aria-level={2} className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            {t['faq.title.p1']}{' '}
            <span className="text-recicla-primary dark:text-recicla-secondary">{t['faq.title.p2']}</span>
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            {t['faq.subtitle']}
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
              {t['faq.contact.text']}
            </p>
            <a 
              href={`mailto:${t['faq.contact.email']}`} 
              className="inline-block mt-4 text-recicla-primary dark:text-recicla-secondary hover:underline font-medium"
            >
              {t['faq.contact.email']}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
