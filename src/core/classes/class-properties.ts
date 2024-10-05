import type { ClassDeclaration } from 'ts-morph'
import { useConstructorInterfaceBuilder } from '../constructor-interface-getter'
import { jsonStringifyExcludeFunction } from '../utils/stringify'

export function convertClassPropertiesMetadata(classDeclaration: ClassDeclaration): string {
  const singleClassProperties = classDeclaration.getProperties()
  const constructorInterfaceBuilder = useConstructorInterfaceBuilder(classDeclaration.getSourceFile())

  const propertiesText = singleClassProperties.map((i) => {
    const modifiers = i.getModifiers()

    return jsonStringifyExcludeFunction({
      propertyName: i.getName(),
      isStatic: i.isStatic(),
      isAbstract: i.isAbstract(),
      isPrivate: modifiers.length === 0 ? false : modifiers.some(i => i.getText() === 'private'),
      isProtected: modifiers.length === 0 ? false : modifiers.some(i => i.getText() === 'protected'),
      isPublic: modifiers.length === 0 ? true : modifiers.some(i => i.getText() === 'public' || i.getText() === ''),
      ...constructorInterfaceBuilder(i.getType()),
    })
  }).join(',\n')

  const prePropertiesText = `/** Properties */\nif (!${classDeclaration.getName()}[Symbol.metadata].__naily__.properties) ${classDeclaration.getName()}[Symbol.metadata].__naily__.properties = [];\n`
  return `${prePropertiesText}${classDeclaration.getName()}[Symbol.metadata].__naily__.properties.push(${propertiesText});\n`
}
