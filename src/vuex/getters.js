//类似vue的计算属性computed
export const getUserInfo = state => {
	return state.userInfo
}
export const getRoute = state => {
	return routes;
}
export const getMenu = state => {
	return routes;
}
//路由及菜单配置
import Header from '../views/common/Header.vue';
const Login =resolve => require(['../views/common/Login.vue'], resolve);
const Home =resolve => require(['../views/Home/Home.vue'], resolve);
const FiveChess =resolve => require(['../views/Game/FiveChess.vue'], resolve);
const TearCloth =resolve => require(['../views/Game/TearCloth.vue'], resolve);
const Movie =resolve => require(['../views/Movie/Movie.vue'], resolve);
const MovieDetail =resolve => require(['../views/Movie/Detail.vue'], resolve);
const Music =resolve => require(['../views/Music/Music.vue'], resolve);
const HistoryToday =resolve => require(['../views/Search/HistoryToday.vue'], resolve);
const Repository =resolve => require(['../views/Search/Repository.vue'], resolve);
const NotFound =resolve => require(['../views/common/404.vue'], resolve);

let routes=[
	{
		path: '/login',
		name:'login',
		meta:{title:'登录',isMenu:false},
		component: Login
	},
	{
		path: '/',
		component:Header,
		meta:{
			title: '首页',
			isMenu:true,   //是否是菜单
			isParent:false, //是否是父级
			icon:'el-icon-star-on' //图标样式class
		},
		children: [
			{
				path: '/home',
				component: Home,
				name: 'home',
				meta:{title:"首页",isMenu:true,isParent:false,icon:'el-icon-star-on'}
			}
		]
	},
	{
		path: '/',
		component:Header,
		meta:{title:'娱乐',isMenu:true,isParent:true,icon:'el-icon-information'
		},
		children: [
			{
				path: '/fivechess',
				component: FiveChess,
				name: 'fivechess',
				meta:{title:"五子棋",isMenu:true,isParent:false}
			},
			{
				path: '/tearcloth',
				component: TearCloth,
				name: 'tearcloth',
				meta:{title:"勇敢的心",isMenu:true,isParent:false}
			}
		]
	},
	{
		path: '/',
		component:Header,
		meta:{title:'搜索',isMenu:true,isParent:true,icon:'el-icon-search'
		},
		children: [
			{
				path: '/movie',
				component: Movie,
				name: 'movie',
				meta:{title:"电影",isMenu:true,isParent:false}
			},
			{
				path: '/movie/detail/:id',
				component:MovieDetail,
				name: 'movie/detail',
				meta:{title:'电影详情',isMenu:false}
			},
			{
				path: '/music',
				component: Music,
				name: 'music',
				meta:{title:"音乐",isMenu:true,isParent:false}
			},
			{
				path: '/historytoday',
				component:HistoryToday,
				name: 'historytoday',
				meta:{title:"历史今天",isMenu:true,isParent:false}
			},
			{
				path: '/repository',
				component:Repository,
				name: 'repository',
				meta:{title:"仓库",isMenu:true,isParent:false}
			}
		]
	},
	{
		path: '/404',
		name:'404',
		component: NotFound,
		meta:{title:'404',isMenu:false}
	}
];