<template>
  <div class="header">
    <div class="header-left">
      <div class="logo">
        {{ logoText }}
      </div>
    </div>
    <div class="header-right">
      <div class="user-info">
        <el-dropdown trigger="hover" @command="handleCommand">
          <span class="el-dropdown-link">
            <img class="user-logo" :src="userInfo.avatar">
            {{ userInfo.username }}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="github">
              github
            </el-dropdown-item>
            <el-dropdown-item command="wechat">
              wechat
            </el-dropdown-item>
            <el-dropdown-item command="zhihu">
              zhihu
            </el-dropdown-item>
            <el-dropdown-item command="facebook">
              facebook
            </el-dropdown-item>
            <el-dropdown-item v-if="login" divided command="loginout">
              注销
            </el-dropdown-item>
            <el-dropdown-item v-else divided command="login">
              登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-menu :default-active="$route.path" class="el-menu-blue pull-right" unique-opened router mode="horizontal">
        <template v-for="(item, i) in BlogRoutes">
          <template v-if="item.meta.isMenu">
            <el-submenu :key="i" :index="i+''" v-if="item.meta.isParent">
              <template slot="title">
                <i :class="item.meta.icon"></i>{{ item.meta.title }}
              </template>
              <template v-for="(subItem, k) in item.children">
                <el-menu-item v-if="subItem.meta.isMenu" :index="subItem.path" :key="k">
                  {{ subItem.meta.title }}
                </el-menu-item>
              </template>
            </el-submenu>
            <el-menu-item v-else :key="i" :index="item.path">
              <i :class="item.meta.icon"></i>{{ item.meta.title }}
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
    <el-dialog :visible.sync="wechatBox" title="微信二维码" width="400px">
      <img src="/public/images/weixin.jpg" style="display:block;margin:0 auto;width:200px;height: auto;">
      <p style="text-align:center">
        微信扫描二维码
      </p>
    </el-dialog>
  </div>
</template>
<script>
import BlogRoutes from '@/router/blog'
export default {
  data() {
    return {
      BlogRoutes,
      wechatBox: false,
      logoText: '这里有个宝藏，它空无一物，它价值千金',
      name: '游客'
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo
    },
    login() {
      return this.$store.state.login
    }
  },
  mounted() {
    // console.log(BlogRoutes)
  },
  methods: {
    handleCommand(command) {
      if (command == 'loginout') {
        this.$store.commit('loginOut')
      } else if (command == 'login') {
        this.$router.push({
          path: '/login'
        })
      } else if (command == 'github') {
        window.open('https://github.com/EvanLiu2968')
      } else if (command == 'zhihu') {
        window.open('https://www.zhihu.com/people/evanliu2968')
      } else if (command == 'wechat') {
        this.wechatBox = true
      } else if (command == 'facebook') {
        window.open('https://www.facebook.com/evanliu2968')
      }
    }
  }
}
</script>
<style >
.header {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  min-height: 60px;
  padding:0 20px;
  line-height: 60px;
  color: #fff;
  background-color: #20A0FF;
}
.header .header-left, .header .header-right{
  flex: 1;
}
.header .logo{
  display: inline-block;
  font-size:18px;
  text-align: left;
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
@media (max-width: 900px){
  .header .header-left{
    display: none;
  }
}
@media (max-width: 375px){
  .user-info{
    display: none;
  }
}

.el-menu-blue>.el-menu-item,
.el-menu-blue>.el-submenu>.el-submenu__title {
  padding: 0 10px;
}

/*菜单栏主题色*/
.el-menu-item i, .el-submenu__title i {
  color: #fff;
}
.el-menu-blue {
  background-color: #20A0FF !important;
}
.user-info:hover,
.el-menu-blue>.el-menu-item:hover,
.el-menu-blue>.el-submenu>.el-submenu__title:hover{
  background-color: #58B7FF !important;
}
.el-menu-blue>.el-menu-item,
.el-menu-blue>.el-submenu>.el-submenu__title,
.el-menu-blue .el-submenu__icon-arrow{
  color:#fff !important;
  border-bottom:none !important;
}
.el-menu-blue>.el-menu-item.is-active,
.el-menu-blue>.el-submenu.is-active>.el-submenu__title,
.el-menu-blue>.el-submenu.is-active .el-submenu__icon-arrow{
  color:#04f56f !important;
}
</style>
