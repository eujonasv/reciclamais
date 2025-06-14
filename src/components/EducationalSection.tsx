
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Video, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';
import RecycleLogo from './RecycleLogo';
import { useLanguage } from '@/contexts/LanguageContext';

const EducationalSection = () => {
  const { translations: t } = useLanguage();

  const educationalResources = [
    {
      title: t['education.resource1.title'],
      description: t['education.resource1.description'],
      icon: <Book size={18} />
    },
    {
      title: t['education.resource2.title'],
      description: t['education.resource2.description'],
      icon: <Sprout size={18} />
    },
    {
      title: t['education.resource3.title'],
      description: t['education.resource3.description'],
      icon: <Video size={18} />
    }
  ];

  return (
    <section id="educacao" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <RecycleLogo size="md" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            {t['education.title.p1']}{' '}
            <span className="text-recicla-primary dark:text-recicla-secondary">{t['education.title.p2']}</span>
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300 mb-8">
            {t['education.subtitle']}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {educationalResources.map((resource, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
              <CardHeader className="bg-recicla-primary/5 dark:bg-recicla-secondary/10 pb-2">
                <CardTitle className="text-lg font-semibold text-recicla-primary dark:text-recicla-secondary flex items-center gap-2">
                  {resource.icon}
                  {resource.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {resource.description}
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  variant="link" 
                  size="sm" 
                  className="p-0 text-recicla-primary dark:text-recicla-secondary hover:text-recicla-accent dark:hover:text-recicla-primary"
                  asChild
                >
                  <Link to="/educacao">{t['education.button.learn-more']}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            asChild 
            className="bg-recicla-primary hover:bg-recicla-accent dark:bg-recicla-secondary dark:hover:bg-recicla-primary text-white"
          >
            <Link to="/educacao">
              {t['education.button.explore-all']}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EducationalSection;
