
import React from 'react';
import { Book, Video, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import RecycleLogo from './RecycleLogo';
import { motion } from 'framer-motion';

const educationalResources = [
  {
    title: "Dicas Rápidas",
    description: "Dicas práticas e rápidas sobre reciclagem, compostagem e consumo consciente para o dia a dia.",
    icon: <Book size={20} className="text-recicla-primary dark:text-recicla-secondary" />
  },
  {
    title: "Como Começar?",
    description: "Guia completo para iniciantes com ações práticas para começar uma vida sustentável.",
    icon: <Sprout size={20} className="text-recicla-primary dark:text-recicla-secondary" />
  },
  {
    title: "Vídeos",
    description: "Tutoriais, documentários e vídeos educativos sobre reciclagem e meio ambiente.",
    icon: <Video size={20} className="text-recicla-primary dark:text-recicla-secondary" />
  }
];

const EducationalSection = () => {
  return (
    <motion.section 
      id="educacao" 
      className="section-padding bg-gradient-to-b from-white via-green-50/20 to-green-100/30 dark:from-gray-900 dark:via-green-900/10 dark:to-green-900/30"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <RecycleLogo size="md" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Educação <span className="text-recicla-primary dark:text-recicla-secondary">Ambiental</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            Amplie seus conhecimentos sobre reciclagem e sustentabilidade com nossos recursos educacionais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {educationalResources.map((resource, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full flex flex-col rounded-xl border-0 shadow-xl hover:scale-105 transition-all bg-white/95 dark:bg-gray-800/70 p-0 hover:shadow-2xl hover:shadow-recicla-primary/10">
                <CardHeader className="flex flex-row items-center gap-4 p-6 bg-gradient-to-r from-green-50 via-white to-green-50 dark:from-green-900 dark:via-gray-800 dark:to-green-900 rounded-t-xl">
                  {resource.icon}
                  <CardTitle className="text-lg font-bold text-recicla-primary dark:text-recicla-secondary">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-3 pb-8 flex-grow">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{resource.description}</p>
                </CardContent>
                <CardFooter className="pb-4 pt-0 mt-auto">
                  <Button
                    variant="link"
                    size="sm"
                    className="p-0 text-recicla-primary dark:text-recicla-secondary hover:underline"
                    asChild
                  >
                    <Link to="/educacao">Saiba mais</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <Button 
            asChild
            className="bg-recicla-primary hover:bg-recicla-accent dark:bg-recicla-secondary dark:hover:bg-recicla-primary text-white px-8"
          >
            <Link to="/educacao">
              Explorar todos os recursos educacionais
            </Link>
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

export default EducationalSection;
