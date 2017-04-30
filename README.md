
## 前言 ##
用vue2 + vue-router + vuex + axios + element UI搭建一个个人github主页，并对vue-cli的配置做了修改，dev的入口为src/index.html,build的入口为/index.html。
访问地址：[evanliu2968.github.io](https://evanliu2968.github.io)

## 目录结构介绍 ##

	|-- build                            // webpack配置文件
	|-- config                           // 项目打包路径
	|-- src                              // 源码目录
	|   |-- views                        // 页面
	|       |-- common                   // 公共组件
	|           |-- Header.vue           // 公共头部
	|           |-- Home.vue           	 // 公共路由入口
	|           |-- Sidebar.vue          // 公共左边栏
	|		|-- page                   	 // 主要路由页面
	|           |-- BaseCharts.vue       // 基础图表
	|           |-- BaseForm.vue         // 基础表单
	|           |-- BaseTable.vue        // 基础表格
	|           |-- Login.vue          	 // 登录
	|           |-- Markdown.vue         // markdown组件
	|           |-- MixCharts.vue        // 混合图表
	|           |-- Readme.vue           // 自述组件
	|           |-- Upload.vue           // 图片上传
	|           |-- VueEditor.vue        // 富文本编辑器
	|           |-- VueTable.vue         // vue表格组件
	|   |-- App.vue                      // app入口文件
	|   |-- main.js                      // 程序入口文件，加载各种公共组件
	|   |-- index.html                   // 开发入口html文件
	|-- .babelrc                         // ES6语法编译配置
	|-- .editorconfig                    // 代码编写规格
	|-- .gitignore                       // 忽略的文件
	|-- index.html                       // 编译后的入口html文件,同为github page的入口文件
	|-- package.json                     // 项目及工具的依赖配置文件
	|-- README.md                        // 说明


## 安装步骤 ##
	npm install													// 安装项目依赖，等待安装完成之后

## 本地开发 ##

	// 开启服务器，浏览器访问 http://localhost:8089
	npm run dev

## 构建生产 ##

	// 执行构建命令，生成的dist文件夹放在服务器下即可访问
	npm run build

## 组件使用说明与演示 ##

### element-ui ###
一套基于vue.js2.0的桌面组件库。访问地址：[element](http://element.eleme.io/#/zh-CN/component/layout)

