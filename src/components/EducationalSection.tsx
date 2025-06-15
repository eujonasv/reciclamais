
import React from 'react';
import { Button } from '@/components/ui/button';
import { Book, Video, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';
import RecycleLogo from './RecycleLogo';

const EducationalSection = () => {
  return (
    <section id="educacao" className="section-padding bg-gray-50 dark:bg-gray-900/70 transition-all">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <RecycleLogo size="md" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Educação <span className="text-recicla-primary dark:text-recicla-secondary">Ambiental</span>
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            Amplie seus conhecimentos sobre reciclagem e sustentabilidade com nossos recursos educacionais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {educationalResources.map((resource, index) => (
            <Link 
              to="/educacao" 
              key={index} 
              className="group rounded-2xl bg-white/70 dark:bg-gray-900/90 shadow-lg border border-recicla-primary/10 dark:border-recicla-secondary/10 p-7 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 backdrop-blur-md flex flex-col justify-between animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div>
                <div className="mb-4 flex items-center justify-center h-12 w-12 rounded-full bg-recicla-primary/10 dark:bg-recicla-secondary/10 text-recicla-primary dark:text-recicla-secondary transition-transform group-hover:scale-110">
                  {resource.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{resource.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{resource.description}</p>
              </div>
              <span className="mt-4 text-sm font-semibold text-recicla-primary dark:text-recicla-secondary group-hover:underline">
                Saiba mais &rarr;
              </span>
            </Link>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button 
            asChild 
            size="lg"
            className="bg-recicla-primary hover:bg-recicla-primary/90 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-transform hover:scale-105"
          >
            <Link to="/educacao">
              Explorar todos os recursos
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

const educationalResources = [
  {
    title: 'Dicas Rápidas',
    description: 'Dicas práticas para seu dia a dia, sobre reciclagem e consumo consciente.',
    icon: <Book size={24} />
  },
  {
    title: 'Como Começar?',
    description: 'Guia para iniciantes que querem uma vida mais sustentável com ações práticas.',
    icon: <Sprout size={24} />
  },
  {
    title: 'Vídeos Educativos',
    description: 'Tutoriais e documentários sobre reciclagem e meio ambiente.',
    icon: <Video size={24} />
  }
];

export default EducationalSection;
