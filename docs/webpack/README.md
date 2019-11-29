# 了解webpack

在系统看深入浅出webpack这本书之前，先在腾讯课堂购买了一个课程，稍微熟悉了一下webpack

## 介绍 
**什么是webapck？**

一个模块打包机

**webpack可以做哪些事儿？**

代码转换 文件优化 代码分割 模块合并 自动刷新 代码校验 自动发布

## 安装
```
1.webpack 安装   npm init  // 生成一个package.json文件
2.sudo npm i webpack webpack-cli     // 安装webpack和webpack-cli
3.同级创建目录src文件夹 ,创建index.js    1.js   
4.在控制台执行  npx webpack  // 默认生成dist文件夹并生成main.js

```
## 基础配置
webpack.config.js
```js
// 如果想对webpack做一些配置  需要创建webpack.config.js
  let path = require('path') // 引入核心内置路径模块
    module.exports = {
      mode: 'development', // 打包模式  有两种1 默认是production   2是development开发环境
      entry: './src/index.js', //入口文件
      output: {
        filename: 'bundle.js', // 打包后的文件名
        path: path.resolve(__dirname, 'build'), // path是node的核心内置模块 不需要安装  这里的路径必须是一个绝对路径  __dirname 表示在当前目录下生成一个bundle.js
      }
    }

/**
 * 这个文件的名字必须是webpack.config.js
 * 如果随便起一个其他的名字  并且想让webpack读取他的话  需要在package.json中加一段脚本
 *   
 "scripts": {
  "build": "webpack --config webpack.config.js" // 后边是文件的名字
  },
 * 
 然后运行 npm run build
*/
```
## 打包至html
```js
/**
 * 通过上边的配置  build之后打包好的文件  可以用html测试一下这个文件能不能用
 * 
 * 在build目录下新建一个index.html
 * 引入打包后的js 发现可以运行  但是这种方式比较low  我们希望通过ip的形式去访问
 * */

// 安装webpack-dev-server来启动
// npm i webpack-dev-server // 作用是安装一个node服务  他是基于express实现的

/**
 * 安装完成后   运行npx webpack-dev-server  // 即可启动一个服务 默认是localhost:8080 (此时并没有真正打包文件  而是在内存中进行了打包输出给了这个本地服务)
 * 依然可以在package.json中 加配置脚本 dev:webpack-dev-server  就可以执行npm run dev 启动服务了
 *
 * 在webapck.config.js中 新增devServer对象 port属性可以指定端口号  progress 可以显示进度条  contentBase:'./build'找文件夹  open:true 启动之后自动打开浏览器
*/

/**
 *   
 *  在此之前  都是手动建了一个html    如果希望自动生成一个html  就需要一个插件HtmlWebpackPlugin
    1.安装  npm i html-webpack-plugin -D
    2.在webpack.config.js中 新增plugins属性  他 是一个数组   存放着所有的插件,  
    3.new HtmlWebpackPlugin({
        template: './src/index.html', //以什么作为模板
        filename: 'index.html', // 生成的文件名字叫什么
        minify: {
          removeAttributeQuotes: true, //删除双引号
          collapseWhitespace: true // 折叠空行
        },
        hash:true, // 在html引用的资源文件后边跟hash
    })
    4.此外  还可以在output filename中  这样写   bundle.[hash].js 打包后的js也会带上hash   如果写成[hash:8]表示只表示8位
 * 
*/

/**
    wbp 默认只对js进行打包处理

    如果想处理css   需要进行一些loader作为辅助模块

    1. 在原有基础上   src中新建一个index.css  再建一个index2.css    
    2.在index.css中  使用@import 导入index2.css 
    3.在src下的index.js中  require index.css
    4.在webpack.config.js中  新增module 属性 
    5.在module中 新增rules属性，这是一个数组  他的作用是在其中配置一些规则  loader   css-loader 可以解析@imoort这种语法   style-loader 可以把css插入到head标签中
    （loader的特点: 
    1.每一个loader  作用单一
    2.loader的执行顺序是从右向左执行的
    ）
    6.在rules中 配置如下:{ test: /\.css$/, use: ['style-loader', 'css-loader'] }
    7.npm i style-loader css-loader  然后npm run dev  查看效果生效

    8.除了6中的配置方式   还可以配置成对象形式的
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: 'head', // 不知道为什么官网写的是insertAt  
              injectType: 'singletonStyleTag', // 官网上写的是 singleton 奶奶的
              // "styleTag" | "singletonStyleTag" | "lazyStyleTag" | "lazySingletonStyleTag" | "linkTag"
            }
          },
          'css-loader'
        ]
      }

      9. 如果引用了less  sass  stylus预处理语言
      需要在原来的基础上  以less为例
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: 'head',
              injectType: 'singletonStyleTag',
              // "styleTag" | "singletonStyleTag" | "lazyStyleTag" | "lazySingletonStyleTag" | "linkTag"
            }
          },
          'css-loader',
          'less-loader', // 把less => css
        ]
      }
*/



/**
  现在可以进行css打包了   但是他是在html文件中插入了一个style标签

  现在我们要把样式抽离成一个文件
  需要用到 mini-css-extract-plugin 插件

  1.安装  npm i mini-css-extract-plugin
  2.引用 let MiniCssExtractPlugin = require('mini-css-extract-plugin');

  3.实例化这个插件  在plugins中
    new MiniCssExtractPlugin({
      filename: 'index.css', // 目标文件
    })
  4. 将style-loader删除  改写成 MiniCssExtractPlugin.loader,
    运行 即可



  5.添加浏览器前缀
    依赖一个loader  叫做 postcss-loader  autoprefixer
    安装 npm i postcss-loader autoprefixer -D
    引入 需要使用postcss-loader  并且 应该先处理postcss-loader  再处理css-loader

          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader', // 把less => css


          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
    
    这时如果运行npm run dev   会报错  说是postcss plugin 没找到

    需要配置一个文件  叫做postcss.config.js   这个文件中
    module.exports = {
      plugins: [require('autoprefixer')({
        "browsers": [
          "defaults",
          "not ie < 11",
          "last 2 versions",
          "> 1%",
          "iOS 7",
          "last 3 iOS versions"
        ]
      })]
    }

    再运行  就ok了



    如果想压缩css 需要使用 optimize-css-assets-webpack-plugin 插件   这个插件可以压缩css  随之而来的是js不被压缩了



    1.npm i optimize-css-assets-webpack-plugin -D
    2. let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
      新增优化项optimization属性   
      optimization: { // 优化项
        minimizer: [new OptimizeCSSAssetsPlugin()],
      },
    npm run build  你发现css被压缩了   js没有被压缩

    3. let TerserJSPlugin = require('terser-webpack-plugin');
      在优化项中新增
        optimization: { // 优化项
          minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
        },

      npm  run build     此时css和js都被压缩
*/

let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css
let TerserJSPlugin = require('terser-webpack-plugin');
let webpack = require('webpack')
module.exports = {
  devServer: {
    port: 3000,
    progress: true,
    contentBase: './build',
    // open: true,
    compress: true
  },
  mode: 'production', // 打包模式  有两种1 默认是production   2是development开发环境
  entry: './src/index.js', //入口文件
  output: {
    filename: 'bundle.[hash:8].js', // 打包后的文件名
    path: path.resolve(__dirname, 'build'), // path是node的核心内置模块 不需要安装  这里的路径必须是一个绝对路径  __dirname 表示在当前目录下生成一个bundle.js
    // publicPath: 'http://www.zhufengpeixun.cn'
  },

  module: { // 模块 默认是从右向左  从下到上执行
    rules: [  //loader 
      // 规则 css-loader 解析@import这种语法  
      // style-loader 把css插入到head中
      // loader 的特点  希望单一    用法: 字符串只用一个loader 多个loader需要放在[]
      // loader的顺序 默认是从右向左执行的 
      // loader还可以写成对象的方式
      // {test:/\.css$/,use:{loader:'stype-loader',options:{}}}
      // { test: /\.css$/, use: ['style-loader', 'css-loader'] } 这种方式是可以的

      // singleton: true // 是否只使用一个style,会将页面上的style标签合成一个  

      {
        test: /\.css$/,
        use: [
          // {
          //   loader: 'style-loader',
          //   options: {
          //     insert: 'head',
          //     injectType: 'singletonStyleTag',
          //     // "styleTag" | "singletonStyleTag" | "lazyStyleTag" | "lazySingletonStyleTag" | "linkTag"
          //   }
          // },
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          // {
          //   loader: 'style-loader',
          //   options: {
          //     insert: 'head',
          //     injectType: 'singletonStyleTag',
          //     // "styleTag" | "singletonStyleTag" | "lazyStyleTag" | "lazySingletonStyleTag" | "linkTag"
          //   }
          // },
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader', // 把less => css
        ]
      },
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'eslint-loader'
      //   },
      //   enforce: 'pre' // 优先执行
      // },

      {
        test: require.resolve('jquery'),
        use: 'expose-loader?$'
      },
      {
        test: /.js$/,
        use: {
          loader: 'babel-loader',
          options: { // 用babel-loader 需要把es6-es5
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
              "@babel/plugin-transform-runtime"
            ]
          }
        },
        include: path.resolve(__dirname, 'src'), // 在src下去找
        exclude: /node_module/, // 忽略node_module
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          // loader: 'file-loader'
          loader: 'url-loader',
          options: {
            limit: 200 * 1024,
            outputPath: 'img/' // 将打包好的文件放到img目录下
          }
        }
      },
      {
        test: /\.html/,
        use: {
          loader: 'html-withimg-loader'
        }
      }
    ]
  },
  optimization: { // 优化项
    minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 以哪个作为模板文件
      filename: 'index.html', // 最终生成的html文件名称
      minify: {
        removeAttributeQuotes: true, //删除双引号
        collapseWhitespace: true,// 折叠空行
      },
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: 'css/index.css',
    }),
    new webpack.ProvidePlugin(
      { $: 'jquery' }
    )
  ],
}

```
## 转化es6
```js
/**
    css配置完成了  现在处理一下es6语法

      1. babel-loader @babel/core（核心模块）  @babel/preset-env 转换成标准模块
        npm i babel-loader @babel/core @babel/preset-env -D


      2.添加一个js规则
      {
        test: /.js$/,
        use: {
          loader: 'babel-loader',
          options: { // 用babel-loader 需要把es6-es5
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      } 


      运行npm run dev    发现函数变了
    


      3.如果js中有class这种语法      这是es7中的  需要另外使用 @babel/plugin-proposal-class-properties来处理
       npm i  @babel/plugin-proposal-class-properties -D





      4.写个装饰器  @log

        @log; // 写个装饰器
        class A {
          a = 1
        }


        let a = new A()

        console.log(a)

        发现不支持   提示需要安装一个插件  npm install @babel/plugin-proposal-decorators -D
*/

/**
    在此基础上  
    写一个
function* gen (parm) {
  yield 6
}
console.log(gen().next())
    发现报错了   已经es6转es5了  但是这种语法还是报错 

   1. 需要使用npm i @babel/plugin-transform-runtime @babel/runtime -D
   2. 在 "plugins": ["@babel/plugin-transform-runtime"] 新增
   3. npm run dev    发现包里很多警告   原因是它去node_module里边去找了
   新增两个webpack配置
    include: path.resolve(__dirname, 'src'), // 在src下去找
    exclude: /node_module/, // 忽略node_module



    4. babel默认不会转化示例上的方法


    比如使用 'aaa'.includes('a')
    打完包出来还是这个

    这就需要用到babel/polyfill  npm i @babel/polyfill

    在项目中  js里边导入
    require('@babel/polyfill')

    npm run dev

    发现 Array.prototype.includes 实现了一个





    使用eslint

    1.安装  npm i eslint eslint-loader -D
    2.
      {
        test: /\.js$/,
        use: {
          loader: 'eslint-loader'
        },
        enforce: 'pre' // 优先执行
      },


*/
```
## 全局变量的引入问题
```js

/***
    引入jquery
    1.npm i jquery -D
    2. 
      import $ from 'jquery'
      console.log('jquery', $)


      但是console.log('w-jquery', window.$)

    如果需要暴露给window   需要使用expose-loader  （暴露全局的loader   内联的loader）
    pre 前面执行的loader
    normal 普通loader
    expose-loader 内联loader
    postloader  后置loader

    1.安装  npm i expose-loader -D 

    2.引入

    import $ from 'expose-loader?$!jquery' // 表示导入$ 从jquery中   并且使用expose-loader暴露到全局window上  window上的名字也叫$
    console.log('jquery', $)
    console.log('w-jquery', window.$)

    或者不适用内联loader
    在webpack中添加规则  表示加载jquery的时候   使用暴露loader
      {
        test: require.resolve('jquery'),
        use: 'expose-loader?$' 
      },


    如果不想在全局上  而是在每个模块中  都注入  需要依赖webpack的一个插件
    
    1.let webpack = require('webpack')
    2.
    new webpack.ProvidePlugin(
      { $: 'jquery' }
    )
    3. 在js中直接打印$




    总结:


    1.expose-loader 暴露到window上
    2.providePlugin 给每个模块提供一个$
    3.引入  不打包
*/
```
## 图片处理
```js
/**
    1.想处理图片  需要引入 file-loader （作用 在内部生成一张图片  到build下  并且把图片的名字返回）
      npm i file-loader -D

    2.配置规则
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader'
        }
      }

    // 1.在js中创建图片引入
    // 2.在css中使用背景图
    import img from './i.jpg'

    let image = new Image()
    image.src = img
    document.body.appendChild(image)

    都是可以的
 
    在html中引入图片就不行了  这时候需要另一个插件
    npm i html-withimg-loader -D

    同样  在规则中配置
    {
      test: /\.html/,
      use: {
        loader: 'html-withimg-loader'
      }
    }



    把图片转换成base64


    更多的时候   不适用fule-loader   而是url-loader 同时指定当图片大小小于一直值得时候  就转换成base64

     npm i url-loader -D
    {
      test: /\.(png|jpg|gif)$/,
      use: {
        // loader: 'file-loader'
        loader: 'url-loader',
        options: {
          limit: 200 * 1024
        }
      }
    },
*/
```

