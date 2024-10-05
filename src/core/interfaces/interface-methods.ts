import type { InterfaceDeclaration, MethodSignature } from 'ts-morph'
import { useConstructorInterfaceBuilder } from '../constructor-interface-getter'
import { jsdocBuilder } from '../convert-jsdoc'
import { jsonStringifyExcludeFunction } from '../utils/stringify'

function convertInterfaceMethodParametersMetadata(methodSignature: MethodSignature) {
  const parameters = methodSignature.getParameters()
  const constructorInterfaceBuilder = useConstructorInterfaceBuilder(methodSignature.getSourceFile())

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

export function convertInterfaceMethodsMetadata(interfaceDeclaration: InterfaceDeclaration): string {
  const methods = interfaceDeclaration.getMethods()
  const constructorInterfaceBuilder = useConstructorInterfaceBuilder(interfaceDeclaration.getSourceFile())

  const result = methods.map((methodSignature) => {
    return {
      methodName: methodSignature.getName(),
      ...jsdocBuilder(methodSignature),
      parameters: convertInterfaceMethodParametersMetadata(methodSignature),
      returnType: constructorInterfaceBuilder(methodSignature.getReturnType()),
    }
  })

  return jsonStringifyExcludeFunction(result)
}
