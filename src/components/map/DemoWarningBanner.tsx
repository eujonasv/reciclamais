import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const DemoWarningBanner = () => {
  return (
    <Alert className="bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200 mx-3 sm:mx-4 mb-3 sm:mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription className="font-medium">
        <strong>Atenção:</strong> Os pontos de coleta exibidos neste mapa são apenas demonstrativos e ainda não participam oficialmente do projeto RECICLA+.
      </AlertDescription>
    </Alert>
  );
};

export default DemoWarningBanner;