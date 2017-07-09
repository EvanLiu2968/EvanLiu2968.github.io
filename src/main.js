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
import './assets/css/common.css';
import './assets/js/util.js';
axios.defaults.headers.common['Accept'] = "application/json;charset=utf-8";
Vue.use(VueAxios,axios);
Vue.use(Vuex);
Vue.use(ElementUI);

//1.刷新重加载 2.验证登录 3.404判断 4.重写标题及缓存当前路径以便刷新调用
router.beforeEach((to, from, next) => { //切换网页标题
	let userInfo=sessionStorage.getItem('userInfo');
	//console.log(userInfo);
	//将缓存的用户信息导入
	if(userInfo&&!store.state.login){
		store.commit('loginIn',JSON.parse(userInfo));
	}
	//没有加载路由则加载路由
	if(!store.state.routed){ //页面刷新时重新加载路由并跳转至之前页面
		//console.log('页面已刷新');
		let menu=store.getters.getRoute;
		router.addRoutes(menu);
		store.commit('toggleRouted');
		next({ path: sessionStorage.getItem('cache_path') });
	}else{ //正常路由跳转
		setTimeout(()=>{
			if(to.matched.length===0&&from.path!=='/'){
				next({ path: '/404' });
				//console.log('404!');
			} else if(to.path!=='/404'){
				//console.log(to);//这里有bug，通过addRoutes首次添加的路由（例如刷新）不能反馈到router.options和to,第二次就正常了
				//console.log(from);
				document.title = to.meta.title?to.meta.title:'捕风捉影';
				sessionStorage.setItem('cache_path',to.path);
				next();
				//console.log('页面已加载');
			}
		},0);
	}
});

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');