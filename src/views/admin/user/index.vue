<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-button-group>
                <el-button type="primary" icon="plus" @click="handleCreate">添加</el-button>
            </el-button-group>
        </div>
        <el-table :data="page.data" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
          <el-table-column type="index" width="50" align="center"></el-table-column>
          <el-table-column align="center" label="姓名" width="120">
              <template scope="scope">{{scope.row.realName}}</template>
          </el-table-column>
          <el-table-column align="center" label="账号" width="120">
              <template scope="scope">{{scope.row.userName}}</template>
          </el-table-column>
          <el-table-column align="center" label="电话" width="200">
              <template scope="scope">{{scope.row.mobilePhone}}</template>
          </el-table-column>
          <el-table-column align="center" label="状态" width="200">
              <template scope="scope">{{scope.row.userStatus}}</template>
          </el-table-column>
          <el-table-column align="center" label="创建时间" width="200">
              <template scope="scope">{{scope.row.createTime}}</template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="400">
            <template scope="scope">
              <el-button type="primary" @click="applyDetail(scope.row)">查看角色</el-button>
              <el-button type="primary" icon="edit" @click="handleUpdate(scope.row)">编辑</el-button>
              <el-button  v-if="name !== scope.row.userName && scope.row.type !== 0" type="danger" icon="delete" @click="removUser(scope.row)">删除</el-button>
                <el-button v-if="name !== scope.row.userName && scope.row.type !== 0" type="primary" @click="applyDetail(scope.row)">角色分配</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-show="!listLoading" class="paging-container">
            <el-pagination :total="page.total" :current-page.sync="listQuery.page" :page-size="listQuery.pageSize" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, jumper" @size-change="handleSizeChange"></el-pagination>
        </div>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="form" :rules="rules" label-width="100px">
            <el-form-item label="姓名">
              <el-input v-model="form.realName" placeholder="请输入用户姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机">
              <el-input v-model="form.mobilePhone" placeholder="请输入用户手机号码"></el-input>
            </el-form-item>
            <el-form-item label="账号">
              <el-input v-model="form.userName" placeholder="请输入登录账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" v-if="dialogStatus === 'create'">
              <el-input v-model="form.password" placeholder="请输入用户密码"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.description" type="textarea" placeholder="请填写备注" :autosize="{minRows: 3, maxRows: 5}"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel('form')">取消</el-button>
            <el-button v-if="dialogStatus == 'create'" @click="saveUser('form')" type="primary">确定</el-button>
            <el-button v-else @click="updateUser('form')" type="primary">确定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="角色分配" :visible.sync="dialogVisible" width="60%" ref="userRoleDialog" @opened="dialogOpen">
          <user-roles :userId='userId' ref="userRoles"></user-roles>
        </el-dialog>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { pageUser, addUser, modifyUser, removeUser } from '@/api/admin/user'
export default {
  name: 'RoleList',
  components: {
    'user-roles': () => import('./components/userRoles.vue')
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar'
    ])
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
        userName: undefined,
        page: 1,
        pageSize: 10
      },
      dialogVisible: false,
      dialogStatus: '',
      dialogFormVisible: false,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      imageUrl: undefined,
      form: {
        id: undefined,
        realName: undefined,
        userName: undefined,
        password: undefined,
        mobilePhone: undefined,
        description: undefined,
        avatar: undefined
      },
      rules: {
        realName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        userName: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在6到10个字符', trigger: 'blur' }],
        mobilePhone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }]
      },
      userId: undefined
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      pageUser(this.listQuery).then(response => {
        this.page = response.data
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
    saveUser(formName) {
      const set = this.$refs
      this.form.menuId = this.listQuery.menuId
      set[formName].validate(valid => {
        if (valid) {
          addUser(this.form).then(response => {
            if (response.code === 200) {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '成功',
                message: '用户添加成功',
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
      this.form.realName = row.realName
      this.form.description = row.description
      this.form.userName = row.userName
      this.form.mobilePhone = row.mobilePhone
      this.form.avatar = row.avatar
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    updateUser(formName) {
      const set = this.$refs
      this.form.menuId = this.menuId
      set[formName].validate(valid => {
        if (valid) {
          modifyUser(this.form).then(response => {
            if (response.code === 200) {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '成功',
                message: '用户修改成功',
                duration: 2000
              })
            }
            this.getList()
          })
        }
      })
    },
    removUser(row) {
      this.$confirm('确认删除该类型？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeUser(row.id).then(response => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            duration: 2000
          })
          this.getList()
        })
      })
    },
    applyDetail(row) {
      this.userId = row.id
      this.dialogVisible = true
    },
    resetForm() {
      this.form = {
        id: undefined,
        roleName: undefined,
        roleType: undefined,
        description: undefined,
        avatar: undefined
      }
    },
    beforeAvatarUploade(file) {
      if (!(file.size / 1024 / 1024 < 2)) {
        this.$message.error('上传图片大小不能超过2MB！')
        return false
      }
      return true
    },
    handleAvatarSucess(res, file) {
      // 文件请求路径，会改成file.response.data
      if (res.code === 200) {
        this.form.avatar = res.data.address
      }
    },
    dialogOpen() {
      this.$refs.userRoles.userId = this.userId
      this.$refs.userRoles.getRoles()
    }
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
