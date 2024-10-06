import type { SourceFile } from 'ts-morph'
import * as ts from 'typescript'

/**
 * Add import if has interface.
 *
 * 如果某个导入存在有接口，则添加`import 'xxx'`，这样能让xxx模块的副作用不被tree-shaking掉，从而保留接口信息到全局。
 *
 * @export
 * @param {SourceFile} sourceFile - The source file.
 */
export function addImportIfHasInterface(sourceFile: SourceFile): true {
  const typeChecker = sourceFile.getProject().getTypeChecker()
  const importDeclarations = sourceFile.getImportDeclarations()

  importDeclarations.forEach((declaration) => {
    let hasImport = false
    let importPath = ''

    declaration.getNamedImports().forEach((namedImport) => {
      const importSymbol = typeChecker.getSymbolAtLocation(namedImport.getNameNode())
      if (!importSymbol)
        return
      const aliasedSymbol = typeChecker.getAliasedSymbol(importSymbol)
      if (!aliasedSymbol)
        return
      const importDeclaration = aliasedSymbol.getDeclarations()
      const kindNames = importDeclaration.map(d => d.getKind())
      if (kindNames.includes(ts.SyntaxKind.InterfaceDeclaration)) {
        hasImport = true
        importPath = declaration.getModuleSpecifierValue()
      }
    })

    if (hasImport) {
      sourceFile.addImportDeclaration({
        moduleSpecifier: importPath,
      })
    }
  })

  return true
}
