import type { ClassDeclaration } from 'ts-morph'
import { useConstructorInterfaceBuilder } from '../constructor-interface-getter'
import { jsonStringifyExcludeFunction } from '../utils/stringify'

export function convertClassImplements(classDeclaration: ClassDeclaration): string {
  const implementsClause = classDeclaration.getImplements()

  if (!implementsClause.length)
    return ''

  const constructorInterfaceBuilder = useConstructorInterfaceBuilder(classDeclaration.getSourceFile())
  const result = implementsClause.map(i => constructorInterfaceBuilder(i.getType()))
  const stringResult = jsonStringifyExcludeFunction(result)

  return `/** Implements */\nif (!${classDeclaration.getName()}[Symbol.metadata].__naily__.implements) ${classDeclaration.getName()}[Symbol.metadata].__naily__.implements = ${stringResult};\n`
  // return `${preText}${classDeclaration.getName()}[Symbol.metadata].__naily__.implements.push(${stringResult});\n`
}
