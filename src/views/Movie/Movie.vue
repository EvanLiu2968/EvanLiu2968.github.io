<template>
<div>
	<div style='position:absolute;top:15px;right:25px;width:300px;z-index:99;'>
		<el-input
			size="small"
			placeholder="请输入电影或人名"
			icon="search"
			v-model="searchText"
			@keyup.enter="searchMovie"
			:on-icon-click="searchMovie">
		</el-input>
		<ul v-if='searchListShow' v-loading="searchLoading" class="search-list">
			<li v-for='subject in subjects'>
				<a :href='subject.alt' target='_blank'>
					<span class="">{{subject.title}}</span>
					<span class="original-title">{{subject.original_title}}</span>
					<span class="year">{{subject.year}}</span>
				</a>
			</li>
			<li class="text-center">
				<el-pagination
					small
					layout="prev, pager, next"
					@current-change="searchPageChange"
					:current-page="pagination.currentPage"
					:page-size="pagination.pageSize"
					:total="pagination.total">
				</el-pagination>
			</li>
			<li >
				<a class="text-center" role="button" v-on:click="hideSearchList">关闭搜索栏</a>
			</li>
		</ul>
	</div>
	<div style="position:relative;padding-left:250px;" v-loading.fullscreen.lock="loading">
		<div style="position:absolute;top:0;left:0;width:250px;background:#f6f6f6">
			<h2 class="movie-title">电影榜单</h2>
			<div class="movie-billboard clearfix">
				<div class="rotateBox">
					<div class="transBox">
						<div class="movie-list-box color_1 front">
							<div class="movie-list-name"><span>TOP250</span></div>
						</div>
						<div class="movie-list-box color_1 back">
							<router-link to="/movie/top250" class="movie-list">
								<img v-bind:src="cover.top250">
							</router-link>
						</div>
					</div>
				</div>
				<div class="rotateBox">
					<div class="transBox">
						<div class="movie-list-box color_2 front">
							<div class="movie-list-name"><span>正在热映</span></div>
						</div>
						<div class="movie-list-box color_2 back">
							<router-link to="/movie/showing" class="movie-list">
								<img v-bind:src="cover.showing">
							</router-link>
						</div>
					</div>
				</div>
				<div class="rotateBox">
					<div class="transBox">
						<div class="movie-list-box color_3 front">
							<div class="movie-list-name"><span>即将上映</span></div>
						</div>
						<div class="movie-list-box color_3 back">
							<router-link to="/movie/coming" class="movie-list">
								<img v-bind:src="cover.coming">
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div >
			<router-view></router-view>
		</div>
	</div>
</div>
</template>

