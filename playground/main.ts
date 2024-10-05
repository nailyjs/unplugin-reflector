import type { HelloWorldInterface } from './childrenFolder/test-type'
import type { BazImpl } from './types'
import { reflection } from 'virtual:unplugin-naily-reflector/runtime'

console.log(reflection[import.meta.id])

if (!Symbol.metadata) {
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  Symbol.metadata = Symbol('metadata')
}

import('./test')

export interface FooImpl<T = string> {
  bar: T
  baz: number

  add(a: string, b: number): HelloWorldInterface
  baz2(app: Test, bad?: number): Test
  foo(c: string): BazImpl
  /**
   * 这是jsdoc注释
   *
   * @param d 这是参数d
   * @param e 这是参数e
   * @param f 这是参数f
   */
  ttz(d: FooImpl, e: BazImpl, f: HelloWorldInterface): 1
}

export interface BarImpl {
  bar: string
}

export class Test implements BarImpl {
  constructor() {
    console.log('Test')
  }

  add(a: FooImpl, _b: number) {
    return a
  }

  foo = 'bar'

  bar: string = 'bar'

  get baz() {
    return 1
  }

  static [Symbol.iterator]() {
    return this
  }
}
