import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.furever',
  appName: 'furever',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
