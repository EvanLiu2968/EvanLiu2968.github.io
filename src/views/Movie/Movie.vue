<template>
<div>
	<el-row :gutter="20">
		<el-col :xs="24" :sm="6" style="background:#f6f6f6">
			<h2 class="movie-title">电影榜单</h2>
			<div class="movie-billboard">
				<router-link to="/movie/top250" class="movie-list">
					<img src="static/images/movie/shawshank.webp">
					<div class="movie-list-name"><span>豆瓣电影<br>TOP250</span></div>
				</router-link>
				<router-link to="/movie/showing" class="movie-list">
					<img src="static/images/movie/thefast.webp">
					<div class="movie-list-name"><span>正在热映</span></div>
				</router-link>
				<router-link to="/movie/coming" class="movie-list">
					<img src="static/images/movie/threebody.webp">
					<div class="movie-list-name"><span>即将上映</span></div>
				</router-link>
			</div>
		</el-col>
		<el-col :xs="24" :sm="18">
			<router-view></router-view>
		</el-col>
	</el-row>
</div>
</template>

<script>
import jsonp from "jsonp";
export default {
	data: function(){
		return {
		}
	},
	methods: {
		onSubmit() {
			this.$message.success('提交成功！');
		}
	},
	beforeMount:function(){
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
}
.movie-list{
	position:relative;
	display:block;
	width:100px;
	margin:10px auto;
}
.movie-list>img{
	display:block;
	width:100%;
}
.movie-list-name{
	position:absolute;
	display: table-cell;
	vertical-align:middle;
	text-align:center;
	top:0;right:0;
	bottom:0;left:0;
	color:#fff;
	font-size:74px;
	font-weight:900;
}
.movie-list-name:hover{
	background-color: rgba(0,0,0,.3)
}
.movie-list-name>span{
	display:inline-block;
	/*vertical-align: middle;*/
	font-size:20px;
}
</style>