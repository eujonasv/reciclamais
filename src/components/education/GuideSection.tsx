
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

const guiaRapido = [
  {
    emoji: "♻️",
    titulo: "1. Como Separar o Lixo Corretamente",
    conteudo: (
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-green-50 dark:bg-green-900/20 p-3 md:p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-800 dark:text-green-300 flex items-center gap-2 mb-3 text-sm md:text-base">
              <CheckCircle size={16} className="md:w-4 md:h-4" /> O que pode reciclar:
            </h4>
            <ul className="space-y-1 text-xs md:text-sm text-green-700 dark:text-green-300">
              <li>• Papel limpo (jornais, caixas, papelão)</li>
              <li>• Plásticos duros (garrafas PET, embalagens)</li>
              <li>• Metais (latas, alumínio)</li>
              <li>• Vidro (garrafas, potes)</li>
            </ul>
          </div>
          
          <div className="bg-red-50 dark:bg-red-900/20 p-3 md:p-4 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="font-semibold text-red-800 dark:text-red-300 flex items-center gap-2 mb-3 text-sm md:text-base">
              <XCircle size={16} className="md:w-4 md:h-4" /> O que NÃO pode reciclar:
            </h4>
            <ul className="space-y-1 text-xs md:text-sm text-red-700 dark:text-red-300">
              <li>• Papel engordurado (guardanapo, papel de pizza)</li>
              <li>• Plásticos sujos ou filme plástico</li>
              <li>• Espelho, cerâmica, vidro quebrado</li>
              <li>• Embalagens com restos de comida</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-blue-800 dark:text-blue-300 text-xs md:text-sm">
            🧼 <strong>Dica rápida:</strong> Sempre lave os recicláveis antes de descartar.
          </p>
        </div>
      </div>
    )
  },
  {
    emoji: "🍃",
    titulo: "2. Como Começar a Compostar",
    conteudo: (
      <div className="space-y-4">
        <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm md:text-base">
          <li>• Separe restos de frutas, legumes, borra de café, folhas secas</li>
          <li>• Evite carne, gordura e alimentos cozidos</li>
          <li>• Guarde em baldes, potes ventilados ou minhocários</li>
          <li>• Em 30 a 60 dias, você terá um adubo natural para plantas 🌱</li>
        </ul>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-yellow-800 dark:text-yellow-300 text-xs md:text-sm">
            🚫 <strong>Não tem espaço?</strong> Junte-se a projetos de compostagem no bairro.
          </p>
        </div>
      </div>
    )
  },
  {
    emoji: "🛍️",
    titulo: "3. Substituições Inteligentes no Dia a Dia",
    conteudo: (
      <div className="space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-600 p-2 md:p-3 text-left text-xs md:text-sm">Item descartável</th>
                <th className="border border-gray-300 dark:border-gray-600 p-2 md:p-3 text-left text-xs md:text-sm">Substituição sustentável</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Sacola plástica", "Ecobag ou sacola de tecido"],
                ["Garrafa PET", "Garrafa reutilizável"],
                ["Canudo de plástico", "Canudo de inox ou bambu"],
                ["Filme plástico", "Pano encerado ou pote de vidro"],
                ["Copo descartável", "Copo portátil de silicone"]
              ].map(([item, substituto], idx) => (
                <tr key={idx}>
                  <td className="border border-gray-300 dark:border-gray-600 p-2 md:p-3 text-xs md:text-sm">{item}</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2 md:p-3 text-xs md:text-sm">{substituto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
          <p className="text-purple-800 dark:text-purple-300 text-xs md:text-sm">
            🧠 <strong>Comece com um item por semana!</strong>
          </p>
        </div>
      </div>
    )
  },
  {
    emoji: "💧",
    titulo: "4. Economize Água sem Sofrer",
    conteudo: (
      <div>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm md:text-base">
          <li>• Feche a torneira ao escovar os dentes</li>
          <li>• Use balde em vez de mangueira</li>
          <li>• Reaproveite água do chuveiro para lavar o chão</li>
          <li>• Instale redutores de vazão nas torneiras</li>
          <li>• Regue as plantas pela manhã ou à noite (menos evaporação)</li>
        </ul>
      </div>
    )
  },
  {
    emoji: "🔄",
    titulo: "5. Monte sua Rotina Sustentável da Semana",
    conteudo: (
      <div className="space-y-4">
        <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm md:text-base">
          Transforme pequenas ações em grandes mudanças! Aqui vai uma sugestão de hábitos simples para adotar ao longo da semana:
        </p>
        
        <div className="grid gap-3 md:gap-4">
          {[
            {
              dia: "🟢 Segunda-feira — Dia da Reciclagem",
              acao: "🔁 Separe e descarte corretamente todos os recicláveis acumulados. Dê uma olhada nos rótulos e veja o que pode ir para o ponto de coleta."
            },
            {
              dia: "🛍️ Quarta-feira — Dia da Ecobag",
              acao: "👛 Leve sua ecobag ou mochila reutilizável ao sair de casa. Evite sacolas plásticas sempre que possível."
            },
            {
              dia: "💡 Sexta-feira — Dia de Compartilhar Sustentabilidade",
              acao: "📲 Poste, envie ou comente uma dica sustentável com amigos ou familiares. A conscientização começa na conversa!"
            },
            {
              dia: "🍃 Domingo — Dia da Compostagem e Reflexão Verde",
              acao: "🥦 Separe os restos orgânicos da semana. Veja o que pode virar adubo ou ser aproveitado de outra forma. Reflita: o que mais posso melhorar?"
            }
          ].map((rotina, idx) => (
            <div key={idx} className="bg-green-50 dark:bg-green-900/20 p-3 md:p-4 rounded-lg border border-green-200 dark:border-green-800">
              <h5 className="font-semibold text-green-800 dark:text-green-300 mb-2 text-sm md:text-base">{rotina.dia}</h5>
              <p className="text-xs md:text-sm text-green-700 dark:text-green-300 leading-relaxed">{rotina.acao}</p>
            </div>
          ))}
        </div>
      </div>
    )
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

const GuideSection = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-recicla-primary dark:text-recicla-secondary">
          🌍 Guia Rápido para Começar uma Vida Sustentável
        </h2>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 px-2">
          Dicas práticas, curtas e aplicáveis agora mesmo — para quem quer ajudar o planeta no dia a dia.
        </p>
      </div>

      <motion.div 
        className="space-y-6 md:space-y-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {guiaRapido.map((secao, index) => (
          <motion.div key={index} variants={item}>
            <Card className="overflow-hidden border border-gray-200 dark:border-gray-800">
              <CardHeader className="bg-recicla-primary/5 dark:bg-recicla-secondary/10 pb-4">
                <CardTitle className="text-lg md:text-xl text-recicla-primary dark:text-recicla-secondary flex items-center gap-2">
                  <span className="text-xl md:text-2xl">{secao.emoji}</span>
                  <span className="leading-tight">{secao.titulo}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 md:pt-6">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  {secao.conteudo}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default GuideSection;
