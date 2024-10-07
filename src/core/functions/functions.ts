import type { FunctionDeclaration, SourceFile, TypeChecker } from 'ts-morph'
import { getDeclarationPreProcessText, insertText } from '../insert-text'
import { useConstructorInterfaceBuilder } from '../constructor-interface-getter'
import { jsonStringifyExcludeFunction } from '../utils/stringify'

function convertFunctionParametersMetadata(func: FunctionDeclaration, _typeChecker: TypeChecker): string {
  const sourceFile = func.getSourceFile()
  const constructorInterfaceBuilder = useConstructorInterfaceBuilder(sourceFile)

  const parametersText = jsonStringifyExcludeFunction(func.getParameters().map((parameterDeclaration) => {
    const paramType = parameterDeclaration.getType()

    return {
      name: parameterDeclaration.getName(),
      isOptional: parameterDeclaration.isOptional(),
      isRest: parameterDeclaration.isRestParameter(),
      isParameterProperty: parameterDeclaration.isParameterProperty(),
      isReadonly: parameterDeclaration.isReadonly(),
      ...constructorInterfaceBuilder(paramType),
    }
  }))

  return `/* Parameters */\nif (!${func.getName()}[Symbol.metadata].__naily__.parameters) ${func.getName()}[Symbol.metadata].__naily__.parameters = ${parametersText};\n`
}

function convertReturnTypeFunctionMetadata(func: FunctionDeclaration): string {
  const sourceFile = func.getSourceFile()
  const constructorInterfaceBuilder = useConstructorInterfaceBuilder(sourceFile)

  const returnType = jsonStringifyExcludeFunction(constructorInterfaceBuilder(func.getReturnType()))

  return `/* ReturnType */\nif (!${func.getName()}[Symbol.metadata].__naily__.returnType) ${func.getName()}[Symbol.metadata].__naily__.returnType = ${returnType};\n`
}

function convertFunctionMetadata(func: FunctionDeclaration, typeChecker: TypeChecker) {
  const funcName = func.getName()
  if (!funcName)
    return

  const preProcessText = `${getDeclarationPreProcessText(funcName)}`
  const parametersText = convertFunctionParametersMetadata(func, typeChecker)
  const returnTypeText = convertReturnTypeFunctionMetadata(func)
  const basicText = `/* Basic */\n${funcName}[Symbol.metadata].__naily__ = ${JSON.stringify({
    isAsync: func.isAsync(),
    isGenerator: func.isGenerator(),
    isExported: func.isExported(),
    isDefaultExport: func.isDefaultExport(),
    isNamedExport: func.isNamedExport(),
    isOverload: func.isOverload(),
    isImplementation: func.isImplementation(),
    reflectionType: 'function',
  })}`

  insertText(func, preProcessText + basicText + parametersText + returnTypeText)
}

export default async function handleFunctions(sourceFile: SourceFile, typeChecker: TypeChecker): Promise<void> {
  sourceFile.getFunctions()
    .map(func => func.getName())
    .map(func => convertFunctionMetadata(sourceFile.getFunctionOrThrow(func || ''), typeChecker))
}
