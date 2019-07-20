<template>
  <div class="content">
    <div class="table">
      <el-form :inline="true" :model="queryForm" ref="queryForm">
        <el-form-item label="历史今天">
          <el-date-picker
            v-model="queryForm.date"
            type="date"
            :clearable="false"
            format="MM-dd"
            @change="dateChange"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="search">
            搜索
          </el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="year" label="日期" sortable width="100" :formatter="dateFormat">
        </el-table-column>
        <el-table-column prop="lunar" label="农历" width="150">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="200">
        </el-table-column>
        <el-table-column prop="pic" label="图片" width="100">
          <template scope="scope">
            <img :src="scope.row.pic" role="button" style="height:50px" @click="showPic(scope.row.pic)">
          </template>
        </el-table-column>
        <el-table-column prop="des" label="内容">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template scope="scope">
            <el-button @click="handleDetail(scope.$index, scope.row)">
              详情
            </el-button>
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
          layout="total, prev, pager, next, sizes, jumper"
          :total="pagination.total"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog title="内容详情" :visible.sync="detailVisible">
      <p style="text-indent:2em; line-height: 1.8">
        {{ detailContent }}
      </p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailVisible = false">
          关闭
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="图片详情" :visible.sync="currentPicVisible">
      <img :src="currentPic" class="center-block" style="max-width:100%">
    </el-dialog>
  </div>
</template>

<script>
import { getHistoryTodayList, getHistoryTodayDetail } from '@/api'

export default {
  data() {
    return {
      queryForm: {
        date: new Date().format('yyyy-MM-dd')
      },
      tableData: [],
      resData: [],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      detailVisible: false,
      detailContent: '',
      currentPicVisible: false,
      currentPic: ''
    }
  },
  watch: {
    tableData: {
      handler: function(value) {},
      deep: true
    }
  },
  beforeMount() {
    this.search()
  },
  methods: {
    dateFormat(row, column) {
      return (row.year + '年')
    },
    handleDetail(index, row) {
      getHistoryTodayDetail(row._id).then(res => {
        this.detailContent = res.result[0].content
        this.detailVisible = true
      })
    },
    dateChange(e) {
      // e;
    },
    showPic(url) {
      this.currentPic = url
      this.currentPicVisible = true
    },
    search() {
      const queryDay = new Date(this.queryForm.date)
      getHistoryTodayList(queryDay.getMonth() + 1, queryDay.getDate()).then(res => {
        this.resData = res.result
        this.pagination.currentPage = 1
        this.pagination.total = this.resData.length
        this.paginate()
      })
    },
    paginate() {
      const pageSize = this.pagination.pageSize
      const currentPage = this.pagination.currentPage
      this.tableData = this.resData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    },
    handleSizeChange(size) {
      this.pagination.pageSize = size
      this.paginate()
    },
    handleCurrentChange(current) {
      this.pagination.currentPage = current
      this.paginate()
    }
  }
}
</script>
