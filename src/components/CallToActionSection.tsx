
import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CallToActionSection = () => {
  const navigate = useNavigate();

  return (
    <section className="section-padding relative flex items-center justify-center bg-gradient-to-r from-recicla-primary/80 via-green-200/70 to-recicla-secondary/80 dark:from-recicla-secondary/80 dark:via-bg-gray-900 dark:to-recicla-primary/60">
      <div className="absolute inset-0 bg-white/20 dark:bg-gray-800/10 backdrop-blur-xl pointer-events-none" />
      <div className="container mx-auto relative z-10 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight drop-shadow-lg">
          Pronto para transformar o futuro?
        </h2>
        <p className="text-lg md:text-xl mb-8 text-gray-700 dark:text-gray-200 font-semibold drop-shadow">
          Encontre agora o ponto de coleta mais próximo e faça sua parte!
        </p>
        <Button
          size="lg"
          className="bg-recicla-secondary hover:bg-recicla-primary text-white px-10 py-5 rounded-2xl shadow-xl text-lg font-bold gap-2 transition-transform hover:scale-110"
          onClick={() => navigate("/mapa")}
        >
          <MapPin className="w-6 h-6" /> Acessar o Mapa Interativo
        </Button>
      </div>
    </section>
  );
};

export default CallToActionSection;
