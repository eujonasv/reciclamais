
import React from "react";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import RecycleLogoWithText from "@/components/RecycleLogoWithText";

const HeroSection = () => {
  // Função para rolar até uma seção da página
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-100 via-white to-recicla-secondary/20 dark:from-gray-950 dark:via-gray-900 dark:to-recicla-primary/10"
    >
      {/* Elementos decorativos de gradiente */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -bottom-36 -left-40 w-[40rem] h-[40rem] rounded-full bg-recicla-primary/10 blur-3xl animate-pulse-green" />
        <div className="absolute -top-24 right-0 w-[32rem] h-[32rem] rounded-full bg-recicla-secondary/20 blur-3xl" style={{ animationDelay: "700ms" }} />
        <div className="absolute top-1/2 left-0 w-[20rem] h-[10rem] rounded-full bg-emerald-200/40 blur-2xl opacity-50" style={{ transform: "translateY(-50%)", animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 w-full px-4">
        <div className="mx-auto flex flex-col items-center gap-7 py-28 sm:py-36 max-w-3xl">
          {/* Logo animada em destaque */}
          <div className="mb-3 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            <RecycleLogoWithText size="xxl" />
          </div>
          {/* Frase de impacto */}
          <h1 className="text-4xl md:text-6xl font-extrabold mb-2 text-gray-900 dark:text-white tracking-tight text-center animate-fade-in-up font-[Montserrat] drop-shadow-lg" style={{ animationDelay: "0.23s" }}>
            Seu lixo, <span className="text-recicla-primary dark:text-recicla-secondary">nossa solução</span>
          </h1>
          {/* Subfrase ou slogan */}
          <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-200 mb-6 text-center animate-fade-in-up" style={{ animationDelay: "0.27s" }}>
            Transforme resíduos em impacto positivo.<br className="hidden md:inline" />
            Encontre pontos de coleta, colabore com a reciclagem e faça parte do futuro sustentável do planeta.
          </p>
          {/* Botões com animação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button
              onClick={() => scrollToSection("mapa")}
              size="lg"
              className="bg-recicla-primary hover:bg-recicla-accent text-white font-bold py-3 px-8 text-lg rounded-full shadow-lg hover:shadow-emerald-200/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              Encontrar Pontos de Coleta <MoveRight className="ml-2" />
            </Button>
            <Button
              onClick={() => scrollToSection("como-funciona")}
              variant="ghost"
              size="lg"
              className="text-recicla-primary dark:text-recicla-secondary hover:bg-recicla-primary/10 dark:hover:bg-recicla-secondary/10 font-bold py-3 px-8 text-lg rounded-full"
            >
              Saiba Mais
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

