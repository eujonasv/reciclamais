
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const dicas = [
  {
    titulo: "Separação correta de resíduos",
    conteudo: "Separe os resíduos em recicláveis, orgânicos e rejeitos. Materiais recicláveis incluem papel, plástico, metal e vidro. Mantenha-os limpos e secos para facilitar o processo de reciclagem."
  },
  {
    titulo: "Reduza o uso de plásticos descartáveis",
    conteudo: "Evite canudos, copos, talheres e sacolas plásticas descartáveis. Opte por alternativas reutilizáveis como canudos de inox, garrafas retornáveis e sacolas de pano."
  },
  {
    titulo: "Compostagem doméstica",
    conteudo: "Transforme restos de alimentos como cascas de frutas, legumes e borra de café em adubo através da compostagem. É uma forma simples de reduzir o lixo orgânico e criar seu próprio fertilizante."
  },
  {
    titulo: "Descarte correto de eletrônicos",
    conteudo: "Nunca jogue pilhas, baterias, celulares ou outros eletrônicos no lixo comum. Procure pontos de coleta especializados que garantem o descarte seguro desses materiais."
  },
  {
    titulo: "Consumo consciente",
    conteudo: "Antes de comprar, questione: você realmente precisa desse produto? Opte por produtos duráveis, com menos embalagens e de empresas com compromissos ambientais."
  },
  {
    titulo: "Economia de água",
    conteudo: "Reduza o tempo no banho, conserte vazamentos e aproveite a água da chuva para regar plantas. Cada gota economizada faz diferença para o meio ambiente."
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const TipsSection = () => {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {dicas.map((dica, index) => (
        <motion.div key={index} variants={item}>
          <Card className="h-full overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
            <CardHeader className="bg-recicla-primary/5 dark:bg-recicla-secondary/10 pb-3">
              <CardTitle className="text-recicla-primary dark:text-recicla-secondary text-lg">{dica.titulo}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm">{dica.conteudo}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TipsSection;
