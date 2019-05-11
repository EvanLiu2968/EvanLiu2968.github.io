<template>
  <div class="content">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="16">
        <div class="column">
          <h3 class="column-title">时光若刻</h3>
          <div class="article">
            <p>猫喜欢吃鱼，可猫不会游泳。</p>
            <p>鱼喜欢吃蚯蚓，可鱼又不能上岸。</p>
            <p>上帝给了你很多诱惑，却不让你轻易得到。</p>
            <p>但是总不能流血就喊痛，怕黑就开灯，想念就联系，我们最多也就是个有故事的人。</p>
            <p>所以，人生就像蒲公英，看似自由，却身不由己。</p>
            <p>得不到的永远在骚动。</p>
            <p class="text-right"><a class="link-site" href="http://www.evanliu2968.com.cn" target="_blank">个人云网站：www.evanliu2968.com.cn</a></p>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="8">
        <div class="lunar" style="background-image:url('static/images/lunar.png')">
          <div class="date-month">{{date.year+' / '+date.month}}</div>
          <div class="date-day">{{date.day}}</div>
          <div class="lunar-detail">
            <span>{{date.lunarYear}}</span>
            <span>{{date.lunarMonth}}</span>
            <span>{{date.lunarDay}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import lunar from "@/libs/lunar.js";
export default {
  data: function(){
    return {
      date:{
        lunarYear:'',
        lunarMonth:'',
        lunarDay:'',
        year:'',
        month:'',
        day:''
      }
    }
  },
  methods:{},
  beforeMount:function(){
    let date=new Date();
    this.date.lunarYear=lunar.getYear(date);
    this.date.lunarMonth=lunar.getMonth(date);
    this.date.lunarDay=lunar.getDay(date);
    this.date.year=date.format('yyyy');
    this.date.month=date.format('MM');
    this.date.day=date.format('dd');
  }
}
</script>

<style scoped>
.link-site{
  font-size: 16px;
  text-decoration: underline;
}
.lunar{
  position: relative;
  margin-left:auto;
  margin-right:auto;
  margin-bottom:10px;
  width:300px;
  height:300px;
  background-size:cover;
  padding:100px 20px 20px 20px;
  color:#63707d;
}
.date-month{
  position: absolute;
  top:40px;left:0;right:0;
  color:#fff;
  text-align:center;
  font-size:20px;
}
.date-day{
  color:#475669;
  text-align:center;
  font-size:100px;
  line-height:1.3;
  margin-bottom:10px;
}
.lunar-detail{
  font-family: "宋体";
  line-height:1.6;
  font-weight:100;
}
.column {
  position: relative;
  width: 100%;
  margin-bottom:20px;
}
.column-title{
  font-size:20px;
  line-height:20px;
  font-weight:normal;
  padding-left:8px;
  border-left:3px solid #20A0FF;
  margin-bottom:15px;
}
.article p {
  text-indent: 2em;
  color: #63707d;
  line-height: 1.5;
  font-size:14px;
  margin-bottom:10px;
}
</style>