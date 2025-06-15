
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Film, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';
import RecycleLogo from './RecycleLogo';

const EducationalSection = () => {
  return (
    <section id="educacao" className="section-padding bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <RecycleLogo size="md" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Aprenda e <span className="text-recicla-primary dark:text-recicla-secondary">Transforme</span>
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300 mb-8">
            Amplie seus conhecimentos sobre reciclagem e sustentabilidade com nossos recursos educacionais.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {educationalResources.map((resource, index) => (
            <Card key={index} className="flex flex-col text-center overflow-hidden transition-all duration-300 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 border-t-4 border-recicla-primary/50 dark:border-recicla-secondary/50">
              <CardHeader className="items-center pt-8">
                <div className="p-4 bg-recicla-primary/10 dark:bg-recicla-secondary/20 rounded-full mb-4">
                  {resource.icon}
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  {resource.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600 dark:text-gray-300">
                  {resource.description}
                </p>
              </CardContent>
              <CardFooter className="justify-center pt-2 pb-6">
                <Button 
                  variant="link" 
                  className="text-recicla-primary dark:text-recicla-secondary hover:text-recicla-accent dark:hover:text-recicla-primary font-semibold"
                  asChild
                >
                  <Link to="/educacao">Saiba mais &rarr;</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            asChild 
            size="lg"
            className="bg-recicla-primary hover:bg-recicla-accent dark:bg-recicla-secondary dark:hover:bg-recicla-primary text-white"
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
    title: 'Guia da Reciclagem',
    description: 'Dicas práticas e guias sobre como separar, limpar e descartar corretamente cada tipo de material.',
    icon: <BookOpen size={28} className="text-recicla-primary dark:text-recicla-secondary"/>
  },
  {
    title: 'Impacto Positivo',
    description: 'Descubra como suas pequenas ações diárias geram um grande impacto positivo para o meio ambiente e a sociedade.',
    icon: <Sprout size={28} className="text-recicla-primary dark:text-recicla-secondary"/>
  },
  {
    title: 'Vídeos Educativos',
    description: 'Tutoriais, documentários e entrevistas sobre os desafios e as soluções no mundo da sustentabilidade.',
    icon: <Film size={28} className="text-recicla-primary dark:text-recicla-secondary"/>
  }
];

export default EducationalSection;
