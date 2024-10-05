# unplugin-naily-reflector

[![NPM version](https://img.shields.io/npm/v/unplugin-naily-reflector?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-naily-reflector)

A reflector for TypeScript files. It's can extract `classes` and `interface declarations` from `.ts` files (currently only support `.ts` files, `.vue` files will be supported in the future, welcome to contribute).

Base on unplugin, it can be used in Vite, Rollup, Webpack, Nuxt, Vue CLI, and more.

## Install

```bash
npm i unplugin-naily-reflector
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Starter from 'unplugin-naily-reflector/vite'

export default defineConfig({
  plugins: [
    Starter({ /* options */ }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Starter from 'unplugin-naily-reflector/rollup'

export default {
  plugins: [
    Starter({ /* options */ }),
  ],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-naily-reflector/webpack')({ /* options */ })
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default defineNuxtConfig({
  modules: [
    ['unplugin-naily-reflector/nuxt', { /* options */ }],
  ],
})
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-naily-reflector/webpack')({ /* options */ }),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import Starter from 'unplugin-naily-reflector/esbuild'

build({
  plugins: [Starter()],
})
```

<br></details>
