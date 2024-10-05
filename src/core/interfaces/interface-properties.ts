import type { InterfaceDeclaration } from 'ts-morph'
import { useConstructorInterfaceBuilder } from '../constructor-interface-getter'
import { jsdocBuilder } from '../convert-jsdoc'
import { jsonStringifyExcludeFunction } from '../utils/stringify'

export function convertInterfacePropertiesMetadata(interfaceDeclaration: InterfaceDeclaration): string {
  const properties = interfaceDeclaration.getProperties()
  const constructorInterfaceBuilder = useConstructorInterfaceBuilder(interfaceDeclaration.getSourceFile())

  const result = properties.map((propertyDeclaration) => {
    return {
      name: propertyDeclaration.getName(),
      isOptional: propertyDeclaration.hasQuestionToken(),
      isReadonly: propertyDeclaration.isReadonly(),
      ...jsdocBuilder(propertyDeclaration),
      ...constructorInterfaceBuilder(propertyDeclaration.getType()),
    }
  })

  return jsonStringifyExcludeFunction(result)
}
