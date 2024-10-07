const defaultExcludeKeys = [
  'getConstructorTarget',
  'getInterfaceTarget',
  'getJsdocDefaultValue',
  'getJsdoc',
  'getTypeArguments',
  'getFlags',
  'getFlagsName',
  'getUnionTypes',
  'getIntersectionTypes',
  'getLiteral',
  'getSymbolEscapedName',
  'getRawSymbolFullyQualifiedName',
  'getSymbolFlags',
  'getSymbolFlagsName',
  'getSymbolName',
]

export function jsonStringifyExcludeFunction<T>(value: T, excludeKeys: string[] = defaultExcludeKeys): string {
  // 处理 null
  if (value === null)
    return 'null'

  // 处理布尔值和数字
  if (typeof value === 'boolean' || typeof value === 'number')
    return String(value)

  // 处理字符串，添加必要的引号
  if (typeof value === 'string')
    return `"${value}"`

  // 处理数组
  if (Array.isArray(value)) {
    const result = value.map(item => jsonStringifyExcludeFunction(item)).join(',')
    return `[${result}]`
  }

  // 处理对象
  if (typeof value === 'object') {
    const keys = Object.keys(value)
    const result: string[] = []
    keys.forEach((key) => {
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-expect-error
      const keyValue = value[key]
      if (typeof keyValue !== 'undefined') {
        const serializedValue = excludeKeys.includes(key) ? `() => {${keyValue}}` : jsonStringifyExcludeFunction(keyValue)
        result.push(`"${key}": ${serializedValue}`)
      }
    })
    return `{${result.join(',')}}`
  }

  // 处理函数
  if (typeof value === 'function')
    return value.name.toString()

  // 未定义或函数类型，返回 undefined
  return ''
}
