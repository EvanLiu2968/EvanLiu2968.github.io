import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
//路由及菜单配置
import Header from '../views/common/Header.vue';
const Login =resolve => require(['../views/common/Login.vue'], resolve);
const Home =resolve => require(['../views/Home/Home.vue'], resolve);
const FiveChess =resolve => require(['../views/Game/FiveChess.vue'], resolve);
const Piano =resolve => require(['../views/Game/Piano.vue'], resolve);
const TearCloth =resolve => require(['../views/Game/TearCloth.vue'], resolve);
const Movie =resolve => require(['../views/Movie/Movie.vue'], resolve);
const MovieDetail =resolve => require(['../views/Movie/Detail.vue'], resolve);
const Music =resolve => require(['../views/Music/Music.vue'], resolve);
const HistoryToday =resolve => require(['../views/Search/HistoryToday.vue'], resolve);
const Repository =resolve => require(['../views/Search/Repository.vue'], resolve);
const NotFound =resolve => require(['../views/common/404.vue'], resolve);

let routes=[
  {
    path: '/',
    name: '',
    redirect: '/home',
    meta:{
      isMenu:false
    }
  },
  {
    path: '/login',
    name:'登录',
    component: Login,
    meta:{
      isMenu:false
    }
  },
  {
    path: '/',
    component:Header,
    meta:{
      isMenu:true,   //是否是菜单
      isParent:false, //是否是父级
      icon:'el-icon-star-on' //图标样式class
    },
    children: [
      {
        path: '/home',
        component: Home,
        name: '首页',
        meta:{
          isMenu:true,
          isParent:false,
          icon:'el-icon-star-on'
        }
      }
    ]
  },
  {
    path: '/',
    component:Header,
    name:'娱乐',
    meta:{
      isMenu:true,
      isParent:true,
      icon:'el-icon-menu'
    },
    children: [
      {
        path: '/fivechess',
        component: FiveChess,
        name: '五子棋',
        meta:{
          isMenu:true,
          isParent:false
        }
      },
      {
        path: '/piano',
        component: Piano,
        name: '钢琴',
        meta:{
          isMenu:true,
          isParent:false
        }
      },
      {
        path: '/tearcloth',
        component: TearCloth,
        name: '信仰之跃',
        meta:{
          isMenu:true,
          isParent:false
        }
      }
    ]
  },
  {
    path: '/',
    component:Header,
    name:'搜索',
    meta:{
      isMenu:true,
      isParent:true,
      icon:'el-icon-search'
    },
    children: [
      {
        path: '/movie',
        component: Movie,
        name: '电影',
        meta:{
          isMenu:true,
          isParent:false
        }
      },
      {
        path: '/movie/detail/:id',
        component:MovieDetail,
        name: '电影详情',
        meta:{
          isMenu:false
        }
      },
      {
        path: '/music',
        component: Music,
        name: '音乐',
        meta:{
          isMenu:true,
          isParent:false
        }
      },
      {
        path: '/historytoday',
        component:HistoryToday,
        name: '历史今天',
        meta:{
          isMenu:true,
          isParent:false
        }
      },
      {
        path: '/repository',
        component:Repository,
        name: '仓库',
        meta:{
          isMenu:true,
          isParent:false
        }
      }
    ]
  },
  {
    path: '/404',
    name:'404',
    component: NotFound,
    meta:{
      isMenu:false
    }
  }
];
export default new Router({
  routes: routes
})
