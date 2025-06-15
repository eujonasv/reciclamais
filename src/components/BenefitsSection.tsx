
import React from "react";
import { CheckCircle, MapPin, Users, TrendingUp } from "lucide-react";
import { GlassCard } from "./GlassCard";

const benefits = [
  {
    icon: <MapPin className="h-8 w-8 text-recicla-primary dark:text-recicla-secondary" />,
    title: "Facilidade no Descarte",
    desc: "Encontre pontos de coleta facilmente pelo mapa interativo, tornando a reciclagem acessível a todos."
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-recicla-primary dark:text-recicla-secondary" />,
    title: "Impacto Ambiental Positivo",
    desc: "Contribua para um planeta mais limpo e ajude a promover o ciclo sustentável de materiais."
  },
  {
    icon: <Users className="h-8 w-8 text-recicla-primary dark:text-recicla-secondary" />,
    title: "Conexão com a Comunidade",
    desc: "Faça parte de uma rede de pessoas e empresas comprometidas com o meio ambiente."
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-recicla-primary dark:text-recicla-secondary" />,
    title: "Renda para Parceiros",
    desc: "Seja um ponto de coleta e gere renda extra ao contribuir com o ciclo da reciclagem."
  }
];

const BenefitsSection = () => (
  <section className="section-padding bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-900/95 transition-all">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          Benefícios <span className="text-recicla-primary dark:text-recicla-secondary">Reais</span>
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
          Veja como a RECICLA+ facilita sua jornada sustentável!
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {benefits.map((benefit, idx) => (
          <GlassCard key={benefit.title} delay={idx * 100}>
            <div className="mb-4 p-3 rounded-full bg-recicla-primary/10 dark:bg-recicla-secondary/10 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
              {benefit.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{benefit.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{benefit.desc}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSection;
