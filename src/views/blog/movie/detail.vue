<template>
  <div class="content">
    <div class="fix-container">
      <template v-if="errorMsgShow">
        <h1 class="text-gray text-center" style="padding:20px 0">
          您打开页面的姿势好像有点不同呢
        </h1>
      </template>
      <template v-else>
        <h1 class="movie-detail-title">
          {{ subject.title }}
          <span class="text-small text-gray">{{ subject.original_title }}（{{ subject.year }}）</span>
        </h1>
        <div class="movie-detail-item">
          <div class="movie-detail-cover">
            <img v-if="subject.images" :src="subject.images.large">
          </div>
          <div class="movie-detail-content">
            <div class="movie-row">
              导演：
              <a class="movie-tag" :href="director.alt" v-for="(director, k) in subject.directors" :key="k" target="_blank">{{ director.name }}</a>
            </div>
            <div class="movie-row">
              主演：
              <a class="movie-tag" :href="cast.alt" v-for="(cast, k) in subject.casts" :key="k" target="_blank">{{ cast.name }}</a>
            </div>
            <div class="movie-row">
              类型：
              <el-tag class="movie-genre" type="success" v-for="(genre, k) in subject.genres" :key="k">
                {{ genre }}
              </el-tag>
            </div>
            <div class="movie-row">
              制片国家/地区：
              <span class="movie-tag" v-if="subject.countries">{{ subject.countries.join('/') }}</span>
            </div>
            <div class="movie-row">
              又名：<span class="movie-tag" v-if="subject.aka">{{ subject.aka.join('/') }}</span>
            </div>
            <div class="movie-row" v-if="subject.rating">
              评分：<span style="color:#F7BA2A">{{ subject.rating.average }}</span><span class="movie-tag">/{{ subject.rating.max }}</span><span class="movie-tag">({{ subject.ratings_count }}人评分)</span>
            </div>

            <el-tooltip class="movie-player" effect="dark" content="前往 Bilibili 观看" placement="bottom">
              <a :href="bilibiliURL" target="_blank">
                <img src="/public/images/bench.gif" style="height:44px;">
                <img src="/public/images/player.jpg" style="height:44px;">
              </a>
            </el-tooltip>
          </div>
        </div>
        <div>
          <h3 class="movie-summary-title">
            {{ subject.title }}的剧情简介
          </h3>
          <p class="movie-summary">
            {{ subject.summary }}
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { getDoubanMovieDetail } from '@/api'

export default {
  data: function() {
    return {
      subject: {},
      errorMsgShow: false
    }
  },
  computed: {
    bilibiliURL() {
      const keyword = this.subject.title
      return 'http://search.bilibili.com/all?keyword=' + keyword + '&page=1&duration=4&tids_1=23'
    }
  },
  beforeMount: function() {
    const id = this.$route.params.id
    if (!id) {
      this.errorMsgShow = true
      return
    }
    getDoubanMovieDetail(id).then(res => {
      if (res.code == 5000) {
        this.errorMsgShow = true
      } else {
        this.subject = res
      }
    }).catch(e => {
      this.errorMsgShow = true
    })
  }
}
</script>
<style scoped>
  .movie-detail-title{
    font-size:20px;
  }
  .movie-summary-title{
    font-size:16px;
    color:#0fa752;
    margin-bottom:10px;
  }
  .movie-summary{
    text-indent: 2em;
    font-size:14px;
    line-height:1.8;
    color:#475669;
  }
  .movie-detail-item{
    position:relative;
    padding-left:200px;
  }
  .movie-detail-cover{
    position:absolute;
    top:20px;
    left:0;
  }
  .movie-detail-cover>img{
    display:block;
    width:200px;
    height:300px;
  }
  .movie-detail-content{
    position:relative;
    padding:20px;
    min-height:300px;
  }
  .movie-detail-content .movie-row{
    margin-bottom:6px;
  }
  .movie-player{
    display:inline-block;
    margin-top:10px;
    height:44px;
  }
</style>
