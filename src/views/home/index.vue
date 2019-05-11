<template>
  <div class="wrapper-full">
    <div class="box-image">
      <img src="/static/images/horse.png"/>
    </div>
    <div class="box-intro">
      <h1 class="title">Evan Liu</h1>
      <h2 class="subtitle">慎行，独思</h2>
      <ul class="column-list">
        <li><a href="https://github.com/EvanLiu2968" target="_blank">Github</a></li>
        <li><a href="https://evanliu2968.github.io/react-component" target="_blank">Components</a></li>
        <li><a href="/public/images/weixin.jpg" target="_blank">微信</a></li>
        <li><a href="https://www.zhihu.com/people/evanliu2968" target="_blank">知乎</a></li>
      </ul>
      <ul class="column-list">
        <li><router-link to="/photo">照片</router-link></li>
        <li><router-link to="/article">文章</router-link></li>
        <li><router-link to="/blog">博客</router-link></li>
      </ul>
    </div>
    <p class="copyright">
      <span>© 2019 EvanLiu, Inc.</span>
      <a rel="nofollow" target="_blank" href="http://www.miitbeian.gov.cn">粤ICP备18035883号</a>
    </p>
  </div>
</template>

<style lang="less">
/*
  首页、错误页及所有需要一屏展示的页面公用样式
 */

.image-fix {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 200px;
  height: auto;
}

.wrapper-full{
  position:absolute;
  margin:0;
  top:0;
  bottom:0;
  left:0;
  right:0;
  color:#333;
  background:#fff;
  .box-image{
    position: absolute;
    left: 0;
    right:0;
    text-align: center;
    top:10%;
    bottom:40%;
    z-index:0;
    >img{
      width:auto;
      max-width: 100%;
      height:100%;
    }
  }
  .box-intro{
    position: absolute;
    left: 0;
    right:0;
    top:60%;
    text-align: center;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    z-index:9;
  }
  .title{
    font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
    font-weight: 700;
    font-size: 30px;
    letter-spacing: 9px;
    text-transform: uppercase;
    margin: 12px 0;
    left: 4px;
  }
  .subtitle{
    font-family: "SimSun", "Hiragino Sans GB", "Microsoft YaHei","WenQuanYi Micro Hei", sans-serif;
    margin:10px auto 30px auto;
    font-weight:300;
    font-size: 20px;
    color:#999;
  }
  .column-list{
    text-align:center;
    >li{
      display:inline-block;
      padding: 0 20px;
      font-size: 14px;
      line-height: 2em;
      margin: 0;
      letter-spacing: 2px;
      >a{
        display:inline-block;
        color: #999;
        text-decoration: none;
        transition: color .2s ease;
        &:hover{
          color:#666;
        }
      }
    }
  }
  .error-404, .error-500{
    .box-intro{
      a{
        text-decoration: none;
      }
    }
  }
  .error-500{
    color: #324057;
    .box-image{
      p{
        margin-top: -60px;
      }
    }
  }
  .m-oldBrowserTip {
    margin-top: 90px;
    .oldBrowserTip-title {
      margin-bottom: 37px;
      text-align: center;
      line-height: 1;
      font-size: 26px;
      font-weight: 400;
    }
    .m-browserList {
      display: block;
      overflow: hidden;
      width: 466px;
      height: 101px;
      margin: auto auto 200px;
      background-image: url(/public/images/update-broswer.jpg);
      .item {
        float: left;
        margin-right: 38px;
        &.item-last {
          margin-right: 0;
        }
      }
      .w-browser {
        display: block;
        height: 101px;
        width: 85px;
      }
    }
  }
}

@media (max-width: 767px){
  .wrapper-full{
    .column-list{
      display:flex;
      >li{
        flex:1;
        padding:0;
      }
    }
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

.el-button{
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #c4c4c4;
  color: #1f2d3d;
  margin: 0;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  &.el-button--primary{
    color: #fff;
    background-color: #20a0ff;
    border-color: #20a0ff;
  }
  &:hover{
    opacity: 0.9
  }
}
</style>