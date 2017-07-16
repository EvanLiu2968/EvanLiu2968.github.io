<template>
<div v-loading.fullscreen.lock="loading">
	<movie-search></movie-search>
	<div style="position:relative;padding-left:250px;">
		<div style="position:absolute;top:0;left:0;width:250px;background:#f6f6f6">
			<h2 class="movie-title">电影榜单</h2>
			<div class="movie-billboard clearfix">
				<div class="rotateBox" v-for="list in lists">
					<div class="transBox">
						<div class="movie-list-box front" v-bind:style="{background:list.color}">
							<div class="movie-list-name"><span>{{list.name}}</span></div>
						</div>
						<div class="movie-list-box back" v-bind:style="{background:list.color}">
							<div class="movie-list-cover" @click="toggleList(list)">
								<img v-bind:src="list.cover">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div>
			<h1 class="movie-list-title"><i class="el-icon-menu"></i>{{activeList.name}}</h1>
			<div class="movie-list">
				<div v-for="subject in subjects" class="movie-item" >
					<div class="movie-cover">
						<img :src="subject.images.small">
					</div>
					<div class="movie-content">
						<div class="movie-row">
							{{subject.title}} ( {{subject.original_title}} )
							<el-tag class="movie-genre" type="success" v-for="genre in subject.genres">{{genre}}</el-tag>
						</div>
						<div class="movie-row">
							年份：<span class="movie-tag">{{subject.year}}</span>导演：
							<a class="movie-tag" :href="director.alt" v-for="director in subject.directors" target="_blank">{{director.name}}</a>
						</div>
						<div class="movie-row">
							主演：
							<a class="movie-tag" :href="cast.alt" v-for="cast in subject.casts" target="_blank">{{cast.name}}</a>
						</div>
						<div class="movie-row">
							评分：<span style="color:#F7BA2A">{{subject.rating.average}}</span><span class="movie-tag">/{{subject.rating.max}}</span>
							<router-link class="movie-tag" :to="{ name: 'movie/detail', params: { id: subject.id }}">查看详情 <i class="el-icon-d-arrow-right text-small"></i></router-link>
						</div>
					</div>
				</div>
			</div>
			<el-pagination
				@current-change="handleCurrentChange"
				:current-page="pagination.currentPage"
				:page-size="pagination.pageSize"
				layout="prev, pager, next, jumper"
				:total="pagination.total">
			</el-pagination>
		</div>
	</div>
</div>
</template>

<script>
import jsonp from "jsonp";
import movieSearch from "./MovieSearch.vue";
export default {
	components:{
		movieSearch
	},
	data: function(){
		return {
			lists:[
				{
					name:'TOP250',
					api:'top250',
					cover:'',
					color:'#20A0FF'
				},
				{
					name:'正在热映',
					api:'in_theaters',
					cover:'',
					color:'#13CE66'
				},
				{
					name:'即将上映',
					api:'coming_soon',
					cover:'',
					color:'#F7BA2A'
				}
				/*{
					name:'口碑榜',
					api:'weekly',
					cover:'',
					color:'#FF4949'
				},
				{
					name:'新片榜',
					api:'new_movies',
					cover:'',
					color:'#324057'
				},
				{
					name:'北美票房榜',
					api:'us_box',
					cover:'',
					color:'#CC3399'
				}*/
			],
			activeList:{},
			subjects:[],
			pagination:{
				currentPage:1,
				pageSize:10,
				total:0
			},
			loading:false
		}
	},
	methods: {
		toggleList(list) {
			this.activeList=list;
			this.paginate();
		},
		paginate() {
			let count=this.pagination.pageSize;
			let start=(this.pagination.currentPage-1)*count;
			let api=this.activeList.api;
			this.loading=true;
			jsonp('https://api.douban.com/v2/movie/'+api+'?start='+start+'&count='+count, null, (err, data)=> {
				if (err) {
					this.loading=false;
					console.error(err.message);
				} else {
					this.loading=false;
					this.pagination.total=data.total;
					this.subjects=data.subjects;
				}
			});
		},
		handleCurrentChange(current){
			this.pagination.currentPage=current;
			this.paginate();
		}
	},
	beforeMount:function(){
		this.toggleList(this.lists[0]);
	},
	mounted:function(){
		this.lists.forEach((list,index) => {
			jsonp('https://api.douban.com/v2/movie/'+list.api+'?start=0&count=1', null, (err, data)=> {
				if (err) {
					console.error(err.message);
				} else {
					this.lists[index].cover=data.subjects[0].images.large;
				}
			});
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
.movie-list-cover{
	position:absolute;
	padding:0;
	display:block;
	top:0;left:0;bottom:0;right:0;
}
.movie-list-cover>img{
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
</style>