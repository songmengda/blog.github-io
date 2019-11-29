# 配置-Entry

entry是配置模块的入口，可抽象成输入，Webpack 执行构建的第一步将从入口开始搜寻及递归解析出所有入口依赖的模块。

entry 配置是必填的，若不填则将导致 Webpack 报错退出。

## context

**Webpack 在寻找相对路径的文件时会以 context 为根目录，context 默认为执行启动 Webpack 时所在的当前工作目录。** 如果想改变 context 的默认配置，则可以在配置文件里这样设置它：
```js
module.exports = {
  context: path.resolve(__dirname, 'app')
}

/**
 * context 必须是一个绝对路径的字符串。 除此之外，还可以通过在启动 Webpack 时带上参数 webpack --context 来设置 context。
 * 之所以在这里先介绍 context，是因为 Entry 的路径和其依赖的模块的路径可能采用相对于 context 的路径来描述，context 会影响到这些相对路径所指向的真实文件。
 * 
*/
```

## Entry 类型

类型|例子|含义
---|:--|---
string|'./app/entry'|入口模块的文件路径，可以是相对路径。
array|['./app/entry1', './app/entry2']|入口模块的文件路径，可以是相对路径
object|{ a: './app/entry-a', b: ['./app/entry-b1', './app/entry-b2']}|配置多个入口，每个入口生成一个 Chunk