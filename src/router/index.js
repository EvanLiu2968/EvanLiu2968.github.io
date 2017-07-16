import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
let routes=[
		{
			path: '/',
			name: '首页',
			redirect: '/home'
		}
	];
export default new Router({
	routes: routes
})
