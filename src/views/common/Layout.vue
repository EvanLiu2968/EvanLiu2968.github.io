<template>
<div class="wrapper">
  <main-header></main-header>
  <transition name="move" mode="out-in">
    <router-view></router-view>
  </transition>
</div>
</template>
<script>
import MainHeader from './header';
export default {
  components: {
    MainHeader
  },
  data() {
    return {}
  },
  methods:{
  }
}
</script>
<style scoped>

</style>
<style >
.wrapper{
  overflow: hidden;
}
.move-enter-active,.move-leave-active{
  transition: opacity .5s;
}
.move-enter,.move-leave{
  opacity: 0;
}
.crumbs{
  margin-bottom: 10px;
}
.pagination{
  margin: 20px 0;
  text-align: right;
}
.iconfont{
  vertical-align: baseline;
  margin-right: 10px;
}
.crumbs .iconfont,.crumbs [class^="el-icon"]{
  margin-right: 4px;
}
.box-tips{
  padding:20px 10px;
  margin-bottom: 20px;
  border-left: 5px solid #d2d6de;
  background-color: #f0f0f0;
}

/* 电影条目 */
.movie-list-title{
  padding-left:20px;
  color:#8492A6;
  font-size:16px;
}
.movie-list-title>i{
  margin-right:5px;
}
.movie-list{
  padding:20px;
}
.movie-item{
  display:block;
  position:relative;
  color:#99A9BF;
  padding-left: 70px;
  height:90px;
  margin-bottom:15px;
}
.movie-cover{
  position:absolute;
  top:0;
  left:0;
  width:60px;
  height:90px;
}
.movie-cover>img{
  display:block;
  height:100%;
  width:100%;
}
.movie-content{
  position:relative;
  padding:5px;
}
.movie-row{
  position:relative;
  font-size:14px;
  line-height:20px;
}
.movie-tag{
  display:inline-block;
  margin-right:15px;
}
.movie-genre{
  margin-left:10px;
  height:20px;
  line-height:18px;
}
</style>
