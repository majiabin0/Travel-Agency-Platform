<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input
        v-model="url"
        placeholder="资源名称"
        @keyup.enter.native="handleFilter"
        style="width: 200px"
      ></el-input>
      <el-button type="primary" class="filter-item" icon="serach" @click="handleFilter">搜索</el-button>
    </div>
    <el-table
      :data="data"
      v-loading.body="false"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="权限地址" align="center" width="400">
        <template slot-scope="scope">
          <span>{{scope.row.url}}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.permissionName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="280">
        <template slot-scope="scope">
          <el-button v-if="grant" size="small" type="primary"  @click="grantPermission(scope.row)">选择</el-button>
          <el-button v-else size="small" type="primary" @click="relievePermission(scope.row)">解除</el-button>
          <el-button size="small" type="success" @click="updateName(scope.row)">修改名称</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { grantByResourceId, getByResourceId, updateName, grantPermission, relievePermission } from '@/api/admin/permission'
export default {
  name: 'permissionList',
  props: ['systemName', 'resourceId', 'grant', 'data'],
  data() {
    return {
      listLoading: true,
      url: undefined
    }
  },
  methods: {
    handleFilter() {
      this.loadData()
    },
    loadData() {
      if (this.grant) {
        grantByResourceId(this.resourceId, this.systemName, this.url).then(response => {
          if (response.code === 200) {
            this.data = response.data
          }
        })
      } else {
        getByResourceId(this.resourceId, this.systemName).then(response => {
          if (response.code === 200) {
            this.data = response.data
          }
        })
      }
      this.listLoading = false
    },
    updateName(row) {
      this.$prompt("请输入名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
        if (value) {
          updateName(row.id, value).then(response => {
            if (response.code === 200) {
              this.$notify({
                title: "成功",
                message: "修改成功",
                duration: 2000
              });
              this.loadData()
            }
          });
        }
      }).catch(() => {});
    },
    grantPermission(row) {
      this.$confirm('确认关联权限？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        grantPermission(this.resourceId, row.id).then(response => {
          this.$notify({
            title: '成功',
            message: '关联成功',
            duration: 2000
          })
          this.loadData()
        })
      })
    },
    relievePermission(row) {
      this.$confirm('确认解除权限？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        relievePermission(this.resourceId, row.id).then(response => {
          this.$notify({
            title: '成功',
            message: '解除成功',
            duration: 2000
          })
          this.loadData()
        })
      })
    }
  }
}
</script>
