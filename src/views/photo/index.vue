<template>
  <MainContainer>
    <div class="content">
      <div :class="['waterfall', `column-count-2`]">
        <div v-for="(item, i) in photos" :key="i" class="waterfall-item">
          <div class="img-box" :title="item.title">
            <el-image :src="item.img" lazy style="width: 100%">
              <div slot="placeholder" class="flex-center-row image-slot" style="min-height: 320px">
                <img class="loading" src="/public/images/loading.gif">
              </div>
              <div slot="error" class="flex-center-row image-slot" style="min-height: 320px;color: #c0c4cc;">
                加载失败
              </div>
            </el-image>
          </div>
          <p class="description">
            {{ item.desc }}
          </p>
        </div>
      </div>
    </div>
  </MainContainer>
</template>
<script>
import MainContainer from '@/components/layout/Container'
import { getCloverPhotos } from '@/api'
import './index.less'
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
  methods: {
  }
}
</script>
