<div align="center">

<img src="./docs/logo_black_fixed.png" alt="unplugin-naily-reflector" width="200" />

# unplugin-naily-reflector

Simple reflector for TypeScript files.

[![NPM version](https://img.shields.io/npm/v/unplugin-naily-reflector?color=a1b858&label=npm)](https://www.npmjs.com/package/unplugin-naily-reflector)
English | [简体中文](./README_zh.md)

</div>

A reflector for TypeScript files. It's can extract `class declarations`、`interface declarations` and `function declarations` from `.ts(x)` files (currently only support `.ts(x)` files, `.vue` files will be supported in the future, welcome to contribute).

Base on unplugin, it can be used in Vite, Rollup, Webpack, Nuxt, Vue CLI, and more.

> Currently it's not stable, welcome to contribute.

## Install

```bash
npm i unplugin-naily-reflector
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Reflector from 'unplugin-naily-reflector/vite'

export default defineConfig({
  plugins: [
    Reflector({ /* options */ }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Reflector from 'unplugin-naily-reflector/rollup'

export default {
  plugins: [
    Reflector({ /* options */ }),
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
import Reflector from 'unplugin-naily-reflector/esbuild'

build({
  plugins: [Reflector()],
})
```

<br></details>
