<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <!-- <el-button-group>
                <el-button type="primary" icon="plus">添加</el-button>
                <el-button type="primary" icon="edit">编辑</el-button>
                <el-button type="primary" icon="delete">删除</el-button>
            </el-button-group> -->
        </div>
        <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
          <el-table-column type="index" width="50" align="center"></el-table-column>
          <el-table-column align="center" label="机构名称" width="120">
              <template slot-scope="scope">{{scope.row.orgName}}</template>
          </el-table-column>
          <el-table-column align="center" label="所在城市" width="120">
              <template slot-scope="scope">{{scope.row.placeOfCity}}</template>
          </el-table-column>
          <el-table-column align="center" label="申请人姓名" width="120">
              <template slot-scope="scope">{{scope.row.contactsName}}</template>
          </el-table-column>
          <el-table-column align="center" label="联系电话" width="120">
              <template slot-scope="scope">{{scope.row.contactsPhone}}</template>
          </el-table-column>
          <el-table-column align="center" label="QQ" width="120">
              <template slot-scope="scope">{{scope.row.qq}}</template>
          </el-table-column>
          <el-table-column align="center" label="状态" width="80" prop="applyStatus">
              <template slot-scope="scope">{{scope.row.applyStatus}}</template>
          </el-table-column>
          <el-table-column align="center" label="申请时间" width="200">
              <template slot-scope="scope">{{scope.row.createTime}}</template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200">
            <template slot-scope="scope"><el-button type="primary" @click="applyDetail(scope.row)">查看</el-button></template>
          </el-table-column>
        </el-table>
        <el-dialog title="申请详情" :visible.sync="dialogVisible" width="60%">
          <applyDetail :applyId='currentId' ref="applyDetail" @refresh="refresh"></applyDetail>
        </el-dialog>
    </div>
</template>
<script>
import { page } from '@/api/organization/orgApply'
export default {
  name: 'OrganizationApply',


  data() {
    return {
      currentId: -1,
      filterText: '',
      list: [],
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 20
      },
      applyStatus: [
        { text: '新申请', value: 1 },
        { text: '审核中', value: 2 },
        { text: '已审核', value: 3 },
        { text: '再次审核', value: 4 },
        { text: '不再审核', value: 5 }
      ],
      dialogVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      page(this.listQuery).then(response => {
        this.list = response.data.data
        this.list.forEach(apply => {
          apply.applyStatus = this.applyStatus.filter(status => {
            if (status.value === apply.applyStatus) {
              return true
            }
          })[0].text
        })
        this.listLoading = false
      })
    },
    applyDetail(row) {
      this.currentId = row.id
      this.dialogVisible = true
    },
    refresh() {
      this.dialogVisible = false
      this.getList()
    }
  }
}
</script>
