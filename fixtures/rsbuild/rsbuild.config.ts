import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';
import * as Reflector from 'unplugin-naily-reflector'

export default defineConfig({
  plugins: [pluginVue()],

  tools: {
    rspack: {
      plugins: [
        Reflector.default.rspack()
      ],
    }
  }
});
