
import React from 'react';
import { Leaf, Users, Recycle, TrendingUp } from 'lucide-react';
import RecycleLogo from './RecycleLogo';
import { GlassCard } from './GlassCard';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <Leaf className="h-8 w-8 text-recicla-primary dark:text-recicla-secondary" />,
    title: "Sustentabilidade",
    description: "Promovendo práticas que reduzem o impacto ambiental e preservam os recursos naturais."
  },
  {
    icon: <Users className="h-8 w-8 text-recicla-primary dark:text-recicla-secondary" />,
    title: "Conexão",
    description: "Unimos pessoas e empresas para facilitar o descarte correto dos recicláveis."
  },
  {
    icon: <Recycle className="h-8 w-8 text-recicla-primary dark:text-recicla-secondary" />,
    title: "Inovação",
    description: "Tecnologia a serviço de soluções sustentáveis e acessíveis."
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-recicla-primary dark:text-recicla-secondary" />,
    title: "Impacto",
    description: "Gerando benefícios ambientais e sociais reais através da reciclagem."
  },
];

const AboutSection = () => {
  return (
    <section id="sobre" className="section-padding bg-gray-50 dark:bg-gray-900/95 relative transition-colors duration-300">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Text content */}
          <div className="text-center lg:text-left">
            <div className="flex justify-center lg:justify-start mb-4">
              <RecycleLogo size="md" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">
              Sobre a <span className="text-recicla-primary dark:text-recicla-secondary">RECICLA+</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
              Nossa missão é revolucionar o descarte de recicláveis, conectando você a pontos de coleta e promovendo um ciclo virtuoso de sustentabilidade. Facilitamos a jornada para um planeta mais limpo.
            </p>
            <Button asChild size="lg" className="bg-recicla-primary hover:bg-recicla-primary/90 text-white font-semibold rounded-xl shadow-lg transition-transform hover:scale-105">
                <Link to="/valores">
                    Conheça Nossos Valores
                </Link>
            </Button>
          </div>
          
          {/* Right Column: Feature Cards */}
          <div className="grid sm:grid-cols-2 gap-7">
            {features.map((feature, idx) => (
              <GlassCard key={feature.title} delay={idx * 100}>
                <div className="mb-4 p-3 rounded-full bg-recicla-primary/10 dark:bg-recicla-secondary/10 flex items-center justify-center transition-transform duration-200 group-hover:scale-110 w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
