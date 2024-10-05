declare interface ImportMeta {
  /**
   * The url of the script module.
   */
  readonly id: string
}

declare module 'unplugin-naily/reflector-runtime' {
  import type * as ts from 'typescript'

  export interface JsDocTag {
    tagName: 'param' | 'default' | (string & {})
    comment?: string
  }
  export interface JsDoc {
    description: string
    tags: JsDocTag[]
  }
  export interface TypeOperation {
    getConstructorTarget(): null
    getFlags(): ts.TypeFlags
    getFlagsName(): string
    getInterfaceTarget(): null
    getIntersectionTypes(): null
    getLiteral(): null
    getTypeArguments(): null
    getUnionTypes(): null
  }
  export interface ReflectionInterfaceMethodParam extends TypeOperation {
    name: string
    isOptional: boolean
    isParameterProperty: boolean
    isRest: boolean
  }
  export interface ReflectionInterfaceMethod {
    getJsDoc(): null | JsDoc[]
    getJsDocDefaultValue(): null | any
    methodName: string
    parameters: ReflectionInterfaceMethodParam[]
    returnType: TypeOperation
  }
  export interface ReflectionInterface {
    methods: ReflectionInterfaceMethod[]
    properties: any[]
  }
  export interface ReflectionValue {
    interfaces: Record<string, ReflectionInterface>
  }
  export const reflection: Record<string, ReflectionValue>
}
