
import React from 'react';
import { Leaf, Users, Recycle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  const missionPoints = [
    {
      icon: <Leaf className="h-7 w-7 text-recicla-primary" />,
      title: "Promover a Sustentabilidade",
      description: "Reduzir o impacto ambiental através da conscientização e de práticas de reciclagem acessíveis."
    },
    {
      icon: <Users className="h-7 w-7 text-recicla-primary" />,
      title: "Conectar Comunidades",
      description: "Unir cidadãos, empresas e coletores em uma rede colaborativa para um futuro mais verde."
    },
    {
      icon: <Recycle className="h-7 w-7 text-recicla-primary" />,
      title: "Inovar na Reciclagem",
      description: "Usar a tecnologia para simplificar e otimizar todo o processo de reciclagem."
    }
  ];

  return (
    <section id="sobre" className="section-padding bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div className="relative animate-fade-in">
            <div className="absolute -inset-2 rounded-xl bg-recicla-primary/10 dark:bg-recicla-secondary/20 transform -rotate-3"></div>
            <img 
              src="https://images.unsplash.com/photo-1599142278996-22a392a83542?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Pessoas trabalhando com reciclagem" 
              className="rounded-xl shadow-xl max-w-full object-cover mx-auto relative z-10"
            />
          </div>

          {/* Text Column */}
          <div className="animate-fade-in md:delay-150">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Nossa Missão: <span className="text-recicla-primary dark:text-recicla-secondary">Transformar</span> o Descarte em <span className="text-recicla-primary dark:text-recicla-secondary">Oportunidade</span>
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              A RECICLA+ nasceu do desejo de revolucionar a reciclagem. Conectamos quem quer reciclar com quem precisa do material, criando um ciclo sustentável que beneficia o planeta e gera valor para a comunidade.
            </p>

            <ul className="space-y-6 mb-10">
              {missionPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 p-3 rounded-full bg-recicla-primary/10 dark:bg-recicla-secondary/20 mr-4">
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">
                      {point.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {point.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <Button asChild size="lg" className="bg-recicla-primary hover:bg-recicla-accent text-white">
              <Link to="/valores">Conheça Nossos Valores</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
