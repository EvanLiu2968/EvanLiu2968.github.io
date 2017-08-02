<template>
<div>
	<div class="song-container">
		<el-input
		  placeholder="请输入歌曲或歌手信息"
		  icon="search"
		  v-model="search"
		  :on-icon-click="handleSearchClick">
		</el-input>
		<div class="song-list" v-if="songList.length!==0">
			<div v-for="song in songList" class="song-item">
				<el-row :gutter="10">
					<el-col :span="9">
						<span>{{song.title}}</span>
					</el-col>
					<el-col :span="5">
						<span v-html="song.author"></span>
					</el-col>
					<el-col :span="5">
						<span v-html="song.album_title"></span>
					</el-col>
					<el-col :span="5">
						<span>ID:{{song.song_id}}</span>
					</el-col>
				</el-row>
			</div>
		</div>
		<div class="center-block" v-if="songList.length!==0">
			<el-pagination
			  @current-change="handleCurrentChange"
			  :current-page="pagination.currentPage"
			  :page-size="pagination.pageSize"
			  layout="total,sizes,prev,pager, next"
			  :total="pagination.total">
			</el-pagination>
		</div>
	</div>
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
				total:0
			},
			search:"",
			songList:[]
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
.song-list{
	margin:20px auto;
	border:1px solid #ddd;
	color:#475669;
	background-color:#F9FAFC;
}
.song-list>.song-item{
	padding:10px;
}
.song-list>.song-item em{
	color:#F7BA2A !important;
}
.song-list>.song-item:nth-child(2n+1){
	background-color:#EFF2F7;
}
.song-list>.song-item:hover{
	background-color:#20A0FF;
	color:#fff;
}
</style>