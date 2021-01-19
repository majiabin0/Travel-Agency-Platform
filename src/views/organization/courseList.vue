<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-row>
            <el-col :span="9">
              <regionSelect ref="region"></regionSelect>
            </el-col>
            <el-col :span="14">
              <el-input v-model="listQuery.orgName"  placeholder="请输入机构名称" type="text" style="width: 200px"></el-input>
              <el-input v-model="listQuery.courseName"  placeholder="请输入课程名称" type="text" style="width: 200px"></el-input>
              <el-button type="primary" icon="plus" @click="getList">查询</el-button> 
            </el-col>
          </el-row>
        </div>
        <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
          <el-table-column type="index" width="50" align="center"></el-table-column>
          <el-table-column align="center" label="课程名称" width="200">
              <template slot-scope="scope">{{scope.row.courseName}}</template>
          </el-table-column>
          <el-table-column align="center" label="机构名称" width="240">
              <template slot-scope="scope">{{scope.row.orgName}}</template>
          </el-table-column>
          <el-table-column align="center" label="城市/地区" width="120">
              <template slot-scope="scope">{{scope.row.cityName}}</template>
          </el-table-column>
          <el-table-column align="center" label="课程类型" width="120">
              <template slot-scope="scope">{{scope.row.courseTypeNameThird}}</template>
          </el-table-column>
          <!-- <el-table-column align="center" label="LOGO" width="120">
              <template slot-scope="scope"><img v-bind:src="scope.row.courseLogo"></template>
          </el-table-column> -->
          <el-table-column align="center" label="课程包" width="120">
              <template slot-scope="scope">{{scope.row.suite}}</template>
          </el-table-column>
          <el-table-column align="center" label="状态" width="80">
              <template slot-scope="scope">{{scope.row.courseStatus}}</template>
          </el-table-column>
          <el-table-column align="center" label="添加时间" width="200">
              <template slot-scope="scope">{{scope.row.createTime}}</template>
          </el-table-column>
          <el-table-column align="center" label="修改时间" width="200">
              <template slot-scope="scope">{{scope.row.updateTime}}</template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200">
            <template slot-scope="scope"><el-button type="primary" @click="applyDetail(scope.row)">查看</el-button></template>
          </el-table-column>
        </el-table>
        <el-pagination :total="listQuery.total" :current-page.sync="listQuery.page" :page-size="listQuery.pageSize" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, jumper" @size-change="handleSizeChange"></el-pagination>
        <!-- <el-dialog title="申请详情" :visible.sync="dialogVisible" width="60%">
          <applyDetail :applyId='currentId' ref="applyDetail"></applyDetail>
        </el-dialog> -->
    </div>
</template>
<script>
import { coursePage } from '@/api/organization/organization'
export default {
  name: 'OrganizationApply',
  components: {
    'regionSelect': () => import('@/components/RegionSelect')
  },
  data() {
    return {
      list: [],
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 20,
        total: undefined,
        cityCode: undefined,
        orgName: undefined,
        courseName: undefined
      },
      dialogVisible: false,
      courseSuite: [
        { text: '课程', value: 0 },
        { text: '套餐', value: 1 },
        { text: '课程包', value: 2 }
      ],
      courseStatus: [
        { text: '删除', value: -1 },
        { text: '新建', value: 0 },
        { text: '下架', value: 1 },
        { text: '上架', value: 2 }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      coursePage(this.listQuery).then(response => {
        if (response.data.data) {
          response.data.data.forEach(course => {
            course.suite = this.courseSuite.filter(suite => {
              if (course.suite == suite.value) {
                return true
              }
            })[0].text
            course.courseStatus = this.courseStatus.filter(status => {
              if (course.courseStatus == status.value) {
                return true
              }
            })[0].text
          });
        }
        this.list = response.data.data
        this.listQuery.total = response.data.totalCount
        this.listLoading = false
      })
    },
    applyDetail(row) {
      // this.currentId = row.id
      // this.dialogVisible = true
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    }
  }
}
</script>
