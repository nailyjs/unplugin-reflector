import type { Plugin } from 'vite'
import { createVitePlugin } from 'unplugin'
import type { Options } from './types'
import { unpluginFactory } from '.'

export default createVitePlugin(unpluginFactory) as (options: Options) => Plugin
