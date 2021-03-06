import Vue from 'vue'
import Router from 'vue-router'
import blogRoutes from './blog'
import RouterView from '@/App.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/home/index.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/common/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/photo',
    name: 'photo',
    component: () => import('../views/photo/index.vue'),
    meta: {
      title: '照片'
    }
  },
  {
    path: '/article',
    redirect: '/article/learning'
  },
  {
    path: '/article/:category',
    name: 'article',
    component: () => import('../views/article/index.vue'),
    meta: {
      title: '文章'
    }
  },
  {
    path: '/article/:category/:article',
    name: 'articleDetail',
    component: () => import('../views/article/index.vue'),
    meta: {
      title: '文章详情'
    }
  },
  {
    path: '/blog',
    name: 'blog',
    component: RouterView,
    redirect: '/blog/home',
    children: blogRoutes
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/common/404.vue'),
    meta: {
      title: '404'
    }
  }
]
export default new Router({
  routes
})
