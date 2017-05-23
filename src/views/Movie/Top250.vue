<template>
<div>
	<h1 class="movie-list-title"><i class="el-icon-menu"></i>豆瓣电影TOP250</h1>
	<div class="movie-list" v-loading.fullscreen.lock="loading">
		<div v-for="subject in subjects" class="movie-item" >
			<div class="movie-cover">
				<img :src="subject.images.small">
			</div>
			<div class="movie-content">
				<div class="movie-row">
					{{subject.title}} ( {{subject.original_title}} )
					<el-tag class="movie-tag" type="success" v-for="genre in subject.genres">{{genre}}</el-tag>
				</div>
				<div class="movie-row">
					年份：<span class="movie-tag">{{subject.year}}</span>导演：
					<a class="movie-tag" :href="director.alt" v-for="director in subject.directors" target="_blank">{{director.name}}</a>
				</div>
				<div class="movie-row">
					演员：
					<a class="movie-tag" :href="cast.alt" v-for="cast in subject.casts" target="_blank">{{cast.name}}</a>
				</div>
				<div class="movie-row">
					评分：<span style="color:#F7BA2A">{{subject.rating.average}}</span><span class="movie-tag">/{{subject.rating.max}}</span>
					<a class="movie-tag" :href="subject.alt" target="_blank">查看详情 <i class="el-icon-d-arrow-right text-small"></i></a>
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
</template>

<script>
import jsonp from "jsonp";
export default {
	data: function(){
		return {
			pagination:{
				currentPage:1,
				pageSize:10,
				total:250
			},
			subjects:[],
			loading:false
		}
	},
	methods: {
		paginate() {
			let count=this.pagination.pageSize;
			let start=(this.pagination.currentPage-1)*count;
			this.loading=true;
			jsonp('https://api.douban.com/v2/movie/top250?start='+start+'&count='+count, null, (err, data)=> {
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
		this.paginate();
	}
}
</script>