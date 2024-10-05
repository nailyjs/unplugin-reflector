if (!Symbol.metadata) {
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  Symbol.metadata = Symbol('metadata')
}

export {}
