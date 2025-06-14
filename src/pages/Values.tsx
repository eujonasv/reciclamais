
import MainLayout from "@/layouts/MainLayout";
import RecycleLogo from "@/components/RecycleLogo";
import { useLanguage } from "@/contexts/LanguageContext";

const ValuesPage = () => {
  const { translations: t } = useLanguage();
  return (
    <MainLayout>
      <section className="section-padding bg-white dark:bg-gray-900" id="visao">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <RecycleLogo size="lg" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              {t['values.title.p1']}{' '}
              <span className="text-recicla-primary dark:text-recicla-secondary">{t['values.title.p2']}</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              {t['values.subtitle']}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="card-hover p-6 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-recicla-primary dark:text-recicla-secondary">
                {t['values.mission.title']}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t['values.mission.description']}
              </p>
            </div>

            <div className="card-hover p-6 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-recicla-primary dark:text-recicla-secondary">
                {t['values.vision.title']}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t['values.vision.description']}
              </p>
            </div>

            <div className="card-hover p-6 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-recicla-primary dark:text-recicla-secondary">
                {t['values.values.title']}
              </h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li>{t['values.values.item1']}</li>
                <li>{t['values.values.item2']}</li>
                <li>{t['values.values.item3']}</li>
                <li>{t['values.values.item4']}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ValuesPage;
