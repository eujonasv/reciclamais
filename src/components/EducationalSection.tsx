
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Book, Video, Sprout, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const EducationalSection = () => {
  return (
    <section id="educacao" className="section-padding bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="animate-fade-in-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Conhecimento que <span className="text-recicla-primary dark:text-recicla-secondary">Transforma</span>
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Acreditamos que a educação é a semente para um futuro mais sustentável. Explore nossos guias, dicas e vídeos para aprofundar seu conhecimento e fazer parte da mudança.
            </p>
            <Button asChild size="lg" className="bg-recicla-primary hover:bg-recicla-accent dark:bg-recicla-secondary dark:hover:bg-recicla-primary text-white group">
              <Link to="/educacao">
                Ver todo o conteúdo
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Educational Cards */}
          <div className="space-y-6 animate-fade-in-right">
            {educationalResources.map((resource, index) => (
              <Link to="/educacao" key={index} className="block">
                <Card className="group transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl bg-white/60 dark:bg-white/10 backdrop-blur-md border-gray-200/50 dark:border-white/10 rounded-2xl">
                  <CardContent className="p-6 flex items-center gap-6">
                    <div className="p-4 rounded-xl bg-recicla-primary/10 group-hover:bg-recicla-primary/20 transition-colors duration-300">
                      {resource.icon}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{resource.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{resource.description}</p>
                    </div>
                    <ArrowRight className="ml-auto h-5 w-5 text-gray-400 group-hover:text-recicla-primary dark:group-hover:text-recicla-secondary transition-all duration-300 group-hover:translate-x-1" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const educationalResources = [
  {
    title: 'Dicas para o Dia a Dia',
    description: 'Ações práticas para reduzir, reutilizar e reciclar.',
    icon: <Book size={24} className="text-recicla-primary dark:text-recicla-secondary" />
  },
  {
    title: 'Guias para Iniciantes',
    description: 'Passo a passo para começar sua jornada sustentável.',
    icon: <Sprout size={24} className="text-recicla-primary dark:text-recicla-secondary" />
  },
  {
    title: 'Vídeos Educativos',
    description: 'Conteúdo visual para aprender de forma rápida e clara.',
    icon: <Video size={24} className="text-recicla-primary dark:text-recicla-secondary" />
  }
];

export default EducationalSection;
