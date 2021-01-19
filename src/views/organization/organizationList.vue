<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 13:17:23
 * @LastEditTime: 2019-08-19 11:59:08
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
            placeholder="请输入机构名称"
            type="text"
            style="width: 200px"
          ></el-input>
          <el-button type="primary" icon="plus" @click="getList">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column align="center" label="机构名称" width="240">
        <template scope="scope">{{scope.row.orgName}}</template>
      </el-table-column>
      <el-table-column align="center" label="城市名称" width="120">
        <template scope="scope">{{scope.row.cityName}}</template>
      </el-table-column>
      <el-table-column align="center" label="联系电话" width="120">
        <template scope="scope">{{scope.row.orgMobile}}</template>
      </el-table-column>
      <el-table-column align="center" label="详细地址" width="400">
        <template scope="scope">
          <a>{{scope.row.orgAddress}}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="入驻时间" width="200">
        <template scope="scope">{{scope.row.createTime}}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template scope="scope">
          <el-button type="primary" @click="applyDetail(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="listQuery.total"
      :current-page.sync="listQuery.page"
      :page-size="listQuery.pageSize"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, jumper"
      @size-change="handleSizeChange"
    ></el-pagination>
    <el-dialog title="位置地图" :visible.sync="dialogVisible" width="60%" @opened="mapOpen">
      <Bmap ref="baiduMap"></Bmap>
    </el-dialog>
  </div>
</template>
<script>
import { orgPages } from '@/api/organization/organization'
export default {
  name: 'OrganizationApply',
  components: {
    regionSelect: () => import('@/components/RegionSelect'),
    Bmap: () => import('@/components/BaiduMap')
  },
  data() {
    return {
      currentId: -1,
      filterText: '',
      list: [],
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 20,
        cityCode: undefined,
        orgName: undefined,
        total: undefined
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
    getList() {
      this.listLoading = true
      if (this.$refs.region) {
        this.listQuery.cityCode = this.$refs.region.countyCode
      }
      orgPages(this.listQuery).then(response => {
        this.list = response.data.data
        this.listQuery.total = response.data.totalCount
        this.listLoading = false
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
    showMap(row) {
      if (row.positionLatitude && row.positionLongitude) {
        this.dialogVisible = true
        this.center = { lng: row.positionLongitude, lat: row.positionLatitude }
      }
    },
    mapOpen() {
      this.$refs.baiduMap.center = this.center
    },
    applyDetail(row) {
      this.currentId = row.id
      // this.dialogVisible = true
    }
  }
}
</script>
