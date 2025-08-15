import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Workbox } from 'workbox-window';

interface OfflineContextType {
  isOnline: boolean;
  isInstalling: boolean;
  showUpdateAvailable: boolean;
  updateApp: () => void;
  installApp: () => void;
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
  const [wb, setWb] = useState<Workbox | null>(null);

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
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

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
      installApp
    }}>
      {children}
    </OfflineContext.Provider>
  );
};