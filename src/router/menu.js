import Home from '../views/common/Home.vue'

import Index from '../views/page/Index.vue'
import FiveChess from '../views/page/FiveChess.vue'
import HistoryToday from '../views/page/Historytoday.vue'
import Repositories from '../views/page/Repositories.vue'

let menu = [
	{
        path: '/',
        component:Home,
        name: '',
        meta:{
            leaf:true, //只有一个节点
            icon:'el-icon-star-on' //图标样式class
        },
        children: [
            { path: '/index', component: Index, name: '首页',meta:{title:"首页 | 捕风捉影",icon:'el-icon-star-on'}}
        ]
    },
    {
        path: '/',
        component:Home,
        name: '游戏',
        meta:{
            leaf:false,
            icon:'el-icon-menu'
        },
        children: [
            { path: '/fivechess', component: FiveChess, name: '五子棋',meta:{title:"基础表格 | 捕风捉影"}}
        ]
    },
    {
        path: '/',
        component:Home,
        name: '服务',
        meta:{
            leaf:false,
            icon:'el-icon-search'
        },
        children: [
            { path: '/historytoday', component: HistoryToday, name: '历史今天',meta:{title:"基础表单 | 捕风捉影"}}
        ]
    },
    {
        path: '/',
        component:Home,
        name: '',
        meta:{
            leaf:true,
            icon:'el-icon-setting'
        },
        children: [
            { path: '/repositories', component: Repositories, name: '仓库',meta:{title:"基础图表 | 捕风捉影",icon:'el-icon-setting'}}
        ]
    }
];

export default menu;