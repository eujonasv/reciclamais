
import MainLayout from "@/layouts/MainLayout";
import RecycleLogo from "@/components/RecycleLogo";
import { Target, Eye, Gem, CheckCircle } from "lucide-react";

const ValuesPage = () => {
  const valores = [
    {
      titulo: "Reciclagem:",
      descricao: "estamos comprometidos com o meio ambiente.",
    },
    {
      titulo: "Acessibilidade:",
      descricao: "a reciclagem deve estar ao alcance de todos.",
    },
    {
      titulo: "Inovação:",
      descricao: "buscamos soluções criativas para problemas ambientais urbanos.",
    },
    {
      titulo: "Responsabilidade Social:",
      descricao: "valorizamos a geração de renda justa e o impacto positivo na vida das pessoas.",
    },
  ];

  return (
    <MainLayout>
      <section className="section-padding bg-white dark:bg-gray-900" id="visao">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <RecycleLogo size="lg" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Nossas <span className="text-recicla-primary dark:text-recicla-secondary">Diretrizes Estratégicas</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              As diretrizes estratégicas da RECICLA+ definem o caminho que seguimos e o impacto que queremos causar. Elas são compostas por missão, visão e valores, e ajudam a orientar nossas decisões, ações e parcerias.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Missão Card */}
            <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="flex items-center mb-5">
                <div className="p-3 rounded-full bg-recicla-primary/10 mr-4">
                  <Target className="h-7 w-7 text-recicla-primary dark:text-recicla-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Missão
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Facilitar e incentivar a reciclagem nas cidades por meio de uma plataforma que conecta pessoas e empresas a pontos de coleta parceiros, promovendo sustentabilidade, consciência ambiental e geração de renda de forma acessível e colaborativa.
              </p>
            </div>

            {/* Visão Card */}
            <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="flex items-center mb-5">
                <div className="p-3 rounded-full bg-recicla-primary/10 mr-4">
                  <Eye className="h-7 w-7 text-recicla-primary dark:text-recicla-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Visão
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Em até 3 anos, expandir e consolidar a presença da RECICLA+ em todas as regiões de Araucária, garantindo acesso fácil à reciclagem, fortalecendo parcerias locais e promovendo impacto social e ambiental positivo por meio da tecnologia.
              </p>
            </div>

            {/* Valores Card */}
            <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="flex items-center mb-5">
                <div className="p-3 rounded-full bg-recicla-primary/10 mr-4">
                  <Gem className="h-7 w-7 text-recicla-primary dark:text-recicla-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Valores
                </h3>
              </div>
              <ul className="text-gray-700 dark:text-gray-300 space-y-4">
                {valores.map((valor) => (
                  <li key={valor.titulo} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-recicla-primary dark:text-recicla-secondary mr-3 mt-1 flex-shrink-0" />
                    <span>
                      <strong className="font-semibold text-gray-800 dark:text-gray-100">{valor.titulo}</strong>
                      {' '}{valor.descricao}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ValuesPage;
