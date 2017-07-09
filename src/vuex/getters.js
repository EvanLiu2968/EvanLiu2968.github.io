//类似vue的计算属性computed
export const getUserInfo = state => {
	return state.userInfo
}
export const getRoute = state => {
	let route=[];
	if(state.userInfo.role==='admin'){
		route= routes.menus['general'].concat(routes.menus['admin'],routes.others['general'],routes.others['admin']);
	}else{
		route= routes.menus['general'].concat(routes.others['general']);
	}
	return route;
}
export const getMenu = state => {
	let route=[];
	if(state.userInfo.role==='admin'){
		route= routes.menus['general'].concat(routes.menus['admin']);
	}else{
		route= routes.menus['general'];
	}
	return route;
}
//路由及菜单配置
import Header from '../views/common/Header.vue';
let routes={
	//菜单路由
	menus:{
		//普通角色
		'general':[
					{
				path: '/',
				component:Header,
				name: '',
				meta:{
					leaf:true, //只有一个节点
					icon:'el-icon-star-on' //图标样式class
				},
				children: [
					{ path: '/home', component: resolve => require(['../views/Home/Home.vue'], resolve), name: '首页',meta:{title:"首页 | 捕风捉影",icon:'el-icon-star-on'}}
				]
			},
			{
				path: '/',
				component:Header,
				name: '娱乐',
				meta:{
					leaf:false,
					icon:'el-icon-information'
				},
				children: [
					{ path: '/fivechess', component: resolve => require(['../views/Game/FiveChess.vue'], resolve), name: '五子棋',meta:{title:"五子棋 | 捕风捉影"}}
				]
			},
			{
				path: '/',
				component:Header,
				name: '搜索',
				meta:{
					leaf:false,
					icon:'el-icon-search'
				},
				children: [
					{ 
						path: '/movie',
						component: resolve => require(['../views/Movie/Movie.vue'], resolve),
						name: '电影',
						meta:{title:"电影 | 捕风捉影"},
						children: [
							{ path: '/movie/top250', component: resolve => require(['../views/Movie/Top250.vue'], resolve), name: '豆瓣电影Top250',meta:{title:"豆瓣电影Top250 | 捕风捉影"}},
							{ path: '/movie/showing', component: resolve => require(['../views/Movie/Showing.vue'], resolve), name: '正在热映',meta:{title:"正在热映 | 捕风捉影"}},
							{ path: '/movie/coming', component: resolve => require(['../views/Movie/Coming.vue'], resolve), name: '即将上映',meta:{title:"即将上映 | 捕风捉影"}}
						]
					},
					{ path: '/music', component: resolve => require(['../views/Music/Music.vue'], resolve), name: '音乐',meta:{title:"音乐 | 捕风捉影"}},
					{ path: '/historytoday', component: resolve => require(['../views/Search/HistoryToday.vue'], resolve), name: '历史今天',meta:{title:"历史今天 | 捕风捉影"}},
					{ path: '/repositories', component: resolve => require(['../views/Search/Repositories.vue'], resolve), name: '仓库',meta:{title:"仓库 | 捕风捉影"}}
				]
			}
		],
		//系统管理员
		'admin':[]
	},
	//非菜单路由
	others:{
		'general':[
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
		],
		'admin':[]
	}
};