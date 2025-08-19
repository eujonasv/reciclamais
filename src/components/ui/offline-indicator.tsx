import React, { useState, useEffect } from 'react';
import { useOffline } from '@/hooks/use-offline';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { WifiOff, Wifi, Download, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OfflineIndicatorProps {
  className?: string;
}

export const OfflineIndicator = ({ className }: OfflineIndicatorProps) => {
  const { isOnline, showUpdateAvailable, updateApp, syncOfflineData, isPreparingOffline } = useOffline();
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setShowOfflineMessage(true);
      const timer = setTimeout(() => setShowOfflineMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  return (
    <div className={cn("fixed top-4 right-4 z-50 space-y-2", className)}>
      {/* Connection Status Badge */}
      <Badge 
        variant={isOnline ? "default" : "destructive"}
        className="flex items-center gap-2"
      >
        {isOnline ? (
          <>
            <Wifi className="h-3 w-3" />
            Online
          </>
        ) : (
          <>
            <WifiOff className="h-3 w-3" />
            Offline
          </>
        )}
      </Badge>

      {/* Offline Message */}
      {showOfflineMessage && !isOnline && (
        <Alert className="w-80">
          <WifiOff className="h-4 w-4" />
          <AlertDescription>
            Você está offline. Algumas funcionalidades podem estar limitadas.
            Os dados em cache continuam disponíveis.
          </AlertDescription>
        </Alert>
      )}

      {/* Update Available */}
      {showUpdateAvailable && (
        <Alert className="w-80">
          <Download className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Nova versão disponível!</span>
            <Button 
              size="sm" 
              onClick={updateApp}
              className="ml-2"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Atualizar
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};