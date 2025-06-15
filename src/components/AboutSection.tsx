
import React from 'react';
import { Leaf, Users, Recycle, TrendingUp } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import RecycleLogo from './RecycleLogo';

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
    <section id="sobre" className="section-padding bg-transparent relative">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <div className="flex justify-center mb-4">
            <RecycleLogo size="md" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">
            Sobre a <span className="text-recicla-primary dark:text-recicla-secondary">RECICLA+</span>
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            Revolucionando o descarte de recicláveis, conectando você a pontos de coleta e promovendo um ciclo virtuoso de sustentabilidade.
          </p>
        </div>
        {/* Glassmorphism cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
          {features.map((feature, idx) => (
            <GlassCard key={feature.title} delay={idx * 100}>
              <div className="mb-4 p-3 rounded-full bg-recicla-primary/10 dark:bg-recicla-secondary/10 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

// Glass morphism effect card
const GlassCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <div
    style={{
      animationDelay: `${delay}ms`,
    }}
    className="group rounded-2xl bg-white/60 dark:bg-gray-800/80 shadow-xl backdrop-blur-xl border border-recicla-primary/10 dark:border-recicla-secondary/20 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-recicla-primary/20 dark:hover:shadow-recicla-secondary/20 animate-fade-in"
  >
    {children}
  </div>
);

export default AboutSection;
