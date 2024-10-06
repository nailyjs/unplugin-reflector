import type { Node } from 'ts-morph'

export function getDeclarationPreProcessText(name: string): string {
  return `\nif (!${name}[Symbol.metadata]) ${name}[Symbol.metadata] = {};\nif (!${name}[Symbol.metadata].__naily__) ${name}[Symbol.metadata].__naily__ = {};\n`
}

export function insertText(node: Node, text: string): void {
  const sourceFile = node.getSourceFile()
  const nextSibling = node.getNextSibling()

  if (nextSibling)
    sourceFile.insertText(nextSibling.getStart(), text)
  else
    sourceFile.insertText(node.getEnd(), text)
}
