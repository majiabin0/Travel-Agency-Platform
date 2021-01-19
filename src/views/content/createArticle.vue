<template>
    <div style="margin-top: 16px">
        <el-form :model="form" ref="form" :rules="rules" label-width="100px">
            <el-form-item label="板块" prop="plateCode">
                <el-select v-model="form.plateCode">
                    <el-option v-for="item in plateList" :key="item.plateCode" :label="item.plateName" :value="item.plateCode">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="课程类型" prop="plateName">
                <courseTypeSelect ref="courseType"></courseTypeSelect>
            </el-form-item>
            <el-form-item label="标题" prop="articleTitle">
                <el-input v-model="form.articleTitle" placeholder="请输入文章标题"></el-input>
            </el-form-item>
            <editor id="tinymce" v-model="form.articleContent" :init="init"></editor>
            <div>
                <el-button @click="clear('form')">清除</el-button>
                <el-button @click="saveIssued('form')" type="primary">提交审核</el-button>
                <el-button @click="saveDraft('form')" type="primary">保存草稿</el-button>
            </div>
        </el-form>
    </div>

</template>
<script>
import {
    allPlate,
    createArticle,
    get,
    upadteArticle,
    uploadFile
} from "@/api/content/article";
import { firstCourseTypes, getLeafType } from "@/api/public/courseType";
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
    name: "createArticle",
    components: {
        Editor,
        courseTypeSelect: () => import("@/components/CourseTypeSelect")
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
            plateList: [],
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
            rules: {
                plateCode: [
                    {
                        required: true,
                        message: "请输入板块编码",
                        trigger: "blur"
                    }
                ],
                articleTitle: [
                    {
                        required: true,
                        message: "请输入文章标题",
                        trigger: "blur"
                    }
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
                    this.imagesUploadHandler(blobInfo, success, failure);
                }
            }
        };
    },
    methods: {
        clear() {
            this.form.articleContent = "";
        },
        saveIssued(formName) {
            this.form.articleStatus = 2;
            this.save(formName);
        },
        saveDraft(formName) {
            this.form.articleStatus = 1;
            this.save(formName);
        },
        imagesUploadHandler(blobInfo, success, failure) {
            let formdata = new FormData()
            formdata.append('file', blobInfo.blob())
            uploadFile(formdata).then(res => {
                success(res.data.msg);
                }).catch(res => {
                    failure("error");
                });
        },
        save(formName) {
            // 课程类型处理
            // 课程类型格式为： 一级类型/二级类型/三级类型
            let courseType = this.$refs.courseType.courseType;
            if (!courseType) {
                return;
            }
            let typeCode = courseType.code;
            let typeName = courseType.typeName;
            let subCourse = courseType.subCourse;
            if (subCourse) {
                typeCode += "/" + subCourse.code;
                typeName += "/" + subCourse.typeName;

                if (subCourse.subCourse) {
                    typeCode += "/" + subCourse.subCourse.code;
                    typeName += "/" + subCourse.subCourse.typeName;
                }
            }
            this.form.courseTypeCode = typeCode;
            this.form.courseTypeName = typeName;
            // 处理板块名称问题
            this.plateList.forEach(plate => {
                if (plate.plateCode === this.form.plateCode) {
                    this.form.plateName = plate.plateName;
                }
            });

            this.form.typeCode = typeCode;
            this.form.typeName = typeName;
            if (this.form.id) {
                upadteArticle(this.form).then(response => {
                    if (response.code === 200) {
                        this.$notify({
                            title: "成功",
                            message: "创建成功",
                            duration: 2000
                        });
                    }
                });
            } else {
                createArticle(this.form).then(response => {
                    if (response.code === 200) {
                        this.form = response.data;
                        this.$notify({
                            title: "成功",
                            message: "修改成功",
                            duration: 2000
                        });
                    }
                });
            }
        }
    },
    created() {
        allPlate().then(response => {
            if (response.code === 200) {
                this.plateList = response.data;
            }
        });
    },
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
                        if (this.form.courseTypeCode) {
                            let type = this.form.courseTypeCode.split("/");
                            this.$refs.courseType.courseTypeCode = type[0];
                            this.$refs.courseType.subCourseType(type[0]);
                            this.$refs.courseType.secondCourseType = type[1];
                            this.$refs.courseType.selectedSecond(type[1]);
                            this.$refs.courseType.thirdCourseType = type[2];
                            this.$refs.courseType.selectThird(type[2]);
                        }
                    }
                }
            });
        }
    }
};
</script>
