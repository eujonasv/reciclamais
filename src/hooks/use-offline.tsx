import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Workbox } from 'workbox-window';
import { collectionPointsService } from '@/services/collection-points-service';
import { offlineStorage } from '@/services/offline-storage';
import { useToast } from '@/hooks/use-toast';

interface OfflineContextType {
  isOnline: boolean;
  isInstalling: boolean;
  showUpdateAvailable: boolean;
  updateApp: () => void;
  installApp: () => void;
  syncOfflineData: () => Promise<void>;
  isPreparingOffline: boolean;
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export const useOffline = () => {
  const context = useContext(OfflineContext);
  if (context === undefined) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
};

interface OfflineProviderProps {
  children: ReactNode;
}

export const OfflineProvider = ({ children }: OfflineProviderProps) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isInstalling, setIsInstalling] = useState(false);
  const [showUpdateAvailable, setShowUpdateAvailable] = useState(false);
  const [isPreparingOffline, setIsPreparingOffline] = useState(false);
  const [wb, setWb] = useState<Workbox | null>(null);
  const { toast } = useToast();

  const syncOfflineData = async () => {
    if (!isOnline) return;
    
    setIsPreparingOffline(true);
    try {
      await collectionPointsService.syncOfflineOperations();
      toast({
        title: "Sincronização completa",
        description: "Todos os dados foram atualizados",
      });
    } catch (error) {
      toast({
        title: "Erro na sincronização",
        description: "Alguns dados podem não ter sido atualizados",
        variant: "destructive",
      });
    } finally {
      setIsPreparingOffline(false);
    }
  };

  // Auto-sync when coming back online
  useEffect(() => {
    const handleOnlineSync = async () => {
      if (isOnline) {
        try {
          await syncOfflineData();
        } catch (error) {
          console.error('Auto-sync failed:', error);
        }
      }
    };

    if (isOnline) {
      handleOnlineSync();
    }
  }, [isOnline]);

  useEffect(() => {
    // Initialize service worker
    if ('serviceWorker' in navigator) {
      const workbox = new Workbox('/sw.js');
      setWb(workbox);

      workbox.addEventListener('installed', (event) => {
        if (event.isUpdate) {
          setShowUpdateAvailable(true);
        }
      });

      workbox.addEventListener('waiting', () => {
        setShowUpdateAvailable(true);
      });

      workbox.addEventListener('controlling', () => {
        window.location.reload();
      });

      workbox.register().catch(console.error);
    }

    // Listen to online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Conectado",
        description: "Sincronizando dados...",
      });
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "Modo offline",
        description: "Você pode continuar usando o app offline",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  const updateApp = () => {
    if (wb) {
      wb.addEventListener('controlling', () => {
        window.location.reload();
      });
      wb.messageSkipWaiting();
    }
  };

  const installApp = () => {
    setIsInstalling(true);
    // PWA installation logic would go here
    // This is typically handled by the browser's install prompt
  };

  return (
    <OfflineContext.Provider value={{
      isOnline,
      isInstalling,
      showUpdateAvailable,
      updateApp,
      installApp,
      syncOfflineData,
      isPreparingOffline
    }}>
      {children}
    </OfflineContext.Provider>
  );
};