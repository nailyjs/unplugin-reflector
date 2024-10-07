import type { FilterPattern } from '@rollup/pluginutils'
import type { ProjectOptions } from 'ts-morph'

export interface ReflectInterfaceOptions {
  reflectInterface: true
  reflectClass: boolean
  reflectFunction: boolean
}

export interface ReflectNoneOptions {
  reflectInterface: false
  reflectClass: false
  reflectFunction: false
}

export type ReflectOptions = ReflectInterfaceOptions | ReflectNoneOptions

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
   * The options of the `ts-morph` project.
   *
   * @type {ProjectOptions}
   * @memberof Options
   */
  projectOptions?: ProjectOptions
  /**
   * The options of the reflector. If `reflectInterface` is `false`, the all reflector will be disabled.
   *
   * @type {ReflectOptions}
   * @memberof Options
   */
  reflectOptions?: ReflectOptions
}
