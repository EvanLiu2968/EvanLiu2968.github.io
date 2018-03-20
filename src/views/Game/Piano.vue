<template>
<div>
  <p class="tips-text">给我一杯咖啡的时间</p>
  <p class="tips-text">Talk is cheap, show me the code.</p>
</div>
</template>
<style scoped>
</style>
<script>
  export default {
    data: function(){
      return {
        musicNote:[
          {
            src:'',
            name:'duo',
          }
        ]
      }
    },
    methods: {
      playMusicNote(i) {
        let audio = this.getMusicAudio(this.musicNote[i].src)
        audio.play()
      },
      getMusicAudio(src){
        let audio = document.createElement('audio')
        return audio
      }
    },
    mounted:function(){
    }
  }
</script>
<style scoped>
.tips-text{
  margin:30px;
  color:#606266;
}
</style>