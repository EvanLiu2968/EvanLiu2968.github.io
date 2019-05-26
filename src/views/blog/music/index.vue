<template>
  <div class="content">
    <div class="song-container">
      <div class="el-body">
        <audio ref="player" :src="cSong.src"></audio>
        <el-row :gutter="10">
          <el-col :span="12">
            <div class="song-cover-box">
              <div class="song-cover" data-rotate="0">
                <img :src="cSong.cover" class="cover-img">
                <span class="cover-bg"></span>
              </div>
              <div class="round-top" :class="{paused:player.paused}"></div>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <h3 class="song-title">
                {{ cSong.name }}
              </h3>
              <div class="song-info">
                歌手：{{ cSong.singer }}&emsp;&emsp;专辑：{{ cSong.album }}
              </div>
              <div class="lrc-wrap">
                <p class="lrc-p" v-for="(lrc, k) in player.cLrc" :data-lrc="lrc.time" :key="k">
                  {{ lrc.word }}
                </p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="n-songtb">
        <div class="u-title">
          <h3><span class="f-ff2">歌曲列表</span></h3>
          <span class="sub">{{ songList.length }}首歌</span>
        </div>
        <div class="j-flag">
          <table class="m-table">
            <thead>
              <tr>
                <th class="w1">
                  <div class="wp">
                    #
                  </div>
                </th>
                <th>
                  <div class="wp">
                    歌曲标题
                  </div>
                </th>
                <th class="w2">
                  <div class="wp">
                    时长
                  </div>
                </th>
                <th class="w3">
                  <div class="wp">
                    歌手
                  </div>
                </th>
                <th class="w4">
                  <div class="wp">
                    专辑
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="" v-for="(song, index) in songList" :key="index">
                <td class="left">
                  <div class="hd ">
                    <span class="ply" @click="toggleSong(index)">播放</span>
                    <span class="num">{{ '0'+(index+1) }}</span>
                  </div>
                </td>
                <td class="">
                  <div class="text">
                    {{ song.name }}
                  </div>
                </td>
                <td class="">
                  <div class="text">
                    {{ song.duration }}
                  </div>
                </td>
                <td class="">
                  <div class="text">
                    {{ song.singer }}
                  </div>
                </td>
                <td class="">
                  <div class="text">
                    {{ song.album }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="song-control">
      <div class="control-play">
        <span class="control-icon" @click="togglePrev">
          <i class="iconfont icon-bofangqishangyiqu"></i>
        </span>
        <span class="control-icon" @click="toggleMusicPlayer">
          <i class="iconfont icon-bofangqibofang" v-if="player.paused"></i>
          <i class="iconfont icon-bofangqizanting" v-else></i>
        </span>
        <span class="control-icon" @click="toggleNext">
          <i class="iconfont icon-bofangqishangyiqu1"></i>
        </span>
      </div>
      <div class="control-progress">
        <span class="time-start">{{ player.cTime }}</span>
        <span class="time-end">{{ cSong.duration }}</span>
        <div class="bar-bg" @click="toggleProgress">
          <div class="bar-current" :style="{width:player.cProcess}"></div>
        </div>
      </div>
      <div class="control-volumn">
        <span class="volumn-icon" @click="toggleMuted">
          <i class="iconfont icon-bofangqi_shengyin" v-if="!player.muted"></i>
          <i class="iconfont icon-yinliangjingyin" v-else></i>
        </span>
        <div class="bar-bg" @click="toggleVolumn">
          <div class="bar-current" :style="{width:player.cVolumn}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/libs/request'

const jQuery = window.$
let MusicPlayer = null; let progressTimer = 0; let rotateTimer = 0

export default {
  data: function() {
    return {
      songList: [
        {
          id: '1',
          name: '莉莉安',
          singer: '宋冬野',
          album: '安和桥北',
          cover: '/public/music/lilian.jpg',
          src: '/public/music/宋冬野 - 莉莉安.mp3',
          lrc: '/public/music/宋冬野 - 莉莉安.lrc',
          duration: '04:13'
        },
        {
          id: '2',
          name: '山丘',
          singer: '李宗盛',
          album: '山丘',
          cover: '/public/images/mao.jpg',
          src: '/public/music/李宗盛 - 山丘.mp3',
          lrc: '/public/music/李宗盛 - 山丘.lrc',
          duration: '05:49'
        },
        {
          id: '3',
          name: '煎熬',
          singer: '李佳薇',
          album: '感谢爱人',
          cover: '/public/music/jianao.jpg',
          src: '/public/music/李佳薇 - 煎熬.mp3',
          lrc: '/public/music/李佳薇 - 煎熬.lrc',
          duration: '04:22'
        },
        {
          id: '4',
          name: '漂洋过海来看你',
          singer: '刘明湘',
          album: '我不要再比了',
          cover: '/public/music/piao.jpg',
          src: '/public/music/刘明湘 - 漂洋过海来看你.mp3',
          lrc: '/public/music/刘明湘 - 漂洋过海来看你.lrc',
          duration: '03:17'
        },
        {
          id: '5',
          name: '把悲伤留给自己',
          singer: '陈升',
          album: '私奔',
          cover: '/public/music/lonely.jpg',
          src: '/public/music/陈升 - 把悲伤留给自己.mp3',
          lrc: '/public/music/陈升 - 把悲伤留给自己.lrc',
          duration: '04:38'
        },
        {
          id: '6',
          name: '青花瓷',
          singer: '周杰伦',
          album: '我很忙',
          cover: '/public/music/jay.jpg',
          src: '/public/music/青花瓷 - 周杰伦.mp3',
          lrc: '/public/music/青花瓷 - 周杰伦.lrc',
          duration: '03:59'
        },
        {
          id: '7',
          name: '以父之名',
          singer: '周杰伦',
          album: '叶惠美',
          cover: '/public/music/jay.jpg',
          src: '/public/music/周杰伦 - 以父之名.m4a',
          lrc: '/public/music/周杰伦 - 以父之名.lrc',
          duration: '05:42'
        },
        {
          id: '8',
          name: '半岛铁盒',
          singer: '周杰伦',
          album: '八度空间',
          cover: '/public/music/jay.jpg',
          src: '/public/music/周杰伦 - 半岛铁盒.mp3',
          lrc: '/public/music/周杰伦 - 半岛铁盒.lrc',
          duration: '05:17'
        }
      ],
      player: {
        paused: true,
        muted: false,
        cTime: '00:00',
        cProcess: '0%',
        cVolumn: '100%',
        cLrc: []
      },
      index: 0,
      cSong: {}
    }
  },
  computed: {
  },
  mounted: function() {
    MusicPlayer = this.$refs.player
    MusicPlayer.addEventListener('canplaythrough', () => {
      try {
        MusicPlayer.play()
        this.player.paused = false
      } catch (e) {
        console.log(e)
      }
      this.updateState()
    }, false)
    MusicPlayer.addEventListener('ended', () => {
      this.toggleNext()
    }, false)
    this.toggleSong(this.index)
  },
  beforeDestroy: function() {
    MusicPlayer.pause()
    MusicPlayer = null
  },
  methods: {
    getLrc: function() {
      axios.get(this.cSong.lrc).then((res) => {
        const lrcArr = []
        const arr = res.split('[')
        arr.splice(0, 1)
        arr.forEach(function(v) {
          const s = v.split(']')
          lrcArr.push({
            time: s[0],
            word: s[1]
          })
        })
        this.player.cLrc = lrcArr
      })
    },
    toggleMusicPlayer: function() {
      if (MusicPlayer.paused) {
        MusicPlayer.play()
        this.player.paused = false
        this.updateState()
      } else {
        MusicPlayer.pause()
        this.player.paused = true
      }
    },
    togglePrev: function() {
      const index = this.index - 1
      if (index > -1) {
        this.toggleSong(index)
      } else {
        this.toggleSong(this.songList.length - 1)
      }
    },
    toggleNext: function() {
      const index = this.index + 1
      if (index < this.songList.length) {
        this.toggleSong(index)
      } else {
        this.toggleSong(0)
      }
    },
    // 歌词滚动，封面旋转，进度条及进度时间更新
    updateState: function() {
      const _this = this
      clearTimeout(progressTimer)
      clearTimeout(rotateTimer)
      let index = 0; const lrc = _this.player.cLrc
      const $lrcWrap = jQuery('.lrc-wrap'); const h = $lrcWrap.height()
      const $cover = jQuery('.song-cover')
      // 歌词滚动
      function scrollLrc() {
        const time = _this.player.cTime
        for (let i = 0, len = lrc.length; i < len; i++) {
          if (time > lrc[i].time && (i === (len - 1) || time < lrc[i + 1].time)) {
            if (index === i) { // 不需要滚动则直接return
              return
            } else {
              index = i // 获取需要滚动歌词行的index
              break
            }
          }
        }
        const $lrc = jQuery('.lrc-p').eq(index)
        $lrc.addClass('active').siblings('.active').removeClass('active')
        const top = $lrc.height() * index
        if (top < (h / 2)) {
          $lrcWrap.animate({
            'scrollTop': 0
          })
        } else {
          $lrcWrap.animate({
            'scrollTop': top - h / 2
          })
        }
      }
      function getTwo(n) {
        return n < 10 ? '0' + n : n
      }
      function timeFormat(t) {
        let s = ~~t
        const m = ~~(s / 60)
        s = s - m * 60
        return getTwo(m) + ':' + getTwo(s)
      }
      _this.cSong.duration = timeFormat(MusicPlayer.duration)
      const update = function() {
        if (!MusicPlayer.paused) {
          _this.player.cTime = timeFormat(MusicPlayer.currentTime)
          _this.player.cProcess = (MusicPlayer.currentTime / MusicPlayer.duration).toFixed(4) * 100 + '%'
          scrollLrc()
          progressTimer = setTimeout(update, 300)
        }
      }
      update()
      // 旋转封面
      const rotateCover = function() {
        if (!MusicPlayer.paused) {
          let rotate = $cover.data('rotate')
          rotate = ~~rotate + 1
          if (rotate === 360) { rotate = 0 }
          $cover.css({
            'webkitTransform': 'rotate3d(0, 0, 1, ' + rotate + 'deg)',
            'transform': 'rotate3d(0, 0, 1, ' + rotate + 'deg)'
          }).data('rotate', rotate)
          rotateTimer = setTimeout(rotateCover, 50)
        }
      }
      rotateCover()
    },
    toggleSong: function(index) {
      this.index = index
      this.cSong = this.songList[this.index]
      MusicPlayer.src = this.cSong.src
      MusicPlayer.load()
      this.initState()
    },
    toggleProgress: function(e) {
      const x = e.offsetX; const w = document.querySelector('.control-progress>.bar-bg').offsetWidth
      const rate = (x / w).toFixed(4)
      MusicPlayer.currentTime = MusicPlayer.duration * rate
      this.player.cProcess = rate * 100 + '%'
    },
    toggleVolumn: function(e) {
      const x = e.offsetX; const w = document.querySelector('.control-volumn>.bar-bg').offsetWidth
      const rate = (x / w).toFixed(4)
      MusicPlayer.volume = rate
      this.player.cVolumn = rate * 100 + '%'
      this.player.muted = MusicPlayer.muted = false
    },
    toggleMuted: function() {
      if (MusicPlayer.muted) {
        this.player.muted = MusicPlayer.muted = false
        document.querySelector('.control-volumn>.bar-bg>.bar-current').style.width = MusicPlayer.volume * 100 + '%'
      } else {
        this.player.muted = MusicPlayer.muted = true
        document.querySelector('.control-volumn>.bar-bg>.bar-current').style.width = '0%'
      }
    },
    initState: function() {
      this.player.paused = true
      this.player.cTime = '00:00'
      this.player.cProcess = '0%'
      this.getLrc()
    }
  }
}
</script>
<style scoped>
.song-container{
  display:block;
  margin:20px auto;
  width:900px;
}
.song-title{
  font-size:20px;
  margin-bottom:10px;
}
.song-info{
  font-size:12px;
  color:#8492A6;
  margin-bottom:20px;
}
.song-cover-box{
  position:relative;
  width:300px;
  margin:20px auto;
}
.song-cover{
  position:relative;
  display:inline-block;
  width:300px;
  height:300px;
}
.song-cover .cover-img{
  position:absolute;
  top:53px;
  left:52px;
  width:195px;
  height:195px;
}
.song-cover .cover-bg{
  display:inline-block;
  position:relative;
  width:300px;
  height:300px;
  background-image: url('/public/music/coverall.png');
  background-size: cover;
}
.round-top{
  display:inline-block;
  position:absolute;
  top:-40px;
  left:140px;
  width:60px;
  height:90px;
  background-image: url('/public/music/round-top.png');
  background-repeat: no-repeat;
  background-size: 100%;
}
.round-top.paused{
  -webkit-transform-origin: top left;
  transform-origin: top left;
  -webkit-transform: rotate3d(0, 0, 1, -40deg);
    transform: rotate3d(0, 0, 1, -40deg);
}
.song-control{
  position:fixed;
  display: -webkit-flex; /* Safari */
  display: flex;
  bottom:0;
  left:0;
  right:0;
  padding:6px 30px 6px 140px;
  border-top:1px solid #eee;
  background:#F9FAFC;
}
.control-play{
  position:absolute;
  display:inline-block;
  left:30px;
}
.control-icon{
  display:inline-block;
  margin-right:10px;
  width:24px;
  height:24px;
  background:#ff4949;
  color:#fff;
  text-align:center;

  border-radius:50%;
  cursor:pointer;
}
.control-icon>.iconfont{
  font-size:12px;
  line-height:24px;
  margin:0;
}
.el-icon-pause{
  display:inline-block;
  height:0.8em;
  width:0.4em;
  border-left:2px solid #fff;
  border-right:2px solid #fff;
}
.control-progress{
  position:relative;
  flex:4;
  height:24px;
  padding:0 60px;
}
.control-progress .time-start{
  position:absolute;
  left:15px;
  font-size:12px;
  line-height:24px;
}
.control-progress .time-end{
  position:absolute;
  right:15px;
  font-size:12px;
  line-height:24px;
}
.song-control .bar-bg{
  position:relative;
  margin-top:10px;
  height:4px;
  border-radius:2px;
  background:#99A9BF;
  overflow: hidden;
  cursor:pointer;
}
.song-control .bar-current{
  display:block;
  position:absolute;
  left:0;
  height:4px;
  width:0%;
  background:#ff4949;
}
.control-volumn{
  position:relative;
  flex:1;
  padding-left:30px;
}
.control-volumn .volumn-icon{
  position:absolute;
  display:inline-block;
  left:0;top:4px;
  color:#475669;
  cursor:pointer;
}
.control-volumn .volumn-icon>.iconfont{
  margin:0;
}
/*歌词*/
.el-body{
  padding:10px;
  background: #d6dbdd url('/public/images/bg_uibody.png') repeat-x 0 0;
}
.el-tline{
  padding-top:14px;
  background: url('/public/images/ui-tline.png') center 0 no-repeat;
}
.lrc-wrap{
  height:300px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.lrc-wrap::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.lrc-wrap::-webkit-scrollbar-track {
  background: none;
}
.lrc-wrap::-webkit-scrollbar-track-piece {
  opacity: 0;
}
.lrc-wrap::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: #5c6e82;
  background: rgba(92, 110, 130, .6);
}
.lrc-p{
  height:28px;
  line-height:28px;
  font-size:14px;
}
.lrc-p.active{
  color:#ff4949;
}
/*表格*/
.n-songtb{
  margin-top:20px;
  margin-bottom:10px;
  font-size:12px;
}
.u-title {
  height: 33px;
  border-bottom: 2px solid #c20c0c;
}
.u-title h3 {
  margin: 0;
  font-weight: normal;
  float:left;
  font-size: 20px;
  line-height: 28px;
}
.u-title .sub {
  float:left;
  font-size:12px;
  color:#666;
  margin: 9px 0 0 20px;
}
.m-table th, .m-table th .wp, .m-table td, .m-table .ply, .m-table .mv, .m-table .icn, .m-info .edit {
  background: #d6dbdd url('/public/images/bg_uibody.png') repeat-x 0 0;
}
.m-table {
  width: 100%;
  border: 1px solid #d9d9d9;
}
.m-table div{
  box-sizing: content-box;
}
.m-table th {
  vertical-align: top;
  text-align: left;
  font-weight: normal;
  color: #666;
}
.m-table th {
  height: 38px;
  background-color: #f7f7f7;
  background-position: 0 0;
  background-repeat: repeat-x;
}
.m-table th .wp {
  height: 18px;
  line-height: 18px;
  padding: 8px 10px;
  background-position: 0 -56px;
}
.m-table td {
  padding: 6px 10px;
  line-height: 18px;
  text-align: left;
}
.m-table tbody>tr:nth-child(2n) {
  background-color: #f7f7f7;
}
.m-table .hd {
  height: 18px;
}
.m-table .ply {
  width: 2em;
  height: 17px;
  cursor: pointer;
  color:#666;
}
.m-table .ply:hover {
  color: #ff4949;
}
.m-table .hd .ply {
  float: right;
}
.m-table .hd .num {
  width: 25px;
  margin-left: 5px;
  color: #999;
}
.m-table .text {
  width: 100%;
  position: relative;
  zoom: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.m-table .text a {
  white-space: nowrap;
}
.m-table .w0 {
  width: 25px;
}
.m-table .w1 {
  width: 74px;
}
.m-table .w2 {
  width: 111px;
}
.m-table .w3 {
  width: 14%;
}
.m-table .w4 {
  width: 20%;
}
.m-table .w5 {
  width: 120px;
}
</style>
