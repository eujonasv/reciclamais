
import React from "react";
import MainLayout from "@/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Book, FileText, Video, BookOpen } from "lucide-react";
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
            <TabsList className="grid grid-cols-1 md:grid-cols-4 max-w-3xl">
              <TabsTrigger value="dicas" className="flex items-center gap-2">
                <Book size={18} /> Dicas Rápidas
              </TabsTrigger>
              <TabsTrigger value="artigos" className="flex items-center gap-2">
                <FileText size={18} /> Artigos
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video size={18} /> Vídeos
              </TabsTrigger>
              <TabsTrigger value="cursos" className="flex items-center gap-2">
                <BookOpen size={18} /> Mini Cursos
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

          {/* Artigos */}
          <TabsContent value="artigos">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {artigos.map((artigo, index) => (
                <motion.div key={index} variants={item}>
                  <Card className="h-full overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
                    {artigo.imagem && (
                      <div className="w-full aspect-video overflow-hidden">
                        <img 
                          src={artigo.imagem} 
                          alt={artigo.titulo} 
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-recicla-primary dark:text-recicla-secondary">{artigo.titulo}</CardTitle>
                      <CardDescription>{artigo.data}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{artigo.resumo}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="hover:bg-recicla-primary/10 hover:text-recicla-primary dark:hover:bg-recicla-secondary/10 dark:hover:text-recicla-secondary">
                        Ler artigo completo
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Vídeos */}
          <TabsContent value="videos">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
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
          </TabsContent>

          {/* Mini Cursos */}
          <TabsContent value="cursos">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {cursos.map((curso, index) => (
                <motion.div key={index} variants={item}>
                  <Card className="h-full overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
                    <div className="w-full aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img 
                        src={curso.imagem || 'https://via.placeholder.com/400x300?text=Curso+Reciclagem'} 
                        alt={curso.titulo} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-recicla-primary dark:text-recicla-secondary">{curso.titulo}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <span>Duração: {curso.duracao}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{curso.descricao}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {curso.topicos.map((topico, i) => (
                          <span key={i} className="text-xs bg-recicla-primary/10 dark:bg-recicla-secondary/10 text-recicla-primary dark:text-recicla-secondary px-2 py-1 rounded">
                            {topico}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-recicla-primary hover:bg-recicla-accent dark:bg-recicla-secondary dark:hover:bg-recicla-primary text-white"
                      >
                        Acessar Curso
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

const artigos = [
  {
    titulo: "O impacto da reciclagem na redução da poluição dos oceanos",
    data: "15/04/2025",
    resumo: "Este artigo discute como programas eficientes de reciclagem podem reduzir significativamente a quantidade de plásticos que chegam aos oceanos, protegendo a vida marinha e preservando ecossistemas aquáticos.",
    imagem: "https://images.unsplash.com/photo-1578354905614-7d424fd08ce9?q=80&w=1000&auto=format&fit=crop"
  },
  {
    titulo: "Economia circular: repensando o ciclo de produção e consumo",
    data: "27/03/2025",
    resumo: "Exploramos o conceito de economia circular e como ela propõe um novo modelo econômico que visa eliminar resíduos e poluição, manter produtos e materiais em uso e regenerar sistemas naturais.",
    imagem: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1000&auto=format&fit=crop"
  },
  {
    titulo: "Inovações tecnológicas na indústria da reciclagem",
    data: "10/03/2025",
    resumo: "Conheça as mais recentes tecnologias que estão revolucionando o setor de reciclagem, desde sistemas de triagem automatizados até novos processos de transformação de materiais difíceis de reciclar.",
    imagem: "https://images.unsplash.com/photo-1616686772783-a5d155238dac?q=80&w=1000&auto=format&fit=crop"
  },
  {
    titulo: "Políticas públicas para incentivo à reciclagem no Brasil",
    data: "02/03/2025",
    resumo: "Análise das políticas públicas brasileiras voltadas para a gestão de resíduos sólidos e reciclagem, desafios da implementação da Política Nacional de Resíduos Sólidos e casos de sucesso.",
    imagem: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop"
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

const cursos = [
  {
    titulo: "Introdução à Sustentabilidade",
    duracao: "2 semanas",
    descricao: "Curso introdutório sobre os princípios básicos da sustentabilidade, abordando temas como consumo consciente e redução de impacto ambiental.",
    topicos: ["Consumo Consciente", "Pegada Ecológica", "ODS"],
    imagem: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop"
  },
  {
    titulo: "Reciclagem Avançada",
    duracao: "3 semanas",
    descricao: "Aprenda técnicas avançadas de separação de materiais e reciclagem, incluindo como criar um sistema eficiente em casa ou no trabalho.",
    topicos: ["Triagem", "Compostagem", "Upcycling"],
    imagem: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?q=80&w=1000&auto=format&fit=crop"
  },
  {
    titulo: "Gestão de Resíduos Sólidos",
    duracao: "4 semanas",
    descricao: "Curso técnico sobre os principais aspectos da gestão de resíduos sólidos, legislação ambiental e responsabilidade compartilhada.",
    topicos: ["Legislação", "Logística Reversa", "Responsabilidade Estendida"],
    imagem: "https://images.unsplash.com/photo-1528190336454-13cd56b45b5a?q=80&w=1000&auto=format&fit=crop"
  }
];

export default EducationPage;
