import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui'

import router from './router'
import store from './store'

import '@/assets/css/libs/reset.css'
import '@/assets/css/index.scss'
import 'nprogress/nprogress.css'

import webInject from 'web-inject'
webInject.css('//at.alicdn.com/t/font_404468_w43yg5g622o.css')

import '@/libs/extend'
import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false })// NProgress configuration

// this.author = 'evanliu2968'
Object.defineProperties(Vue.prototype, {
  author: {
    value: 'evanliu2968'
  }
})

Vue.use(ElementUI, {
  size: 'small'
})

// 路由钩子
router.beforeEach((to, from, next) => {
  NProgress.start() // 开启Progress
  if (to.matched.length === 0) {
    next({ name: '404' })
  } else {
    document.title = to.meta ? (to.meta.title + ' | 捕风捉影') : '捕风捉影'
    next()
  }
})
router.afterEach(() => {
  NProgress.done() // 结束Progress
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