## 打包分类

```js
/**
  现在打完包的资源都在build目录下   如果想分类文件夹

  图片:
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          // loader: 'file-loader'
          loader: 'url-loader',
          options: {
            limit: 200 * 1024,
            outputPath: 'img/' // 将打包好的文件放到img目录下
          }
        }
      },


  css:
    new MiniCssExtractPlugin({
      filename: 'css/index.css',
    }),



    如果说我们的资源  希望发布完之后  用cdn的路径

    新加一个publicPath
  output: {
    filename: 'bundle.[hash:8].js', // 打包后的文件名
    path: path.resolve(__dirname, 'build'), // path是node的核心内置模块 不需要安装  这里的路径必须是一个绝对路径  __dirname 表示在当前目录下生成一个bundle.js
    // publicPath: 'http://www.zhufengpeixun.cn'
  },
  
*/
```
## 打包多页应用
```js
/**
    目录结构

    1.src下    index1.js   index2.js
    2.npm init 
    3.npm i webpack webpack-cli

    4。webpack.config.js

    let path = require('path')
    module.exports = {
      mode: 'development',
      entry: {
        index1: './src/index1.js',
        index2: './src/index2.js'
      },
      output: {
        filename: '[name].[hash].js', // name表示 entry的key
        path: path.resolve(__dirname, 'dist')
      }
    }
    修改package.json   build:"webpack --config webpack.config.js"

    运行 npm run build


    5.打包到不同的html中
    根目录新建index.html
    插件 let HtmlWebpackPlugin = require('html-webpack-plugin')
    使用
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index1.html',
        chunks: ['index1'] // 作用是把enty中的key区分开
      }),
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index2.html',
        chunks: ['index2']
      }),
    ]
*/

```

