<template>
	<div>
		<div class="table">
			<el-table :data="dataList" border style="width: 100%">
				<el-table-column prop="name" label="项目名" width="200"></el-table-column>
				<el-table-column prop="tag" label="地址" width="170">
					<template scope="scope">
						<a :href="sourceBase+scope.row.name" target="_blank">
							<el-tag type="primary">源地址</el-tag>
						</a>
						<a :href="viewBase+scope.row.name" v-if="scope.row.view==='1'" target="_blank">
							<el-tag type="success">演示地址</el-tag>
						</a>
					</template>
				</el-table-column>
				<el-table-column prop="description" label="详情描述"></el-table-column>
				<el-table-column label="管理" width="160">
					<template scope="scope">
						<el-button size="small"
								   @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="small" type="danger"
								   @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog title="编辑信息" v-model="dialogFormVisible">
			<el-form :model="editForm" ref="editForm">
				<el-form-item label="项目名" label-width="120px" prop="name">
					<el-input v-model="editForm.name" auto-complete="off" disabled></el-input>
				</el-form-item>
				<el-form-item label="详情描述" label-width="120px" prop="description" :rules="{required:true,message:'请填写地址',trigger:'blur'}">
					<el-input v-model="editForm.description" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveForm()">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				sourceBase:'https://github.com/EvanLiu2968/',
				viewBase:'https://evanliu2968.github.io/',
				dataList:[
					{name:"EvanLiu2968.github.io",view:"1",description:"github主页，coding是一种生活方式"},
					{name:"notebook",view:"0",description:"始于学，忠于信，耕于野，收于忆"},
					{name:"ionic-weixin",view:"1",description:"ionic搭建的仿微信混合APP"},
					{name:"animateDemo",view:"1",description:"用jQuery和animate.css搭建的demo页面"},
					{name:"Angular1.3_Admin_Template",view:"1",description:"gulp构建,基于Angular和bootstrap的后台管理模版"},
					{name:"vueSystem",view:"1",description:"vue2+vue-router+vuex，动态路由及权限控制，刷新缓存"},
					{name:"rycx",view:"1",description:"gulp构建的广州购票webapp界面"}
				],
				dialogFormVisible: false,
				editForm: {}
			}
		},
		methods: {
			handleEdit(index, row) {
				let data=JSON.parse(JSON.stringify(row));
				data.index=index;
				this.editForm=data;
				this.dialogFormVisible=true;
			},
			handleDelete(index, row) {
				this.$confirm('此操作将永久删除该该项目, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'error',
						message: '游客无法删除！'
					});
				});
			},
			saveForm() {
				let index=this.editForm.index;
				this.$set(this.dataList,index,this.editForm);//利用索引/长度直接设置一个数组项时不会检测更新
				this.$set(this.dataList,index,this.editForm);//利用索引/长度直接设置一个数组项时不会检测更新
				this.dialogFormVisible = false;
				this.$message({
					type: 'error',
					message: '游客无法编辑！'
				});
			}
		},
		beforeMount(){}
	}
</script>