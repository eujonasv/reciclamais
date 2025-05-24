
import React from "react";
import MainLayout from "@/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Book, Video, Sprout, Youtube, CheckCircle, XCircle, Info } from "lucide-react";
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
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-2">
          <span className="text-recicla-primary dark:text-recicla-secondary">Educação</span> Ambiental
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Aprenda sobre reciclagem, sustentabilidade e como contribuir para um planeta mais verde com nossos recursos educacionais.
        </p>

        <Tabs defaultValue="dicas" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-1 md:grid-cols-3 max-w-3xl">
              <TabsTrigger value="dicas" className="flex items-center gap-2">
                <Book size={18} /> Dicas Rápidas
              </TabsTrigger>
              <TabsTrigger value="guia" className="flex items-center gap-2">
                <Sprout size={18} /> Como Começar?
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video size={18} /> Vídeos
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Dicas Rápidas */}
          <TabsContent value="dicas">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {dicas.map((dica, index) => (
                <motion.div key={index} variants={item}>
                  <Card className="h-full overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
                    <CardHeader className="bg-recicla-primary/5 dark:bg-recicla-secondary/10">
                      <CardTitle className="text-recicla-primary dark:text-recicla-secondary">{dica.titulo}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-gray-600 dark:text-gray-300">{dica.conteudo}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Como Começar - Guia para Iniciantes */}
          <TabsContent value="guia">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-recicla-primary dark:text-recicla-secondary">
                  🌍 Guia Rápido para Começar uma Vida Sustentável
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Dicas práticas, curtas e aplicáveis agora mesmo — para quem quer ajudar o planeta no dia a dia.
                </p>
              </div>

              <motion.div 
                className="space-y-8"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {guiaIniciantes.map((secao, index) => (
                  <motion.div key={index} variants={item}>
                    <Card className="overflow-hidden border border-gray-200 dark:border-gray-800">
                      <CardHeader className="bg-recicla-primary/5 dark:bg-recicla-secondary/10">
                        <CardTitle className="text-xl text-recicla-primary dark:text-recicla-secondary flex items-center gap-2">
                          <span className="text-2xl">{secao.emoji}</span>
                          {secao.titulo}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
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
            <div className="mb-8 flex flex-col items-center">
              <Button 
                className="mb-8 bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 px-6 py-2"
                size="lg"
                onClick={() => window.open("https://youtube.com/playlist?list=PLg2w_vYQQuDYSCOxXK0beBdyohQcXW5XG&si=L9s84c4CWaxu9_UJ", "_blank")}
              >
                <Youtube size={24} /> Acessar Nossa Playlist Completa no YouTube
              </Button>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
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
                      <CardHeader>
                        <CardTitle className="text-lg text-recicla-primary dark:text-recicla-secondary">{video.titulo}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{video.descricao}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
              
              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 max-w-2xl">
                <div className="flex items-start gap-3">
                  <Info className="text-blue-600 dark:text-blue-400 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      Para Administradores: Como Adicionar Novos Vídeos
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Para adicionar novos vídeos, edite o arquivo <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">src/data/videos.ts</code> 
                      e adicione um novo objeto com título, descrição e ID do YouTube.
                    </p>
                  </div>
                </div>
              </div>
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

// Novo conteúdo do guia para iniciantes
const guiaIniciantes = [
  {
    emoji: "♻️",
    titulo: "1. Como Separar o Lixo Corretamente",
    conteudo: (
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-800 dark:text-green-300 flex items-center gap-2 mb-3">
              <CheckCircle size={18} /> O que pode reciclar:
            </h4>
            <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
              <li>• Papel limpo (jornais, caixas, papelão)</li>
              <li>• Plásticos duros (garrafas PET, embalagens de produtos)</li>
              <li>• Metais (latas, alumínio)</li>
              <li>• Vidro (garrafas, potes)</li>
            </ul>
          </div>
          
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="font-semibold text-red-800 dark:text-red-300 flex items-center gap-2 mb-3">
              <XCircle size={18} /> O que NÃO pode reciclar:
            </h4>
            <ul className="space-y-1 text-sm text-red-700 dark:text-red-300">
              <li>• Papel engordurado (guardanapo, papel de pizza)</li>
              <li>• Plásticos sujos ou filme plástico</li>
              <li>• Espelho, cerâmica, vidro quebrado</li>
              <li>• Embalagens com restos de comida</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-blue-800 dark:text-blue-300 text-sm">
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
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>• Separe restos de frutas, legumes, borra de café, folhas secas</li>
          <li>• Evite carne, gordura e alimentos cozidos</li>
          <li>• Guarde em baldes, potes ventilados ou minhocários</li>
          <li>• Em 30 a 60 dias, você terá um adubo natural para plantas 🌱</li>
        </ul>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-yellow-800 dark:text-yellow-300 text-sm">
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
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">Item descartável</th>
                <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">Substituição sustentável</th>
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
                  <td className="border border-gray-300 dark:border-gray-600 p-3">{item}</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-3">{substituto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
          <p className="text-purple-800 dark:text-purple-300 text-sm">
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
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
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
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Transforme pequenas ações em grandes mudanças! Aqui vai uma sugestão de hábitos simples para adotar ao longo da semana:
        </p>
        
        <div className="grid gap-4">
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
            <div key={idx} className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <h5 className="font-semibold text-green-800 dark:text-green-300 mb-2">{rotina.dia}</h5>
              <p className="text-sm text-green-700 dark:text-green-300">{rotina.acao}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
];

export default EducationPage;
