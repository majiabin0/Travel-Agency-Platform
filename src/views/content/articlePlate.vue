<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-button-group>
                <el-button type="primary" icon="plus" @click="cretaPlate">添加板块</el-button>
            </el-button-group>
        </div>
            <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
              <!-- <el-table-column label="序号" align="center" width="65" type="selection"></el-table-column> -->
              <el-table-column label="板块编码" align="center" width="180">
                  <template slot-scope="scope">{{scope.row.plateCode}}</template>
              </el-table-column>
              <el-table-column label="板块名称" align="center" width="100">
                  <template slot-scope="scope">{{scope.row.plateName}}</template>
              </el-table-column>
              <el-table-column label="热门" align="center" width="100">
                  <template slot-scope="scope" ><span v-if="scope.row.plateType === 1">通用</span><span v-else>系统专用</span></template>
              </el-table-column>
              <el-table-column label="状态" align="center" width="100">
                  <template slot-scope="scope" ><span v-if="scope.row.plateStatus === 1">正常</span><span v-else>禁用</span></template>
              </el-table-column>
              <el-table-column label="顺序" align="center" width="100">
                  <template slot-scope="scope">{{scope.row.plateSort}}</template>
              </el-table-column>
              <el-table-column label="添加时间" align="center" width="180">
                  <template slot-scope="scope">{{scope.row.createTime}}</template>
              </el-table-column>
              <el-table-column label="修改时间" align="center" width="180">
                  <template slot-scope="scope">{{scope.row.updateTime}}</template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="180">
                  <template slot-scope="scope">
                      <el-button size="small" type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
                      <el-button  size="small" type="danger" @click="removPlate(scope.row)">禁用</el-button>
                  </template>
              </el-table-column>
            </el-table>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisble">
          <el-form :model="form" ref="form" :rules="rules" label-width="100px">
            <el-form-item label="板块编码" prop="plateCode">
              <el-input v-model="form.plateCode" placeholder="请输入类型名称"></el-input>
            </el-form-item>
            <el-form-item label="类型名称" prop="plateName">
              <el-input v-model="form.plateName" placeholder="请输入类型名称" ></el-input>
            </el-form-item>
            <el-form-item label="板块类型">
              <el-select v-model="form.plateType">
                <el-option key="1" label="通用" value="1"></el-option>
                <el-option key="0" label="系统专用" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排序">
              <el-input v-model="form.plateSort" placeholder="请输入排序" type="number"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel('form')">取消</el-button>
            <el-button v-if="dialogStatus == 'create'" @click="savePlate('form')" type="primary">确定</el-button>
            <el-button v-else @click="update('form')" type="primary">确定</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
import { allPlate, updatePlate, savePlate } from '@/api/content/article'
export default {
  name: 'ArticlePlate',
  data() {
    return {
      listLoading: true,
      list: [],
      textMap: {
        update: '编辑',
        create: '创建'
      },
      dialogFormVisble: false,
      dialogStatus: 'update',
      form: {
        id: undefined,
        plateCode: undefined,
        plateName: undefined,
        plateSort: undefined,
        plateType: undefined
      },
      rules: {
        plateCode: [{ required: true, message: '请输入板块编码', trigger: 'blur' }],
        plateName: [{ required: true, message: '请输入板块名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    getData() {
      allPlate().then(response => {
        if (response.code === 200) {
          this.list = response.data
          this.listLoading = false;
        }
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.typeName.indexOf(value) !== -1
    },
    handleUpdate(row) {
      this.form.id = row.id
      this.form.plateCode = row.plateCode
      this.form.plateName = row.plateName
      this.form.plateSort = row.plateSort
      this.form.plateType = row.plateType
      this.dialogFormVisble = true
      this.dialogStatus = 'update'
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
          updatePlate(this.form).then(response => {
            this.dialogFormVisble = false
            this.getData()
            this.$notify({
              title: '成功',
              message: '修改成功',
              duration: 2000
            })
          })
        }
      })
    },
    cretaPlate() {
      this.dialogFormVisble = true
      this.dialogStatus = 'create'
      this.$refs['form'].resetFields()
    },
    savePlate(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisble = false
          savePlate(this.form).then(response => {
            this.dialogFormVisble = false
            this.getData()
            this.$notify({
              title: '成功',
              message: '板块添加成功',
              duration: 2000
            })
          })
        }
      })
    }
  },
  created() {
    this.getData()
  },
  watch: {
    
  }
}
</script>

