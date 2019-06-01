<template>
  <div>
    <article class="markdown-body" v-html="innerHtml"></article>
  </div>
</template>
<script>
import { markdown } from './index'
import './index.css'

export default {
  props: {
    markdown: {
      type: String,
      default: ''
    }
  },
  computed: {
    innerHtml() {
      return markdown.render(this.markdown)
    }
  }
}
</script>
