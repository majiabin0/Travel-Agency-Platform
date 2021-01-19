<template>
    <div style="margin-top: 16px">
        <el-form :model="form" ref="form" :rules="rules" label-width="100px">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="标题">
                        <el-input v-model="form.articleTitle" :disabled="true" size="medium"></el-input>
                    </el-form-item>
                    <el-form-item label="文章板块">
                        <el-input v-model="form.plateName" :disabled="true" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="课程类型">
                        <el-input v-model="form.courseTypeName" :disabled="true" size="medium"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8"></el-col>
                <el-col :span="8">
                    <el-form-item label="审核次数">
                        <el-input v-model="examineFrom.examineNumber" :disabled="true" size="medium"></el-input>
                    </el-form-item>
                    <el-form-item label="结果描述" prop="remark">
                        <el-input type="textarea" v-model="examineFrom.remark" :rows="4" size="medium" placeholder="请输入描述，200字内"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <editor id="tinymce" v-model="form.articleContent" :init="init"></editor>
            <div>
                <el-button @click="success('examineFrom')" type="success" :disabled="buttonDisabled">通过并发布</el-button>
                <el-button @click="saveDraft('examineFrom')" type="warning" :disabled="buttonDisabled">不通过</el-button>
                <el-button @click="examineList('form')" type="info">审核记录</el-button>
            </div>
        </el-form>

        <el-dialog title="文章审核记录" :visible.sync="dialogFormVisible">
            <el-table :data="examineData" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
                <el-table-column type="index" width="50" align="center"></el-table-column>
                <el-table-column align="center" label="审核提交时间" width="180">
                    <template slot-scope="scope">{{scope.row.submitTime}}</template>
                </el-table-column>
                <el-table-column align="center" label="状态" width="180">
                    <template slot-scope="scope">
                        <span v-if="scope.row.examineStatus === 2">已审核</span>
                        <span v-else>待审核</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="审核时间" width="300">
                    <template slot-scope="scope">{{scope.row.examineTime}}</template>
                </el-table-column>
                <el-table-column align="center" label="通过" width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.examineResult === 1" style="color: green">是</span>
                        <span v-else-if="scope.row.examineResult === 0 && scope.row.examineStatus === 2" style="color: red">否</span>
                        <span v-else></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="结果" width="400">
                    <template slot-scope="scope">{{scope.row.remark}}</template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>

</template>
<script>
import {
    get,
    newestExamine,
    examineHistory,
    examineResult
} from "@/api/content/article";
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver";
import "tinymce/plugins/image"; // 插入上传图片插件
import "tinymce/plugins/media"; // 插入视频插件
import "tinymce/plugins/table"; // 插入表格插件
import "tinymce/plugins/lists"; // 列表插件
import "tinymce/plugins/wordcount"; // 字数统计插件
import "tinymce/plugins/link";
export default {
    name: "examineDetails",
    components: {
        Editor
    },
    props: {
        value: {
            type: String,
            default: ""
        },
        disabled: {
            type: Boolean,
            default: false
        },
        plugins: {
            type: [String, Array],
            default: "lists image media table wordcount link"
        },
        toolbar: {
            type: [String, Array],
            default:
                "undo redo |  formatselect | bold italic forecolor backcolor link | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat"
        }
    },
    data() {
        return {
            form: {
                id: undefined,
                plateCode: undefined,
                plateName: undefined,
                courseTypeCode: undefined,
                courseTypeName: undefined,
                plateType: undefined,
                articleTitle: undefined,
                articleContent: undefined,
                articleStatus: undefined
            },
            examineFrom: {
                id: undefined,
                articleId: undefined,
                result: undefined,
                remark: undefined,
                articleContent: undefined,
                examineStatus: 1,
                examineNumber:0
            },
            examineData: [],
            dialogFormVisible: false,
            buttonDisabled: false,
            listLoading: true,
            rules: {
                plateCode: [
                    {
                        required: true,
                        message: "请输入板块编码",
                        trigger: "blur"
                    }
                ],
                remark: [
                    {
                        required: true,
                        message: "请输入结果描述",
                        trigger: "blur"
                    },
                    { min: 0, max: 200, message: "200字内", trigger: "blur" }
                ]
            },
            init: {
                language_url: "/tinymce/langs/zh_CN.js", // 语言包的路径
                language: "zh_CN", // 语言
                skin_url: "/tinymce/skins/ui/oxide", // skin路径
                plugins: this.plugins,
                toolbar: this.toolbar,
                height: 600, // 编辑器高度
                branding: false, // 是否禁用“Powered by TinyMCE”
                menubar: false, // 顶部菜单栏显示
                images_upload_handler: (blobInfo, success, failure) => {
                    const img = "data:image/jpeg;base64," + blobInfo.base64();
                    console.log(img);
                    success(img);
                }
            }
        };
    },
    methods: {
        success(formName) {
            if (!this.examineFrom.remark) {
                this.examineFrom.remark = "审核通过";
            }
            this.examineFrom.result = 1;
            this.save(formName);
        },
        saveDraft(formName) {
            this.examineFrom.result = 0;
            this.save(formName);
        },
        save(formName) {
            examineResult(this.examineFrom).then(response => {
                if (response.code === 200) {
                    this.$notify({
                        title: "成功",
                        message: "审核结果已保存",
                        duration: 2000
                    });
                    this.buttonDisabled = true;
                }
            });
        },
        examineList() {
            examineHistory(this.$route.params.id).then(response => {
                if (response.code === 200) {
                    this.examineData = response.data;
                    this.dialogFormVisible = true;
                    this.listLoading = false
                }
            });
        }
    },
    created() {},
    mounted() {
        let id = this.$route.params.id;
        if (id) {
            get(id).then(response => {
                if (response.code === 200) {
                    let date = response.data;
                    if (date) {
                        this.form.id = date.id;
                        this.form.plateCode = date.plateCode;
                        this.form.plateName = date.plateName;
                        this.form.courseTypeCode = date.courseTypeCode;
                        this.form.courseTypeName = date.courseTypeName;
                        this.form.plateType = date.plateType;
                        this.form.articleTitle = date.articleTitle;
                        this.form.articleContent = date.articleContent;
                        this.form.articleStatus = date.articleStatus;
                    }
                }
            });
            newestExamine(id).then(response => {
                if (response.code === 200 && response.data) {
                    this.examineFrom = response.data;
                    if (this.examineFrom.examineStatus === 2) {
                        this.buttonDisabled = true;
                    }
                }
            });
        }
    }
};
</script>
