<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-select v-model="listQuery.systemName">
                <el-option v-for="scene in systemName" :key="scene.key" :label="scene.name"
                    :value="scene.key"></el-option>
            </el-select>
            <el-button-group>
                <el-button type="primary" icon="plus" @click="handleCreate">添加</el-button>
            </el-button-group>
        </div>
        <el-table :data="page.data" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
            <el-table-column type="index" width="50" align="center"></el-table-column>
            <el-table-column align="center" label="系统类型" width="180">
                <template slot-scope="scope">{{scope.row.systemName}}</template>
            </el-table-column>
            <el-table-column align="center" label="业务编码" width="200">
                <template slot-scope="scope">{{scope.row.businessType}}</template>
            </el-table-column>
            <el-table-column align="center" label="业务编码名称" width="200">
                <template slot-scope="scope">{{scope.row.businessName}}</template>
            </el-table-column>
            <el-table-column align="center" label="数据key" width="200">
                <template slot-scope="scope">{{scope.row.dataKey}}</template>
            </el-table-column>
            <el-table-column align="center" label="数据值" width="200">
                <template slot-scope="scope">{{scope.row.dataValue}}</template>
            </el-table-column>
            <el-table-column align="center" label="数据类型" width="200">
                <template slot-scope="scope">{{scope.row.dataType}}</template>
            </el-table-column>
            <el-table-column align="center" label="状态" width="200">
                <template slot-scope="scope">{{scope.row.dicStatus}}</template>
            </el-table-column>
            <!-- <el-table-column align="center" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button type="primary" icon="edit" @click="handleUpdate(scope.row)">编辑</el-button>
                </template>
            </el-table-column> -->
        </el-table>
        <div v-show="!listLoading" class="paging-container">
            <el-pagination :total="page.totalCount" :current-page.sync="page.page" :page-size="page.pageSize" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, jumper" @size-change="handleSizeChange"></el-pagination>
        </div>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="form" :rules="rules" label-width="100px">
              <el-form-item label="系统" placeholder="选择系统" prop="systemName">
              <el-select v-model="form.systemName">
                <el-option v-for="scene in systemName" :key="scene.key" :label="scene.name" :value="scene.key"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="业务编码" prop="businessType">
              <el-input v-model="form.businessType" placeholder="请输入业务编码"></el-input>
            </el-form-item>
            <el-form-item label="业务编码名称">
              <el-input v-model="form.businessName" placeholder="请输入编码名称"></el-input>
            </el-form-item>
            <el-form-item label="数据key">
              <el-input v-model="form.dataKey" placeholder="请输入数据key"></el-input>
            </el-form-item>
            <el-form-item label="数据值">
              <el-input v-model="form.dataValue" placeholder="请输入数据值"></el-input>
            </el-form-item>
            <el-form-item label="数据类型">
              <el-select v-model="form.dataType">
                <el-option v-for="scene in dataType" :key="scene.type" :label="scene.typeName"
                    :value="scene.type"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.remark"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel('form')">取消</el-button>
            <el-button v-if="dialogStatus == 'create'" @click="saveProtocol('form')" type="primary">确定</el-button>
            <el-button v-else @click="updateProtocol('form')" type="primary">确定</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
import { pageOfDic, saveDic } from "@/api/config/dictionary";
import { systemName } from "@/api/public/public";
export default {
  name: "Dictionary",
  data() {
    return {
      systemName: [],
      filterText: "",
      listLoading: true,
      protocols: [],
      page: {
        total: 0,
        totalCount: 0,
        pageSizes: [10, 20, 30, 50],
        totalPage: 0,
        page: 0,
        pageSize: 10,
        data: []
      },
      listQuery: {
        systemName: undefined,
        page: 1,
        pageSize: 10
      },
      dataType: [
        {type: 'num', typeName: '数字'},
        {type: 'string', typeName: '字符串'},
        {type: 'data-str', typeName: '日期-字符'},
        {type: 'time-str', typeName: '时间-字符'}
      ],
      dialogVisible: false,
      dialogStatus: "",
      dialogFormVisible: false,
      textMap: {
        update: "编辑",
        create: "创建"
      },
      form: {
        id: undefined,
        systemName: undefined,
        businessType: undefined,
        businessName: undefined,
        dataKey: undefined,
        dataValue: undefined,
        remark: undefined,
        dataType: undefined
      },
      rules: {
        title: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: "blur"
          }
        ],
        protocolContent: [
          {
            required: true,
            message: "协议内容不能为空",
            trigger: "blur"
          }
        ],
        scene: [
          {
            required: true,
            message: "请选择协议场景",
            trigger: "blur"
          }
        ]
      },
      roleId: undefined,
      userTitle: undefined
    };
  },
  created() {
    systemName().then(response => {
      if (response.code === 200) {
        this.systemName = response.data;
        this.listQuery.systemName = this.systemName[0].key
        this.getList();
      }
    });
  },
  methods: {
    getList() {
      this.listLoading = true;
      pageOfDic(this.listQuery).then(response => {
          this.page = response.data;
          this.page.data.forEach(dic => {
            this.handlerDic(dic)
          })
          this.listLoading = false;
      });
    },
    handlerDic(dic) {
      //系统名称处理
      this.systemName.forEach(name => {
        if(dic.systemName == name.key) {
          dic.systemName = name.name
        }
      })

      this.dataType.forEach(type => {
        if (dic.dataType === type.type) {
          dic.dataType = type.typeName
        }
      })
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCreate() {
      this.resetForm();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    saveProtocol(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          saveDic(this.form).then(response => {
            if (response.code === 200) {
              this.dialogFormVisible = false;
              this.getList();
              this.$notify({
                title: "成功",
                message: "字典添加成功",
                duration: 2000
              });
            }
            this.getList();
          });
        }
      });
    },
    handleUpdate(row) {
        this.form.id = row.id;
        this.form.systemName = row.systemName;
        this.form.businessType = row.businessType;
        this.form.businessName = row.businessName;
        this.form.dataKey = row.dataKey;
        this.form.dataValue = row.dataValue;
        this.form.remark = row.remark;
        this.form.dataType = row.dataType;

        this.dialogStatus = "update";
        this.dialogFormVisible = true;
    },
    updateProtocol(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          update(this.form).then(response => {
            if (response.code === 200) {
              this.dialogFormVisible = false;
              this.getList();
              this.$notify({
                title: "成功",
                message: "协议修改成功",
                duration: 2000
              });
            }
            this.getList();
          });
        }
      });
    },
    resetForm() {
      this.form = {
        id: undefined,
        title: undefined,
        scene: undefined,
        protocolContent: undefined
      };
    }
  },
  mounted() {
  }
};
</script>
