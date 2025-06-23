
import MainLayout from "@/layouts/MainLayout";
import RecycleLogo from "@/components/RecycleLogo";
import { Target, Eye, Gem, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ValuesPage = () => {
  const navigate = useNavigate();
  
  const valores = [
    {
      titulo: "Reciclagem:",
      descricao: "estamos comprometidos com o meio ambiente.",
      icon: "♻️"
    },
    {
      titulo: "Acessibilidade:",
      descricao: "a reciclagem deve estar ao alcance de todos.",
      icon: "🤝"
    },
    {
      titulo: "Inovação:",
      descricao: "buscamos soluções criativas para problemas ambientais urbanos.",
      icon: "💡"
    },
    {
      titulo: "Responsabilidade Social:",
      descricao: "valorizamos a geração de renda justa e o impacto positivo na vida das pessoas.",
      icon: "🌱"
    },
  ];

  const cards = [
    {
      id: "missao",
      title: "Missão",
      icon: Target,
      gradient: "from-emerald-500 to-teal-600",
      content: "Facilitar e incentivar a reciclagem nas cidades por meio de uma plataforma que conecta pessoas e empresas a pontos de coleta parceiros, promovendo sustentabilidade, consciência ambiental e geração de renda de forma acessível e colaborativa.",
      delay: "delay-100"
    },
    {
      id: "visao",
      title: "Visão",
      icon: Eye,
      gradient: "from-blue-500 to-cyan-600",
      content: "Em até 3 anos, expandir e consolidar a presença da RECICLA+ em todas as regiões de Araucária, garantindo acesso fácil à reciclagem, fortalecendo parcerias locais e promovendo impacto social e ambiental positivo por meio da tecnologia.",
      delay: "delay-200"
    },
    {
      id: "valores",
      title: "Valores",
      icon: Gem,
      gradient: "from-purple-500 to-pink-600",
      content: null,
      delay: "delay-300"
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-recicla-primary via-emerald-400 to-recicla-secondary dark:from-emerald-800 dark:via-emerald-700 dark:to-teal-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 dark:bg-white/5 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white/10 dark:bg-white/5 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/10 dark:bg-white/5 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8 animate-fade-in">
              <div className="p-4 bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-full shadow-2xl">
                <RecycleLogo size="xl" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in delay-100">
              Diretrizes
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 dark:from-yellow-200 dark:to-orange-200 bg-clip-text text-transparent">
                Estratégicas
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 dark:text-white/80 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in delay-200">
              As diretrizes estratégicas da RECICLA+ definem o caminho que seguimos e o impacto que queremos causar na sociedade.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-300">
              <Button 
                size="lg" 
                onClick={() => navigate("/mapa")}
                className="bg-white text-recicla-primary hover:bg-gray-100 dark:bg-gray-900 dark:text-recicla-secondary dark:hover:bg-gray-800 font-semibold px-8 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                Explorar Mapa
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/#sobre")}
                className="border-white text-white hover:bg-white hover:text-recicla-primary dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-recicla-secondary font-semibold px-8 py-3 rounded-full backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                Saiba Mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto">
          
          {/* Introduction */}
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-recicla-primary/10 dark:bg-recicla-secondary/20 text-recicla-primary dark:text-recicla-secondary px-4 py-2 rounded-full mb-6 font-medium">
              <Sparkles className="h-4 w-4" />
              Nossa Identidade
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Conheça nossos
              <span className="block text-recicla-primary dark:text-recicla-secondary">
                Pilares Fundamentais
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Elas orientam nossas decisões, ações e parcerias, definindo quem somos e para onde queremos ir como organização comprometida com a sustentabilidade.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`group relative p-8 rounded-3xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-fade-in ${card.delay} border border-gray-100 dark:border-gray-700`}
              >
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient} rounded-3xl opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${card.gradient} mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                  <card.icon className="h-8 w-8 text-white" />
                </div>
                
                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">
                  {card.title}
                </h3>
                
                {/* Content */}
                {card.content ? (
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                    {card.content}
                  </p>
                ) : (
                  <div className="space-y-4">
                    {valores.map((valor, index) => (
                      <div
                        key={valor.titulo}
                        className={`flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 animate-fade-in`}
                        style={{ animationDelay: `${600 + index * 100}ms` }}
                      >
                        <div className="text-2xl flex-shrink-0 animate-bounce" style={{ animationDelay: `${800 + index * 200}ms` }}>
                          {valor.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle className="h-5 w-5 text-recicla-primary dark:text-recicla-secondary flex-shrink-0" />
                            <span className="font-bold text-gray-800 dark:text-white">
                              {valor.titulo}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {valor.descricao}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-recicla-primary to-recicla-secondary dark:from-emerald-700 dark:to-teal-700 rounded-3xl p-12 md:p-16 text-white shadow-2xl animate-fade-in delay-500">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Junte-se à Nossa Missão
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Faça parte da transformação ambiental em Araucária. Conecte-se conosco e contribua para um futuro mais sustentável.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate("/mapa")}
                className="bg-white text-recicla-primary hover:bg-gray-100 dark:bg-gray-900 dark:text-recicla-secondary dark:hover:bg-gray-800 font-semibold px-8 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                Encontrar Pontos de Coleta
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => navigate("/educacao")}
                className="border-white text-white hover:bg-white hover:text-recicla-primary dark:border-gray-300 dark:hover:bg-gray-900 dark:hover:text-recicla-secondary font-semibold px-8 py-3 rounded-full backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                Aprender sobre Reciclagem
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ValuesPage;
