module.exports = {
  title: '巴基大神',// 页面标题
  description: '巴基大神的学习文档 es6 css typescript',//说明
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }]
  ],
  base: '/blog.github.io/',
  themeConfig: {
    repo: 'https://github.com/songmengda',
    lastUpdated: '上次更新时间',
    nav: [ // 头部导航
      {
        text: '前端总结',
        items: [
          { text: 'ES6', link: '/es6/' }, //普通格式的导航
          { text: 'webpack', link: '/webpack/' }
        ]
      },
      {
        text: '个人兴趣',
        items: [
          { text: '历史事件', link: '/story/战争/01中越' }, //普通格式的导航
        ]
      },
      // { text: 'ES6', link: '/es6/' }, //普通格式的导航
      { text: 'MD入门', link: '/markdown/' },
      { text: 'css', link: '/css/' },
      {
        text: '文档4',
        items: [ //列表形式的导航
          { text: '子文档1', link: '/language/chinese' },
          { text: '子文档2', link: '/language/japanese' },
          {
            text: '子文档3', items: [ // 列表中再出现分组
              { text: '子子文档1', link: '/language/chinese' },
              { text: '子子文档2', link: '/language/japanese' },
            ]
          },
        ]
      },
    ],
    // navbar: false // 禁用导航栏 如果在md文件中查看https://vuepress.vuejs.org/zh/default-theme-config/#%E7%A6%81%E7%94%A8%E5%AF%BC%E8%88%AA%E6%A0%8F
    // sidebar: 'auto', // 自动生成侧栏
    // sidebar: [
    //   '/',
    //   '/css/',
    //   ['/js/', 'js目录'],
    //   {// 分组模式
    //     title: '组1',
    //     collapsable: true,
    //     path: '/es6/',
    //     children: [
    //       '/es6/',
    //       '/css/'
    //     ]
    //   },
    // ],
    sidebarDepth: 5, // 嵌套的标题链接 
    // displayAllHeaders: true, // 默认值：false  展开所有页面的标题链接
    // activeHeaderLinks: false, //默认情况下，当用户通过滚动查看页面的不同部分时，嵌套的标题链接和 URL 中的 Hash 值会实时更新，这个行为可以通过以下的配置来禁用
    sidebar: { //另一种多侧边拦
      '/css/': [
        '',
        'css1',
        'css2'
      ],
      '/es6/': [
        '',
        'es6-1.let&const',
        'es6-2.解构赋值',
        'es6-3.字符串',
        'es6-4.正则表达式',
        'es6-5.数值',
        'es6-6.函数',
        'es6-7.数组',
        'es6-8.对象',
        'es6-9.Symbol',
        'es6-10.Set和Map',
        'es6-11.Proxy',
        'es6-12.Reflect',
        'es6-13.Promise',
        'es6-14.Generator函数',
        'es6-15.async函数',
        'es6-16.Class语法'
      ],
      '/webpack/': [
        '',
        '01认识webpack',
        '02构建工具的发展历史',
        '03安装与使用入门',
        '04配置-Entry'
      ],
      '/story/战争/': [
        '01中越'
      ],
      '/markdown/': [
        ''
      ],
      '/about/': [
        '',
      ],
      // fallback
      '/': [
        '', /* / */
      ],

    },
    // locales: {
    //   // 作为特例，默认语言可以使用 '/' 作为其路径。
    //   '/': {
    //     lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
    //   },
    // }
  },
  markdown: {
    // lineNumbers: true
  }
}