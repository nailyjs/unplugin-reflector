import type { JSDocableNode } from 'ts-morph'

export function convertJsdocDefaultValue(node: JSDocableNode): string {
  for (const docs of node.getJsDocs()) {
    for (const docTags of docs.getTags()) {
      if (docTags.getTagName() !== 'default')
        continue
      return `return ${docTags.getComment()}`
    }
  }
  return 'return null'
}

export function convertJsdoc(node: JSDocableNode): string {
  const jsdoc = node.getJsDocs()
  if (!jsdoc.length)
    return 'return null'

  const docs = JSON.stringify(jsdoc.map((doc) => {
    return {
      description: doc.getDescription(),
      tags: doc.getTags().map((tag) => {
        return {
          tagName: tag.getTagName(),
          comment: tag.getComment(),
        }
      }),
    }
  }))
  return `return ${docs}`
}

export function jsdocBuilder(node: JSDocableNode) {
  return {
    getJsdocDefaultValue: convertJsdocDefaultValue(node),
    getJsdoc: convertJsdoc(node),
  }
}
