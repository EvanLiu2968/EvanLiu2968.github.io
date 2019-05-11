import Vue from 'vue';
import App from './App';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from './router';
import store from './store';

import NProgress from '@/libs/nprogress/nprogress'; // Progress 进度条
import '@/libs/nprogress/nprogress.css';// 不从moduel引入是为方便修改样式
import '@/assets/css/common.css';
import '@/libs/util';

// this.author = 'evanliu2968'
Object.defineProperties(Vue.prototype, {
  author: {
    value: 'evanliu2968'
  }
});

Vue.use(ElementUI);

//路由钩子
router.beforeEach((to, from, next) => {
  NProgress.start(); // 开启Progress
  if(to.matched.length === 0){
    next({ name: '404' });
  } else if(true){
    document.title = to.meta ? (to.meta.title + ' | 捕风捉影') : '捕风捉影';
    next();
  }
});
router.afterEach(() => {
  NProgress.done(); // 结束Progress
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');