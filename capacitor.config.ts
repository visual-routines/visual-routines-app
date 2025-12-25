import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.cea97572b9aa46cfa6a028b683731f53',
  appName: 'Visual Routines',
  webDir: 'dist',
  plugins: {
    StatusBar: {
      overlaysWebView: true,
      style: 'LIGHT',
      backgroundColor: '#00000000'
    }
  }
  // server: {
  //  url: 'https://cea97572-b9aa-46cf-a6a0-28b683731f53.lovableproject.com?forceHideBadge=true',
  //  cleartext: true
  //}
};

export default config;
