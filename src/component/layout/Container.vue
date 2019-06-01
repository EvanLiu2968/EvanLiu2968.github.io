<template>
  <div class="wrapper">
    <header class="header">
      <div class="container">
        <div class="header-left">
          <a href="/"><img class="logo" src="/public/images/logo-text.png"></a>
        </div>
        <div class="header-right">
          <slot name="header"></slot>
        </div>
      </div>
    </header>
    <div class="main">
      <div class="container">
        <slot></slot>
      </div>
    </div>
    <p class="copyright">
      <span>© 2019 EvanLiu, Inc.</span>
      <a rel="nofollow" target="_blank" href="http://www.miitbeian.gov.cn">粤ICP备18035883号</a>
    </p>
  </div>
</template>

<style lang="less">
/*
 * 容器主要样式
 */

.wrapper{
  position:relative;
  color:#333;
  background:#fff;
  min-height:100vh;
}
.main{
  padding:70px 0;
}
.content{
  position:relative;
}
.container{
  margin-left:auto;
  margin-right:auto;
  padding: 0 20px;
  width:1020px;
}
@media (max-width: 767px){
  .container{
    width:auto
  }
}

.copyright{
  position:absolute;
  bottom:0;
  left:0;
  right:0;
  padding:20px;
  color:#999;
  line-height:1.8;
  font-size:12px;
  text-align:center;
  a{
    margin-left:1em;
    color:#999;
    text-decoration: none;
    &:hover{
      color:#666;
    }
  }
}
.header{
  position:fixed;
  top:0;
  width:100%;
  height: 50px;
  background:#fff;
  box-shadow: 0 1px 3px rgba(26,26,26,.1);
  z-index:999;
  .logo{
    margin-top:10px;
    width:auto;
    height:30px;
  }
  .tag{
    margin-left:10px;
    padding:2px 4px;
    font-size:12px;
    color:#fff;
    border-radius:3px;
    background:#20a0ff;
  }
  .header-left{
    position:relative;
    float:left;
  }
  .header-right{
    float:right;
  }
}

.header-category{
  padding:10px 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  height: 30px;
  color: #999;
  >li{
    padding: 0 15px;
    font-size: 15px;
    line-height: 30px;
    color: #8590a6;
    cursor:pointer;
    &:last-child{
      padding-right:0;
    }
    &:hover, &.active{
      color:#444;
    }
  }
}

.flex-center-row{
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  &>.loading{
    width:auto !important;
    height:auto !important;
  }
}
</style>
