
import React from "react";
import MainLayout from "@/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Book, Video, Sprout, HelpCircle } from "lucide-react";
import QuizReciclagem from "@/components/QuizReciclagem";
import { useSearchParams } from "react-router-dom";
import TipsSection from "@/components/education/TipsSection";
import GuideSection from "@/components/education/GuideSection";
import VideosSection from "@/components/education/VideosSection";

const EducationPage = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  const validTabs = ["dicas", "guia", "videos", "quiz"];
  const defaultTab = tab && validTabs.includes(tab) ? tab : "dicas";

  const pageTransition = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <MainLayout>
      <motion.div 
        className="container mx-auto py-12 px-4"
        initial="hidden"
        animate="show"
        variants={pageTransition}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-recicla-primary dark:text-recicla-secondary">Educação</span> Ambiental
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg">
            Aprenda sobre reciclagem, sustentabilidade e como contribuir para um planeta mais verde com nossos recursos educacionais.
          </p>
        </div>

        <Tabs defaultValue={defaultTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full max-w-xl bg-gray-100 dark:bg-gray-800 rounded-full p-1.5 h-auto">
              <TabsTrigger value="dicas" className="data-[state=active]:bg-recicla-primary data-[state=active]:text-white dark:data-[state=active]:bg-recicla-secondary dark:data-[state=active]:text-gray-900 text-sm md:text-base py-2.5 rounded-full flex items-center gap-2">
                <Book size={18} />
                <span>Dicas</span>
              </TabsTrigger>
              <TabsTrigger value="guia" className="data-[state=active]:bg-recicla-primary data-[state=active]:text-white dark:data-[state=active]:bg-recicla-secondary dark:data-[state=active]:text-gray-900 text-sm md:text-base py-2.5 rounded-full flex items-center gap-2">
                <Sprout size={18} />
                <span>Guia</span>
              </TabsTrigger>
              <TabsTrigger value="videos" className="data-[state=active]:bg-recicla-primary data-[state=active]:text-white dark:data-[state=active]:bg-recicla-secondary dark:data-[state=active]:text-gray-900 text-sm md:text-base py-2.5 rounded-full flex items-center gap-2">
                <Video size={18} />
                <span>Vídeos</span>
              </TabsTrigger>
              <TabsTrigger value="quiz" className="data-[state=active]:bg-recicla-primary data-[state=active]:text-white dark:data-[state=active]:bg-recicla-secondary dark:data-[state=active]:text-gray-900 text-sm md:text-base py-2.5 rounded-full flex items-center gap-2">
                <HelpCircle size={18} />
                <span>Quiz</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dicas" className="animate-fade-in">
            <TipsSection />
          </TabsContent>

          <TabsContent value="guia" className="animate-fade-in">
            <GuideSection />
          </TabsContent>

          <TabsContent value="videos" className="animate-fade-in">
            <VideosSection />
          </TabsContent>

          <TabsContent value="quiz" className="pt-6 animate-fade-in">
            <QuizReciclagem />
          </TabsContent>
        </Tabs>
      </motion.div>
    </MainLayout>
  );
};

export default EducationPage;
