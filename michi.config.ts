import { ServerConfigFactory } from "@michijs/dev-server";

const icons = [24, 48, 72, 96, 128, 256, 512].map((x) => ({
  src: `/assets/generated/icon-${x}.webp`,
  sizes: `${x}x${x}`,
  type: "image/webp",
}));

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
        icons,
      },
    },
  },
});

export default config;
