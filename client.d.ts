declare interface SymbolConstructor {
  readonly metadata: unique symbol
}

declare interface SymbolMetadata {
  /**
   * ## Naily reflector metadata
   *
   * @type {(import('virtual:unplugin-naily-reflector/runtime').ClassMetadata | import('virtual:unplugin-naily-reflector/runtime').FunctionMetadata)}
   * @memberof SymbolMetadata It can extends to declare the metadata of the class, interface or function
   */
  __naily__?: import('virtual:unplugin-naily-reflector/runtime').ClassMetadata | import('virtual:unplugin-naily-reflector/runtime').FunctionMetadata
}

declare interface Function {
  [Symbol.metadata]: SymbolMetadata
}

declare module 'virtual:unplugin-naily-reflector/runtime' {
  import type ts from 'typescript'

  export interface InterfaceTarget {
    getPath(): string
    name: string
    getPathReference(): { interfaces: Record<string, InterfaceMetadata> }
    getReference(): InterfaceMetadata
  }

  export interface TypeHandler {
    getFlags(): ts.TypeFlags
    getFlagsName(flags: ts.TypeFlags): string
    getConstructorTarget(): null | (new (...args: any[]) => any)
    getInterfaceTarget(): null | InterfaceTarget
    getTypeArguments(): null | TypeHandler[]
    getUnionTypes(): null | TypeHandler[]
    getIntersectionTypes(): null | TypeHandler[]
    getLiteral(): null | any
    getSymbolFlags(): null | ts.SymbolFlags
    getSymbolFlagsName(): null | string
    getSymbolEscapedName(): null | any
    getRawSymbolFullyQualifiedName(): null | string
    getSymbolName(): null | any
    [key: string]: any
  }

  export interface FunctionParameterMetadata {
    isOptional: boolean
    isRest: boolean
    isParameterProperty: boolean
    isReadonly: boolean
    name: string
  }

  export interface FunctionMetadata {
    reflectionType: 'function'
    isAsync: boolean
    isGenerator: boolean
    isImplementation: boolean
    isExported: boolean
    isDefaultExport: boolean
    isNamedExport: boolean
    isOverload: boolean
    parameters: (FunctionParameterMetadata & TypeHandler)[]
  }

  export interface InterfacePropertyMetadata {
    isOptional: boolean
    isReadonly: boolean
    name: string
  }

  export interface InterfaceMetadata {
    methods: TypeHandler[]
    properties: (InterfacePropertyMetadata & TypeHandler)[]
    reflectionType: 'interface'
  }

  export interface JsdocTagMetadata {
    tagName: string
    comment: string
  }

  export interface JsdocMetadata {
    description: string
    tags: JsdocTagMetadata[]
  }

  export interface JsdocHandler {
    getJsdoc(): null | JsdocMetadata
    getJsdocDefaultValue(): null | string
  }

  export interface ClassMethodParameterMetadata {
    isOptional: boolean
    isRest: boolean
    isParameterProperty: boolean
    isReadonly: boolean
    name: string
  }

  export interface ClassMethodMetadata {
    methodName: string
    isAbstract: boolean
    isAsync: boolean
    isGenerator: boolean
    isImplementation: boolean
    isPrivate: boolean
    isProtected: boolean
    isPublic: boolean
    isStatic: boolean
    parameters: (ClassMethodParameterMetadata & TypeHandler)[]
    returnType: TypeHandler
  }

  export interface ClassPropertyMetadata {
    isAbstract: boolean
    isPrivate: boolean
    isProtected: boolean
    isPublic: boolean
    isStatic: boolean
    propertyName: string
  }

  export interface ClassGetterMetadata {
    isStatic: boolean
    name: string
    returnType: TypeHandler
  }

  export interface ClassMetadata {
    reflectionType: 'class'
    methods: (ClassMethodMetadata & JsdocHandler)[]
    properties: (ClassPropertyMetadata & TypeHandler)[]
    implements: TypeHandler[]
    getters: ClassGetterMetadata[]
  }

  const reflection: Record<string, {
    interfaces: Record<string, InterfaceMetadata>
  }>
}

declare module 'unplugin-naily-reflector/runtime' {
  export * from 'virtual:unplugin-naily-reflector/runtime'
}
