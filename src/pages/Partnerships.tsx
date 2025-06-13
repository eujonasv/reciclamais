
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Handshake } from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  partnership: string;
  website?: string;
}

// Dados de exemplo para teste
const partners: Partner[] = [
  {
    id: '1',
    name: 'EcoTech Solutions',
    logo: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=200&h=200&fit=crop&crop=center',
    description: 'Empresa especializada em tecnologias sustentáveis e soluções ambientais inovadoras.',
    partnership: 'Fornecemos tecnologia para otimizar rotas de coleta e monitoramento em tempo real dos pontos de reciclagem.',
    website: 'https://ecotech.com'
  },
  {
    id: '2',
    name: 'GreenLogistics',
    logo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=200&h=200&fit=crop&crop=center',
    description: 'Líder em logística sustentável e transporte ecológico no Brasil.',
    partnership: 'Responsáveis pela coleta e transporte dos materiais recicláveis de nossos pontos parceiros para as usinas de reciclagem.',
    website: 'https://greenlogistics.com'
  },
  {
    id: '3',
    name: 'RecycleMat',
    logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop&crop=center',
    description: 'Especialista em processamento e transformação de materiais recicláveis.',
    partnership: 'Processam os materiais coletados e transformam em novos produtos, fechando o ciclo da economia circular.',
  }
];

const PartnershipsPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-4">
              <Handshake className="w-12 h-12 text-recicla-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Nossas Parcerias
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Trabalhamos com empresas comprometidas com a sustentabilidade para criar 
              um ecossistema completo de reciclagem e economia circular.
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {partners.map((partner) => (
              <Card key={partner.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <img 
                      src={partner.logo} 
                      alt={`Logo ${partner.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                    {partner.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {partner.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-recicla-primary mb-2">Como funciona nossa parceria:</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {partner.partnership}
                    </p>
                  </div>
                  
                  {partner.website && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => window.open(partner.website, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visitar Site
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Quer se tornar nosso parceiro?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Se sua empresa compartilha nossa visão de um mundo mais sustentável, 
              entre em contato conosco para explorar oportunidades de parceria.
            </p>
            <Button 
              className="bg-recicla-primary hover:bg-recicla-accent text-white px-8 py-2"
              onClick={() => window.location.href = 'mailto:reciclamais25@gmail.com?subject=Proposta de Parceria'}
            >
              Entrar em Contato
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PartnershipsPage;
