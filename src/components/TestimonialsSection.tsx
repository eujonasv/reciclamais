
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Proprietária de Loja",
      content: "A RECICLA+ transformou a forma como lidamos com os resíduos em nossa loja. É prático e gera uma renda extra!",
      rating: 5,
      avatar: "MS"
    },
    {
      name: "João Santos",
      role: "Morador Local",
      content: "Finalmente encontrei uma forma fácil de reciclar meus materiais. O mapa é muito intuitivo e sempre tem um ponto perto de casa.",
      rating: 5,
      avatar: "JS"
    },
    {
      name: "Ana Costa",
      role: "Gerente de Supermercado",
      content: "Nossos clientes adoram poder deixar seus recicláveis aqui. Aumentou o movimento na loja e ainda ajudamos o meio ambiente.",
      rating: 5,
      avatar: "AC"
    }
  ];

  return (
    <section id="depoimentos" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            O que nossos <span className="text-recicla-primary dark:text-recicla-secondary">usuários</span> dizem
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Histórias reais de pessoas que estão fazendo a diferença através da reciclagem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <Quote className="w-8 h-8 text-recicla-primary/30 dark:text-recicla-secondary/30" />
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-recicla-primary to-recicla-secondary flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
