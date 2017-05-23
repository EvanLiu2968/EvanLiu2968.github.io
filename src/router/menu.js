import Header from '../views/common/Header.vue';

const Home=resolve => require(['../views/Home/Home.vue'], resolve);

const FiveChess=resolve => require(['../views/Game/FiveChess.vue'], resolve);

const Movie=resolve => require(['../views/Movie/Movie.vue'], resolve);
const Top250=resolve => require(['../views/Movie/Top250.vue'], resolve);
const Showing=resolve => require(['../views/Movie/Showing.vue'], resolve);
const Coming=resolve => require(['../views/Movie/Coming.vue'], resolve);

const Music=resolve => require(['../views/Music/Music.vue'], resolve);

const HistoryToday=resolve => require(['../views/Search/HistoryToday.vue'], resolve);
const Repositories=resolve => require(['../views/Search/Repositories.vue'], resolve);



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
			{ path: '/home', component: Home, name: '首页',meta:{title:"首页 | 捕风捉影",icon:'el-icon-star-on'}}
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
			{ path: '/fivechess', component: FiveChess, name: '五子棋',meta:{title:"五子棋 | 捕风捉影"}}
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
				component: Movie,
				name: '电影',
				meta:{title:"电影 | 捕风捉影"},
				children: [
					{ path: '/movie/top250', component: Top250, name: '豆瓣电影Top250',meta:{title:"豆瓣电影Top250 | 捕风捉影"}},
					{ path: '/movie/showing', component: Showing, name: '正在热映',meta:{title:"正在热映 | 捕风捉影"}},
					{ path: '/movie/coming', component: Coming, name: '即将上映',meta:{title:"即将上映 | 捕风捉影"}}
				]
			},
			{ path: '/music', component: Music, name: '音乐',meta:{title:"音乐 | 捕风捉影"}},
			{ path: '/historytoday', component: HistoryToday, name: '历史今天',meta:{title:"历史今天 | 捕风捉影"}},
			{ path: '/repositories', component: Repositories, name: '仓库',meta:{title:"仓库 | 捕风捉影"}}
		]
	}
];

export default menu;