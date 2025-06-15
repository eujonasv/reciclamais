
import React from 'react';
import { Leaf, Users, Recycle, TrendingUp, ArrowRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RecycleLogo from './RecycleLogo';

const AboutSection = () => {
  const features = [
    {
      id: 1,
      icon: <Leaf className="h-8 w-8 text-recicla-primary dark:text-recicla-secondary" />,
      title: "Sustentabilidade",
      description: "Promovemos práticas sustentáveis para reduzir o impacto ambiental e preservar recursos naturais.",
      gradient: "from-green-500/10 to-emerald-500/10"
    },
    {
      id: 2,
      icon: <Users className="h-8 w-8 text-recicla-primary dark:text-recicla-secondary" />,
      title: "Conexão",
      description: "Facilitamos o encontro entre quem deseja reciclar e quem coleta materiais recicláveis.",
      gradient: "from-blue-500/10 to-cyan-500/10"
    },
    {
      id: 3,
      icon: <Recycle className="h-8 w-8 text-recicla-primary dark:text-recicla-secondary" />,
      title: "Inovação",
      description: "Utilizamos tecnologia para tornar a reciclagem mais acessível e eficiente para todos.",
      gradient: "from-purple-500/10 to-violet-500/10"
    },
    {
      id: 4,
      icon: <TrendingUp className="h-8 w-8 text-recicla-primary dark:text-recicla-secondary" />,
      title: "Impacto",
      description: "Geramos renda para coletores e parceiros enquanto criamos um impacto ambiental positivo.",
      gradient: "from-orange-500/10 to-red-500/10"
    },
  ];

  const stats = [
    { number: "500+", label: "Pontos de Coleta" },
    { number: "10k+", label: "Usuários Ativos" },
    { number: "50+", label: "Empresas Parceiras" },
    { number: "2M+", label: "Kg Reciclados" }
  ];

  return (
    <section id="sobre" className="section-padding bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-blue-50/50 dark:from-green-900/10 dark:to-blue-900/10"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-recicla-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-recicla-primary/10 to-blue-500/10 rounded-2xl">
              <RecycleLogo size="md" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">
            Sobre a <span className="bg-gradient-to-r from-recicla-primary to-blue-600 bg-clip-text text-transparent">RECICLA+</span>
          </h2>
          <p className="text-xl max-w-4xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed">
            Somos uma startup que revoluciona a forma como as pessoas e empresas lidam com recicláveis, 
            conectando-as a pontos de coleta e promovendo um ciclo virtuoso de sustentabilidade.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group-hover:border-recicla-primary/30">
                <div className="text-3xl md:text-4xl font-bold text-recicla-primary dark:text-recicla-secondary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature) => (
            <Card key={feature.id} className="group bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              <CardContent className="p-8 relative z-10">
                <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-recicla-primary/10 to-blue-500/10 w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-recicla-primary dark:group-hover:text-recicla-secondary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-br from-recicla-primary/5 to-blue-500/5 dark:from-recicla-primary/10 dark:to-blue-500/10 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Nossa <span className="text-recicla-primary dark:text-recicla-secondary">Missão</span>
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Transformar a reciclagem em um processo simples, eficiente e recompensador para todos. 
            Acreditamos que cada pequena ação pode gerar um grande impacto no meio ambiente.
          </p>
          <Button 
            onClick={() => {
              const section = document.getElementById('como-funciona');
              if (section) section.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-recicla-primary hover:bg-recicla-accent text-white font-semibold px-8 py-3 rounded-xl group"
          >
            Descubra Como Funciona
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