<script>
import jsonp from "jsonp";
export default {
	data: function(){
		return {
			cover:{
				top250:'',
				showing:'',
				coming:''
			},
			searchText:'',
			searchListShow:false,
			subjects:[],
			pagination:{
				currentPage:1,
				pageSize:10,
				total:0
			},
			searchLoading:false,
			loading:false
		}
	},
	methods: {
		searchMovie() {
			let q=this.searchText;
			if(q==''){
				this.$message({
					type: 'error',
					message: '请输入电影或人名关键字！'
				});
				this.hideSearchList();
				return;
			}
			if(!this.searchListShow){
				this.loading=true;
			}
			this.searchLoading=true;
			let start=(this.pagination.currentPage-1)*this.pagination.pageSize,count=this.pagination.pageSize;
			//q:搜索关键字 tag:标签
			jsonp('https://api.douban.com/v2/movie/search?q='+ q +'&start='+ start +'&count='+count, null, (err, data)=> {
				if (err) {
					this.$message({
						type: 'error',
						message: err.message
					});
				} else {
					this.subjects=data.subjects;
					this.pagination.total=data.total;
					this.searchListShow=true;
				}
				this.loading=false;
				this.searchLoading=false;
			});
		},
		hideSearchList() {
			this.searchListShow=false;
			this.pagination.currentPage=1;
			this.pagination.total=0;
			this.subjects=[];
		},
		searchPageChange(currentPage) {
			this.pagination.currentPage=currentPage;
			this.searchMovie();
		}
	},
	beforeMount:function(){
		jsonp('https://api.douban.com/v2/movie/top250?start=0&count=1', null, (err, data)=> {
			if (err) {
				console.error(err.message);
			} else {
				this.cover.top250=data.subjects[0].images.large;
			}
		});
		jsonp('https://api.douban.com/v2/movie/in_theaters?start=0&count=1', null, (err, data)=> {
			if (err) {
				console.error(err.message);
			} else {
				this.cover.showing=data.subjects[0].images.large;
			}
		});
		jsonp('https://api.douban.com/v2/movie/coming_soon?start=0&count=1', null, (err, data)=> {
			if (err) {
				console.error(err.message);
			} else {
				this.cover.coming=data.subjects[0].images.large;
			}
		});
	}
}
</script>
<style scoped>
.movie-title{
	text-align:center;
	font-size:18px;
	color:#58B7FF;
	margin-top:20px;
}
.movie-billboard{
	margin-bottom:15px;
	padding:25px;
}
.movie-list{
	position:absolute;
	padding:0;
	display:block;
	top:0;left:0;bottom:0;right:0;
}
.movie-list>img{
	display:block;
	width:200px;
	height:300px;
}
.movie-list-name{
	line-height:300px;
	font-size:30px;
	font-weight:bolder;
	color:#fff;
	text-align: center;
}
.search-list{
	margin:3px 0 10px 0;
	padding:0;
	list-style:none;
	color:#324057;
	font-size:16px;
	background:#fff;
	border-radius:3px;
	border:1px solid #D3DCE6;
	box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.12);
}
.search-list>li{
	border-bottom:1px solid #E5E9F2;
}
.search-list>li:last-child{
	border-bottom:0;
}
.search-list>li>a{
	position:relative;
	display:block;
	padding:6px 56px 6px 10px;
	color:#324057;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
}
.search-list>li>a:hover{
	background:#EFF2F7;
}
.search-list>li>a .original-title{
	margin-left:10px;
	font-size:80%;
	color:#99A9BF;
}
.search-list>li>a .year{
	position:absolute;
	top:6px;
	right:10px;
	color:#8492A6;
}
/*动画*/
.rotateBox{ 
	overflow:hidden; height: 300px; width: 200px; float: left; position: relative;
	-webkit-perspective: 2000px; perspective:600px;-moz-perspective: 600px;-o-perspective: 600px; -ms-perspective: 600px;
}
.transBox{
	-webkit-transform-style: preserve-3d; -moz-transform-style: preserve-3d;-o-transform-style: preserve-3d; 
	position:absolute; top: 0; left: 0;height: 300px; width: 200px; transform-origin: center center -100px;
	-webkit-transition:.4s;-moz-transition:.4s;-o-transition:.5s; 
}
.transBox .movie-list-box{
	position: absolute; height: 500px;
}
.transBox .front{
	left: 0; top:0;
}
.transBox .back{
	left: 200px; top:0;
	-webkit-transform-origin: left; -moz-transform-origin: left;-o-transform-origin: left;-ms-transform-origin: left;
	-webkit-transform: rotateY(90deg);-moz-transform: rotateY(90deg);-o-transform: rotateY(90deg);-ms-transform: rotateY(90deg);
}
.transBox .backed{
	left:200px; top:0; position: absolute
}
.rotateBox:hover .transBox{
	-webkit-transform: rotateY(-90deg);-moz-transform: rotateY(-90deg);-o-transform: rotateY(-90deg);
}
.movie-list-box{
	position:relative;height: 300px; width: 200px;float:left; display:block;overflow:hidden;
}
.color_1{background:#20A0FF;}
.color_2{background:#13CE66;}
.color_3{background:#F7BA2A;}
.color_4{background:#FF4949;}
</style>