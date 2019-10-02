import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui'

import router from './router'
import store from './store'

import '@/styles/libs/reset.css'
import '@/styles/index.scss'

import '@/libs/extend'
import './permission'

Vue.use(ElementUI, {
  size: 'small'
})

import Components from '@/components'
Vue.use(Components, {})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
