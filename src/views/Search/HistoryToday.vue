<template>
	<div>
		<div class="table">
			<el-form :inline="true" :model="queryForm" ref="queryForm">
				<el-form-item label="历史今天">
					<el-date-picker
							v-model="queryForm.date"
							type="date"
							:clearable="false"
							format="MM-dd"
							@change="dateChange"
							placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="search" @click="search">搜索</el-button>
				</el-form-item>
			</el-form>
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column prop="year" label="日期" sortable width="100" :formatter="dateFormat">
				</el-table-column>
				<el-table-column prop="lunar" label="农历" width="150" >
				</el-table-column>
				<el-table-column prop="title" label="标题" width="200">
				</el-table-column>
				<el-table-column prop="pic" label="图片" width="100">
					<template scope="scope">
						<img v-bind:src="scope.row.pic" role="button" style="height:50px" @click="showPic(scope.row.pic)">
					</template>
				</el-table-column>
				<el-table-column prop="des" label="内容" >
				</el-table-column>
				<el-table-column label="操作" width="100">
					<template scope="scope">
						<el-button size="small" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="pagination.currentPage"
					:page-sizes="[10, 20, 50, 100]"
					:page-size="pagination.pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="pagination.total">
				</el-pagination>
			</div>
		</div>
		<el-dialog title="内容详情" v-model="detailVisible">
			<p style="text-indent:2em">{{detailContent}}</p>
			<div slot="footer" class="dialog-footer">
				<el-button @click="detailVisible = false">关闭</el-button>
			</div>
		</el-dialog>
		<el-dialog title="图片详情" v-model="currentPicVisible">
			<img :src="currentPic" class="center-block" style="max-width:100%">
		</el-dialog>
	</div>
</template>

<script>
import jsonp from "jsonp";
	export default {
		data() {
			return {
				queryForm:{
					date:new Date().format('yyyy-MM-dd')
				},
				tableData: [],
				resData:[],
				pagination:{
					currentPage:1,
					pageSize:10,
					total:0
				},
				detailVisible:false,
				detailContent:"",
				currentPicVisible:false,
				currentPic:''
			}
		},
		watch: {
			tableData: {
				handler: function (value) {},
				deep: true
			}
		},
		methods: {
			dateFormat(row, column) {
				return (row.year+"年");
			},
			handleDetail(index,row){
				jsonp('https://bird.ioliu.cn/v1?url=http://api.juheapi.com/japi/tohdet?key=e676ca1db545a88c1a22c7da35253776&v=1.0&id='+row._id, null, (err, res) => {
					if (err) {
						console.error(err.message);
					} else {
						console.log(res);
						this.detailContent=res.result[0].content;
						this.detailVisible=true;
					}
				});
				/*this.axios.get('http://api.juheapi.com/japi/tohdet?key=e676ca1db545a88c1a22c7da35253776&v=1.0&id='+row._id).then( (res) => {
					this.detailContent=res.data.result[0].content;
					console.log(res);
					this.detailVisible=true;
				});*/
			},
			dateChange(e){
				//e;
			},
			showPic(url){
				this.currentPic=url;
				this.currentPicVisible=true;
			},
			search(){
				var queryDay=new Date(this.queryForm.date);
				jsonp('https://bird.ioliu.cn/v1?url=http://api.juheapi.com/japi/toh?key=e676ca1db545a88c1a22c7da35253776&v=1.0&month='+(queryDay.getMonth()+1)+'&day='+queryDay.getDate(), null, (err, res) => {
					if (err) {
						console.error(err.message);
					} else {
						this.resData = res.result;
						this.pagination.currentPage=1;
						this.pagination.total=this.resData.length;
						this.paginate();
					}
				});
			},
			paginate(){
				let pageSize=this.pagination.pageSize;
				let currentPage=this.pagination.currentPage;
				this.tableData=this.resData.slice((currentPage-1)*pageSize,currentPage*pageSize);
			},
			handleSizeChange(size){
				this.pagination.pageSize=size;
				this.paginate();
			},
			handleCurrentChange(current){
				this.pagination.currentPage=current;
				this.paginate();
			}
		},
		beforeMount(){
			this.search();
		}
	}
</script>