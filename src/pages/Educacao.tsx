
import React from "react";
import MainLayout from "@/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Book, Video, Trophy, Youtube } from "lucide-react";
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
              <TabsTrigger value="desafios" className="flex items-center gap-2">
                <Trophy size={18} /> Desafios Sustentáveis
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

          {/* Desafios Sustentáveis */}
          <TabsContent value="desafios">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {desafios.map((desafio, index) => (
                <motion.div key={index} variants={item}>
                  <Card className="h-full overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
                    <div className="w-full aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img 
                        src={desafio.imagem || 'https://via.placeholder.com/400x300?text=Desafio+Sustentável'} 
                        alt={desafio.titulo} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-recicla-primary dark:text-recicla-secondary">{desafio.titulo}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <span>Duração: {desafio.duracao}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{desafio.descricao}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-300 px-2 py-1 rounded">
                          Nível: {desafio.nivel}
                        </span>
                        {desafio.tags.map((tag, i) => (
                          <span key={i} className="text-xs bg-recicla-primary/10 dark:bg-recicla-secondary/10 text-recicla-primary dark:text-recicla-secondary px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-recicla-primary hover:bg-recicla-accent dark:bg-recicla-secondary dark:hover:bg-recicla-primary text-white"
                      >
                        Participar do Desafio
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
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
    youtubeId: "4UyAXDanBDw"
  },
  {
    titulo: "Reciclagem criativa: transformando garrafas em objetos úteis",
    descricao: "Ideias criativas para transformar garrafas PET e de vidro em objetos decorativos e úteis para o seu dia a dia.",
    youtubeId: "s_asqfqwhe8"
  },
  {
    titulo: "Os benefícios ambientais da coleta seletiva",
    descricao: "Especialistas explicam como a coleta seletiva ajuda a reduzir o impacto ambiental e economizar recursos naturais.",
    youtubeId: "EJjLhmDrcIk"
  },
  {
    titulo: "Documentário: A jornada do lixo",
    descricao: "Acompanhe o percurso dos resíduos desde o descarte até o destino final, entendendo os desafios da gestão de resíduos.",
    youtubeId: "tjajGOWIHAQ"
  }
];

const desafios = [
  {
    titulo: "7 Dias Sem Plástico",
    duracao: "1 semana",
    descricao: "Viva por uma semana sem utilizar produtos plásticos descartáveis. Substitua itens como sacolas, canudos e embalagens por alternativas sustentáveis.",
    nivel: "Iniciante",
    tags: ["Redução de Resíduos", "Consumo Consciente"],
    imagem: "https://images.unsplash.com/photo-1605600659726-65d3571ed334?q=80&w=1000&auto=format&fit=crop"
  },
  {
    titulo: "Compostagem Caseira",
    duracao: "1 mês",
    descricao: "Crie sua própria composteira em casa e reduza o volume de resíduos orgânicos que vão para o lixo comum, transformando-os em adubo para plantas.",
    nivel: "Intermediário",
    tags: ["Compostagem", "Resíduo Orgânico"],
    imagem: "https://images.unsplash.com/photo-1591130661095-a3bbfa1ff2b2?q=80&w=1000&auto=format&fit=crop"
  },
  {
    titulo: "Guarda-roupa Sustentável",
    duracao: "3 meses",
    descricao: "Desafie-se a não comprar nenhuma peça de roupa nova por três meses, optando por reparar, customizar, trocar ou comprar em brechós quando necessário.",
    nivel: "Avançado",
    tags: ["Moda Circular", "Consumo Zero"],
    imagem: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop"
  }
];

export default EducationPage;
