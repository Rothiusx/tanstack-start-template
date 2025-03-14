import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from '@tanstack/react-start/config'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  tsr: {
    appDirectory: './src',
    routeFileIgnorePrefix: 'components',
  },
  vite: {
    plugins: [
      // this is the plugin that enables path aliases
      viteTsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      tailwindcss(),
    ],
  },
  react: {
    babel: {
      plugins: [
        [
          'babel-plugin-react-compiler',
          {
            target: '19',
          },
        ],
      ],
    },
  },
})
