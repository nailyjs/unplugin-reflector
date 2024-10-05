import path from 'node:path'
import { cwd } from 'node:process'
import type { SourceFile, TypeChecker } from 'ts-morph'
import { convertInterfaceMethodsMetadata } from './interface-methods'
import { convertInterfacePropertiesMetadata } from './interface-properties'

async function convertInterfaceMetadata(interfaceName: string, sourceFile: SourceFile, id: string): Promise<void> {
  id = `/${path.relative(cwd(), id)}`
  const singleInterface = sourceFile.getInterface(interfaceName)
  if (!singleInterface)
    return

  const methodsText = convertInterfaceMethodsMetadata(singleInterface)
  const propertiesText = convertInterfacePropertiesMetadata(singleInterface)

  const importText = `import { reflection as ____reflect } from 'unplugin-naily/reflector-runtime';`
  const preText = `  if (!____reflect['${id}']) ____reflect['${id}'] = {};\n  if (!____reflect['${id}'].interfaces) ____reflect['${id}'].interfaces = {};\n`
  const interfaceText = `  if (!____reflect['${id}'].interfaces['${interfaceName}']) ____reflect['${id}'].interfaces['${interfaceName}'] = { methods: ${methodsText}, properties: ${propertiesText} };\n`
  sourceFile.insertText(0, `${importText}{${preText}${interfaceText}};\n\n`)
}

export default async function handleInterfaces(sourceFile: SourceFile, _typeChecker: TypeChecker, id: string): Promise<any[]> {
  return await Promise.all(
    sourceFile.getInterfaces()
      .map(node => node.getName())
      .map(async interfaceName => await convertInterfaceMetadata(interfaceName, sourceFile, id)),
  )
}
