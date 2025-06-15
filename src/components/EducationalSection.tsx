
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Video, Sprout, ArrowRight, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import RecycleLogo from './RecycleLogo';

const EducationalSection = () => {
  return (
    <section id="educacao" className="section-padding bg-gradient-to-br from-green-50 via-white to-blue-50/30 dark:from-green-900/10 dark:via-gray-900 dark:to-blue-900/20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-green-500/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-2xl">
              <RecycleLogo size="md" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">
            Educação <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Ambiental</span>
          </h2>
          <p className="text-xl max-w-4xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Amplie seus conhecimentos sobre reciclagem e sustentabilidade com nossos recursos educacionais cuidadosamente selecionados.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {educationalResources.map((resource, index) => (
            <Card key={index} className="group bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 relative overflow-hidden">
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${resource.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <CardHeader className="relative z-10 pb-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${resource.iconGradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {resource.icon}
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-recicla-primary dark:group-hover:text-recicla-secondary transition-colors">
                  {resource.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 pt-0">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {resource.description}
                </p>
              </CardContent>
              <CardFooter className="relative z-10 pt-4">
                <Button 
                  variant="ghost" 
                  className="group/btn p-0 text-recicla-primary dark:text-recicla-secondary hover:text-recicla-accent dark:hover:text-recicla-primary font-semibold"
                  asChild
                >
                  <Link to="/educacao" className="flex items-center">
                    Saiba mais
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Call to action section */}
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-3xl p-8 md:p-12 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl">
                <Lightbulb className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Transforme conhecimento em <span className="text-green-600 dark:text-green-400">ação!</span>
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Explore nossa biblioteca completa de recursos educacionais e torne-se um agente de mudança para um mundo mais sustentável.
            </p>
            <Button 
              asChild 
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl group shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to="/educacao" className="flex items-center">
                Explorar todos os recursos educacionais
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const educationalResources = [
  {
    title: 'Dicas Rápidas',
    description: 'Dicas práticas e rápidas sobre reciclagem, compostagem e consumo consciente para transformar seu dia a dia em ações sustentáveis.',
    icon: <Book className="h-8 w-8 text-white" />,
    iconGradient: "from-blue-500 to-cyan-500",
    gradient: "from-blue-500/5 to-cyan-500/5"
  },
  {
    title: 'Como Começar?',
    description: 'Guia completo para iniciantes que querem começar uma vida sustentável com ações práticas, simples e aplicáveis no dia a dia.',
    icon: <Sprout className="h-8 w-8 text-white" />,
    iconGradient: "from-green-500 to-emerald-500",
    gradient: "from-green-500/5 to-emerald-500/5"
  },
  {
    title: 'Vídeos',
    description: 'Tutoriais interativos, documentários inspiradores e vídeos educativos sobre diferentes aspectos da reciclagem e preservação ambiental.',
    icon: <Video className="h-8 w-8 text-white" />,
    iconGradient: "from-purple-500 to-violet-500",
    gradient: "from-purple-500/5 to-violet-500/5"
  }
];

export default EducationalSection;
