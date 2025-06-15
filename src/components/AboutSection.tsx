
import React from 'react';
import { Leaf, Users, Recycle, TrendingUp } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      id: 1,
      icon: <Leaf className="h-8 w-8 text-recicla-primary" />,
      title: "Sustentabilidade em Foco",
      description: "Promovemos práticas sustentáveis para reduzir o impacto ambiental e preservar recursos.",
      className: "lg:col-span-2"
    },
    {
      id: 2,
      icon: <Users className="h-8 w-8 text-recicla-primary" />,
      title: "Conexão que Transforma",
      description: "Facilitamos o encontro entre quem deseja reciclar e quem coleta."
    },
    {
      id: 3,
      icon: <Recycle className="h-8 w-8 text-recicla-primary" />,
      title: "Inovação para Reciclar",
      description: "Usamos tecnologia para tornar a reciclagem mais acessível e eficiente."
    },
    {
      id: 4,
      icon: <TrendingUp className="h-8 w-8 text-recicla-primary" />,
      title: "Impacto Real",
      description: "Geramos renda para coletores e parceiros, criando um impacto ambiental e social positivo.",
      className: "lg:col-span-2"
    },
  ];

  return (
    <section id="sobre" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Uma plataforma, múltiplos <span className="text-recicla-primary dark:text-recicla-secondary">benefícios</span>
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            A RECICLA+ revoluciona a forma como lidamos com recicláveis, conectando pessoas a pontos de coleta e promovendo um ciclo virtuoso de sustentabilidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className={`group relative p-8 rounded-2xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${feature.className || ''}`}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-50 to-transparent dark:from-green-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="mb-4 p-3 rounded-full bg-green-100 dark:bg-green-900/50 inline-block">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* What We Do Section */}
        <div className="mt-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
             <div className="absolute -inset-2 rounded-xl bg-recicla-primary/20 filter blur-xl"></div>
              <img 
                src="https://plus.unsplash.com/premium_vector-1682306481700-d924b6112bcf?q=80&w=2224&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Reciclagem" 
                className="rounded-2xl shadow-xl max-w-full object-cover mx-auto relative z-10"
              />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              O que <span className="text-recicla-primary dark:text-recicla-secondary">fazemos</span>
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Nossa plataforma oferece soluções completas para tornar a reciclagem mais fácil e acessível para todos.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 rounded-full bg-recicla-primary/10 dark:bg-recicla-primary/20">
                  <Recycle className="h-6 w-6 text-recicla-primary dark:text-recicla-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Coleta Inteligente</h3>
                  <p className="text-gray-600 dark:text-gray-400">Conectamos você a pontos de coleta próximos, otimizando o descarte.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 rounded-full bg-recicla-primary/10 dark:bg-recicla-primary/20">
                  <Users className="h-6 w-6 text-recicla-primary dark:text-recicla-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Rede de Parceiros</h3>
                  <p className="text-gray-600 dark:text-gray-400">Ampla rede de coletores e cooperativas para o destino correto dos materiais.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 rounded-full bg-recicla-primary/10 dark:bg-recicla-primary/20">
                  <TrendingUp className="h-6 w-6 text-recicla-primary dark:text-recicla-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Impacto Positivo</h3>
                  <p className="text-gray-600 dark:text-gray-400">Geramos renda e promovemos a economia circular.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
