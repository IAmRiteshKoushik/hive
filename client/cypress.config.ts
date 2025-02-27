import { defineConfig } from 'cypress'
import baseConfig from "vite.config.ts";

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      // any `vite.config` file that is detected
      viteConfig: async () => {
        // ... do things ...
        const modifiedConfig = await injectCustomConfig(baseConfig)
        return modifiedConfig
      },
    },
  },
})
