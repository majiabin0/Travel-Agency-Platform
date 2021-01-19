<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-select v-model="listQuery.systemType" placeholder="请选择系统">
        <el-option v-for="name in systemName" :key="name.key" :label="name.name" :value="name.key"></el-option>
      </el-select>
      <el-button type="primary" icon="plus" @click="handleCreate">添加</el-button>
    </div>
    <el-table :data="page.data" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="系统标识" width="120" prop="systemType" :formatter="systemTypeFormatter"></el-table-column>
      <el-table-column align="center" label="会员名称" width="200">
        <template slot-scope="scope">{{scope.row.membershipName}}</template>
      </el-table-column>
      <el-table-column align="center" label="有效天数" width="120">
        <template slot-scope="scope">{{scope.row.membershipCycle}}</template>
      </el-table-column>
      <el-table-column align="center" label="价格（元）" width="120">
        <template slot-scope="scope">{{scope.row.presentPrice}}</template>
      </el-table-column>
      <el-table-column align="center" label="优惠（元）" width="120">
        <template slot-scope="scope">{{scope.row.specialPrice}}</template>
      </el-table-column>
      <el-table-column align="center" label="标识图片" width="130">
        <template slot-scope="scope">{{scope.row.iconStr}}</template>
      </el-table-column>
      <el-table-column align="center" label="是否优惠" width="100">
        <template slot-scope="scope">{{scope.row.discount}}</template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="100">
        <template slot-scope="scope">{{scope.row.membershipStatus}}</template>
      </el-table-column>
      <el-table-column align="center" label="添加时间" width="180">
        <template slot-scope="scope">{{scope.row.createTime}}</template>
      </el-table-column>
      <el-table-column align="center" label="修改时间" width="180">
        <template slot-scope="scope">{{scope.row.updateTime}}</template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="edit" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="primary" icon="edit" @click="handleLoadRoleGranted(scope.row)">分配资源</el-button>
          <!-- <el-button type="primary" @click="userList(scope.row)">查看用户</el-button>
          
          
          <el-button type="danger" icon="delete" @click="removRole(scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="paging-container">
        <el-pagination :total="page.total" :current-page.sync="listQuery.page" :page-size="listQuery.pageSize" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, jumper" @size-change="handleSizeChange"></el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form :model="form" ref="form" :rules="rules" label-width="100px">
          <el-form-item label="系统" placeholder="选择系统" prop="systemType">
            <el-select v-model="form.systemType">
              <el-option v-for="name in systemName" :key="name.key" :label="name.name" :value="name.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会员名称" prop="membershipName">
            <el-input v-model="form.membershipName" placeholder="请输入会员名称"></el-input>
          </el-form-item>
          <el-form-item label="有效天数" prop="membershipCycle">
            <el-input v-model="form.membershipCycle" placeholder="请输入有效天数" type="number"></el-input>
          </el-form-item>
          <el-form-item label="会员价格">
            <el-input v-model="form.presentPrice" placeholder="请输入会员价格"></el-input>
          </el-form-item>
          <el-form-item label="优惠价格" >
            <el-input v-model="form.specialPrice" placeholder="请输入会员价格"></el-input>
          </el-form-item>
          <el-form-item label="标识图标" >
            <el-input v-model="form.iconStr" placeholder="请输入会员价格"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" type="textarea" placeholder="请填写备注" :autosize="{minRows: 3, maxRows: 5}"></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取消</el-button>
        <el-button v-if="dialogStatus == 'create'" @click="saveRole('form')" type="primary">确定</el-button>
        <el-button v-else @click="updateRole('form')" type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { page, save, updateRole, allStatus, updateRoleResource } from '@/api/admin/membership'
import { systemName } from "@/api/public/public";
export default {
  name: 'Membership',
  data() {
    return {
      systemName: [],
      statusArray: [],
      filterText: '',
      listLoading: true,
      page: {
        total: 0,
        pageSizes: [10, 20, 30, 50],
        totalPage: 0,
        data: []
      },
      listQuery: {
        systemType: undefined,
        membershipName: undefined,
        page: 1,
        pageSize: 10
      },
      dialogStatus: '',
      dialogFormVisible: false,
      dialogResourceVisible: false,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      form: {
        id: undefined,
        systemType:undefined,
        membershipName: undefined,
        membershipCycle: undefined,
        presentPrice:undefined,
        specialPrice: undefined,
        iconStr: undefined,
        remark: undefined
      },
      rules: {
        systemType: [{ required: true, message: '请输选择系统', trigger: 'blur' }],
        membershipName: [{ required: true, message: '请输入会员名称', trigger: 'blur' }]
      },
      roleId: undefined,
      userTitle: undefined,
      resourcesTitle: undefined
    }
  },
  created() {
    systemName().then(response => {
      if (response.code === 200) {
        this.systemName = response.data;
      }
    });
    allStatus().then(response => {
      if (response.code === 200) {
        this.statusArray = response.data;
      }
    });
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
    systemTypeFormatter: function(row, column, cellValue, index) {
      let type
      this.systemName.forEach(sytem => {
        if (sytem.key === cellValue) {
          type = sytem.name
        }
      })
      return type
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
          save(this.form).then(response => {
            if (response.code === 200) {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '成功',
                message: '会员添加成功',
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
      this.form.systemType = row.systemType
      this.form.membershipName = row.membershipName
      this.form.membershipCycle = row.membershipCycle
      this.form.presentPrice = row.presentPrice
      this.form.specialPrice = row.specialPrice
      this.form.iconStr = row.iconStr
      this.form.remark = row.remark
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
    // removRole(row) {
    //   this.$confirm('确认删除该类型？', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     removRole(row.id).then(response => {
    //       this.$notify({
    //         title: '成功',
    //         message: '删除成功',
    //         duration: 2000
    //       })
    //       this.getList()
    //     })
    //   })
    // },
    resetForm() {
      this.form = {
        id: undefined,
        systemType:undefined,
        membershipName: undefined,
        membershipCycle: undefined,
        presentPrice:undefined,
        specialPrice: undefined,
        iconStr: undefined,
        remark: undefined
      }
    },
    handleLoadRoleGranted(row) {
      // if (!row.id) {
      //   return
      // }
      // this.roleId = row.id
      // this.resourcesTitle = '分配资源-' + row.roleName
      // this.dialogResourceVisible = true
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
