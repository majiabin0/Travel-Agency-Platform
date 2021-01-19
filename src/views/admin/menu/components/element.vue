<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="资源名称"
        @keyup.enter.native="handleFilter"
        style="width: 200px"
      ></el-input>
      <el-button type="primary" class="filter-item" icon="serach" @click="handleFilter">搜索</el-button>
      <el-button
        type="primary"
        class="filter-item"
        icon="edit"
        @click="handleCreate"
        style="marging-left: 10px"
      >添加</el-button>
    </div>
    <el-table
      :data="page.data"
      :key="tableKey"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="编码" align="center" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.resourceCode}}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.resourceName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="系统" align="center" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.systemType}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="状态" align="center" width="100">
              <template scope="scope"><span>{{scope.row.elementStatus}}</span></template>
      </el-table-column>-->
      <el-table-column label="操作" align="center" width="400">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="removType(scope.row)">删除</el-button>
          <el-button size="small" type="warning" @click="grantPermission(scope.row, true)">权限设置</el-button>
          <el-button size="small" type="info" @click="grantPermission(scope.row, false)">权限查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="paging-container">
      <el-pagination
        :total="page.totalCount"
        :current-page.sync="listQuery.page"
        :page-size="listQuery.pageSize"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, jumper"
        @size-change="handleSizeChange"
      ></el-pagination>
    </div>
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="form" ref="form" :rules="rules" label-width="100px">
        <el-form-item label="元素编码" prop="resourceCode">
          <el-input v-model="form.resourceCode" placeholder="请输入元素编码"></el-input>
        </el-form-item>
        <el-form-item label="元素名称" prop="resourceName">
          <el-input v-model="form.resourceName" placeholder="请输入类型编码"></el-input>
        </el-form-item>
        <!-- <el-form-item label="元素类型" prop="type">
              <el-input placeholder="请输入元素类型" v-model="form.resouceType"></el-input>
        </el-form-item>-->
        <el-form-item label="备注">
          <el-input
            v-model="form.description"
            type="textarea"
            placeholder="请填写备注"
            :autosize="{minRows: 3, maxRows: 5}"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取消</el-button>
        <el-button v-if="dialogStatus == 'create'" @click="saveElement('form')" type="primary">确定</el-button>
        <el-button v-else @click="updateElement('form')" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="资源权限查看" :visible.sync="dialogPrmission">
      <permission-list  ref="permissionList" :systemName="systemName" :resourceId="resourceId" :grant="grant" :data="data"></permission-list>
    </el-dialog>
  </div>
</template>
<script>
import {
  page,
  addElement,
  udateElement,
  removeElement
} from '@/api/admin/element'
import { grantByResourceId, getByResourceId } from '@/api/admin/permission'
export default {
  name: 'Element',
  components: {
    "permission-list": () => import("./permissionList.vue")
  },
  data() {
    return {
      listQuery: {
        menuId: undefined,
        resourceName: undefined,
        page: 1,
        pageSize: 10
      },
      page: {
        total: 0,
        totalCount: 0,
        pageSizes: [10, 20, 30, 50],
        data: []
      },
      tableKey: 0,
      listLoading: false,
      dialogStatus: '',
      dialogFormVisible: false,
      dialogPrmission: false,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      form: {
        id: undefined,
        resourceCode: undefined,
        resourceName: undefined,
        parentId: undefined,
        type: undefined,
        uri: undefined,
        description: undefined,
        systemType: undefined,
        resourceType: undefined
      },
      rules: {
        resourceCode: [
          { required: true, message: '请输入元素编码', trigger: 'blur' }
        ],
        typeName: [
          { required: true, message: '请输入元素名称', trigger: 'blur' }
        ]
      },
      data: [],
      systemName: undefined,
      resourceId: undefined,
      grant: undefined
    }
  },
  methods: {
    handleFilter() {
      this.getElementList()
    },
    getElementList() {
      this.listLoading = true
      page(this.listQuery).then(response => {
        this.page = response.data
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
    handleCreate() {
      if (!this.listQuery.menuId) {
        this.$notify({
          title: '错误',
          message: '请选择一个菜单',
          duration: 2000
        })
      } else {
        this.resetForm()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      }
    },
    cancel() {
      this.dialogFormVisible = false
    },
    saveElement(formName) {
      const set = this.$refs
      this.form.parentId = this.listQuery.menuId
      this.form.systemType = this.menu.systemType
      this.form.resourceType = 'element'
      set[formName].validate(valid => {
        if (valid) {
          addElement(this.form).then(response => {
            if (response.code === 200) {
              this.dialogFormVisible = false
              this.getElementList()
              this.$notify({
                title: '成功',
                message: '元素添加成功',
                duration: 2000
              })
            }
          })
        }
      })
    },
    handleUpdate(row) {
      this.form.id = row.id
      this.form.resourceCode = row.resourceCode
      this.form.resourceName = row.resourceName
      this.form.description = row.description
      this.form.systemType = row.systemType
      this.form.type = row.type
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    updateElement(formName) {
      const set = this.$refs
      this.form.menuId = this.menu.id
      set[formName].validate(valid => {
        if (valid) {
          udateElement(this.form).then(response => {
            if (response.code === 200) {
              this.dialogFormVisble = false
              this.getElementList()
              this.$notify({
                title: '成功',
                message: '元素修改成功',
                duration: 2000
              })
            }
          })
        }
      })
    },
    removType(row) {
      this.$confirm('确认删除该类型？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeElement(row.id).then(response => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            duration: 2000
          })
          this.getElementList()
        })
      })
    },
    grantPermission(row, grant) {
      this.systemName = row.systemType;
      this.resourceId = row.id;
      this.grant = grant
      this.loadData()
      this.dialogPrmission = true
    },
    loadData() {
      if (this.grant) {
        grantByResourceId(this.resourceId, this.systemName).then(response => {
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
    },
    resetForm() {
      this.form = {
        id: undefined,
        resourceCode: undefined,
        resourceName: undefined,
        type: undefined,
        uri: undefined,
        description: undefined
      }
    }
  },
  created() {}
}
</script>

