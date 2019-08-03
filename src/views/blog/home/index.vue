<template>
  <layout :is-container="true">
    <div class="column">
      <h3 class="column-title">
        时光若刻
      </h3>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="8">
          <el-radio-group v-model="dateType" size="mini" style="margin-bottom: 10px;">
            <el-radio-button label="today">今天</el-radio-button>
            <el-radio-button label="calendar">日历</el-radio-button>
          </el-radio-group>
          <div v-if="dateType == 'today'" class="lunar" style="background-image:url('/public/images/lunar.png')">
            <div class="date-month">
              {{ date.year+' / '+date.month }}
            </div>
            <div class="date-day">
              {{ date.day }}
            </div>
            <div class="lunar-detail">
              <span>{{ date.lunarYear }}</span>
              <span>{{ date.lunarMonth }}{{ date.lunarDay }}</span>
            </div>
          </div>
          <div v-else class="calendar-wrap">
            <calendar :first-day-of-week="7">
              <template
                slot="dateCell"
                slot-scope="{date, data}">
                <div class="text-center" :class="{ 'is-selected': data.isSelected }">
                  {{ date.format('dd') }}
                  <div class="text-lunar-day">
                    {{ getLunarDay(date, true) }}
                  </div>
                </div>
              </template>
              <div slot="calendar-footer" class="app-calendar__footer">
                驿马动，火迫金行，大利西方。
              </div>
            </calendar>
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
import lunar from '@/components/calendar/lunar'
import Layout from '@/views/common/Layout.vue'
import Calendar from '@/components/calendar/main'
import './calendar.scss'

export default {
  components: {
    Calendar,
    Layout
  },
  data: function() {
    return {
      dateType: 'today',
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
    const now = new Date()
    this.date.lunarYear = lunar.getYear(now)
    this.date.lunarMonth = lunar.getMonth(now)
    this.date.lunarDay = lunar.getDay(now)
    this.date.year = now.format('yyyy')
    this.date.month = now.format('MM')
    this.date.day = now.format('dd')
  },
  methods: {
    getLunarDay(date, showFestival) {
      return lunar.getDay(date, showFestival)
    }
  }
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
