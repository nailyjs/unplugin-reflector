declare module 'virtual:unplugin-naily-reflector/runtime' {
  interface JsDocTag {
    tagName: 'param' | 'default' | (string & {})
    comment?: string
  }
  interface JsDoc {
    description: string
    tags: JsDocTag[]
  }
  interface TypeOperation {
    getConstructorTarget(): null
    getFlags(): typeof import('typescript').TypeFlags
    getFlagsName(): string
    getInterfaceTarget(): null
    getIntersectionTypes(): null
    getLiteral(): null
    getTypeArguments(): null
    getUnionTypes(): null
  }
  interface ReflectionInterfaceMethodParam extends TypeOperation {
    name: string
    isOptional: boolean
    isParameterProperty: boolean
    isRest: boolean
  }
  interface ReflectionInterfaceMethod {
    getJsDoc(): null | JsDoc[]
    getJsDocDefaultValue(): null | any
    methodName: string
    parameters: ReflectionInterfaceMethodParam[]
    returnType: TypeOperation
  }
  interface ReflectionInterface {
    methods: ReflectionInterfaceMethod[]
    properties: any[]
  }

  interface ReflectionValue {
    interfaces: Record<string, ReflectionInterface>
  }

  const reflection: Record<string, ReflectionValue>
}

declare module 'unplugin-naily-reflector/runtime' {
  export * from 'virtual:unplugin-naily-reflector/runtime'
}
