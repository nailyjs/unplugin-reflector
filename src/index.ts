import path from 'node:path'
import { cwd } from 'node:process'
import type { UnpluginFactory } from 'unplugin'
import type { SourceFile } from 'ts-morph'
import { Project } from 'ts-morph'
import { createUnplugin } from 'unplugin'
import MagicString from 'magic-string'
import { createFilter } from '@rollup/pluginutils'
import type { Options } from './types'
import handleClasses from './core/classes/classes'
import handleInterfaces from './core/interfaces/interfaces'
import handleFunctions from './core/functions/functions'
import { addImportIfHasInterface } from './core/utils/import-util'

function withImportMetaId(code: string, id: string): string {
  return `import.meta.id = '/${path.relative(cwd(), id)}';${code}`
}

export const unpluginFactory: UnpluginFactory<Options | undefined> = ({
  include = [/\.(ts|tsx)($|\?)/],
  exclude = [],
  reflectInterface = true,
  reflectClass = true,
  reflectFunction = true,
} = {
  include: [/\.(ts|tsx)($|\?)/],
  exclude: [],
  reflectInterface: true,
  reflectClass: true,
  reflectFunction: true,
}, meta) => {
  const project = new Project()
  const moduleId = 'unplugin-naily-reflector/runtime'
  const virtualModuleId = `virtual:${moduleId}`
  const resolvedModuleId = `\0${moduleId}`
  const resolvedVirtualModuleId = `\0${virtualModuleId}`

  return {
    name: 'unplugin-naily-reflector',
    enforce: 'pre',

    resolveId(id) {
      if (id === virtualModuleId)
        return id
      return null
    },

    load(id) {
      if (id !== resolvedVirtualModuleId && id !== virtualModuleId && id !== moduleId && id !== resolvedModuleId)
        return null
      return `export const reflection = {}`
    },

    transformInclude(id) {
      id = new URL(id, 'file://').pathname
      const isExclude = (!id.endsWith('.ts') && !id.endsWith('.tsx')) || !createFilter(include, exclude)(id)
      if (!isExclude) {
        if (project.getSourceFile(id))
          project.removeSourceFile(project.getSourceFile(id)!)
        project.addSourceFileAtPath(id)
      }
      return !isExclude
    },

    async transform(_code, id: string) {
      let sourceFile: SourceFile = project.getSourceFile(id)!
      if (!sourceFile)
        sourceFile = project.addSourceFileAtPath(id)
      const typeChecker = project.getTypeChecker()

      if (reflectClass)
        handleClasses(sourceFile, typeChecker)
      if (reflectInterface)
        // eslint-disable-next-line ts/no-unused-expressions
        addImportIfHasInterface(sourceFile) && await handleInterfaces(sourceFile, typeChecker, id)
      if (reflectFunction)
        await handleFunctions(sourceFile, typeChecker)

      const code = meta.framework !== 'webpack'
        ? sourceFile.getText()
        : withImportMetaId(sourceFile.getText(), id)

      return {
        code,
        map: new MagicString(code).generateMap({ hires: true }),
      }
    },
  }
}

export const NailyReflector = /* #__PURE__ */ createUnplugin(unpluginFactory)
export default NailyReflector
