<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-input v-model="listQuery.name" placeholder="用户姓名" @keyup.enter.native="handleFilter" style="width: 200px"></el-input>
            <el-button type="primary" class="filter-item" icon="serach" @click="handleFilter">搜索</el-button>
        </div>
        <el-table :data="page.list" :key="tableKey" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
          <el-table-column label="手机" align="center" width="150">
              <template scope="scope"><span>{{scope.row.mobilePhone}}</span></template>
          </el-table-column>
          <el-table-column label="账号" align="center" width="150">
              <template scope="scope"><span>{{scope.row.userName}}</span></template>
          </el-table-column>
          <el-table-column label="实名" align="center" width="100">
              <template scope="scope"><span>{{scope.row.realName}}</span></template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="180">
              <template scope="scope">
                  <el-button  size="small" type="danger" @click="revokeUser(scope.row)">撤销</el-button>
              </template>
        </el-table-column>
        </el-table>
        <div v-show="!listLoading" class="paging-container">
            <el-pagination :total="page.total" :current-page.sync="listQuery.page" :page-size="listQuery.pageSize" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, jumper" @size-change="handleSizeChange"></el-pagination>
        </div>
    </div>
</template>
<script>
import { roleUser, revoke } from '@/api/admin/role'
export default {
  name: 'RoleUser',
  data() {
    return {
      listQuery: {
        roleId: undefined,
        page: 1,
        pageSize: 10
      },
      page: {
        total: 0,
        pageSizes: [10, 20, 30, 50],
        list: []
      },
      tableKey: 0,
      listLoading: false,
      dialogStatus: '',
      dialogFormVisible: false,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      form: {
        id: undefined,
        code: undefined,
        name: undefined,
        menuId: undefined,
        type: undefined,
        uri: undefined,
        description: undefined
      },
      rules: {
        code: [{ required: true, message: '请输入元素编码', trigger: 'blur' }],
        typeName: [{ required: true, message: '请输入元素名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleFilter() {
      this.getRoleUserList()
    },
    getRoleUserList() {
      this.listLoading = true
      roleUser(this.listQuery).then(response => {
        this.page.list = response.data.data
        this.page.total = response.data.totalCount
        console.log(this.page.total)
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getElementList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getElementList()
    },
    revokeUser(row) {
      this.$confirm('确认撤销', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        revoke(row.id, this.listQuery.roleId).then(response => {
          this.$notify({
            title: '成功',
            message: '撤销成功',
            duration: 2000
          })
          this.getRoleUserList()
        })
      })
    }
  }
}
</script>

