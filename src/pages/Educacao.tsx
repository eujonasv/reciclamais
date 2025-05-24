import React from "react";
import MainLayout from "@/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Book, Video, Sprout, Youtube, CheckCircle, XCircle, Lightbulb, Droplets, RotateCcw } from "lucide-react";
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
              <TabsTrigger value="guia-rapido" className="flex items-center gap-2">
                <Sprout size={18} /> Guia Rápido
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

          {/* Guia Rápido */}
          <TabsContent value="guia-rapido">
            <motion.div 
              className="max-w-4xl mx-auto space-y-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-recicla-primary dark:text-recicla-secondary mb-4">
                  🌍 Guia Rápido para Começar uma Vida Sustentável
                </h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Dicas práticas, curtas e aplicáveis agora mesmo — para quem quer ajudar o planeta no dia a dia.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Separação de Lixo */}
                <motion.div variants={item}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-recicla-primary dark:text-recicla-secondary flex items-center gap-2">
                        ♻️ Como Separar o Lixo Corretamente
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-green-600 dark:text-green-400 flex items-center gap-2 mb-2">
                          <CheckCircle size={16} /> O que pode reciclar:
                        </h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 ml-4">
                          <li>• Papel limpo (jornais, caixas, papelão)</li>
                          <li>• Plásticos duros (garrafas PET, embalagens)</li>
                          <li>• Metais (latas, alumínio)</li>
                          <li>• Vidro (garrafas, potes)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-600 dark:text-red-400 flex items-center gap-2 mb-2">
                          <XCircle size={16} /> O que NÃO pode reciclar:
                        </h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 ml-4">
                          <li>• Papel engordurado (guardanapo, papel de pizza)</li>
                          <li>• Plásticos sujos ou filme plástico</li>
                          <li>• Espelho, cerâmica, vidro quebrado</li>
                          <li>• Embalagens com restos de comida</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                          🧼 Dica rápida: Sempre lave os recicláveis antes de descartar.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Compostagem */}
                <motion.div variants={item}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-recicla-primary dark:text-recicla-secondary">
                        🍃 Como Começar a Compostar
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                        <li>• Separe restos de frutas, legumes, borra de café, folhas secas</li>
                        <li>• Evite carne, gordura e alimentos cozidos</li>
                        <li>• Guarde em baldes, potes ventilados ou minhocários</li>
                        <li>• Em 30 a 60 dias, você terá um adubo natural 🌱</li>
                      </ul>
                      <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <p className="text-sm font-medium text-orange-800 dark:text-orange-300">
                          🚫 Não tem espaço? Junte-se a projetos de compostagem no bairro.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Substituições */}
                <motion.div variants={item}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-recicla-primary dark:text-recicla-secondary">
                        🛍️ Substituições Inteligentes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2 text-gray-700 dark:text-gray-300">Descartável</th>
                                <th className="text-left py-2 text-gray-700 dark:text-gray-300">Sustentável</th>
                              </tr>
                            </thead>
                            <tbody className="text-gray-600 dark:text-gray-300">
                              <tr><td>Sacola plástica</td><td>Ecobag de tecido</td></tr>
                              <tr><td>Garrafa PET</td><td>Garrafa reutilizável</td></tr>
                              <tr><td>Canudo plástico</td><td>Canudo de inox</td></tr>
                              <tr><td>Filme plástico</td><td>Pano encerado</td></tr>
                              <tr><td>Copo descartável</td><td>Copo de silicone</td></tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <p className="text-sm font-medium text-purple-800 dark:text-purple-300">
                            🧠 Comece com um item por semana!
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Economia de Água */}
                <motion.div variants={item}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-recicla-primary dark:text-recicla-secondary flex items-center gap-2">
                        <Droplets size={20} /> Economize Água
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                        <li>• Feche a torneira ao escovar os dentes</li>
                        <li>• Use balde em vez de mangueira</li>
                        <li>• Reaproveite água do chuveiro para lavar o chão</li>
                        <li>• Instale redutores de vazão nas torneiras</li>
                        <li>• Regue plantas pela manhã ou à noite</li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Rotina Sustentável */}
              <motion.div variants={item}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-recicla-primary dark:text-recicla-secondary flex items-center gap-2">
                      <RotateCcw size={20} /> Crie sua Rotina Sustentável
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <p className="text-sm font-medium text-green-800 dark:text-green-300">
                          ✅ Segunda: recicle o que acumulou na semana
                        </p>
                      </div>
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                          ✅ Quarta: leve sua ecobag sempre que sair
                        </p>
                      </div>
                      <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <p className="text-sm font-medium text-purple-800 dark:text-purple-300">
                          ✅ Sexta: compartilhe uma dica sustentável
                        </p>
                      </div>
                      <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <p className="text-sm font-medium text-orange-800 dark:text-orange-300">
                          ✅ Domingo: confira o que pode virar compostagem
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
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

export default EducationPage;