## source-map
```js
/**
    安装依赖 
    npm i @babel/core @babel/preset-env babel-loader webapc-dev-server


    在js中故意写错代码
    class Log {
      constructor() {
        console.lo('牛逼')
      }
    }

    let log = new Log()

    执行npm run dev
    

    我们希望点击报错的时候  能看到他的源码 而不是打包后的代码  就需要做一些特殊的配置

  // 1.源码映射  会单独生成一个sourcemap文件  出错了会标识当前出错的列和行
  // devtool: 'source-map', //增加映射文件  可以帮我们调试源代码

  // 2.不会产生真正的map文件  但是可以显示行和列
  // devtool: "eval-source-map",

  // 3.不会产生列  但是是一个单独的映射文件  
  // devtool: 'cheap-module-source-map',

  // 4.不会产生文件  集合在打包后的文件中  不会产生列
  // devtool: 'cheap-module-eval-source-map',

*/
```
## watch
```js
/**
  webpack配置文件增加watch参数

  watch: true,

  watchOptions: { // 监控的选项
    poll: 1000, // 每秒 1000次
    aggregateTimeout: 500, // 防抖  500毫秒内 只触发一次
    ignored: /node_modules/  // 不需要监控的文件
  },
  
*/
```
## webpack插件

```js
/***
    插件

    1.cleanWebpackPlugin
    2.copyWebpackPlugin

    前两个需要安装
    3.bannerPlugin  内置的 版权声明插件

    
    清楚  再生成
    let { CleanWebpackPlugin } = require('clean-webpack-plugin');
     new CleanWebpackPlugin()




     拷贝文件
     let CopyWebpackPlugin = require('copy-webpack-plugin')
    new CopyWebpackPlugin([
      { from: './doc', to: '' }
    ])


    版权声明插件
    let webpack = require('webpack')
        new webpack.BannerPlugin('smd by 2019.9.14') // 会在打包后的文件头部插入这个版权声明
*/
```
## 跨域问题
```js
/**
    webpack-dev-server是使用exprss起了一个服务  

    可以自己写一个服务端  实现跨域功能



    1.新建一个server.js

    // express
    let express = require('express');
    let app = express()

    app.get('/api/user', (req, res) => {
      res.send({ "name": '小丑' })
    })
    app.listen(3000)
    

    运行  就启动了一个3000端口的接口


    2.在js中请求这个接口

    let xhr = new XMLHttpRequest()


    // 这时默认访问的是 localhost:8080 这个端口  
  // http-proxy
  xhr.open("GET", '/api/user', true)

  xhr.onload = function () {
    console.log(xhr.response)
  }
  xhr.send()


  在webpack中做如下处理
  devServer: { // 告诉webpack   访问/api 的时候  去http://localhost:3000上去找
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },




  但是这样呢  如果server。js的路径变了    webpack中也需要变


  为了方便  可以这样

  1.server.js
    let express = require('express');
    let app = express()

    app.get('/user', (req, res) => { // 把/api删了
      res.send({ "name": '小丑' })
    })
    app.listen(3000)


    2.webapck
    devServer: {
      proxy: {
        '/api': { // 重写的方式  把请求代理到express服务器上
          target: 'http://localhost:3000',
          pathRewrite: { "/api": '' }
        }
      }
    },
    -----------------------------------------------------------------



    如果前端只是单纯想模拟一些数据


    1.webpack
    devServer: {
      before (app) {
        app.get('/user', (req, res) => {
          res.send({ "name": '小丑' })
        })
      }
    },

    2.server.js
    就不需要了



    -----------------------------------------------------------------

    有服务端  不想用代理处理   在服务端中启动webpack 端口用服务端端口

    相当于在server.js中启动一个webpack
    let express = require('express');
    let app = express()


    let webpack = require('webpack')
    //中间件webpack-dev-middleware  webpack开发服务的中间件


    let middle = require('webpack-dev-middleware');


    let config = require('./webpack.config')

    let compiler = webpack(config)



    app.use(middle(compiler))

    app.get('/user', (req, res) => {
      res.send({ "name": '小丑' })
    })
    app.listen(3000)


    这样 也是可以的   一共三种方式
*/

```
## resolve属性
```js
/**
  webpack中   可配置resolve参数

  resolve: { // 解析 第三方包的模块     
    modules: [path.resolve('node_modules')], // 只在node_module中查找
    alias: { // 别名
      bootstrap: 'bootstrap/dist/css/bootstrap.css'
    },
    // mainFields: [ // 先去找package.json中的style 再找main
    //   'style', 'main'
    // ]

    // mainFiles:[]

    extensions: ['.js', '.css', '.json'], // 用于导入文件时不写参数
  },

*/
```

