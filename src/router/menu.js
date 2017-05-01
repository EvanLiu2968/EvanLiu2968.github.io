import Header from '../views/common/Header.vue'

let menu = [
	{
		path: '/',
		component:Header,
		name: '',
		meta:{
			leaf:true, //只有一个节点
			icon:'el-icon-star-on' //图标样式class
		},
		children: [
			{ path: '/home', component: resolve => require(['../views/Page/Home.vue'], resolve), name: '首页',meta:{title:"首页 | 捕风捉影",icon:'el-icon-star-on'}}
		]
	},
	{
		path: '/',
		component:Header,
		name: '休闲',
		meta:{
			leaf:false,
			icon:'el-icon-information'
		},
		children: [
			{ path: '/fivechess', component: resolve => require(['../views/Page/FiveChess.vue'], resolve), name: '五子棋',meta:{title:"五子棋 | 捕风捉影"}}
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
			{ path: '/historytoday', component: resolve => require(['../views/Page/HistoryToday.vue'], resolve), name: '历史今天',meta:{title:"历史今天 | 捕风捉影"}},
			{ path: '/repositories', component: resolve => require(['../views/Page/Repositories.vue'], resolve), name: '仓库',meta:{title:"仓库 | 捕风捉影"}}
		]
	}
];

export default menu;