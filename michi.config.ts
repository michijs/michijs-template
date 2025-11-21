import type {
  ServerConfigFactory,
} from "@michijs/dev-server";

const config: ServerConfigFactory = ({ icons }) => ({
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
