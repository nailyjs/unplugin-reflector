import type { SourceFile } from 'ts-morph'

export interface ConvertMethodParamOptions {
  classNames: string[]
  interfaceNames: string[]
  sourceFile: SourceFile
}
