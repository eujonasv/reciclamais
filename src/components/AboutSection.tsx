import React from 'react';
import { Leaf, Users, Recycle, TrendingUp } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import RecycleLogo from './RecycleLogo';

const AboutSection = () => {
  const features = [
    {
      id: 1,
      icon: <Leaf className="h-8 w-8 text-recicla-primary dark:text-recicla-secondary" />,
      title: "Sustentabilidade",
      description: "Cada ação conta. Fomentamos um ciclo sustentável que respeita e preserva o nosso meio ambiente."
    },
    {
      id: 2,
      icon: <Users className="h-8 w-8 text-recicla-primary dark:text-recicla-secondary" />,
      title: "Comunidade",
      description: "Unimos pessoas, empresas e coletores em uma rede poderosa que fortalece a economia circular."
    },
    {
      id: 3,
      icon: <Recycle className="h-8 w-8 text-recicla-primary dark:text-recicla-secondary" />,
      title: "Inovação",
      description: "Tecnologia a serviço do planeta. Nossa plataforma inovadora simplifica e otimiza todo o processo de reciclagem."
    },
    {
      id: 4,
      icon: <TrendingUp className="h-8 w-8 text-recicla-primary dark:text-recicla-secondary" />,
      title: "Impacto Positivo",
      description: "Geramos valor social e ambiental, transformando resíduos em oportunidades e cuidando do futuro de todos."
    },
  ];

  const whatWeDoItems = [
    {
      icon: Recycle,
      title: "Coleta Inteligente",
      description: "Conectamos pessoas e empresas a pontos de coleta próximos, otimizando o processo de descarte de recicláveis."
    },
    {
      icon: Users,
      title: "Rede de Parceiros",
      description: "Trabalhamos com uma ampla rede de coletores, cooperativas e empresas recicladoras para garantir o destino correto dos materiais."
    },
    {
      icon: TrendingUp,
      title: "Impacto Real",
      description: "Geramos renda para coletores e promovemos a economia circular, reduzindo o impacto no meio ambiente."
    }
  ];

  return (
    <section id="sobre" className="section-padding bg-gray-50 dark:bg-gray-800 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <RecycleLogo size="lg" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
            Nossa Missão: <span className="text-transparent bg-clip-text hero-gradient">Transformar o Futuro</span>
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            Acreditamos no poder da comunidade para criar um futuro mais verde. A RECICLA+ nasceu para simplificar a reciclagem, transformando resíduos em recursos e conectando pessoas com o propósito de cuidar do nosso planeta.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={feature.id} className="animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              <Card className="h-full transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 bg-white/60 dark:bg-white/10 backdrop-blur-md border-gray-200/50 dark:border-white/10 rounded-2xl shadow-lg hover:shadow-2xl">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="mb-6 p-4 rounded-full bg-recicla-primary/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-base">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* What We Do Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              O que <span className="text-recicla-primary dark:text-recicla-secondary">fazemos</span>
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
              Através da tecnologia, criamos uma ponte entre você e a reciclagem, tornando cada passo do processo transparente, eficiente e impactante.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 animate-fade-in-left">
              <ul className="space-y-6">
                {whatWeDoItems.map((item, index) => (
                  <li key={index}>
                    <div className="group flex items-start p-6 rounded-2xl border-2 border-transparent transition-all duration-300 hover:border-recicla-primary/20 hover:bg-white dark:hover:bg-gray-900/30 hover:shadow-xl hover:-translate-y-1 transform">
                      <div className="flex-shrink-0 p-4 rounded-full bg-recicla-primary/10 transition-colors mr-6 border-2 border-dashed border-recicla-primary/20 group-hover:border-recicla-primary/50 group-hover:bg-recicla-primary/20">
                        <item.icon className="h-7 w-7 text-recicla-primary dark:text-recicla-secondary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Image */}
            <div className="order-1 md:order-2 animate-fade-in-right">
              <div className="relative">
                <div className="absolute -inset-2 sm:-inset-4 rounded-3xl hero-gradient opacity-20 filter blur-xl animate-float"></div>
                <img 
                  src="/lovable-uploads/6cb0b831-7a73-49d4-b18e-078d7fce11ca.png" 
                  alt="Mulher reciclando uma garrafa de vidro" 
                  className="rounded-3xl shadow-2xl max-w-full object-cover mx-auto relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
