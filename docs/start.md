# 开始使用

`unplugin-naily-reflector`是一个用于 TypeScript 文件的反射器。它可以从 `.ts` 文件中提取 `类` 和 `接口声明`（目前仅支持 `.ts` 文件，`.vue` 文件将来会支持，欢迎贡献）。

我们的宗旨是：**轻量级**，不会像 Java 的反射那样强大，我们只负责提取`当前项目`运行时需要的信息，不去提取所有信息。像下面泛型例子我们是无法做到的：

```ts
class Foo<T> {
  bar() {
    // new Foo().bar() 的时候，此处我们是无法知道 T 的类型的。
    // 这涉及到非常复杂的类型提取，我们不会做这种事情。
  }
}
```

## 例子

虽然我们不能做到这么强大的泛型推导，那么我们能做的有什么呢？

### 依赖注入

比如，更强大的依赖注入，下面展示一段简单的依赖注入代码（这段代码是无法运行的，只是展示）：

```ts
interface Storage {
  list(): void
}

class AliStorage implements Storage {
  list() {
    console.log('foo')
  }
}

class TencentStorage implements Storage {
  list() {
    console.log('bar')
  }
}

class Foo {
  // Service接口在运行时现在可以获取，我们可以根据这个接口来注入不同的实现
  @Inject()
  private storageService: Storage

  bar() {
    this.storageService.foo()
  }
}
```

这样，我们就可以在运行时根据 `Storage` 接口来注入不同的实现，而不需要在代码中硬编码。

### 运行时验证

再再比如，我们还可以做一些运行时验证。TypeScript 的类型系统只在编译时生效，我们无法在运行时获取到类型信息。但是我们可以通过`unplugin-naily-reflector`来获取到类的信息：

```ts
class Foo {
  private name: string
  private age?: number
}
```

我们可以在运行时获取到 `Foo` 类的属性，然后根据属性的类型来做一些验证，比如 `name` 必须是 `string` 类型，`age` 必须是 `number` 类型，而且 `age` 是可选的，这样可以舍弃一些繁琐的 `if` 判断，而且无需撰写像`zod`这样的验证库的`schema`文件。

### ORM Schema

再再再比如，我们可以根据类的属性来生成 ORM 的 Schema，比如：

```ts
class User {
  id: number

  name: string
  
  age: number

  @IsEmail()
  email: string

  @IsMobilePhone()
  phone: string
}
```

我们可以根据 `User` 类的属性来生成 `User` 表的 Schema，再接入`mongoose`这类ORM库，就可以直接生成数据库表。如果还需要继续做一些更复杂的验证和操作，往上加装饰器就可以了。

## 与装饰器无关

如果你是FP教会的，不是OOP教会，不想在你的项目大量是用装饰器，那么也没关系，我们的反射器是与装饰器无关的，你可以直接使用`unplugin-naily-reflector`来获取class的信息，后续也会逐步支持`function`的信息提取，敬请期待～

也是因为与装饰器无关，所以我们支持在`stage 0`、`stage 1`、`stage 2`、`stage 3`的装饰器提案，不会因为装饰器提案的变化而导致反射器失效。

## 适配多种构建工具

`unplugin-naily-reflector`是基于`unplugin`的，所以它可以适配`vite`、`rspack`、`webpack`等构建工具。我们会尽力保证在这些构建工具上的稳定性。

## 安装与配置

请查看[安装与配置](./install.md)。