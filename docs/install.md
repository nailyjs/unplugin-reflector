# 安装与配置

支持任何包管理器，如 npm、yarn、pnpm 等。

```bash
pnpm install unplugin-naily-reflector -D
```

## 配置

方法其实和其他插件都差不多。

### Vite

```ts
// vite.config.ts
import Reflector from 'unplugin-naily-reflector/vite'

export default defineConfig({
  plugins: [
    Reflector({ /* options */ }),
  ],
})
```

### Rollup

```ts
// rollup.config.js
import Reflector from 'unplugin-naily-reflector/rollup'

export default {
  plugins: [
    Reflector({ /* options */ }),
  ],
}
```

### Webpack

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-naily-reflector/webpack')({ /* options */ })
  ]
}
```

### Esbuild

```ts
// esbuild.config.js
import { build } from 'esbuild'
import Reflector from 'unplugin-naily-reflector/esbuild'

build({
  plugins: [Reflector()],
})
```

## 选项

### `exclude`

指定不需要反射的文件。目前强制匹配`.ts`结尾的文件，`.tsx`文件暂时还没有测，没问题之后后续会第一时间先支持它。

- 类型: `string | RegExp | (string | RegExp)[]`
- 默认: `[]`


