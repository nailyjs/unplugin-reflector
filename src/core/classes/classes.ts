import type { SourceFile, TypeChecker } from 'ts-morph'
import { convertClassGettersMetadata } from './class-getter'
import { convertClassImplements } from './class-implements'
import { convertClassMethodsMetadata } from './class-methods'
import { convertClassPropertiesMetadata } from './class-properties'

function convertClassMetadata(className: string | undefined, sourceFile: SourceFile): void {
  if (!className)
    return
  const classDeclaration = sourceFile.getClass(className)
  if (!classDeclaration)
    return

  const preProcessText = `\nif (!${className}[Symbol.metadata]) ${className}[Symbol.metadata] = {};\nif (!${className}[Symbol.metadata].__naily__) ${className}[Symbol.metadata].__naily__ = {};\n`
  const generatedMethodsText = convertClassMethodsMetadata(classDeclaration)
  const generatedPropertiesText = convertClassPropertiesMetadata(classDeclaration)
  const generatedImplementationsText = convertClassImplements(classDeclaration)
  const generatedGettersText = convertClassGettersMetadata(classDeclaration)

  const nextSibling = classDeclaration.getNextSibling()
  if (nextSibling)
    sourceFile.insertText(nextSibling.getStart(), preProcessText + generatedMethodsText + generatedPropertiesText + generatedImplementationsText + generatedGettersText)
  else
    sourceFile.insertText(classDeclaration.getEnd(), preProcessText + generatedMethodsText + generatedPropertiesText + generatedImplementationsText + generatedGettersText)
}

export default function handleClasses(sourceFile: SourceFile, _typeChecker: TypeChecker): void {
  sourceFile.getClasses()
    .map(node => node.getName())
    .forEach(className => convertClassMetadata(className, sourceFile))
}
