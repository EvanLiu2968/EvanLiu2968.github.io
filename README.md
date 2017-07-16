
## 前言 ##

github主页

已修改vue-cli的配置做了修改，dev的入口为*/src/index.html*,build的入口为*/index.html*。

> 访问地址：[https://evanliu2968.github.io](https://evanliu2968.github.io)
> 项目地址：[https://github.com/EvanLiu2968](https://github.com/EvanLiu2968)
> 邮箱：[evanLiu2968@gmail.com](mailto:evanLiu2968@gmail.com?subject=%E8%81%8A%E4%BA%BA%E7%94%9F%E3%80%81%E8%81%8A%E7%90%86%E6%83%B3)

## 目录结构 ##
```
	|-- build                            // webpack配置文件
	|-- config                           // 项目打包路径
	|-- src                              // 源码目录
	|   |-- assets                       // 资源
	|   |-- router                       // 路由
	|   |-- views                        // .vue组件
	|   |-- vuex                         // 状态管理
	|   |-- App.vue                      // app入口文件
	|   |-- main.js                      // 程序入口文件，加载各种公共组件
	|   |-- index.html                   // 开发入口html文件
	|-- .babelrc                         // ES6语法编译配置
	|-- .editorconfig                    // 代码编写规格
	|-- .gitignore                       // 忽略的文件
	|-- index.html                       // 编译后的入口html文件,同步github page
	|-- package.json                     // 项目及工具的依赖配置文件
	|-- README.md                        // 说明
```

## 开始 ##
```
npm install   // 安装项目依赖
npm run dev   //构建开发环境，浏览器访问 => http://localhost:2968
npm run build //构建生产环境，同步github
```
## 参考 ##
 - [vue2](https://cn.vuejs.org/v2/guide/)
 - [vue-router](https://router.vuejs.org/zh-cn/)
 - [vuex](https://vuex.vuejs.org/zh-cn/)
 - [axios](https://github.com/mzab)
 - [element-UI](http://element.eleme.io/#/zh-CN/component/layout)

