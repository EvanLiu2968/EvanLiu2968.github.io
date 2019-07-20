<template>
  <MainContainer>
    <div class="content">
      <div class="login-wrap">
        <div class="login-box">
          <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm" label-width="0px">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" placeholder="密码" v-model="loginForm.password" @keyup.enter.native="adminLogin('loginForm')"></el-input>
            </el-form-item>
            <div class="text-center">
              <el-button type="primary" @click="adminLogin" class="login-btn">
                登录
              </el-button>
              <el-button type="text" @click="visitorLogin" class="pull-left">
                我是游客
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </MainContainer>
</template>

<script>
import MainContainer from '@/components/layout/Container'

export default {
  components: {
    MainContainer
  },
  data: function() {
    return {
      scaleIn: false,
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted: function() {
  },
  methods: {
    adminLogin() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          const userInfo = JSON.parse(JSON.stringify(this.loginForm))
          if (userInfo.username === 'admin' && userInfo.password === '123456') {
            userInfo.role = 'admin'
            this.$store.commit('loginIn', userInfo)
            this.$router.push('/blog/home')
          } else {
            this.$message.error('用户名或密码错误！')
          }
        } else {
          return false
        }
      })
    },
    visitorLogin() {
      this.$router.push('/blog/home')
    }
  }
}
</script>

<style>
.login-wrap{
  position: relative;
  padding-top: 100px;
}
.login-box{
  margin: 0 auto;
  width:420px;
  padding:40px;
}
.login-box .el-input__inner {
  border: none;
  border-radius: 0;
  padding: 0;
  border-bottom: 1px solid #DCDFE6;
}
.login-box .el-input__inner:focus {
  border-bottom: 1px solid #20A0FF;
}
.login-btn{
  display:block;
  margin:0 0 10px 0;
  width:100%;
  height:36px;
}
</style>
