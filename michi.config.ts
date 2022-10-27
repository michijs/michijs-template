import { ServerConfig } from '@michijs/server';

export const config: ServerConfig = () => ({
  public: {
    serviceWorkerName: 'service-worker.js'
  }
});

export default config;