import path from 'node:path'
import { cwd } from 'node:process'
import type { ImportDeclaration, ImportSpecifier, SourceFile } from 'ts-morph'

export interface InterfaceOriginReturn {
  position: 'local' | 'imported'
  filePath: string
}

function checkNamedImports(currentImport: ImportDeclaration, interfaceName: string): InterfaceOriginReturn | undefined {
  const namedImports = currentImport.getNamedImports()

  for (let j = 0; j < namedImports.length; j++) {
    const targetSourceFile = currentImport.getModuleSpecifierSourceFile()

    if (namedImports[j].getName() === interfaceName && targetSourceFile) {
      return { position: 'imported', filePath: `/${path.relative(cwd(), targetSourceFile.getFilePath())}` }
    }
  }
}

export function checkInterfaceOrigin(sourceFile: SourceFile, interfaceName: string): InterfaceOriginReturn | undefined {
  // 查找本地声明的接口
  const localInterface = sourceFile.getInterface(interfaceName)
  if (localInterface)
    return { position: 'local', filePath: `/${path.relative(cwd(), sourceFile.getFilePath())}` }

  // 如果不是本地声明的，检查是否为导入的接口
  const imports = sourceFile.getImportDeclarations()

  for (const currentImport of imports) {
    const result = checkNamedImports(currentImport, interfaceName)
    if (result)
      return result
  }
}