## 定义环境变量
```js
/**

  比如开发环境  和生产环境不一样

  需要使用插件  
  webpack.DefinePlugin


    new webpack.DefinePlugin({
      DEV: JSON.stringify('dev')
    })

  
  定义完之后  就可以去js中直接使用这个变量了
*/
```
## 区分不同环境
```js
/**
    区分环境变量 不太好 


    区分环境比较好


    建两个文件
    webpack.dev.js
    webpack.prod.js


    同时 webpack.config.js 换成webapck.base.js


    安装一个插件  webpack-mege



    prod.js
    let { smart } = require('webpack-merge')

    let base = require('./webapck.base.js')

    module.exports = smart(base, {
      mode: 'production'
    })


    dev.js
    let { smart } = require('webpack-merge')

    let base = require('./webpack.base.js')

    module.exports = smart(base, {
      mode: 'development'
    })



    打包  就可了
*/
```
## webpack优化-noParse
```js
/**
    1.初始化  npm init 
    npm i webpack webpack-cli html-webpack-plugin @babel/core babel-loader @babel/preset-env @babel/preset-react -D
    新建webpack.config.js
    新建src/index
    新建public/index.html 

    webpack.config.js
      let path = require('path')
      let HtmlWebpackPlugin = require('html-webpack-plugin')

      module.exports = {
        mode: "development",
        entry: './src/index.js',
        output: {
          filename: "bundle.js",
          path: path.resolve(__dirname, 'dist')
        },
        module: {
          noParse: /jquery/, // 不去解析jquery中的依赖 我自己测试的时候  好像并没有生效
          rules: [
            {
              test: /\.js$/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    '@babel/preset-env',
                    '@babel/preset-react'
                  ]
                }
              }
            }
          ]
        },
        plugins: [
          new HtmlWebpackPlugin({
            template: './public/index.html'
          })
        ]

      }
*/
```
## webpack-IgnorePlugin
```js
/**
    在默认情况下   也会在node_modules文件夹中找  如果需要排除  
    可以使用
    exclude:/node_modules/,
    于此相对的  还有一个include属性
    include:path.resolve('src'), // 与exclude相对   只在。。。中找
    rules: [
      {
        test: /\.js$/,
        exclude:/node_modules/, // 忽略node_modules中的文件
        include:path.resolve('src'), // 与exclude相对   只在。。。中找
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      }
    ]



    安装一个库  moment  时间格式化库

    sudo npm i moment

    引入  
    import moment from 'moment'

    moment.locale('zh-cn')
    let d = moment().endOf('day').fromNow()
    console.log(d)

    会发现打包出来的文件特别大  因为这个库引用 多种类型 而我们只用到了一个中文

    这时是可以进行优化的  并且需要使用到一个插件,这是webpack的一个内置插件

    let webpack = require('webpack')
    new webpack.IgnorePlugin(/\.\/locale/, /moment/)


    但是这样做 会把我们中文也忽略掉  
    需要在使用的地方手动把语言引入一下
    import 'moment/locale/zh-cn'
*/
```

