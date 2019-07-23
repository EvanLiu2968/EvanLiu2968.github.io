<template>
  <MainContainer>
    <ul slot="header" class="header-category">
      <li v-for="(item, i) in category" :key="i" :class="{'active': active == item.category}" @click="() => toggleCategory(item)">
        {{ item.title }}
      </li>
    </ul>
    <div class="content" style="min-height:300px" v-loading="showLoading">
      <Markdown v-if="mdShow" :markdown="mdDetail"></Markdown>
      <ul v-else class="md-list">
        <li v-for="(item ,i) in mdList" :key="i">
          <router-link :to="`/article/${active}/${item.src}`">
            <h3 class="md-title">{{ item.title }}</h3>
            <div class="md-desc">
              <span class="md-time">{{ item.createTime }}</span>
              <span v-for="(keyword ,k) in item.keywords" :key="k" class="md-tag">{{ keyword }}</span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </MainContainer>
</template>
<script>
import MainContainer from '@/components/layout/Container'
import Markdown from '@/components/markdown/markdown'
import './index.less'
import { getCloverArticles, getCloverArticleDetail } from '@/api'
export default {
  components: {
    Markdown,
    MainContainer
  },
  data() {
    return {
      showLoading: false,
      mdShow: false,
      mdDetail: '',
      category: [],
      active: this.$route.params.category
    }
  },
  computed: {
    mdList() {
      const target = this.category.find(item => item.category === this.active)
      return target ? target.children : []
    }
  },
  watch: {
    '$route': {
      handler(val) {
        const { category, article } = val.params
        if (article) {
          this.mdShow = true
          this.getArticleDetail(category, article)
        } else {
          this.mdShow = false
          this.mdDetail = ''
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.getArticles()
  },
  methods: {
    toggleCategory(item) {
      this.active = item.category
      this.$router.replace(`/article/${item.category}`)
    },
    getArticles() {
      this.showLoading = true
      getCloverArticles().then(res => {
        this.category = res.category
        this.showLoading = false
      })
    },
    getArticleDetail(category, article) {
      this.showLoading = true
      getCloverArticleDetail(category, article).then(res => {
        this.mdDetail = res
        this.showLoading = false
      })
    }
  }
}
</script>
