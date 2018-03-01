<template>
  <div class="login-wrap" id="particlesJS">
    <div class="login-box" v-bind:class="{'scaleIn': scaleIn }">
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm" label-width="0px">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="loginForm.password" @keyup.enter.native="submitForm('loginForm')"></el-input>
        </el-form-item>
        <div class="text-center">
          <el-button type="primary" @click="submitForm('loginForm')" class="login-btn">登录</el-button>
          <el-button type="default" @click="cancelLogin" class="login-btn">我是游客</el-button>
        </div>
        <p style="font-size:12px;line-height:30px;color:#999;">Tips : 管理员帐号登录。</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import particlesJS from '../../assets/js/particles.js'
  export default {
    data: function(){
      return {
        scaleIn:false,
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
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let userInfo=JSON.parse(JSON.stringify(this.loginForm));
            if(userInfo.username==="admin"&&userInfo.password==="123456"){
              userInfo.role='admin';
              this.$store.commit('loginIn',userInfo);
              this.$router.push('/home');
            } else{
              this.$message.error("用户名或密码错误！")
            }
          } else {
            return false;
          }
        });
      },
      cancelLogin(){
        this.$router.push('/home');
      }
    },
    mounted:function(){
      //https://github.com/VincentGarreau/particles.js
      particlesJS("particlesJS",{
        "particles": {
          "number": {
            "value": 100,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "shape": {
            "type": ["image"],
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "static/images/star.png",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.5,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 1,
              "opacity_min": 0.2,
              "sync": false
            }
          },
          "size": {
            "value": 5,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 1,
              "size_min": 0.3,
              "sync": true
            }
          },
          "line_linked": {
            "enable": false,
            "distance": 100,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 0.5
          },
          "move": {
            "enable": true,
            "speed": 1,
            "direction": "bottom-right",
            "random": true,
            "straight": true,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": true,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "grab"
            },
            "onclick": {
              "enable": false,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 120,
              "line_linked": {
                "opacity": 0.5
              }
            },
            "bubble": {
              "distance": 100,
              "size": 5,
              "duration": 2,
              "opacity": 0.8,
              "speed": 1
            },
            "repulse": {
              "distance": 400,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      });
      this.scaleIn=true;
    }
  }
</script>

<style scoped>
  .login-wrap{
    position: relative;
    width:100%;
    height:100%;
    background-color:#09090B;
  }
  @-webkit-keyframes scaleIn {
    from {
      opacity: 0;
      -webkit-transform: scale3d(0,0,0);
      transform: scale3d(0,0,0);
    }

    to {
      opacity: 1;
      -webkit-transform: scale3d(1,1,1);
      transform: scale3d(1,1,1);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      -webkit-transform: scale3d(0,0,0);
      transform: scale3d(0,0,0);
    }

    to {
      opacity: 1;
      -webkit-transform: scale3d(1,1,1);
      transform: scale3d(1,1,1);
    }
  }
  .login-box{
    position: absolute;
    left:50%;
    top:50%;
    width:300px;
    /* height:160px; */
    margin:-150px 0 0 -190px;
    padding:40px;
    border-radius: 5px;
    background-color: #fff;
    opacity: 0;
    -webkit-transform: scale3d(0,0,0);
      transform: scale3d(0,0,0);
  }
  .scaleIn{
    -webkit-animation-duration: 600ms;
    animation-duration: 600ms;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: scaleIn;
    animation-name: scaleIn;
  }
  .login-btn{
    display:block;
    margin:0 0 10px 0;
    width:100%;
    height:36px;
  }
</style>