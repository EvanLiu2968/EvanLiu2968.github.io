<template>
<div class="wrapper">
	<div class="header">
		<div class="logo">{{logoText}}</div>
		<div class="user-info">
			<el-dropdown trigger="hover" @command="handleCommand">
				<span class="el-dropdown-link">
					<img class="user-logo" :src="userInfo.head">
					{{userInfo.username}}
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="github">github</el-dropdown-item>
					<el-dropdown-item command="weibo">weibo</el-dropdown-item>
					<el-dropdown-item command="wechat">wechat</el-dropdown-item>
					<el-dropdown-item command="facebook">facebook</el-dropdown-item>
					<el-dropdown-item v-if="login" divided command="loginout">注销</el-dropdown-item>
					<el-dropdown-item v-else divided command="login">登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
		<div class="pull-right">
			<el-menu :default-active="$route.path" class="el-menu-blue" unique-opened router mode="horizontal">
			<template v-for="(item,index) in menu">
				<template v-if="item.meta.isMenu">
					<el-submenu :index="index+''" v-if="item.meta.isParent">
						<template slot="title"><i :class="item.meta.icon"></i>{{item.meta.title}}</template>
						<template v-for="child in item.children">
							<el-menu-item v-if="child.meta.isMenu" :index="child.path">{{child.meta.title}}</el-menu-item>
						</template>
					</el-submenu>
					<el-menu-item v-else :index="item.children[0].path"><i :class="item.children[0].meta.icon"></i>{{item.children[0].meta.title}}</el-menu-item>
				</template>
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
					<el-breadcrumb-item v-if="item.meta.title"><i v-if="item.meta.icon" :class="item.meta.icon"></i>{{ item.meta.title }}</el-breadcrumb-item>
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
import tool from '../../assets/js/tool.js';
	export default {
		data() {
			return {
				defaultUserInfo:{
					username:'游客',
					role:'general',
					head:'static/images/user.jpg'
				},
				wechatBox:false,
				logoText: '这里有个宝藏，它空无一物，它价值千金',
				name: '游客'
			}
		},
		computed:{
			userInfo(){
				let userInfo = this.$store.getters.getUserInfo;
				userInfo=tool.extend(true,this.defaultUserInfo,userInfo);
				return userInfo;
			},
			login(){
				return this.$store.state.login;
			},
			menu(){
				return this.$store.getters.getMenu;
			}
		},
		methods:{
			handleCommand(command) {
				if(command == 'loginout'){
					this.$store.commit('loginOut');
				}else if (command == 'login'){
					this.$router.push({
						path:'/login'
					});
				}else if (command == 'github'){
					window.open("https://github.com/EvanLiu2968");
				}else if (command == 'weibo'){
					window.open("http://weibo.com/rockmist");
				}else if (command == 'wechat'){
					this.wechatBox=true;
				}else if (command == 'facebook'){
					window.open("https://www.facebook.com/evanliu2968");
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
