import Vue from 'vue';
import App from './App';
import router from './router';
import Vuex from 'vuex';
import store from './vuex/store'; //状态管理
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
//import '../static/css/theme/index-#41d2de.css';       //自定义主题
import NProgress from './assets/js/nprogress'; // Progress 进度条
import './assets/js/nprogress.css';// 不从moduel引入是为方便修改样式
import './assets/css/common.css';
import './assets/js/util.js';
axios.defaults.headers.common['Accept'] = "application/json;charset=utf-8";
Vue.use(VueAxios,axios);
Vue.use(Vuex);
Vue.use(ElementUI);

//路由钩子
router.beforeEach((to, from, next) => {
	NProgress.start(); // 开启Progress
	if(to.matched.length===0){
		next({ path: '/404' });
	} else if(true){
		document.title = to.name?(to.name+' | 捕风捉影'):'捕风捉影';
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