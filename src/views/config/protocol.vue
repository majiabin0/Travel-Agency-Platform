<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
          <el-select v-model="sceneCode">
            <el-option v-for="scene in allSceneCode" :key="scene.sceneCode" :label="scene.name" :value="scene.sceneCode"></el-option>
          </el-select>
          <el-button-group>
              <el-button type="primary" icon="plus" @click="handleCreate">添加</el-button>
          </el-button-group>
        </div>
        <el-table :data="protocols" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
          <el-table-column type="index" width="50" align="center"></el-table-column>
          <el-table-column align="center" label="场景编码" width="180">
              <template scope="scope">{{scope.row.scene}}</template>
          </el-table-column>
          <el-table-column align="center" label="场景名称" width="180">
              <template scope="scope">{{scope.row.sceneName}}</template>
          </el-table-column>
          <el-table-column align="center" label="标题" width="300">
              <template scope="scope">{{scope.row.title}}</template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="400">
            <template scope="scope">
              <el-button type="primary" icon="edit" @click="handleUpdate(scope.row)">编辑</el-button>
              <!-- <el-button type="danger" icon="delete" @click="removRole(scope.row)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="form" :rules="rules" label-width="100px">
              <el-form-item label="场景" placeholder="选择协议场景" prop="scene">
              <el-select v-model="form.scene">
                <el-option v-for="scene in allSceneCode" :key="scene.sceneCode" :label="scene.name" :value="scene.sceneCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title" placeholder="请输入协议名称"></el-input>
            </el-form-item>
            <el-form-item label="协议内容">
              <!-- <el-input v-model="form.description" type="textarea" placeholder="请填写备注" :autosize="{minRows: 3, maxRows: 5}"></el-input> -->
              <editor id="tinymce" v-model="form.protocolContent" :init="init"></editor>
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
import { search, save, allScenes, update } from '@/api/config/protocol'
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import 'tinymce/plugins/image'// 插入上传图片插件
import 'tinymce/plugins/media'// 插入视频插件
import 'tinymce/plugins/table'// 插入表格插件
import 'tinymce/plugins/lists'// 列表插件
import 'tinymce/plugins/wordcount'// 字数统计插件

export default {
  name: 'Protocol',
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: 'lists image media table wordcount'
    },
    toolbar: {
      type: [String, Array],
      default: 'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat'
    }
  },
  data() {
    return {
      allSceneCode: [],
      filterText: '',
      listLoading: true,
      protocols: [],
      page: {
        total: 0,
        pageSizes: [10, 20, 30, 50],
        totalPage: 0,
        data: []
      },
      listQuery: {
        scene: undefined,
        page: 1,
        pageSize: 10
      },
      sceneCode: undefined,
      dialogVisible: false,
      dialogStatus: '',
      dialogFormVisible: false,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      form: {
        id: undefined,
        title: undefined,
        roleType: undefined,
        protocolContent: undefined,
        scene: undefined
      },
      rules: {
        title: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        protocolContent: [{ required: true, message: '协议内容不能为空', trigger: 'blur' }],
        scene: [{ required: true, message: '请选择协议场景', trigger: 'blur' }]
      },
      roleId: undefined,
      userTitle: undefined,
      init: {
        language_url: '/tinymce/langs/zh_CN.js', // 语言包的路径
        language: 'zh_CN', // 语言
        skin_url: '/tinymce/skins/ui/oxide', // skin路径
        plugins: this.plugins,
        toolbar: this.toolbar,
        height: 300, // 编辑器高度
        branding: false, // 是否禁用“Powered by TinyMCE”
        menubar: false, // 顶部菜单栏显示
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          console.log(img)
        }
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      search(this.sceneCode).then(response => {
        this.protocols = response.data
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
    saveProtocol(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          save(this.form).then(response => {
            if (response.code === 200) {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '成功',
                message: '协议添加成功',
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
      this.form.title = row.title
      this.form.scene = row.scene
      this.form.protocolContent = row.protocolContent
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    updateProtocol(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          update(this.form).then(response => {
            if (response.code === 200) {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '成功',
                message: '协议修改成功',
                duration: 2000
              })
            }
            this.getList()
          })
        }
      })
    },
    resetForm() {
      this.form = {
        id: undefined,
        title: undefined,
        scene: undefined,
        protocolContent: undefined
      }
    }
  },
  mounted() {
    allScenes().then(response => {
      if (response.code === 200) {
        this.allSceneCode = response.data
      }
    })
  }
}
</script>
