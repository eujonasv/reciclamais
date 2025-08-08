import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const DemoWarningBanner = () => {
  return (
    <Alert className="mx-3 sm:mx-4 mb-3 sm:mb-4 border-accent/40 bg-gradient-to-r from-accent/10 to-transparent text-foreground dark:border-accent/30 dark:from-accent/15 rounded-xl shadow-sm animate-fade-in">
      <AlertTriangle className="h-4 w-4 text-accent" aria-hidden="true" />
      <div>
        <AlertTitle className="font-semibold">Aviso importante</AlertTitle>
        <AlertDescription>
          Os pontos de coleta exibidos neste mapa são demonstrativos e ainda não participam oficialmente do projeto RECICLA+.
        </AlertDescription>
      </div>
    </Alert>
  );
};

export default DemoWarningBanner;