import React from "react";
import MainLayout from "@/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Book, Video, Sprout, Youtube, CheckCircle, XCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { videos } from "@/data/videos";

const EducationPage = () => {
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

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-recicla-primary dark:text-recicla-secondary">Educação</span> Ambiental
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Aprenda sobre reciclagem, sustentabilidade e como contribuir para um planeta mais verde com nossos recursos educacionais.
          </p>
        </div>

        <Tabs defaultValue="dicas" className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md md:max-w-lg">
              <TabsTrigger value="dicas" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                <Book size={16} className="md:w-4 md:h-4" /> 
                <span className="hidden sm:inline">Dicas Rápidas</span>
                <span className="sm:hidden">Dicas</span>
              </TabsTrigger>
              <TabsTrigger value="guia" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                <Sprout size={16} className="md:w-4 md:h-4" /> 
                <span className="hidden sm:inline">Como Começar</span>
                <span className="sm:hidden">Guia</span>
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                <Video size={16} className="md:w-4 md:h-4" /> Vídeos
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Dicas Rápidas */}
          <TabsContent value="dicas">
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
          </TabsContent>

          {/* Guia Rápido */}
          <TabsContent value="guia">
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
          </TabsContent>

          {/* Vídeos */}
          <TabsContent value="videos">
            <div className="space-y-6 md:space-y-8">
              <div className="text-center">
                <Button 
                  className="bg-recicla-primary hover:bg-recicla-accent dark:bg-recicla-secondary dark:hover:bg-recicla-primary text-white flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base"
                  size="lg"
                  onClick={() => window.open("https://youtube.com/playlist?list=PLg2w_vYQQuDYSCOxXK0beBdyohQcXW5XG&si=L9s84c4CWaxu9_UJ", "_blank")}
                >
                  <Play size={18} className="md:w-5 md:h-5" /> 
                  <span>Acessar Nossa Playlist Completa</span>
                </Button>
              </div>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {videos.map((video, index) => (
                  <motion.div key={index} variants={item}>
                    <Card className="h-full overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
                      <div className="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <iframe 
                          width="100%" 
                          height="100%" 
                          src={`https://www.youtube.com/embed/${video.youtubeId}`} 
                          title="YouTube video player" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                          className="rounded-t"
                        ></iframe>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base md:text-lg text-recicla-primary dark:text-recicla-secondary leading-tight">{video.titulo}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{video.descricao}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

// Dados das dicas rápidas (mantidos iguais)
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

// Novo conteúdo do guia rápido
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

export default EducationPage;
