
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CtaSection = () => {
    const navigate = useNavigate();

    const goToMap = () => {
        navigate('/mapa');
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4 py-20 sm:py-28">
                <div className="bg-gradient-to-r from-emerald-500 via-recicla-primary to-green-500 dark:from-emerald-600 dark:via-recicla-primary dark:to-green-600 rounded-2xl shadow-2xl shadow-emerald-500/20 p-12 text-center relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full opacity-50"></div>
                    <div className="absolute -bottom-16 -left-10 w-48 h-48 bg-white/10 rounded-full opacity-50"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Pronto para fazer a sua parte?
                        </h2>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto text-green-100 mb-10">
                            Junte-se a milhares de pessoas que estão transformando o futuro do nosso planeta. Encontre o ponto de coleta mais próximo e comece a reciclar hoje mesmo.
                        </p>
                        <Button
                            onClick={goToMap}
                            size="lg"
                            className="bg-white hover:bg-gray-100 text-recicla-primary font-bold py-4 px-10 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            Explorar o Mapa de Coleta
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
