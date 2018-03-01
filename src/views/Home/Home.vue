<template>
  <div class="content">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="16">
        <div class="column">
          <h3 class="column-title">时光如刻</h3>
          <div class="article">
            <p>每个人都会经过这个阶段，见到一座山，就想知道山后面是什么。其实，可能翻过山后面，你会发现没什么特别。回望之下，可能会觉得这一边更好。</p>
            <p>但时间总是推着你往前走，人们遗忘，厌倦，变老，离去。</p>
            <p>所以我没有说再见就离开了，因为我知道，说完再见，还是得往前走，翻过另一座山。</p>
            <p>然后在某个不经意的瞬间，你会发现，原本是费尽心机想要忘记的事情真的就那么忘记了。</p>
            <p>从此只有眼前路，没有身后身。</p>
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
    <div class="column">
      <h3 class="column-title">相册</h3>
      <el-row :gutter="20">
      <template v-for="(item, index) in photoList">
        <el-col :xs="12" :sm="8" :md="6" class="ratio1_1 photo-box">
          <img :src="item.img" class="photo" @click="photoCardShow(index)">
          <div class="photo-mask">
            <p>{{item.desc}}</p>
            <p>{{item.title}}</p>
          </div>
        </el-col>
      </template>
      </el-row>
    </div>
    <el-dialog v-model="photoCard" size="full">
      <template>
        <el-carousel :interval="4000" type="card" :autoplay="false" height="500px" indicator-position="none" ref="photoCard" style="max-width:1000px;margin:0 auto">
          <el-carousel-item v-for="item in photoList">
            <div class="ratio1_1 photo-box" style="max-width:500px">
              <img :src="item.img" class="photo">
              <div class="photo-mask">
                <p>{{item.desc}}</p>
                <p>{{item.title}}</p>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import lunar from "../../assets/js/lunar.js";
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
        },
        photoCard:false,
        photoList:[
          {
            img:'static/images/photo/flower_01.jpg',
            desc:'生如茶花',
            title:'深圳'
          },
          {
            img:'static/images/photo/flower_02.jpg',
            desc:'故事的小黄花，从出生那年就飘着',
            title:'菊'
          },
          {
            img:'static/images/photo/flower_03.jpg',
            desc:'一只蜜蜂，两株茶树',
            title:'家门的茶花'
          },
          {
            img:'static/images/photo/huangshan_01.jpg',
            desc:'山与海交汇的地方',
            title:'西海大峡谷'
          },
          {
            img:'static/images/photo/huangshan_02.jpg',
            desc:'我是萌萌的芬里尔',
            title:'一只家在黄山的松鼠'
          },
          {
            img:'static/images/photo/huangshan_03.jpg',
            desc:'天青色等烟雨，而你在等我',
            title:'宏村'
          },
          {
            img:'static/images/photo/m_01.jpg',
            desc:'天空是蒙蒙的雾',
            title:'龙华'
          },
          {
            img:'static/images/photo/m_02.jpg',
            desc:'真实的幻境',
            title:'池塘倒影'
          },
          {
            img:'static/images/photo/m_03.jpg',
            desc:'看不见，路的方向',
            title:'天路'
          },
          {
            img:'static/images/photo/t_01.jpg',
            desc:'深巷中的勒杜鹃',
            title:'春沐巷7号'
          },
          {
            img:'static/images/photo/t_02.jpg',
            desc:'村子外，池塘边',
            title:'版画村'
          },
          {
            img:'static/images/photo/t_03.jpg',
            desc:'菩提本无树，明镜亦非台',
            title:'菩提树'
          },
          {
            img:'static/images/photo/w_01.jpg',
            desc:'依山傍水',
            title:'茶溪谷'
          },
          {
            img:'static/images/photo/w_02.jpg',
            desc:'你问我要去向何方，我指着大海的方向',
            title:'西冲'
          },
          {
            img:'static/images/photo/w_03.jpg',
            desc:'越过山丘',
            title:'杨梅坑'
          },
          {
            img:'static/images/photo/x_01.jpg',
            desc:'一半鲜花，一半顽石',
            title:'生活'
          },
          {
            img:'static/images/photo/x_02.jpg',
            desc:'大路小路任我行',
            title:'华侨城'
          },
          {
            img:'static/images/photo/x_03.jpg',
            desc:'沙滩与椰树',
            title:'鼓浪屿'
          },
          {
            img:'static/images/photo/xiangda_01.jpg',
            desc:'太阳从东方升起',
            title:'金翰林'
          },
          {
            img:'static/images/photo/xiangda_02.jpg',
            desc:'上课……下课',
            title:'兴湘草坪'
          },
          {
            img:'static/images/photo/xiangda_03.jpg',
            desc:'那年，毕业了',
            title:'三拱门'
          },
          {
            img:'static/images/photo/b_01.jpg',
            desc:'狗尾草与城堡',
            title:'童话'
          },
          {
            img:'static/images/photo/b_02.jpg',
            desc:'午时犹未识金乌',
            title:'迷雾'
          },
          {
            img:'static/images/photo/b_03.jpg',
            desc:'Dark Paradise',
            title:'后山树林'
          }
        ]
      }
    },
    methods:{
      photoCardShow:function(index){
        this.photoCard=true;
        this.$nextTick(()=>{
          this.$refs["photoCard"].setActiveItem(index);
        })
      }
    },
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
.ratio1_1:before {
  content: "";
  display: block;
  padding-top: 100%;
}
.photo-box {
  position:relative;
  margin-bottom:10px;
  overflow: hidden;
}
.photo-box .photo {
  position: absolute;
  top:0;
  width: 100%;
  height: 100%;
  cursor:pointer;
}
.photo-box .photo-mask {
  position: absolute;
  width: 100%;
  height: 40px;
  bottom:-40px;
  font-size:14px;
  line-height:20px;
  color: #fff;
  transition: all 100ms linear;
  background: rgba(0,0,0,.5);
}
.photo-box:hover .photo-mask{
  bottom: 0;
}
.photo-box:hover .photo-mask > p{
  padding:0 20px 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>