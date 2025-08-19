import React from 'react';
import { useOffline } from '@/hooks/use-offline';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const OfflineStatus = () => {
  const { isOnline, syncOfflineData, isPreparingOffline } = useOffline();

  if (isOnline) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
          <Wifi className="w-3 h-3 mr-1" />
          Online
        </Badge>
        {isPreparingOffline && (
          <Badge variant="outline" className="animate-pulse">
            <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
            Sincronizando...
          </Badge>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100">
        <WifiOff className="w-3 h-3 mr-1" />
        Offline
      </Badge>
      <Button
        size="sm"
        variant="outline"
        onClick={syncOfflineData}
        disabled={!isOnline}
        className="h-6 px-2 text-xs"
      >
        <RefreshCw className="w-3 h-3 mr-1" />
        Sincronizar
      </Button>
    </div>
  );
};