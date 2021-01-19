<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-button-group>
                <!-- <el-button type="primary" icon="plus">添加一级类型</el-button> -->
                <el-button type="primary" icon="plus" @click="cretaSubCourseType">添加子类型</el-button>
            </el-button-group>
        </div>
        <el-row>
            <el-col :span="6">
              <el-input v-model="filterText" placeholder="请输入关键字进行过滤"></el-input>
              <el-tree
                  :data="courseTypeDate"
                  class="filter-tree"
                  node-key="id"
                  highlight-current
                  :props="defaultProps"
                  @node-click="getLeafType"
                  ref="courseTypeTree"
                  :filter-node-method="filterNode" ></el-tree>
            </el-col>
            <el-col :span="18">
                <el-table :data="leafTypes" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
                  <!-- <el-table-column label="序号" align="center" width="65" type="selection"></el-table-column> -->
                  <el-table-column label="编码" align="center">
                      <template scope="scope">{{scope.row.code}}</template>
                  </el-table-column>
                  <el-table-column label="类型名称" align="center">
                      <template scope="scope">{{scope.row.typeName}}</template>
                  </el-table-column>
                  <el-table-column label="类型层级" align="center">
                      <template scope="scope">{{scope.row.typeLevel}}</template>
                  </el-table-column>
                  <el-table-column label="热门" align="center">
                      <template scope="scope" ><span v-if="scope.row.hotStatus === 1">是</span><span v-else>否</span></template>
                  </el-table-column>
                  <el-table-column label="推荐" align="center">
                      <template scope="scope"><span v-if="scope.row.recommend === 1">是</span><span v-else>否</span></template>
                  </el-table-column>
                  <el-table-column label="顺序" align="center">
                      <template scope="scope">{{scope.row.internalOrder}}</template>
                  </el-table-column>
                  <el-table-column label="操作" align="center">
                      <template scope="scope">
                          <el-button size="small" type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
                          <el-button  size="small" type="danger" @click="removType(scope.row)">删除</el-button>
                      </template>
                  </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisble">
          <el-form :model="form" ref="form" :rules="rules" label-width="100px">
            <el-form-item label="上级id">
              <el-input v-model="form.parentTypeId" placeholder="请输入类型名称" readonly></el-input>
            </el-form-item>
            <el-form-item label="类型编码" prop="code">
              <el-input v-if="dialogStatus == 'create'" v-model="form.code" placeholder="请输入类型编码"></el-input>
              <el-input v-else v-model="form.code" placeholder="请输入类型编码" readonly ></el-input>
            </el-form-item>
            <el-form-item label="类型名称" prop="typeName">
              <el-input v-model="form.typeName" placeholder="请输入类型名称" ></el-input>
            </el-form-item>
            <el-form-item label="类型层级">
              <el-input v-model="form.typeLevel" placeholder="请输入类型层级" readonly type="number"></el-input>
            </el-form-item>
            <el-form-item label="课程图标">
              <el-upload action="/api/oss/file/uploadFile" :show-file-list="false" :on-success="uplodaeSucess" :before-uploade="beforeUploade">
              <img v-if="form.icon" :src="form.icon" class="avatar">
              <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="是否推荐">
              <el-radio-group v-model="form.recommend">
                <el-radio :label="0">否</el-radio>
                <el-radio :label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否热门">
              <el-radio-group v-model="form.hotStatus">
                <el-radio :label="0">否</el-radio>
                <el-radio :label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="排序">
              <el-input v-model="form.internalOrder" placeholder="请输入排序" type="number"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.description" type="textarea" placeholder="请填写备注" :autosize="{minRows: 3, maxRows: 5}"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel('form')">取消</el-button>
            <el-button v-if="dialogStatus == 'create'" @click="saveSubCourseType('form')" type="primary">确定</el-button>
            <el-button v-else @click="update('form')" type="primary">确定</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
import { firstCourseTypes, getLeafType, getByCode, update, save, remove } from '@/api/public/courseType'
export default {
  name: 'CourseType',
  data() {
    return {
      listLoading: true,
      courseTypeDate: [],
      leafTypes: [],
      parentTypeId: 0,
      defaultProps: {
        children: 'subCourse',
        label: 'typeName'
      },
      filterText: '',
      currentTreeType: undefined, // 当前选中类型数中的节点
      currentLeafType: undefined, // 当前选中的叶子类型
      textMap: {
        update: '编辑',
        create: '创建'
      },
      dialogFormVisble: false,
      dialogStatus: 'update',
      form: {
        id: undefined,
        code: undefined,
        typeName: undefined,
        internalOrder: undefined,
        hotStatus: undefined,
        recommend: undefined,
        typeLevel: undefined,
        parentTypeId: 0,
        parentTypeName: undefined,
        description: undefined,
        icon:undefined
      },
      rules: {
        code: [{ required: true, message: '请输入类型编码', trigger: 'blur' }],
        typeName: [{ required: true, message: '请输入类型名称', trigger: 'blur' }]
      },
      isNoOptions: [
        { 0: '否' }, { 1: '是' }
      ]
    }
  },
  methods: {
    getData() {
      firstCourseTypes().then(response => {
        this.courseTypeDate = response.data
        this.leafTypes = response.data
        this.listLoading = false
      })
    },
    getLeafType(data) {
      this.parentTypeId = data.id
      this.getLeafData()
    },
    getLeafData() {
      getLeafType(this.parentTypeId).then(response => {
        this.leafTypes = response.data
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.typeName.indexOf(value) !== -1
    },
    removType(row) {
      this.$confirm('确认删除该类型？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        remove(row.id).then(response => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            duration: 2000
          })
          this.getLeafData()
        })
      })
    },
    handleUpdate(row) {
      getByCode(row.code).then(response => {
        if (response.code === 200) {
          for (const a in this.form) {
            this.form[a] = response.data[a]
          }
        }
        this.dialogFormVisble = true
        this.dialogStatus = 'update'
      })
    },
    cancel(formName) {
      this.dialogFormVisble = false
      this.$refs[formName].resetFields()
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisble = false
          update(this.form).then(response => {
            this.dialogFormVisble = false
            this.getLeafData()
            this.$notify({
              title: '成功',
              message: '修改成功',
              duration: 2000
            })
          })
        }
      })
    },
    cretaSubCourseType() {
      this.form.parentTypeId = this.parentTypeId ? this.parentTypeId : 0
      this.dialogFormVisble = true
      this.dialogStatus = 'create'
      this.$refs['form'].resetFields()
    },
    saveSubCourseType(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisble = false
          save(this.form).then(response => {
            this.dialogFormVisble = false
            this.getData()
            this.$notify({
              title: '成功',
              message: '类型添加成功',
              duration: 2000
            })
          })
        }
      })
    },
    beforeUploade(file) {
      if (!(file.size / 1024 / 1024 < 2)) {
        this.$message.error('上传图片大小不能超过2MB！')
        return false
      }
      return true
    },
    uplodaeSucess(res, file) {
      if(res.code === 200) {
        this.form.icon = res.data.address
      }
    },
  },
  created() {
    this.getData()
  },
  watch: {
    filterText(val) {
      this.$refs.courseTypeTree.filter(val)
    }
  }
}
</script>

