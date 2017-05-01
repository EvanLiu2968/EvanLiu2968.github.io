<template>
<div class="wrapper">
	<div class="header">
		<div class="logo">{{logoText}}</div>
		<div class="user-info">
			<el-dropdown trigger="hover" @command="handleCommand">
				<span class="el-dropdown-link">
					<img class="user-logo" src="../../../static/images/user.jpg">
					{{username}}
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="github">github</el-dropdown-item>
					<el-dropdown-item command="weibo">weibo</el-dropdown-item>
					<el-dropdown-item command="wechat">wechat</el-dropdown-item>
					<el-dropdown-item divided command="loginout">切换帐号</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
		<div class="pull-right">
			<el-menu :default-active="$route.path" class="el-menu-blue" unique-opened router mode="horizontal">
			<template v-for="(item,index) in menu">
				<el-submenu :index="index+''" v-if="!item.meta.leaf">
					<template slot="title"><i :class="item.meta.icon"></i>{{item.name}}</template>
					<el-menu-item v-for="child in item.children" :index="child.path">{{child.name}}</el-menu-item>
				</el-submenu>
				<el-menu-item v-else :index="item.children[0].path"><i :class="item.children[0].meta.icon"></i>{{item.children[0].name}}</el-menu-item>
			</template>
			</el-menu>
		</div>
		<el-dialog v-model="wechatBox" size="tiny">
			<img src="static/images/weixin.jpg" style="display:block;margin:0 auto;width:80%;">
			<p style="text-align:center">微信扫描二维码</p>
		</el-dialog>
	</div>
	<div class="content">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<template v-for="item in $route.matched">
					<el-breadcrumb-item v-if="item.name"><i v-if="item.meta.icon" :class="item.meta.icon"></i>{{ item.name }}</el-breadcrumb-item>
				</template>
			</el-breadcrumb>
		</div>
		<transition name="move" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</div>
</template>
<script>
	import Menu from '../../router/menu.js'
	export default {
		data() {
			return {
				menu:Menu,
				wechatBox:false,
				logoText: '这里有个宝藏，它空无一物，它价值千金',
				name: '游客'
			}
		},
		computed:{
			username(){
				let username = localStorage.getItem('ms_username');
				return username ? username : this.name;
			}
		},
		methods:{
			handleCommand(command) {
				if(command == 'loginout'){
					localStorage.removeItem('ms_username')
					this.$router.push('/login');
				}else if (command == 'github'){
					window.open("https://github.com/EvanLiu2968");
				}else if (command == 'weibo'){
					window.open("http://weibo.com/rockmist");
				}else if (command == 'wechat'){
					this.wechatBox=true;
				}
			}
		}
	}
</script>
<style >
	.header {
		position: relative;
		box-sizing: border-box;
		width: 100%;
		height: 60px;
		padding:0 30px;
		line-height: 60px;
		color: #fff;
		background-color: #20A0FF;
	}
	.header .logo{
		float: left;
		font-size:18px;
		text-align: center;
	}
	.user-info {
		float: right;
		color: #fff;
		padding:0 10px;
	}
	.user-info .user-logo{
		position: absolute;
		left:0;
		top:10px;
		width:40px;
		height:40px;
		border-radius: 50%;
		text-align: center;
	}
	.user-info .el-dropdown-link{
		position: relative;
		display: inline-block;
		padding-left: 50px;
		color: #fff;
		cursor: pointer;
	}
	/*菜单栏主题色*/
	.el-menu-blue {
		background-color: #20A0FF !important;
	}
	.user-info:hover,.el-menu-blue>.el-menu-item:hover,.el-menu-blue>.el-submenu>.el-submenu__title:hover{
		background-color: #58B7FF !important;
	}
	.el-menu-blue>.el-menu-item,.el-menu-blue>.el-submenu>.el-submenu__title,.el-menu-blue .el-submenu__icon-arrow{
		color:#fff !important;
		border-bottom:none !important;
	}
	.el-menu-blue>.el-menu-item.is-active,.el-menu-blue>.el-submenu.is-active>.el-submenu__title,.el-menu-blue>.el-submenu.is-active .el-submenu__icon-arrow{
		color:#04f56f !important;
	}
</style>
