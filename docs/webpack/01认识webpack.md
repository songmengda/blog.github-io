# 模块化与CMD AMD规范

## 模块化

指把一个复杂的系统分解到多个模块以方便编码。

在以前，组织代码是通过命名空间去控制的，比如jquery的api都放在了window.$下

## CommonJS

CommonJS 是一种使用广泛的 JavaScript 模块化规范，核心思想是**通过 require 方法**来**同步**地加载依赖的其他模块，通过**module.exports**导出需要暴露的接口。 CommonJS 规范的流行得益于 Node.js 采用了这种方式，后来这种方式被引入到了网页开发中。

```js
let path=require('path')
module.exports=path
```
- 优点:
  1. 代码可复用于 Node.js 环境下并运行，例如做同构应用
  2. 通过 NPM 发布的很多第三方模块都采用了 CommonJS 规范

- 缺点：
  1. 这样的代码无法直接运行在浏览器环境下，必须通过工具转换成标准的 ES5

>CommonJS 还可以细分为 CommonJS1 和 CommonJS2，区别在于 CommonJS1 只能通过 exports.XX = XX 的方式导出，CommonJS2 在 CommonJS1 的基础上加入了 module.exports = XX 的导出方式。 CommonJS 通常指 CommonJS2。

## AMD

AMD 也是一种 JavaScript 模块化规范，**与 CommonJS 最大的不同在于它采用异步的方式去加载依赖的模块。** AMD 规范主要是为了解决**针对浏览器环境的模块化问题**，最具代表性的实现是 requirejs。
```js
// 定义一个模块
define('amdModule',['dep'],function(dep){
  return exports
})
// 导入
require(['amdModule'],function(module){

})
```

- 优点:
  1. 不需要转换代码，直接在浏览器运行
  2. 支持异步加载依赖
  3. 可并行加载多个依赖
  4. 代码可以运行在浏览器和node环境下

- 缺点:
  1. js并没有原生支持AMD，需要依赖AMD库

## ES6模块化

ES6 模块化是欧洲计算机制造联合会 ECMA 提出的 JavaScript 模块化规范，它在语言的层面上实现了模块化。浏览器厂商和 Node.js 都宣布要原生支持该规范。它将逐渐取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

```js
// 导入
import { fn1 } from 'utiles'; // 从一个文件中导入某一个指定的模块   对应的导出语句是 export 
import Vue from 'vue'; // 直接导入一个大模块  对应的导出语句是 export default
// 导出
export function hello() {};
export default {};
```
 ---
 **除此之外，样式包括scss less等 也支持模块的预发**

