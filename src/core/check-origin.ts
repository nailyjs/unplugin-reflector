import fs from 'node:fs'
import path from 'node:path'
import { cwd } from 'node:process'
import type { SourceFile } from 'ts-morph'

export interface InterfaceOriginReturn {
  position: 'local' | 'imported'
  filePath: string
}

function resolveImportPath(sourceFile: SourceFile, importPath: string): string | null {
  // 获取源文件目录的绝对路径
  const sourceDir = path.dirname(sourceFile.getFilePath())
  // 解析导入路径为绝对路径
  const resolvedPath = path.resolve(sourceDir, importPath)
  // 定义可能的文件扩展名
  const extensions = ['.ts', '.tsx', '.js', '.jsx']

  // 先检查是否已经有扩展名
  if (path.extname(resolvedPath)) {
    if (fs.existsSync(resolvedPath))
      return resolvedPath
  }
  else {
    // 尝试不同的扩展名
    for (const ext of extensions) {
      const fullPath = `${resolvedPath}${ext}`
      if (fs.existsSync(fullPath))
        return fullPath
    }
  }

  // 如果没有找到文件，返回 null
  return null
}
export function checkInterfaceOrigin(sourceFile: SourceFile, interfaceName: string): InterfaceOriginReturn | undefined {
  // 查找本地声明的接口
  const localInterface = sourceFile.getInterface(interfaceName)

  if (localInterface) {
    // console.log(`Interface '${interfaceName}' is declared locally: /${path.relative(cwd(), sourceFile.getFilePath())}.`)
    return {
      position: 'local',
      filePath: `/${path.relative(cwd(), sourceFile.getFilePath())}`,
    }
  }
  else {
    // 检查是否为导入的接口
    const imports = sourceFile.getImportDeclarations()
    let isImported = false
    let importSource = ''

    for (const imp of imports) {
      const namedImports = imp.getNamedImports()
      for (const namedImport of namedImports) {
        if (namedImport.getName() === interfaceName) {
          isImported = true
          importSource = `/${path.relative(cwd(), resolveImportPath(sourceFile, imp.getModuleSpecifier().getLiteralText()) || '')}`
          break
        }
      }
      if (isImported)
        break
    }

    if (isImported) {
      // console.log(`Interface '${interfaceName}' is imported from '${importSource}'.`)
      return {
        position: 'imported',
        filePath: importSource,
      }
    }
    else {
      return undefined
    }
  }
}
