
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Recycle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CallToActionSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-recicla-primary via-recicla-secondary to-recicla-primary relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-36 -translate-y-36"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48"></div>
        <Recycle className="absolute top-20 right-20 w-24 h-24 text-white/10 animate-float" />
        <Users className="absolute bottom-20 left-20 w-20 h-20 text-white/10 animate-float delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Pronto para fazer parte da <span className="text-green-200">mudança</span>?
          </h2>
          <p className="text-xl md:text-2xl text-green-100 mb-12 leading-relaxed">
            Junte-se a centenas de pessoas e empresas que já estão construindo um futuro mais sustentável
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <MapPin className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Encontre Pontos</h3>
              <p className="text-green-100 text-sm">Localize pontos de coleta próximos a você</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <Recycle className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Recicle Agora</h3>
              <p className="text-green-100 text-sm">Deposite seus materiais nos pontos cadastrados</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <Users className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Faça Parte</h3>
              <p className="text-green-100 text-sm">Torne-se um ponto de coleta parceiro</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              onClick={() => scrollToSection('mapa')}
              size="lg"
              className="bg-white text-recicla-primary hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Encontrar Pontos de Coleta
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-recicla-primary font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link to="/auth">
                Tornar-se Parceiro
              </Link>
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-green-100 text-sm">
              Tem dúvidas? Entre em contato: 
              <a href="mailto:reciclamais25@gmail.com" className="text-white font-semibold hover:underline ml-2">
                reciclamais25@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
