import { ServerConfigFactory } from '@michijs/dev-server';

export const config: ServerConfigFactory = () => ({
  public: {
    manifest: {
      options: {
        name: "MichiJS",
        short_name: "MichiJS",
        description: "Template for MichiJS library",
        theme_color: "#FEDB35",
        background_color: "#FEDB35",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: ".",
        icons: [
          {
            src: "/icon.svg",
            sizes: "24x24 48x48 72x72 96x96 128x128 256x256",
            type: "image/svg+xml",
            purpose: "any maskable"
          },
          {
            src: "/splash-screen.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      }
    }
  }
});

export default config;