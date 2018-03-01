<template>
  <div class="content">
    <div class="table">
      <el-table :data="dataList" border style="width: 100%">
        <el-table-column prop="name" label="仓库名" width="200"></el-table-column>
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
          <el-button-group>
            <el-button size="small"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="编辑信息" v-model="dialogFormVisible">
      <el-form :model="editForm" ref="editForm">
        <el-form-item label="仓库名" label-width="120px" prop="name">
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
          {name:"EvanLiu2968.github.io",view:"1",description:"coding是一种艺术"},
          {name:"el-checkbox",view:"1",description:"一套checkbox、radio、switch UI库"},
          {name:"vue-component",view:"0",description:"\"603\"开源计划之vue组件库"},
          {name:"react-component",view:"0",description:"\"603\"开源计划之react组件库"},
          {name:"fis3-seed",view:"0",description:"fis3构建工具启动种子"},
          {name:"clover",view:"0",description:"三叶草，【love，health，glory】"},
          {name:"manifast",view:"0",description:"记录我的清单"},
          {name:"ionic-weixin",view:"1",description:"ionic,仿微信Hybrid App"},
          {name:"animateDemo",view:"1",description:"animate.css demo"},
          {name:"gulp-webapp",view:"1",description:"gulp构建流的webAPP"},
          {name:"InjectJS",view:"0",description:"Chrome extension"}
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