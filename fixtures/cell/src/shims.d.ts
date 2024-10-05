interface SymbolConstructor {
  readonly metadata: unique symbol;
}

interface Function {
  [Symbol.metadata]: Record<string, any>;
}