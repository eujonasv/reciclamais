import React from "react";
import MainLayout from "@/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Book, Video, Sprout, Youtube, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

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
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video size={18} /> Vídeos
              </TabsTrigger>
              <TabsTrigger value="como-comecar" className="flex items-center gap-2">
                <Sprout size={18} /> Como Começar?
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
            </div>
          </TabsContent>

          {/* Como Começar? - Guias para Iniciantes */}
          <TabsContent value="como-comecar">
            <motion.div 
              className="space-y-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-recicla-primary dark:text-recicla-secondary mb-4">
                  🌱 Guias para Iniciantes
                </h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Uma série de guias simples, ilustrados e práticos para quem quer começar a fazer a diferença no dia a dia, mesmo sem saber por onde.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {guiasIniciantes.map((guia, index) => (
                  <motion.div key={index} variants={item}>
                    <Card className="h-full overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
                      <div className="w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-green-100 to-recicla-primary/20 dark:from-green-800/30 dark:to-recicla-secondary/20">
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-6xl">{guia.emoji}</span>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-recicla-primary dark:text-recicla-secondary">{guia.titulo}</CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                          {guia.subtitulo}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {guia.topicos.map((topico, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <span className="text-recicla-primary dark:text-recicla-secondary mt-1">•</span>
                              <span className="text-sm text-gray-600 dark:text-gray-300">{topico}</span>
                            </div>
                          ))}
                        </div>
                        {guia.inclui && (
                          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <p className="text-sm font-medium text-green-800 dark:text-green-300 flex items-center gap-2">
                              {guia.inclui.includes('vídeo') ? <Video size={16} /> : 
                               guia.inclui.includes('PDF') || guia.inclui.includes('infográfico') ? <FileText size={16} /> : 
                               <Download size={16} />}
                              {guia.inclui}
                            </p>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full bg-recicla-primary hover:bg-recicla-accent dark:bg-recicla-secondary dark:hover:bg-recicla-primary text-white"
                        >
                          Começar Agora
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

// Dados de exemplo
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

const videos = [
  {
    titulo: "Como montar uma composteira caseira",
    descricao: "Aprenda passo a passo como montar sua própria composteira em casa usando materiais simples e acessíveis.",
    youtubeId: "LkF5d_X47lg"
  },
  {
    titulo: "Reciclagem criativa: transformando garrafas em objetos úteis",
    descricao: "Ideias criativas para transformar garrafas PET e de vidro em objetos decorativos e úteis para o seu dia a dia.",
    youtubeId: "XhzFkBGAZ_o"
  },
  {
    titulo: "Os benefícios ambientais da coleta seletiva",
    descricao: "Especialistas explicam como a coleta seletiva ajuda a reduzir o impacto ambiental e economizar recursos naturais.",
    youtubeId: "GK-0Ix7D1jM"
  },
  {
    titulo: "Documentário: A jornada do lixo",
    descricao: "Acompanhe o percurso dos resíduos desde o descarte até o destino final, entendendo os desafios da gestão de resíduos.",
    youtubeId: "4FVRAxlBnQ8"
  }
];

const guiasIniciantes = [
  {
    emoji: "🌱",
    titulo: "Primeiros Passos para uma Vida Sustentável",
    subtitulo: "Uma série de guias simples para quem quer começar a fazer a diferença",
    topicos: [
      "Mudanças simples que fazem grande diferença",
      "Como criar hábitos sustentáveis",
      "Checklist de ações diárias",
      "Mitos e verdades sobre sustentabilidade"
    ]
  },
  {
    emoji: "♻️",
    titulo: "Separação Inteligente de Resíduos",
    subtitulo: "Aprenda de forma visual e clara como separar corretamente",
    topicos: [
      "O que vai em cada lixeira (orgânico, reciclável, rejeito)",
      "Itens que confundem (guardanapo sujo, caixa de pizza)",
      "Como lavar materiais recicláveis",
      "Cores das lixeiras e símbolos de reciclagem"
    ],
    inclui: "📎 Inclui: infográfico para imprimir e colar na cozinha"
  },
  {
    emoji: "🍃",
    titulo: "Compostagem Fácil em Casa ou Apartamento",
    subtitulo: "Transforme seu lixo orgânico em adubo, mesmo em pequenos espaços",
    topicos: [
      "Passo a passo para começar",
      "O que pode e não pode compostar",
      "Tipos de composteiras: caseira, balde, minhocário",
      "Como usar o adubo produzido"
    ],
    inclui: "🎥 Inclui: vídeo tutorial + PDF gratuito"
  },
  {
    emoji: "🧴",
    titulo: "Reduza o Plástico Sem Sofrimento",
    subtitulo: "Troque o descartável pelo reutilizável com ações simples",
    topicos: [
      "Substituições práticas (garrafa, sacola, canudo, esponja)",
      "Produtos acessíveis e onde encontrar",
      "Como evitar microplásticos",
      "Receitas caseiras para produtos de limpeza"
    ],
    inclui: "💡 Dica: lista de apps para identificar embalagens recicláveis"
  },
  {
    emoji: "💧",
    titulo: "Economia de Água com Consciência",
    subtitulo: "Pequenos hábitos, grande impacto",
    topicos: [
      "Como reaproveitar água da chuva",
      "Economizar lavando louça, tomando banho e regando plantas",
      "Tecnologias acessíveis (arejadores, descarga dupla)",
      "Calculadora de consumo de água"
    ]
  }
];

export default EducationPage;
