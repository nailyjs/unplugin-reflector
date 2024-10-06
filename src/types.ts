import type { FilterPattern } from '@rollup/pluginutils'

export interface Options {
  /** @default [] */
  exclude?: FilterPattern
  /**
   * Just support `.ts` and `.tsx` files. `.vue`、`.js`、`.jsx`、`.svelte` and other files are not supported.
   *
   * @default [/\.(ts|tsx)($|\?)/]
   */
  include?: FilterPattern
  /**
   * Reflect the interface declarations. If `false`, the interface will not be reflected.
   *
   * @default true
   */
  reflectInterface?: boolean
  /**
   * Reflect the classes. If `false`, the class will not be reflected.
   *
   * @default true
   */
  reflectClass?: boolean
  /**
   * Reflect the function declarations. If `false`, the function will not be reflected.
   *
   * @default true
   */
  reflectFunction?: boolean
}
