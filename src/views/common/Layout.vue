<template>
  <MainContainer>
    <div slot="header">
      <el-dropdown class="pull-right" trigger="hover" @command="handleCommand">
        <span class="user-info">
          <img class="user-avatar" :src="userInfo.avatar">
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
      <el-menu :default-active="$route.path" class="inline" unique-opened router mode="horizontal">
        <template v-for="(item, i) in BlogRoutes">
          <template v-if="item.meta.isMenu">
            <el-submenu :key="i" :index="i+''" v-if="item.meta.isParent">
              <template slot="title">
                <i class="iconfont" :class="item.meta.icon"></i>{{ item.meta.title }}
              </template>
              <template v-for="(subItem, k) in item.children">
                <el-menu-item v-if="subItem.meta.isMenu" :index="subItem.path" :key="k">
                  {{ subItem.meta.title }}
                </el-menu-item>
              </template>
            </el-submenu>
            <el-menu-item v-else :key="i" :index="item.path">
              <i class="iconfont" :class="item.meta.icon"></i>{{ item.meta.title }}
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
    <transition name="move" mode="out-in">
      <slot v-if="isContainer"></slot>
      <router-view v-else></router-view>
    </transition>
  </MainContainer>
</template>
<script>
import MainContainer from '@/component/layout/Container'
import BlogRoutes from '@/router/blog'
export default {
  components: {
    MainContainer
  },
  props: {
    isContainer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      BlogRoutes,
      wechatBox: false
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
.inline {
  display: inline-block;
}
.user-info {
  position: relative;
  display: inline-block;
  padding-left: 50px;
  height: 50px;
  line-height: 50px;
  cursor: pointer;
}
.user-info .user-avatar{
  position: absolute;
  left:0;
  top:5px;
  width:40px;
  height:40px;
  border-radius: 50%;
  text-align: center;
}
.el-menu.el-menu--horizontal {
  border-bottom: none !important;
  background: transparent !important;
}
.el-menu--horizontal > .el-menu-item,
.el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 50px !important;
  line-height: 50px !important;
}
</style>
