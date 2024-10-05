import path from 'node:path'
import { cwd } from 'node:process'
import type { UnpluginFactory } from 'unplugin'
import { Project } from 'ts-morph'
import { createUnplugin } from 'unplugin'
import type { Options } from './types'
import handleClasses from './core/classes/classes'
import handleInterfaces from './core/interfaces/interfaces'
import { addImportIfHasInterface } from './core/utils/import-util'
import MagicString from 'magic-string'

function analyzeExclude(exclude: string | RegExp | (string | RegExp)[], id: string): boolean {
  if (typeof exclude === 'string')
    return id.includes(exclude)

  else if (exclude instanceof RegExp)
    return exclude.test(id)

  else
    return exclude.some(e => analyzeExclude(e, id))
}

export const unpluginFactory: UnpluginFactory<Options | undefined> = (options) => {
  const project = new Project()
  const moduleId = 'unplugin-naily-reflector/runtime'
  const virtualModuleId = 'virtual:' + moduleId
  const resolvedModuleId = '\0' + moduleId
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return [
    {
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
        const isExclude = !id.endsWith('.ts') || analyzeExclude((options || {}).exclude || [], id)
        return !isExclude
      },

      async transform(_code, id: string) {
        if (project.getSourceFile(id))
          project.removeSourceFile(project.getSourceFile(id)!)
        const sourceFile = project.addSourceFileAtPath(id)
        const typeChecker = project.getTypeChecker()

        addImportIfHasInterface(sourceFile)
        handleClasses(sourceFile, typeChecker)
        await handleInterfaces(sourceFile, typeChecker, id)
        

        const text = sourceFile.getText()
        return {
          code: text,
          map: new MagicString(text).generateMap({ hires: true }),
        }
      },
    },
    {
      name: 'unplugin-naily-reflector-internal',
      enforce: 'post',
      vite: {
        enforce: "post",
        transform(code, id) {
          const generatedCode = `import.meta.id = '/${path.relative(cwd(), id)}';` + code
          return {
            code: generatedCode,
            map: new MagicString(generatedCode).generateMap({ hires: true }),
          }
        },
      },
    }
  ]
}

export const NailyReflector = /* #__PURE__ */ createUnplugin(unpluginFactory)
export default NailyReflector
