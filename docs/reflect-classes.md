# 类信息提取

::: warning
目前要做的工作还有很多，现在这些最基础的信息提取已经可以使用了，像JsDoc的注释提取等现在还比较简陋，后续会慢慢完善。
:::


我们基于TC39的`Symbol.metadata`提案，提取到的类的静态信息存放在本类静态的`[Symbol.metadata]`属性中。如果你的环境中，`Symbol`上没有`metadata`属性，可以在你的程序入口文件的所有代码之前加上以下代码：

```ts
import 'unplugin-naily-reflector/metadata'
// 这里是其他import，比如Vue的Vue3的createApp等
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

这样就可以在你的类中使用`[Symbol.metadata]`属性了:

```ts
class MyClass {}

console.dir(MyClass[Symbol.metadata]) // 输出类的所有元数据
```

而我们的所有类信息都存放在这个属性的`__naily__`属性中，这样可以避免和其他库的冲突：

```ts
console.dir(MyClass[Symbol.metadata].__naily__) // 输出类的所有元数据
```

它将打印出类的所有元数据。下面是一个例子：

```ts
export class DocsDemo {
  /**
   * 这是jsdoc注释
   *
   * @param bar 这是参数bar
   */
  foo(bar: string) {}
}

console.dir(DocsDemo[Symbol.metadata].__naily__)
```

那么它的`__naily__`将会有如下的结构:

```ts
{
  // 类上的所有方法，包括静态方法和实例方法等
  methods: [
    {
      methodName: "foo",       // 方法名
      isStatic: false,         // 是否是静态方法
      isAbstract: false,       // 是否是抽象方法
      isAsync: false,          // 是否是异步方法
      isGenerator: false,      // 是否是生成器方法
      isImplementation: true,  // 是否是实现方法
      isPrivate: false,        // 是否是私有方法
      isProtected: false,      // 是否是保护方法
      isPublic: true,          // 是否是公共方法
      getJsdoc(): {            // 获取jsdoc的信息
        description: string,   // jsdoc的描述
        tags: {                // jsdoc的标签
          tagName: string,        // 标签名
          comment: string,        // 标签的内容
        }[]
      },
      getJsdocDefaultValue(): string | null,  // 直接获取jsdoc的默认值（@default xxx）
      parameters: [            // 参数列表
        {
          name: "bar",                  // 参数名
          isOptional: false,            // 是否是可选参数
          isRest: false,                // 是否是剩余参数
          isParameterProperty: false,   // 是否是参数属性
          getConstructorTarget(): null | object {},    // 如果类型是一个本地的类构造函数的时候，那么这个方法可以获取到这个类
          getFlags(): number {},                       // 获取类型的Flags，可以通过导入`typescript`包中的`ts.TypeFlags`来判断当前的类型
          getFlagsName(): string {},                   // 获取类型的Flags的名称，可以通过查看`typescript`包中的`ts.TypeFlags`来判断当前的类型
          getInterfaceTarget(): null | object {},      // 获取类型是一个本地的接口声明的时候，可以通过这个方法获取到这个接口
          getIntersectionTypes(): null | object[] {},  // 如果类型是一个交叉类型的时候，可以通过这个方法获取到交叉类型的所有类型
          getLiteral(): null | unknown {},             // 如果类型是一个字面量类型的时候，可以通过这个方法获取到这个字面量的值
          getTypeArguments(): null | object[] {},      // 如果类型是一个泛型类型的时候，可以通过这个方法获取到泛型的所有类型参数。
          getUnionTypes(): null | object[] {},         // 如果类型是一个联合类型的时候，可以通过这个方法获取到联合类型的所有类型
        },
      ],
      returnType: {
        getConstructorTarget(): null | object {},      // -----------------
        getFlags(): number {},                         //                 |
        getFlagsName(): string {},                     //                 |
        getInterfaceTarget(): null | object {},        //                 | 这些方法和上面的是一样的
        getIntersectionTypes(): null | object[],       //                 |
        getLiteral(): null | unknown {},               //                 |
        getTypeArguments(): null | object[],           //                 |
        getUnionTypes(): null | object[],              // -----------------
      },
    },
  ],
  // 类上的所有属性，包括静态属性和实例属性等
  properties: [],
  // 类上的所有getter访问器，包括静态访问器和实例访问器等
  getters: [],
  // setter访问器现在还没有支持，后续很快会支持上
}
``` 
