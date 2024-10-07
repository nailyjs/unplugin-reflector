import type { SourceFile, Type } from 'ts-morph'
import * as ts from 'typescript'
import type { ConvertMethodParamOptions } from './types'
import { checkInterfaceOrigin } from './check-origin'
import { jsonStringifyExcludeFunction } from './utils/stringify'

const returnNull = `return null`

function convertConstructorTargetMetadata(typing: Type, classNames: string[]): string {
  const symbol = typing.getSymbol()
  const symbolName = symbol ? symbol.getName() : returnNull

  return symbolName ? classNames.includes(symbolName) ? `return ${symbolName}` : returnNull : returnNull
}

function convertInterfaceTargetMetadata(typing: Type, sourceFile: SourceFile): string {
  const symbol = typing.getSymbol()
  const returnTypeSymbolName = symbol ? symbol.getName() : returnNull
  const origin = checkInterfaceOrigin(sourceFile, returnTypeSymbolName)

  if (origin)
    return `return { name: '${returnTypeSymbolName}', getPath: () => '${origin.filePath}', getPathReference: () => ____reflect['${origin.filePath}'], getReference: () => ____reflect['${origin.filePath}']['interfaces']['${returnTypeSymbolName}'] }`
  else
    return returnNull
}

function convertTypeArgumentsMetadata(typing: Type, sourceFile: SourceFile): string {
  const typeArguments = typing.getTypeArguments()
  const constructorInterfaceBuilder = useConstructorInterfaceBuilder(sourceFile)

  if (typeArguments.length === 0)
    return returnNull
  const result = typeArguments.map(typeArgument => constructorInterfaceBuilder(typeArgument))
  return `return ${jsonStringifyExcludeFunction(result)}`
}

function convertUnionTypes(typing: Type, sourceFile: SourceFile): string {
  const unionTypes = typing.getUnionTypes()
  const constructorInterfaceBuilder = useConstructorInterfaceBuilder(sourceFile)

  if (unionTypes.length === 0)
    return returnNull
  const result = unionTypes.map(unionType => constructorInterfaceBuilder(unionType))
  return `return ${jsonStringifyExcludeFunction(result)}`
}

function convertIntersectionTypes(typing: Type, sourceFile: SourceFile): string {
  const intersectionTypes = typing.getIntersectionTypes()
  const constructorInterfaceBuilder = useConstructorInterfaceBuilder(sourceFile)

  if (intersectionTypes.length === 0)
    return returnNull
  const result = intersectionTypes.map(intersectionType => constructorInterfaceBuilder(intersectionType))
  return `return ${jsonStringifyExcludeFunction(result)}`
}

function convertLiteralTypes(typing: Type): string {
  const flags = typing.getFlags()
  if (flags === ts.TypeFlags.NumberLiteral || flags === ts.TypeFlags.StringLiteral || flags === ts.TypeFlags.BooleanLiteral)
    return `return ${typing.getText()}`
  else
    return returnNull
}

function constructorInterfaceBuilder(typing: Type, { classNames, sourceFile }: ConvertMethodParamOptions) {
  return {
    getFlags: `return ${typing.getFlags()}`,
    getFlagsName: `return '${ts.TypeFlags[typing.getFlags()]}'`,
    getConstructorTarget: convertConstructorTargetMetadata(typing, classNames),
    getInterfaceTarget: convertInterfaceTargetMetadata(typing, sourceFile),
    getTypeArguments: convertTypeArgumentsMetadata(typing, sourceFile),
    getUnionTypes: convertUnionTypes(typing, sourceFile),
    getIntersectionTypes: convertIntersectionTypes(typing, sourceFile),
    getLiteral: convertLiteralTypes(typing),
    getSymbolFlags: `return ${typing.getSymbol()?.getFlags() || null}`,
    getSymbolFlagsName: `return '${ts.SymbolFlags[typing.getSymbol()?.getFlags() || 0] || null}'`,
    getSymbolEscapedName: `return ${typing.getSymbol()?.getEscapedName() || null} || null`,
    getRawSymbolFullyQualifiedName: `return '${typing.getSymbol()?.getFullyQualifiedName() || null}'`,
    getSymbolName: `return ${typing.getSymbol()?.getName() || null} || null`,
  }
}

/**
 * 分析`ts.Type`类型。
 *
 * @export
 * @param {SourceFile} sourceFile 源文件
 */
export function useConstructorInterfaceBuilder(sourceFile: SourceFile) {
  const classNames = sourceFile.getClasses().map(_ => _.getName() || '').filter(Boolean)
  const interfaceNames = sourceFile.getInterfaces().map(_ => _.getName() || '').filter(Boolean)

  return (typing: Type) => constructorInterfaceBuilder(typing, { classNames, interfaceNames, sourceFile })
}
