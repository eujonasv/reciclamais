
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Ana Silva",
    role: "Usuária do App",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    testimonial: "O RECICLA+ tornou a reciclagem muito mais fácil para mim e minha família. Encontrar pontos de coleta é super rápido e sinto que estou realmente fazendo a diferença!"
  },
  {
    name: "João Pereira",
    role: "Dono de Ponto de Coleta",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
    testimonial: "Desde que me tornei um parceiro, o fluxo de materiais aumentou significativamente. A plataforma é ótima para conectar coletores e quem quer descartar."
  },
  {
    name: "Mariana Costa",
    role: "Ativista Ambiental",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f",
    testimonial: "É uma iniciativa fantástica que une tecnologia e sustentabilidade de forma prática. Recomendo para todos que querem começar a reciclar."
  }
];

const TestimonialsSection = () => {
  return (
    <section id="depoimentos" className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Quem <span className="text-recicla-primary">Usa</span>, Aprova
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            Veja o que nossa comunidade está dizendo sobre a experiência com o RECICLA+.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col"
            >
              <div className="flex-grow mb-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.testimonial}"</p>
              </div>
              <div className="flex items-center mt-auto">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