## webpack-dllPlugin
```js
/**
    动态链接库
     sudo npm i react react-dom


     在js中引入

    import React from 'react'
    import { render } from 'react-dom'


    在webpack中新增
    devServer: {
      port: 3000,
      open: true,
      contentBase: './dist' // 打包后的文件放到这里s
    },
    
    js

    import React from 'react'
    import { render } from 'react-dom'
    render(<h1>喜欢睡觉</h1>, window.app)



    此时一样  启动服务之后   打包后的文件还是很大
    并不希望把react  和 react-dom打包到我们的打包文件中去


    这里就先做了一个测试

    1.新建test.js 写module.exports = '巴基大神'
    2.新建webpack.config.react.js
    

    let path = require('path')


    module.exports = {
      mode: 'development',
      entry: {
        test: './src/test.js',
      },
      output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: 'ab', // 把打包后的文件内容  付给一个值
        libraryTarget: 'commonjs' // 使用commonjs规范   打包完的值会变成exports["ab"]    同时还支持 umd commonjs var this...
      }
    }

    执行  npx webpack --config webpack.config.react.js



    测试写完了   继续把react和react-dom抽离出去

    let webpack = require('webpack') // 需要使用webpack内置插件DllPlugin
    module.exports = {
      mode: 'development',
      entry: {
        react: ['react', 'react-dom'],
      },
      output: {
        filename: '_dll_[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: '_dll_[name]', // 把打包后的文件内容  付给一个值
        // libraryTarget: 'commonjs' // 使用commonjs规范   打包完的值会变成exports["ab"] 
      },
      plugins: [
        new webpack.DllPlugin({
          name: '_dll_[name]',
          path: path.resolve(__dirname, 'dist', 'manifest.json')
        })
      ]
    }




    把manifest叫做任务清单

    在index.html中   引入
    <script src="/_dll_react.js"></script>   但是默认情况下   并不知道怎么找到这样的文件   
    需要在webpack配置文件中
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dist', 'manifest.json')
    }),


    再执行npm run dev

    发现打包的文件小多了
*/
```

