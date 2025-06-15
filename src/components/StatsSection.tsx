
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Recycle, Users, MapPin, TrendingUp, Leaf, Building } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: <MapPin className="w-8 h-8" />,
      number: "50+",
      label: "Pontos de Coleta",
      description: "Espalhados pela cidade"
    },
    {
      icon: <Recycle className="w-8 h-8" />,
      number: "10.5k",
      label: "Kg Reciclados",
      description: "Material reaproveitado"
    },
    {
      icon: <Users className="w-8 h-8" />,
      number: "500+",
      label: "Usuários Ativos",
      description: "Fazendo a diferença"
    },
    {
      icon: <Building className="w-8 h-8" />,
      number: "25+",
      label: "Empresas Parceiras",
      description: "Comprometidas com o meio ambiente"
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      number: "2.3t",
      label: "CO² Evitado",
      description: "Redução na pegada de carbono"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      number: "95%",
      label: "Taxa de Sucesso",
      description: "Na coleta e reciclagem"
    }
  ];

  return (
    <section id="stats" className="py-20 bg-gradient-to-br from-recicla-primary/5 to-recicla-secondary/5 dark:from-recicla-primary/10 dark:to-recicla-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Nosso <span className="text-recicla-primary dark:text-recicla-secondary">Impacto</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Juntos estamos construindo um futuro mais sustentável. Veja os números que comprovam nossa dedicação ao meio ambiente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-recicla-primary to-recicla-secondary text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-recicla-primary dark:group-hover:text-recicla-secondary transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
