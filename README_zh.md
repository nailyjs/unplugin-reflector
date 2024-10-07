<div align="center">

<img src="./docs/logo_black_fixed.png" alt="unplugin-naily-reflector" width="200" />

# unplugin-naily-reflector

轻量级 TypeScript 反射器。

<div>

[![NPM 版本](https://img.shields.io/npm/v/unplugin-naily-reflector?color=a1b858&label=npm)](https://www.npmjs.com/package/unplugin-naily-reflector)
![提交](https://img.shields.io/github/commit-activity/m/nailyjs/unplugin-reflector)
[English](./README.md) | 简体中文

</div>

</div>

一个 TypeScript 反射器。它可以从 `.ts(x)` 文件中提取 `class 声明`、`interface 声明` 和 `function 声明`（目前仅支持 `.ts(x)` 文件，`.vue` 文件等可能将在未来支持，欢迎PR）。

毕竟是基于 unplugin的，所以它可以在 Vite、Rollup、Webpack、Nuxt、Vue CLI 等框架中使用。

> 目前还不是特别稳定，欢迎PR。

## 安装

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
