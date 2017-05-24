<template>
<div>
	<div style="position:relative;padding-left:250px;">
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
								<img src="https://img3.doubanio.com/view/photo/raw/public/p480747492.jpg">
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
								<img src="https://img3.doubanio.com/view/photo/raw/public/p2458825426.jpg">
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
								<img src="https://img1.doubanio.com/view/photo/raw/public/p2248627938.jpg">
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