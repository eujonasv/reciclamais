
import MainLayout from "@/layouts/MainLayout";
import RecycleLogo from "@/components/RecycleLogo";

const ValuesPage = () => {
  return (
    <MainLayout>
      <section className="section-padding bg-white dark:bg-gray-900" id="visao">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <RecycleLogo size="lg" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Nossa <span className="text-recicla-primary dark:text-recicla-secondary">Visão</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Ser referência nacional em soluções sustentáveis para coleta seletiva, 
              conectando pessoas e empresas em prol de um futuro mais verde e consciente.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="card-hover p-6 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-recicla-primary dark:text-recicla-secondary">
                Missão
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Facilitar e promover a reciclagem através de tecnologia inovadora e 
                educação ambiental, tornando o descarte consciente acessível a todos.
              </p>
            </div>

            <div className="card-hover p-6 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-recicla-primary dark:text-recicla-secondary">
                Valores
              </h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li>• Sustentabilidade em primeiro lugar</li>
                <li>• Inovação e tecnologia verde</li>
                <li>• Compromisso com a comunidade</li>
                <li>• Transparência e responsabilidade</li>
              </ul>
            </div>

            <div className="card-hover p-6 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-recicla-primary dark:text-recicla-secondary">
                Metas
              </h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li>• Expandir pontos de coleta em 200% até 2024</li>
                <li>• Educar 10.000 pessoas sobre reciclagem</li>
                <li>• Reduzir o impacto ambiental em comunidades locais</li>
                <li>• Desenvolver parcerias estratégicas sustentáveis</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ValuesPage;
