import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
//import '../static/css/theme/index-#41d2de.css';       //自定义主题
import './assets/css/common.css';
import './assets/js/util.js';
axios.defaults.headers.common['Accept'] = "application/json;charset=utf-8";
Vue.use(VueAxios,axios);
Vue.use(ElementUI);

router.beforeEach((to, from, next) => { //切换网页标题
	if(to.matched.length===0){
		next({ path: '/404' })
	}else{
		document.title = to.meta.title;
		next()
	}
});

new Vue({
	router,
	render: h => h(App)
}).$mount('#app');