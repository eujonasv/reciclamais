
import React, { useState, useRef, useEffect } from "react";
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
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  const tabsRef = useRef<Record<string, HTMLButtonElement | null>>({});
  const listRef = useRef<HTMLDivElement | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  useEffect(() => {
    const currentTab = tabsRef.current[activeTab];
    if (currentTab && listRef.current) {
        const listRect = listRef.current.getBoundingClientRect();
        const tabRect = currentTab.getBoundingClientRect();
        
        setIndicatorStyle({
            left: tabRect.left - listRect.left,
            top: tabRect.top - listRect.top,
            width: tabRect.width,
            height: tabRect.height,
        });
    }
  }, [activeTab]);

  const pageTransition = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const TABS_CONFIG = [
    { value: "dicas", icon: Book, label: "Dicas" },
    { value: "guia", icon: Sprout, label: "Guia" },
    { value: "videos", icon: Video, label: "Vídeos" },
    { value: "quiz", icon: HelpCircle, label: "Quiz" },
  ];

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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList ref={listRef} className="grid grid-cols-2 sm:grid-cols-4 w-full max-w-xl bg-gray-100 dark:bg-gray-800 rounded-full p-1.5 h-auto relative">
              <motion.div
                animate={indicatorStyle}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute bg-recicla-primary dark:bg-recicla-secondary rounded-full z-0"
              />
              {TABS_CONFIG.map((tabInfo) => (
                <TabsTrigger
                  key={tabInfo.value}
                  ref={(el) => (tabsRef.current[tabInfo.value] = el)}
                  value={tabInfo.value}
                  className="relative z-10 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-white dark:data-[state=active]:text-gray-900 text-sm md:text-base py-2.5 rounded-full flex items-center gap-2"
                  style={{ transition: 'color 0.3s' }}
                >
                  <tabInfo.icon size={18} />
                  <span>{tabInfo.label}</span>
                </TabsTrigger>
              ))}
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
