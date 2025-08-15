import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.47f651abb2d14f21bce41a2a9d3ed45a',
  appName: 'reciclamais',
  webDir: 'dist',
  server: {
    url: 'https://47f651ab-b2d1-4f21-bce4-1a2a9d3ed45a.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#22c55e',
      showSpinner: false
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#22c55e'
    }
  }
};

export default config;