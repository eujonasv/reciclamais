
import React, { useState, useEffect, useRef } from 'react';
import { Leaf, Users, MapPin, Trash2 } from 'lucide-react';

const stats = [
  {
    icon: <Trash2 className="h-10 w-10 text-emerald-400" />,
    value: 10,
    unit: " Toneladas",
    label: "de material reciclado",
    prefix: false,
  },
  {
    icon: <MapPin className="h-10 w-10 text-emerald-400" />,
    value: 500,
    unit: "+",
    label: "pontos de coleta parceiros",
    prefix: true,
  },
  {
    icon: <Users className="h-10 w-10 text-emerald-400" />,
    value: 1000,
    unit: "+",
    label: "usuários na comunidade",
    prefix: true,
  },
  {
    icon: <Leaf className="h-10 w-10 text-emerald-400" />,
    value: 25000,
    unit: " kg",
    label: "de CO2 economizados",
    prefix: false,
  },
];

const AnimatedNumber = ({ value, unit, prefix }: { value: number; unit: string; prefix: boolean }) => {
  const [count, setCount] = useState(0);
  const duration = 2000; // ms

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentCount = Math.floor(progress * value);
      setCount(currentCount);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value]);

  return (
    <span className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
      {prefix ? unit : ''}{count.toLocaleString('pt-BR')}{!prefix ? unit : ''}
    </span>
  );
};

const ImpactSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.3
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

  return (
    <section id="impacto" ref={sectionRef} className="py-20 sm:py-28 bg-gray-900 dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nosso <span className="text-emerald-400">Impacto</span> em Números
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-400">
            Cada pequena ação gera uma grande transformação. Veja o que já conquistamos juntos.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800/50 dark:bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10 transform transition-all duration-300 hover:border-emerald-400/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10"
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              {isVisible ? <AnimatedNumber value={stat.value} unit={stat.unit} prefix={!!stat.prefix} /> : 
                <span className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
                  {stat.prefix ? stat.unit : ''}{0}{!stat.prefix ? stat.unit : ''}
                </span>
              }
              <p className="mt-2 text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
