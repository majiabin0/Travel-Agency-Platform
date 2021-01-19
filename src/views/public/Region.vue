<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
          <el-select  v-model="provinceCode"ref="provinces" @change="provinceSelected">
            <el-option
              v-for="item in regioneDate"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
          <el-select  v-model="cityCode"ref="city"  @change="citySelected">
            <el-option
              v-for="item in cityDate"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
            <el-button-group>
              
                <!-- <el-button type="primary" icon="plus">添加一级类型</el-button> -->
                <!-- <el-button type="primary" icon="plus" @click="cretaSubCourseType">添加子类型</el-button> -->
            </el-button-group>
        </div>
        <el-row>
            <el-col :span="24">
                <el-table :data="subRegions" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
                  <!-- <el-table-column label="序号" align="center" width="65" type="selection"></el-table-column> -->
                  <el-table-column label="编码" align="center" width="180">
                      <template scope="scope">{{scope.row.code}}</template>
                  </el-table-column>
                  <el-table-column label="地区名称" align="center" width="200">
                      <template scope="scope">{{scope.row.name}}</template>
                  </el-table-column>
                  <el-table-column label="上级编码" align="center" width="180">
                      <template scope="scope">{{scope.row.parentCode}}</template>
                  </el-table-column>
                  <el-table-column label="上级名称" align="center" width="200">
                      <template scope="scope">{{scope.row.parentName}}</template>
                  </el-table-column>
                  <el-table-column label="简称" align="center" width="100">
                      <template scope="scope">{{scope.row.shortName}}</template>
                  </el-table-column>
                  <el-table-column label="类型" align="center" width="100">
                      <template scope="scope">{{scope.row.areaType}}</template>
                  </el-table-column>
                  <el-table-column label="顺序" align="center" width="100">
                      <template scope="scope">{{scope.row.internalOrder}}</template>
                  </el-table-column>
                  <el-table-column label="操作" align="center" width="180">
                      <template scope="scope">
                          <el-button size="small" type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
                      </template>
                  </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisble">
          <el-form :model="form" ref="form" :rules="rules" label-width="100px">
            <el-form-item label="编码" prop="code">
              <el-input v-if="dialogStatus == 'create'" v-model="form.code" placeholder="请输入编码"></el-input>
              <el-input v-else v-model="form.code" placeholder="请输入编码" readonly ></el-input>
            </el-form-item>
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入名称" ></el-input>
            </el-form-item>
            <el-form-item label="简称">
              <el-input v-model="form.shortName" placeholder="请输入类型层级"></el-input>
            </el-form-item>
            <el-form-item label="排序">
              <el-input v-model="form.internalOrder" placeholder="请输入排序" type="number"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel('form')">取消</el-button>
            <!-- <el-button v-if="dialogStatus == 'create'" @click="saveSubCourseType('form')" type="primary">确定</el-button> -->
            <el-button @click="update('form')" type="primary">确定</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
import { provinces, subRegion, getByCode, update, save } from '@/api/public/region'
export default {
  name: 'region',
  data() {
    return {
      listLoading: true,
      regioneDate: [],
      subRegions: [],
      provinceCode: undefined,
      cityCode: undefined,
      cityDate: [],
      textMap: {
        update: '编辑',
        create: '创建'
      },
      dialogFormVisble: false,
      dialogStatus: 'update',
      form: {
        id: undefined,
        code: undefined,
        name: undefined,
        internalOrder: undefined,
        shortName: undefined
      },
      rules: {
        name: [{ required: true, message: '请输入类型名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    provinceData() {
      provinces().then(response => {
        this.regioneDate = response.data
        this.subRegions = response.data
        this.listLoading = false
      })
    },
    provinceSelected() {
      if (this.cityCode) {
        this.cityCode = undefined
      }
      subRegion(this.provinceCode).then(response => {
        if (response.code === 200) {
          this.cityDate = response.data
          this.subRegions = response.data
        }
      })
    },
    citySelected() {
      subRegion(this.cityCode).then(response => {
        if (response.code === 200) {
          this.subRegions = response.data
        }
      })
    },
    getLeafData() {
      let code = this.cityCode ? this.cityCode : this.provinceCode
      if (code) {
        subRegion(code).then(response => {
          this.subRegions = response.data
        })
      } else  {
        this.provinceData()
      }
      
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
    }
  },
  created() {
    this.provinceData()
  }
}
</script>

