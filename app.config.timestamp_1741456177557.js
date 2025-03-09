// app.config.ts
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "@tanstack/react-start/config";
import viteTsConfigPaths from "vite-tsconfig-paths";
var app_config_default = defineConfig({
  tsr: {
    appDirectory: "src",
    autoCodeSplitting: true
  },
  vite: {
    plugins: [
      // this is the plugin that enables path aliases
      viteTsConfigPaths({
        projects: ["./tsconfig.json"]
      }),
      svgr(),
      tailwindcss()
    ]
  },
  react: {
    babel: {
      plugins: [
        [
          "babel-plugin-react-compiler",
          {
            target: "19"
          }
        ]
      ]
    }
  }
});
export {
  app_config_default as default
};
