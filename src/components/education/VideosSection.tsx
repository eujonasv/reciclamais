
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { videos } from "@/data/videos";

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

const VideosSection = () => {
  return (
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
  );
};

export default VideosSection;
