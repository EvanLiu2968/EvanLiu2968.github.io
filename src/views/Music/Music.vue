<template>
<div>
	<div class="song-container">
		<audio :src="currentSong.src"></audio>
		<el-row :gutter="10">
			<el-col :span="12">
				<div class="song-cover-box">
					<div class="song-cover">
						<img :src="currentSong.cover" class="cover-img">
						<span class="cover-bg"></span>
					</div>
					<div class="round-top"></div>
				</div>
			</el-col>
			<el-col :span="12">
				<div>
					<h3>{{currentSong.name}}</h3>
					<div>歌手：{{currentSong.singer}}&emsp;&emsp;专辑：{{currentSong.album}}</div>
					<div ></div>
				</div>
			</el-col>
		</el-row>
		<table class="el-table">
			<thead>
				<tr>
					<th>序号</th>
					<th>操作</th>
					<th>音乐标题</th>
					<th>歌手</th>
					<th>专辑</th>
					<th>时长</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(song,index) in songList">
					<th>{{index+1}}</th>
					<th>播放</th>
					<th>{{song.name}}</th>
					<th>{{song.name}}</th>
					<th>{{song.name}}</th>
					<th>{{song.duration}}</th>
				</tr>
			</tbody>
		</table>
	</div>
</div>
</template>

<script>
import jsonp from "jsonp";
export default {
	data: function(){
		return {
			songList:[
				{
					id:'1',
					name:'青花瓷',
					singer:'周杰伦',
					album:'我很忙',
					cover:'static/images/music/jay.jpg',
					src:'static/images/music/青花瓷 - 周杰伦.mp3',
					lrc:'static/images/music/青花瓷 - 周杰伦.lrc',
					duration:'03:40.60'
				}
			],
			currentSong:{
				id:'1',
				name:'青花瓷',
				singer:'周杰伦',
				album:'我很忙',
				cover:'static/images/music/jay.jpg',
				src:'static/images/music/青花瓷 - 周杰伦.mp3',
				lrc:'static/images/music/青花瓷 - 周杰伦.lrc',
				duration:'03:40.60'
			}
		}
	},
	methods: {
		handleSearchClick() {
			let search=this.search;
			let pageSize=this.pagination.pageSize;
			let currentPage=this.pagination.currentPage;
			jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.search.common&query='+search+'&page_size='+pageSize+'&page_no='+currentPage+'&format=json', null, (err, data)=> {
				if (err) {
					console.error(err.message);
				} else {
					this.pagination.total=parseInt(data.pages.total);
					this.songList=data.song_list;
				}
			});
		},
		handleCurrentChange:function(current){
			this.pagination.currentPage=current;
			this.handleSearchClick();
		}
	},
	beforeMount:function(){
	}
}
</script>
<style scoped>
.song-container{
	display:block;
	margin:20px auto;
	width:900px;
}
.song-cover-box{
	position:relative;
	width:201px;
	margin:20px auto;
}
@-webkit-keyframes rotate {
	from {
		-webkit-transform: rotate3d(0, 0, 1, 0deg);
		transform: rotate3d(0, 0, 1, 0deg);
	}

	to {
		-webkit-transform: rotate3d(0, 0, 1, 360deg);
		transform: rotate3d(0, 0, 1, 360deg);
	}
}
@keyframes rotate {
	from {
		-webkit-transform: rotate3d(0, 0, 1, 0deg);
		transform: rotate3d(0, 0, 1, 0deg);
	}

	to {
		-webkit-transform: rotate3d(0, 0, 1, 360deg);
		transform: rotate3d(0, 0, 1, 360deg);
	}
}
.song-cover{
	position:relative;
	display:inline-block;
	-webkit-animation-duration: 16s;
	animation-duration: 16s;
	-webkit-animation-fill-mode: both;
	animation-fill-mode: both;
	-webkit-animation-iteration-count: infinite;
	animation-iteration-count: infinite;
	-webkit-transform-origin: center center;
	transform-origin: center center;
	-webkit-animation-timing-function: linear;
	animation-timing-function: linear;
	-webkit-animation-name: rotate;
	animation-name: rotate;
}
.song-cover .cover-img{
	position:absolute;
	top:36px;
	left:36px;
}
.song-cover .cover-bg{
	display:inline-block;
	position:relative;
	width:201px;
	height:201px;
	background-image: url('/static/images/music/coverall.png');
	background-size: cover;
}
.round-top{
	display:inline-block;
	position:absolute;
	top:-40px;
	left:96px;
	width:60px;
	height:90px;
	background-image: url('/static/images/music/round-top.png');
	background-repeat: no-repeat;
	background-size: 100%;
}
</style>