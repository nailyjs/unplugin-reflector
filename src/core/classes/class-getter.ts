import type { ClassDeclaration } from 'ts-morph'
import { useConstructorInterfaceBuilder } from '../constructor-interface-getter'
import { jsonStringifyExcludeFunction } from '../utils/stringify'

export function convertClassGettersMetadata(classDeclaration: ClassDeclaration): string {
  const className = classDeclaration.getName()
  const singleClassGetters = classDeclaration.getGetAccessors()
  const constructorInterfaceBuilder = useConstructorInterfaceBuilder(classDeclaration.getSourceFile())

  const result = singleClassGetters.map((getter) => {
    return {
      name: getter.getName(),
      isStatic: getter.isStatic(),
      returnType: constructorInterfaceBuilder(getter.getReturnType()),
    }
  })

  const gettersText = jsonStringifyExcludeFunction(result)
  return `/** Getters */\nif (!${className}[Symbol.metadata].__naily__.getters) ${className}[Symbol.metadata].__naily__.getters = ${gettersText};\n`
}
