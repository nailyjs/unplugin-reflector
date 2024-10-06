import type { PluginOption } from 'vite'
import { createVitePlugin } from 'unplugin'
import type { Options } from './types'
import { unpluginFactory } from '.'

/**
 * Vite plugin for unplugin-naily-reflector.
 */
export default createVitePlugin(unpluginFactory) as (options?: Options) => PluginOption
