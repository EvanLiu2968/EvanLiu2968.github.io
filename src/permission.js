import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false })// NProgress configuration

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
