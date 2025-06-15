
import React from 'react';
import { Leaf, Users, Recycle, TrendingUp } from 'lucide-react';
import RecycleLogo from './RecycleLogo';
import { motion } from 'framer-motion';

const features = [
  {
    id: 1,
    icon: <Leaf className="h-7 w-7 text-green-600 dark:text-green-300" />,
    title: "Sustentabilidade",
    description: "Promovemos práticas sustentáveis para reduzir o impacto ambiental e preservar recursos naturais."
  },
  {
    id: 2,
    icon: <Users className="h-7 w-7 text-green-600 dark:text-green-300" />,
    title: "Conexão",
    description: "Facilitamos o encontro entre quem deseja reciclar e quem coleta materiais recicláveis."
  },
  {
    id: 3,
    icon: <Recycle className="h-7 w-7 text-green-600 dark:text-green-300" />,
    title: "Inovação",
    description: "Utilizamos tecnologia para tornar a reciclagem mais acessível e eficiente para todos."
  },
  {
    id: 4,
    icon: <TrendingUp className="h-7 w-7 text-green-600 dark:text-green-300" />,
    title: "Impacto",
    description: "Geramos renda para coletores e parceiros enquanto criamos um impacto ambiental positivo."
  },
];

const AboutSection = () => {
  return (
    <motion.section 
      id="sobre" 
      className="section-padding bg-gradient-to-b from-white via-green-50/70 to-recicla-primary/10 dark:from-gray-900 dark:via-green-900/20 dark:to-gray-900 relative z-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <RecycleLogo size="md" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Sobre a <span className="text-recicla-primary dark:text-recicla-secondary">RECICLA+</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            Somos uma startup que revoluciona a forma como pessoas e empresas lidam com recicláveis, conectando-as a pontos de coleta e promovendo um ciclo virtuoso de sustentabilidade.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.id} 
              className="flex flex-col items-center bg-white/85 dark:bg-gray-900/70 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl p-6 border border-green-100 dark:border-green-950/40 hover:border-recicla-primary dark:hover:border-recicla-secondary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-3 p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="md:flex md:items-center md:justify-between bg-recicla-primary/10 dark:bg-green-900/30 py-8 px-6 rounded-xl shadow border border-green-200 dark:border-green-900/50"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h3 className="text-2xl font-bold text-recicla-primary dark:text-recicla-secondary mb-2">O que fazemos?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Conectamos você a pontos de coleta, oferecemos soluções completas para reciclagem e incentivamos a economia circular, promovendo impacto ambiental e social positivo.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <img
              className="rounded-xl shadow-md border border-green-100 dark:border-green-900 min-w-[180px] max-w-[240px] mx-auto"
              src="https://plus.unsplash.com/premium_vector-1682306481700-d924b6112bcf?q=80&w=300&auto=format&fit=crop"
              alt="Ciclo sustentável"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