## webpack-happypack

```js
/***
    webpack的多线程打包
    

    需要使用的模块交happypack


    如何配置?

let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let webpack = require('webpack')

let Happypack = require('happypack')

module.exports = {
  mode: "development",
  entry: './src/index.js',
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: 3000,
    open: true,
    contentBase: './dist' // 打包后的文件放到这里s
  },
  module: {
    noParse: /jquery/, // 不去解析jquery中的依赖
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/, // 忽略node_modules中的文件
      //   include: path.resolve('src'), // 与exclude相对   只在。。。中找
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: [
      //         '@babel/preset-env',
      //         '@babel/preset-react'
      //       ]
      //     }
      //   }
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 忽略node_modules中的文件
        include: path.resolve('src'), // 与exclude相对   只在。。。中找
        use: 'Happypack/loader?id=js'
      },
      { // css多线程打包
        test: /\.css$/,
        use: 'Happypack/loader?id=css'
      }
    ]
  },
  plugins: [
    new Happypack({
      id: 'css',
      use: ['style-loader', 'css-loader']
    }),
    new Happypack({
      id: 'js',
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      ]
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dist', 'manifest.json')
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.IgnorePlugin(/\.\/locale/, /moment/)
  ]

}
 * /
```

## 自带优化功能
```js
/**
    import 语法    在webpack的生产环境下   会自动去掉没用的代码
    比如在a文件中导出两个函数   在b文件中引入整个对象  然后只使用这个对象的一个函数   那么在打包的时候 只会将使用到的函数打包进去

    这个名词叫做tree-shaking

    还有一个功能  也是自带的  scope hosting  作用域提升

    比如声明多个值 然后做运算   webpack会自动省略这些声明  直接使用计算好的值
*/
```
## 抽离公用代码
```js
/**
  抽离公用代码配置

  optimization: {
    splitChunks: { //公共代码抽离 分割代码块 （多页的时候）
      cacheGroups: { // 缓存组
        common: { // 公共模块
          chunks: 'initial',
          minSize: 0, // 公用代码超过0个字节
          minChunks: 2, // 公用超过一次以上
        }，
        vendor: { // 像三方插件  jquery  可以单独抽离
          test: /node_modules/,
          priority: 1, // 权重  优先执行
          chunks: 'initial',
          minSize: 0, // 公用代码超过0个字节
          minChunks: 2, // 公用超过一次以上
        }
      }
    }
  },
*/
```
## 懒加载
```js
/**
    页面里有个按钮  点击按钮的时候  再去加载资源

    let button = document.createElement('button')

    button.innerHTML = '巴基'
    button.addEventListener('click', function () {
      import('./test.js').then(res => {
        console.log(res)
      })
      console.log('btn')
    })

    document.body.appendChild(button)
*/
```

## 热更新
```js
/**
    配置
  devServer: {
    hot: true, // 启动热更新
    port: 3000,
    open: true,
    contentBase: './dist' // 打包后的文件放到这里s
  },
      new webpack.NamedModulesPlugin(), // 打印更新的模块路径
    new webpack.HotModuleReplacementPlugin() // 热更新插件





    js

import str from './test'
console.log(str)
if (module.hot) {
  module.hot.accept('./test', () => {
    console.log('文件更新了')
    let aa = require('./test')
    console.log(aa)
  })
}
*/
```

