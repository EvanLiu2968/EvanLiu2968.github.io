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
              <el-tag type="success">首页/文档</el-tag>
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="详情描述"></el-table-column>
        <el-table-column label="管理" width="160">
          <template scope="scope">
            <el-button-group>
              <el-button @click="handleEdit(scope.$index, scope.row)">
                编辑
              </el-button>
              <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">
                删除
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
      <el-form :model="editForm" ref="editForm">
        <el-form-item label="仓库名" label-width="120px" prop="name">
          <el-input v-model="editForm.name" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="详情描述" label-width="120px" prop="description" :rules="{required:true,message:'请填写地址',trigger:'blur'}">
          <el-input v-model="editForm.description" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取 消
        </el-button>
        <el-button type="primary" @click="saveForm()">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sourceBase: 'https://github.com/EvanLiu2968/',
      viewBase: 'https://evanliu2968.github.io/',
      dataList: [
        { name: 'evanliu2968', view: '1', description: 'Git reposity for www.evanliu2968.com.cn, egg-react-ssr' },
        { name: 'EvanLiu2968.github.io', view: '1', description: 'Github pages, vue single page APP' },
        { name: 'webpack4-plus-koa', view: '1', description: 'A node project based on webpack4 and koa2.' },
        { name: 'react-component', view: '1', description: 'React组件库' },
        { name: 'vue-component', view: '1', description: 'Vue组件库' },
        { name: 'clover', view: '0', description: '三叶草，【love，health，glory】' },
        { name: 'web-inject', view: '0', description: 'Inject js and css into document, or preload images.' },
        { name: 'Athena', view: '0', description: 'This is a AI called Athena' },
        { name: 'Cupid', view: '0', description: 'ლ(╹◡╹ლ) じò ぴé' },
        { name: 'Memento', view: '0', description: 'Memento code' },
        { name: 'InjectJS', view: '1', description: 'Chrome extension, for injecting js to broswer' },
        { name: 'el-checkbox', view: '1', description: '一套checkbox、radio、switch UI库' },
        { name: 'gulp-react-ssr-mpa', view: '0', description: 'React server side render MPA' },
        { name: 'fis3-seed', view: '0', description: 'Fis3构建工具启动种子' },
        { name: 'gulp-webapp', view: '1', description: 'Gulp构建流的webAPP' },
        { name: 'ionic-weixin', view: '1', description: 'ionic,仿微信Hybrid App' }
      ],
      dialogFormVisible: false,
      editForm: {}
    }
  },
  beforeMount() {},
  methods: {
    handleEdit(index, row) {
      const data = JSON.parse(JSON.stringify(row))
      data.index = index
      this.editForm = data
      this.dialogFormVisible = true
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
        })
      })
    },
    saveForm() {
      const index = this.editForm.index
      this.$set(this.dataList, index, this.editForm)// 利用索引/长度直接设置一个数组项时不会检测更新
      this.$set(this.dataList, index, this.editForm)// 利用索引/长度直接设置一个数组项时不会检测更新
      this.dialogFormVisible = false
      this.$message({
        type: 'error',
        message: '游客无法编辑！'
      })
    }
  }
}
</script>
