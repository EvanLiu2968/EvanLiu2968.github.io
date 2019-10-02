<template>
  <div>
    <p class="tips-text">
      给我一杯咖啡的时间
    </p>
    <p class="tips-text">
      Talk is cheap, show me the code.
    </p>
  </div>
</template>
<style scoped>
</style>
<script>
export default {
  data: function() {
    return {
      musicNote: [
        {
          src: '',
          name: 'duo'
        }
      ]
    }
  },
  mounted: function() {
  },
  methods: {
    playMusicNote(i) {
      const audio = this.getMusicAudio(this.musicNote[i].src)
      audio.play()
    },
    getMusicAudio(src) {
      const audio = document.createElement('audio')
      return audio
    }
  }
}
</script>
<style scoped>
.tips-text{
  margin:30px;
  color:#606266;
}
</style>
