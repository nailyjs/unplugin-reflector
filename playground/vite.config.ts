import type { PluginOption } from 'vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Reflector from '../src/vite'

export default defineConfig({
  plugins: [
    Inspect(),
    Reflector({

    }),
  ] as PluginOption[],

  build: {
    minify: false,
  },
})
