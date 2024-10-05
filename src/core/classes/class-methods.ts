import { ClassDeclaration, MethodDeclaration } from 'ts-morph'
import { useConstructorInterfaceBuilder } from '../constructor-interface-getter'
import { jsdocBuilder } from '../convert-jsdoc'
import { jsonStringifyExcludeFunction } from '../utils/stringify'
import * as ts from 'typescript'

function convertClassParametersMetadata(methodDeclaration: MethodDeclaration): any[] {
  const parameters = methodDeclaration.getParameters()
  const constructorInterfaceBuilder = useConstructorInterfaceBuilder(methodDeclaration.getSourceFile())

  return parameters.map((parameterDeclaration) => {
    return {
      name: parameterDeclaration.getName(),
      isOptional: parameterDeclaration.isOptional(),
      isRest: parameterDeclaration.isRestParameter(),
      isParameterProperty: parameterDeclaration.isParameterProperty(),
      ...constructorInterfaceBuilder(parameterDeclaration.getType()),
    }
  })
}

function getHasInferCallExpression(methodDeclaration: MethodDeclaration, classDeclaration: ClassDeclaration): boolean {
  const body = methodDeclaration.getBody()
  const className = classDeclaration.getName()

  if (!body) return false
  let hasInferCallExpression = false
  for (const node of body.getDescendantsOfKind(ts.SyntaxKind.CallExpression)) {
    const expression = node.getExpression()
    if (expression && expression.getText() === `${className}.infer`) {
      if (node.getTypeArguments().length !== 1) continue
      const typeArgument = node.getTypeArguments()[0]
      console.log(typeArgument.getText())
      hasInferCallExpression = true
    }
  }
  return hasInferCallExpression
}

function convertStaticClassMethodsMetadata(classDeclaration: ClassDeclaration): string {
  const singleClassMethods = classDeclaration.getMethods()
  const className = classDeclaration.getName()
  const constructorInterfaceBuilder = useConstructorInterfaceBuilder(classDeclaration.getSourceFile())

  const methodsText = jsonStringifyExcludeFunction(singleClassMethods.map((methodDeclaration) => {
    const modifiers = methodDeclaration.getModifiers()

    return {
      methodName: methodDeclaration.getName(),
      isStatic: methodDeclaration.isStatic(),
      isAbstract: methodDeclaration.isAbstract(),
      isAsync: methodDeclaration.isAsync(),
      isGenerator: methodDeclaration.isGenerator(),
      isImplementation: methodDeclaration.isImplementation(),
      isPrivate: modifiers.length === 0 ? false : modifiers.some(i => i.getText() === 'private'),
      isProtected: modifiers.length === 0 ? false : modifiers.some(i => i.getText() === 'protected'),
      isPublic: modifiers.length === 0 ? true : modifiers.some(i => i.getText() === 'public' || i.getText() === ''),
      ...jsdocBuilder(methodDeclaration),
      parameters: convertClassParametersMetadata(methodDeclaration),
      returnType: constructorInterfaceBuilder(methodDeclaration.getReturnType()),
      hasInferCallExpression: getHasInferCallExpression(methodDeclaration, classDeclaration),
    }
  }))

  return `/** Methods */\nif (!${className}[Symbol.metadata].__naily__.methods) ${className}[Symbol.metadata].__naily__.methods = ${methodsText};\n`
}

export function convertClassMethodsMetadata(classDeclaration: ClassDeclaration): string {
  const staticMetadataString = convertStaticClassMethodsMetadata(classDeclaration)
  const sourceFile = classDeclaration.getSourceFile()
  const className = classDeclaration.getName()

  sourceFile.getDescendantsOfKind(ts.SyntaxKind.NewExpression).forEach((node) => {
    if (node.getText().includes(className || '')) {
      
    }
  })

  return staticMetadataString
}