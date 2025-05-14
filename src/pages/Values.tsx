
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
              Nossa <span className="text-recicla-primary dark:text-recicla-secondary">Diretrizes Estratégicas</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              As diretrizes estratégicas da RECICLA+ definem o caminho que seguimos e o impacto que queremos causar. Elas são compostas por missão, visão e valores, e ajudam a orientar nossas decisões, ações e parcerias.
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
                <li>1. Reciclagem: estamos comprometidos com o meio ambiente.</li>
                <li>2. Acessibilidade: a reciclagem deve estar ao alcance de todos</li>
                <li>3. Inovação: buscamos soluções criativas para problemas ambientais urbanos.</li>
                <li>4. Responsabilidade Social: valorizamos a geração de renda justa e o impacto positivo na vida das pessoas</li>
              </ul>
            </div>

            <div className="card-hover p-6 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-recicla-primary dark:text-recicla-secondary">
                Metas
              </h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li>Em até 3 anos, expandir e consolidar a presença da RECICLA+ em todas as regiões de Araucária, garantindo acesso fácil à reciclagem, fortalecendo parcerias locais e promovendo impacto social e ambiental positivo por meio da tecnologia.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ValuesPage;
