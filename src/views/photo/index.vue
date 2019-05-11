<template>
  <MainContainer>
    <div class="content">
      <div :class="['waterfall', `column-count-2`]">
        <div v-for="(item, i) in photos" :key="i" class="waterfall-item">
          <div class="img-box" :title="item.title">
            <el-image :src="item.img" lazy></el-image>
          </div>
          <p class="description">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </MainContainer>
</template>
<script>
import MainContainer from './Container.vue'
import { getCloverPhotos } from '@/api';
export default {
  components: {
    MainContainer
  },
  data() {
    return {
      photos: []
    }
  },
  mounted() {
    getCloverPhotos().then(res => {
      console.log(res)
      this.photos = res.photoList
    })
  },
  methods:{
  }
}
</script>
<style lang="less" scoped>
/*
 *图片瀑布流层，经测试ie10及以上支持，ie9未测试
 */
.waterfall{
  column-count:2;
  column-gap: 1em;
  &.column-count-2{
    column-count:2;
  }
  &.column-count-3{
    column-count:3;
  }
  &.column-count-4{
    column-count:4;
  }
  .waterfall-item{
    margin: 0 0 1em 0;
    -moz-page-break-inside: avoid;
    -webkit-column-break-inside: avoid;
    break-inside: avoid;
    cursor:pointer;
    font-size: 12px;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    &:hover{
      opacity:0.9;
    }
    .description{
      display: block;
      padding: 10px 16px;
      line-height: 1.35em;
      overflow: hidden;
      word-wrap: break-word;
    }
    .img-box{
      position:relative;
      img{
        width: 100%;
        height:auto;
      }
      .cover{
        position: absolute;
        left: 0;
        right:0;
        top: 0;
        bottom:0;
      }
    }
  }
}

@media (max-width: 767px){
  .waterfall{
    -moz-column-count:1; /* Firefox */
    -webkit-column-count:1; /* Safari 和 Chrome */
    column-count:1;
  }
}

</style>