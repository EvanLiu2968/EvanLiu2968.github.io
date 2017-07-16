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
		<ul v-if="searchListShow" v-loading="searchLoading" class="search-list">
			<li v-for='subject in searchList'>
				<a :href='subject.alt' target='_blank'>
					<span class="">{{subject.title}}</span>
					<span class="original-title">{{subject.original_title}}</span>
					<span class="year">{{subject.year}}</span>
				</a>
			</li>
			<li v-if="searchList.length===0">
				<a class="text-center">
					<template v-if="searchLoading">
						搜索中
					</template>
					<template v-else>
						没有搜索到结果
					</template>
				</a>
			</li>
			<li v-else class="text-center">
				<el-pagination
					small
					layout="prev, pager, next"
					@current-change="searchPageChange"
					:current-page="searchPagination.currentPage"
					:page-size="searchPagination.pageSize"
					:total="searchPagination.total">
				</el-pagination>
			</li>
			<li>
				<a class="text-center" role="button" v-on:click="hideSearchList">关闭搜索栏</a>
			</li>
		</ul>
	</div>
</div>
</template>

<script>
import jsonp from "jsonp";
export default {
	name:'movieSearch',
	data: function(){
		return {
			searchText:'',
			searchListShow:false,
			searchList:[],
			searchPagination:{
				currentPage:1,
				pageSize:10,
				total:0
			},
			searchLoading:false
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
			this.searchListShow=true;
			this.searchLoading=true;
			let start=(this.searchPagination.currentPage-1)*this.searchPagination.pageSize,count=this.searchPagination.pageSize;
			//q:搜索关键字 tag:标签
			jsonp('https://api.douban.com/v2/movie/search?q='+ q +'&start='+ start +'&count='+count, null, (err, data)=> {
				if (err) {
					this.$message({
						type: 'error',
						message: err.message
					});
				} else {
					this.searchList=data.subjects;
					this.searchPagination.total=data.total;
				}
				this.searchLoading=false;
			});
		},
		hideSearchList() {
			this.searchListShow=false;
			this.searchPagination.currentPage=1;
			this.searchPagination.total=0;
			this.searchList=[];
		},
		searchPageChange(currentPage) {
			this.searchPagination.currentPage=currentPage;
			this.searchMovie();
		}
	}
}
</script>
<style scoped>
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
</style>