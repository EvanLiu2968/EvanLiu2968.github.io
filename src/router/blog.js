import Layout from '@/views/common/Layout.vue'

export default [
  {
    path: '/blog/home',
    component: () => import('@/views/blog/home/index.vue'),
    name: 'blog-home',
    meta: {
      title: '首页',
      isMenu: true,
      isParent: false,
      icon: 'el-icon-app-colors'
    }
  },
  {
    path: '/blog/game',
    component: Layout,
    redirect: '/blog/game/music',
    name: 'game',
    meta: {
      title: '应用',
      isMenu: true,
      isParent: true,
      icon: 'el-icon-app-player'
    },
    children: [
      {
        path: '/blog/game/music',
        component: () => import('@/views/blog/music/index.vue'),
        name: 'music',
        meta: {
          title: '云音乐',
          isMenu: true,
          isParent: false
        }
      },
      {
        path: '/blog/game/movie',
        component: () => import('@/views/blog/movie/index.vue'),
        name: 'movie',
        meta: {
          title: '电影',
          isMenu: true,
          isParent: false
        }
      },
      {
        path: '/blog/game/movie/:id',
        component: () => import('@/views/blog/movie/detail.vue'),
        name: 'movie-detail',
        meta: {
          title: '电影详情',
          isMenu: false
        }
      },
      {
        path: '/blog/game/fivechess',
        component: () => import('@/views/blog/game/FiveChess.vue'),
        name: 'fivechess',
        meta: {
          title: '五子棋',
          isMenu: true,
          isParent: false
        }
      },
      {
        path: '/blog/game/tearcloth',
        component: () => import('@/views/blog/game/TearCloth.vue'),
        name: 'TearCloth',
        meta: {
          title: '来撕吧',
          isMenu: true,
          isParent: false
        }
      }
    ]
  },
  {
    path: '/blog/search',
    redirect: '/blog/search/repository',
    component: Layout,
    name: 'search',
    meta: {
      title: '小助手',
      isMenu: true,
      isParent: true,
      icon: 'el-icon-app-program'
    },
    children: [
      {
        path: '/blog/search/repository',
        component: () => import('@/views/blog/search/Repository.vue'),
        name: 'Repository',
        meta: {
          title: 'Github仓库',
          isMenu: true,
          isParent: false
        }
      },
      {
        path: '/blog/search/historytoday',
        component: () => import('@/views/blog/search/HistoryToday.vue'),
        name: 'HistoryToday',
        meta: {
          title: '历史今天',
          isMenu: true,
          isParent: false
        }
      },
      {
        path: '/blog/search/createID',
        component: () => import('@/views/blog/search/createID.vue'),
        name: 'createID',
        meta: {
          title: '身份证生成器',
          isMenu: true,
          isParent: false
        }
      }
    ]
  }
]
