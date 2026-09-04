import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.rojgar.app',
  appName: 'Rojgar',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
