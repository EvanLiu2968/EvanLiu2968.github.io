<template>
  <div class="app-table">
    <div v-if="rowSelect || $slots['header-right']" class="app-table-tools clearfix">
      <div v-if="rowSelect" class="app-table-left">
        <slot name="header-left">
          <span v-if="allSelect" style="padding-left: 14px;">
            <el-checkbox v-model="allSelected" @change="handleAllSelection">所有页</el-checkbox>
          </span>
          <span class="app-table-selected">已选<i>{{ multipleSelection.length }}</i>项</span>
        </slot>
      </div>
      <div class="app-table-right">
        <slot name="header-right"></slot>
      </div>
    </div>
    <el-table
      ref="table"
      :stripe="stripe"
      :data="data"
      :row-key="rowKey"
      v-bind="otherProps"
      v-on="otherListeners"
      style="width: 100%"
      :span-method="spanMethod"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="rowSelect" type="selection" :reserve-selection="reserveSelect" width="55" :selectable="selectable"></el-table-column>
      <slot></slot>
      <div slot="empty">
        暂无数据
      </div>
    </el-table>
    <div class="app-table-tools">
      <div class="app-table-left">
        <span class="text-gray" style="margin-right:20px">合计条数：{{ total }}条</span>
        <slot name="footer-left"></slot>
      </div>
      <div class="app-table-right">
        <el-pagination
          v-if="pagination"
          :pager-count="5"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          :total="total"
          layout="prev, pager, next, sizes, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import './index.scss'

export default {
  name: 'AppTable',
  props: {
    tableData: {
      type: Object,
      default() {
        return {}
      }
    },
    selectable: {
      type: Function,
      default() {
        return function(row, i) { return true }
      }
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    rowSelect: {
      type: Boolean,
      default: true
    },
    reserveSelect: {
      type: Boolean,
      default: true
    },
    selectType: {
      type: String, // 'multiple' or 'single'
      default: 'multiple'
    },
    allSelect: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Boolean,
      default: true
    },
    stripe: {
      type: Boolean,
      default: true
    },
    spanMethod: {
      type: Function,
      default() {
        return function() { return true }
      }
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      data: [],
      total: 0,
      shouldClearSelection: true,
      allSelected: false,
      multipleSelection: []
    }
  },
  computed: {
    otherProps() {
      // eslint-disable-next-line no-unused-vars
      const { tableData, total, rowSelect, selectType, allSelect, pagination, stripe, ...others } = this.$attrs
      return others
    },
    otherListeners() {
      // eslint-disable-next-line no-unused-vars
      const { pagerChange, selectionChange, ...others } = this.$listeners
      return others
    }
  },
  watch: {
    tableData: {
      handler(val, oldVal) {
        val = val || {}
        // 控制仅在分页时保留勾选
        if (this.shouldClearSelection && this.$refs.table) {
          this.$refs.table.clearSelection()
        }
        this.shouldClearSelection = true

        this.currentPage = val.current || 1
        this.pageSize = val.size || 10
        this.data = val.records || []
        this.total = val.total || this.data.length
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.table.toggleRowSelection(row)
        })
      } else {
        this.$refs.table.clearSelection()
      }
    },
    handleAllSelection(val) {
      if (val) {
        this.tableData.forEach(row => {
          this.$refs.table.toggleRowSelection(row, true)
        })
      } else {
        this.$refs.table.clearSelection()
      }
    },
    clearSelection() {
      this.$refs.table.clearSelection()
    },
    handleSelectionChange(selection, current, checked) {
      // 目前该事件没有返回current 和 checked, 无法做单选功能
      // if (this.selectType === 'single' && this.checked) {
      //   this.$refs.table.clearSelection()
      //   this.$refs.table.toggleRowSelection(current, true)
      // }
      this.multipleSelection = selection
      this.$emit('selectionChange', selection)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.handlePagerChange()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.handlePagerChange()
    },
    handlePagerChange() {
      const { currentPage, pageSize } = this
      this.shouldClearSelection = false
      this.$emit('pagerChange', {
        page: currentPage,
        size: pageSize
      })
    }
  }
}
</script>
