<template>
  <layout :is-container="true">
    <div class="column">
      <h3 class="column-title">
        时光若刻
      </h3>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="8">
          <div class="lunar" style="background-image:url('/public/images/lunar.png')">
            <div class="date-month">
              {{ date.year+' / '+date.month }}
            </div>
            <div class="date-day">
              {{ date.day }}
            </div>
            <div class="lunar-detail">
              <span>{{ date.lunarYear }}</span>
              <span>{{ date.lunarMonth }}</span>
              <span>{{ date.lunarDay }}</span>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="16">
          <div class="article">
            <p>
              一生中总会遇到这样的时候，<br>
              你的内心已经兵荒马乱天翻地覆了，<br>
              可是在别人看来你只是比平时沉默了，<br>
              没人会觉得奇怪。<br>
              这种战争，<br>
              注定单枪匹马。<br><br>
              -----《痛并快乐着》<br>
            </p>
          </div>
        </el-col>
      </el-row>
    </div>
  </layout>
</template>

<script>
import lunar from '@/libs/lunar.js'
import Layout from '@/views/common/Layout.vue'

export default {
  components: {
    Layout
  },
  data: function() {
    return {
      date: {
        lunarYear: '',
        lunarMonth: '',
        lunarDay: '',
        year: '',
        month: '',
        day: ''
      }
    }
  },
  beforeMount: function() {
    const date = new Date()
    this.date.lunarYear = lunar.getYear(date)
    this.date.lunarMonth = lunar.getMonth(date)
    this.date.lunarDay = lunar.getDay(date)
    this.date.year = date.format('yyyy')
    this.date.month = date.format('MM')
    this.date.day = date.format('dd')
  },
  methods: {}
}
</script>

<style scoped>
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
  padding-left: 2em;
  font-family: "webfont";
  color: #63707d;
  line-height: 1.8;
  font-size:16px;
  margin-bottom:10px;
}
</style>
