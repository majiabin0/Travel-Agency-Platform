<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 13:33:26
 * @LastEditTime: 2019-08-19 17:43:23
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="9">
          <regionSelect ref="region"></regionSelect>
        </el-col>
        <el-col :span="14">
          <el-input
            v-model="listQuery.orgName"
            placeholder="请输入订单名称"
            type="text"
            style="width: 200px"
          ></el-input>
          <el-button type="primary" icon="plus" @click="getList">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      :data="page.data"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column align="center" label="订单名称" width="240" type="text">
        <template scope="scope">{{scope.row.orgName}}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="订单来源"
        width="120"
        prop="source"
        :formatter="getsourceFormat"
      >
        <!-- <template scope="scope">{{scope.row.source}}</template> -->
      </el-table-column>
      <el-table-column
        align="center"
        label="支付类型"
        width="120"
        prop="payType"
        :formatter="gettypeFormat"
      >
        <!-- <template scope="scope">{{scope.row.payType}}</template> -->
      </el-table-column>
      <el-table-column align="center" width="400" prop="status" label="订单支付金额">
        <template scope="scope">
          <a>{{scope.row.realPay }}</a>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="订单状态"
        width="200"
        prop="status"
        :formatter="getcodeFormat"
      >
        <!-- <template scope="scope">{{scope.row.status}}</template> -->
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template scope="scope">
          <el-button type="primary" @click="applyDetail(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="page.totalCount"
      :current-page.sync="page.currentPage"
      :page-size="page.pageSize"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, jumper"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>
<script>
import { orderPages } from '@/api/organization/orderList'
export default {
  name: 'OrderList',
  components: {
    regionSelect: () => import('@/components/RegionSelect')
    // Bmap: () => import('@/components/BaiduMap')
  },
  data() {
    return {
      list: [],
      start: 1,
      listLoading: false,
      currentId: -1,
      filterText: '',
      page: {
        data: [],
        totalCount: undefined,
        currentPage: undefined,
        totalPage: undefined,
        pageSize: undefined
      },
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 20,
        orgName: undefined
      },
      dialogVisible: false,
      center: {
        lng: 0,
        lat: 0
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getsourceFormat: function(row, column, cellValue, index) {
      if (cellValue == 1) return '机构'
      else if (cellValue == 2) return '学生'
      else {
        return '关闭'
      }
    },
    gettypeFormat: function(row, column, cellValue, index) {
      if (cellValue == 1) return '线上支付'
      else if (cellValue == 2) return '线下支付'
      else {
        return '关闭'
      }
    },
    getcodeFormat(row, column, cellValue, index) {
      switch (cellValue) {
        case -1:
          return '删除'
          break
        case 0:
          return '取消'
          break

        case 1:
          return '待支付'
          break

        case 2:
          return '支付中'
          break

        case 3:
          return '支付成功'
          break
        case 4:
          return '支付失败'
          break

        default:
          return '未知'
      }
    },

    getList() {
      this.listLoading = true
      // if (this.$refs.region) {
      //   this.listQuery.cityCode = this.$refs.region.countyCode
      // }
      orderPages(this.listQuery).then(response => {
        ;(this.page = response.data), (this.listLoading = false)
      })
    },

    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },

    applyDetail(row) {
      this.currentId = row.id
      // this.dialogVisible = true
    }
  }
}
</script>
