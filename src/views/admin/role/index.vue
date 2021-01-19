<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-button-group>
                <el-button type="primary" icon="plus" @click="handleCreate">添加</el-button>
            </el-button-group>
        </div>
        <el-table :data="page.data" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
          <el-table-column type="index" width="50" align="center"></el-table-column>
          <el-table-column align="center" label="角色名称" width="120">
              <template scope="scope">{{scope.row.roleName}}</template>
          </el-table-column>
          <el-table-column align="center" label="描述" width="400">
              <template scope="scope">{{scope.row.remarks}}</template>
          </el-table-column>
          <el-table-column align="center" label="添加时间" width="200">
              <template scope="scope">{{scope.row.createTime}}</template>
          </el-table-column>
          <el-table-column align="center" label="修改时间" width="200">
              <template scope="scope">{{scope.row.updateTime}}</template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="400">
            <template scope="scope">
              <el-button type="primary" @click="userList(scope.row)">查看用户</el-button>
              <el-button type="primary" icon="edit" @click="handleUpdate(scope.row)">编辑</el-button>
              <el-button type="primary" icon="edit" @click="handleLoadRoleGranted(scope.row)">分配资源</el-button>
              <el-button type="danger" icon="delete" @click="removRole(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-show="!listLoading" class="paging-container">
            <el-pagination :total="page.total" :current-page.sync="listQuery.page" :page-size="listQuery.pageSize" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, jumper" @size-change="handleSizeChange"></el-pagination>
        </div>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="form" :rules="rules" label-width="100px">
            <el-form-item label="角色名称">
              <el-input v-model="form.roleName" placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.description" type="textarea" placeholder="请填写备注" :autosize="{minRows: 3, maxRows: 5}"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel('form')">取消</el-button>
            <el-button v-if="dialogStatus == 'create'" @click="saveRole('form')" type="primary">确定</el-button>
            <el-button v-else @click="updateRole('form')" type="primary">确定</el-button>
          </div>
        </el-dialog>
        <el-dialog :title="userTitle" :visible.sync="dialogVisible" width="60%" @opened="roleUsersOpen">
          <role-user :roleId="roleId" ref="roleUser"></role-user>
        </el-dialog>
        <el-dialog :title="resourcesTitle"  :visible.sync="dialogResourceVisible" @opened="roleResourceData">
          <role-resource ref="roleResouce"></role-resource>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogResourceVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveRoleResources">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
import { page, addRole, updateRole, removRole, updateRoleResource } from '@/api/admin/role'
export default {
  name: 'RoleList',
  components: {
    'role-user': () => import('./components/roleUser.vue'),
    'role-resource': () => import('./components/roleResource.vue')
  },
  data() {
    return {
      filterText: '',
      listLoading: true,
      page: {
        total: 0,
        pageSizes: [10, 20, 30, 50],
        totalPage: 0,
        data: []
      },
      listQuery: {
        roleName: undefined,
        page: 1,
        pageSize: 10
      },
      dialogVisible: false,
      dialogStatus: '',
      dialogFormVisible: false,
      dialogResourceVisible: false,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      form: {
        id: undefined,
        roleName: undefined,
        roleType: undefined,
        description: undefined
      },
      rules: {
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        description: [{ required: true, message: '请选择角色类型', trigger: 'blur' }]
      },
      roleId: undefined,
      userTitle: undefined,
      resourcesTitle: undefined
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      page(this.listQuery).then(response => {
        this.page = response.data
        this.page.total = response.data.totalCount
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
    handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    saveRole(formName) {
      const set = this.$refs
      this.form.menuId = this.listQuery.menuId
      set[formName].validate(valid => {
        if (valid) {
          addRole(this.form).then(response => {
            if (response.code === 200) {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '成功',
                message: '角色添加成功',
                duration: 2000
              })
            }
            this.getList()
          })
        }
      })
    },
    handleUpdate(row) {
      this.form.id = row.id
      this.form.roleName = row.roleName
      this.form.description = row.description
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    updateRole(formName) {
      const set = this.$refs
      this.form.menuId = this.menuId
      set[formName].validate(valid => {
        if (valid) {
          updateRole(this.form).then(response => {
            if (response.code === 200) {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '成功',
                message: '角色修改成功',
                duration: 2000
              })
            }
            this.getList()
          })
        }
      })
    },
    removRole(row) {
      this.$confirm('确认删除该类型？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removRole(row.id).then(response => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            duration: 2000
          })
          this.getList()
        })
      })
    },
    userList(row) {
      this.roleId = row.id
      this.userTitle = row.roleName + '用户'
      this.dialogVisible = true
    },
    roleUsersOpen() {
      this.$refs.roleUser.listQuery.roleId = this.roleId
      this.$refs.roleUser.getRoleUserList()
    },
    resetForm() {
      this.form = {
        id: undefined,
        roleName: undefined,
        roleType: undefined,
        description: undefined
      }
    },
    handleLoadRoleGranted(row) {
      if (!row.id) {
        return
      }
      this.roleId = row.id
      this.resourcesTitle = '分配资源-' + row.roleName
      this.dialogResourceVisible = true
    },
    roleResourceData() {
      this.$refs.roleResouce.roleId = this.roleId
      this.$refs.roleResouce.roleResourceData()
    },
    saveRoleResources() {
      const resourceId = this.$refs.roleResouce.$refs.resourceTree.getCheckedKeys()
      const elements = this.$refs.roleResouce.elementSelectedId
      elements.forEach(element => {
        resourceId.push(element)
      })
      // 角色资源保存
      updateRoleResource(this.roleId, resourceId.join(',')).then(response => {
        if (response.code === 200) {
          this.$notify({
            title: '成功',
            message: '资源分配成功',
            duration: 2000
          })
        }
        this.dialogResourceVisible = false
      })
    }
  }
}
</script>
