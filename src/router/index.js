import Vue from 'vue';
import Router from 'vue-router';
import Menu from './menu.js';

Vue.use(Router);
let routes=[
		{
			path: '/',
			redirect: '/login'
		},
		{
			path: '/login',
			meta:{title:'登录 | 捕风捉影'}, //title作为网页标题
			component: resolve => require(['../views/common/Login.vue'], resolve)
		},
		{
			path: '/404',
			meta:{title:'404 | 捕风捉影'},
			component: resolve => require(['../views/common/404.vue'], resolve)
		}
	];
routes=routes.concat(Menu);
export default new Router({
	routes: routes
})
