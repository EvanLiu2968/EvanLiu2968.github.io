<template>
  <MainContainer>
    <div class="content">
      <div :class="['waterfall', `column-count-2`]">
        <div v-for="(item, i) in photos" :key="i" class="waterfall-item">
          <div class="img-box" :title="item.title" @click="() => toggleCarousel(i)">
            <el-image :src="item.img" lazy style="width: 100%">
              <div slot="placeholder" class="flex-center-row image-slot" style="min-height: 320px">
                <img class="loading" src="/public/images/loading.gif">
              </div>
              <div slot="error" class="flex-center-row image-slot" style="min-height: 320px;color: #c0c4cc;line-height:1.8">
                ("▔□▔)&emsp;图片拒绝了你的查看
                <br>
              </div>
            </el-image>
          </div>
          <p class="description">
            {{ item.desc }}
          </p>
        </div>
      </div>
    </div>
    <el-image-viewer
      ref="imageViewer"
      v-if="showViewer"
      :on-close="closeViewer"
      :url-list="photos.map(v => v.img)"
    ></el-image-viewer>
  </MainContainer>
</template>
<script>
import MainContainer from '@/components/layout/Container'
import ElImageViewer from './image-viewer'

import { getCloverPhotos } from '@/api'
import './index.less'

export default {
  components: {
    ElImageViewer,
    MainContainer
  },
  data() {
    return {
      photos: [],
      showViewer: false
    }
  },
  mounted() {
    getCloverPhotos().then(res => {
      console.log(res)
      this.photos = res.photoList
      this.photoUrls = this.photos.map(v => v.img)
    })
  },
  methods: {
    toggleCarousel(i) {
      this.showViewer = true
      this.$nextTick(() => {
        this.$refs.imageViewer.setActiveIndex(i)
      })
    },
    closeViewer() {
      this.showViewer = false
    }
  }
}
</script>
