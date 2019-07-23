<template>
  <MainContainer>
    <div slot="header">
      <el-dropdown class="pull-right" size="medium" trigger="hover" @command="handleCommand">
        <span class="user-info">
          <img class="user-avatar" :src="userinfo.avatar">
          {{ userinfo.username }}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="github">
            Github
          </el-dropdown-item>
          <el-dropdown-item command="facebook">
            Facebook
          </el-dropdown-item>
          <el-dropdown-item command="wechat">
            微信
          </el-dropdown-item>
          <el-dropdown-item command="zhihu">
            知乎
          </el-dropdown-item>
          <el-dropdown-item v-if="userinfo.username!='游客'" divided command="loginout">
            注销
          </el-dropdown-item>
          <el-dropdown-item v-else divided command="login">
            登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div v-if="isMobile" class="inline" style="padding: 0 10px;line-height: 60px;margin-right:10px">
        <svg
          :class="{'is-active':isActive}"
          class="hamburger"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          @click="toggleClick">
          <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z" />
        </svg>
      </div>
      <el-menu v-else :default-active="$route.path" class="inline" unique-opened router mode="horizontal">
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
import MainContainer from '@/components/layout/Container'
import BlogRoutes from '@/router/blog'
import { mapGetters } from 'vuex'
import { isMobile } from '@/libs/validate'

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
      isMobile: isMobile(),
      isActive: false,
      wechatBox: false
    }
  },
  computed: {
    ...mapGetters([
      'userinfo'
    ])
  },
  methods: {
    toggleClick() {
      this.isActive = !this.isActive
      this.$alert('暂不支持在手机上切换菜单', '提示')
    },
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
.hamburger {
  display: inline-block;
  cursor: pointer;
  width: 20px;
  height: 20px;
}
.hamburger.is-active {
  transform: rotate(180deg);
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
