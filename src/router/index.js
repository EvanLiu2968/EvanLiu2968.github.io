import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
let routes=[
		{
			path: '/',
			redirect: '/home'
		},
		{
			path: '/movie',
			redirect: '/movie/top250'
		}
	];
export default new Router({
	routes: routes
})
