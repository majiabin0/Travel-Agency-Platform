<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-select v-model="listQuery.systemName" placeholder="请选择系统" @change="systemCange">
                <el-option v-for="item in systemList" :key="item.key" :label="item.name" :value="item.key"></el-option>
            </el-select>
            <el-select v-model="listQuery.typeCode" placeholder="请选择轮播类型">
                <el-option v-for="item in typeCodeList" :key="item.typeCode" :label="item.typeCode" :value="item.typeCode"></el-option>
            </el-select>
            <!-- <el-button-group> -->
                <el-button type="success" icon="plus" @click="bannerImages">查询</el-button>
                <el-button type="primary" icon="plus" @click="handleCreate">添加图片</el-button>
            <!-- </el-button-group> -->
        </div>
        <el-table :data="page.data" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
            <el-table-column label="图片" align="center" width="320">
                <template slot-scope="scope"><img :src="scope.row.imgUrl" style="width: 300px; height: 120px;" /></template>
            </el-table-column>
            <el-table-column label="客户端系统" align="center" width="100">
                <template slot-scope="scope">{{scope.row.bannerSystem}}</template>
            </el-table-column>
            <el-table-column label="轮播位置编码" align="center" width="120">
                <template slot-scope="scope">{{scope.row.bannerType}}</template>
            </el-table-column>
            <el-table-column label="提示语" align="center" width="120">
                <template slot-scope="scope">{{scope.row.imgTitle}}</template>
            </el-table-column>
            <el-table-column label="状态" align="center" width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.imgStatus === 1"> 新建</span>
                    <span v-else-if="scope.row.imgStatus === 2">上线</span>
                    <span v-else-if="scope.row.imgStatus === 3">下线</span>
                    <span v-else-if="scope.row.imgStatus === -1">删除</span>
                </template>
            </el-table-column>
            <el-table-column label="排列顺序" align="center" width="100">
                <template slot-scope="scope">{{scope.row.imgOrder}}</template>
            </el-table-column>
            <el-table-column label="过期时间" align="center" width="180">
                <template slot-scope="scope">{{scope.row.expireTime}}</template>
            </el-table-column>
            <el-table-column label="添加时间" align="center" width="180">
                <template slot-scope="scope">{{scope.row.createTime}}</template>
            </el-table-column>
            <el-table-column label="修改时间" align="center" width="180">
                <template slot-scope="scope">{{scope.row.updateTime}}</template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="260">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.imgStatus === 1 || scope.row.imgStatus === 3" size="small" type="primary"
                        @click="handleUpdate(scope.row, 'update')">编辑</el-button>
                    <el-button v-if="scope.row.imgStatus === 1 || scope.row.imgStatus === 3" size="small" type="primary"
                        @click="handleUpdate(scope.row, 'online')">上线</el-button>
                    <el-button v-if="scope.row.imgStatus === 1 || scope.row.imgStatus === 3" size="small" type="danger"
                        @click="remove(scope.row)">删除</el-button>
                    <el-button v-if="scope.row.imgStatus === 2" size="small" type="primary" @click="imgOffline(scope.row)">下线</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div v-show="!listLoading" class="paging-container">
            <el-pagination :total="page.totalCount" :current-page.sync="page.currentPage" :page-size="page.pageSize"
                @current-change="handleCurrentChange" layout="total, sizes, prev, pager, jumper" @size-change="handleSizeChange"></el-pagination>
        </div>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="form" :rules="rules" label-width="100px">
                <el-form-item label="图片" prop="imageUrl">
                    <el-upload action="/api/oss/file/uploadFile" :show-file-list="false" :on-success="handleAvatarSucess"
                        :before-uploade="beforeAvatarUploade">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="客户端" prop="bannerSystem">
                    <el-select v-model="form.bannerSystem" placeholder="请选择系统" @change="formSystemCange">
                        <el-option v-for="item in systemList" :key="item.key" :label="item.name" :value="item.key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="轮播类型" prop="typeCode">
                    <el-select v-model="form.typeCode" placeholder="请选择轮播类型">
                        <el-option v-for="item in formTypeCodeList" :key="item.typeCode" :label="item.typeCode" :value="item.typeCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图片顺序">
                    <el-input v-model="form.imgOrder" placeholder="请输入图片顺序" type="number"></el-input>
                </el-form-item>
                <el-form-item label="提示语">
                    <el-input v-if="dialogStatus == 'online'" v-model="form.imgTitle" placeholder="请输入提示语" readonly></el-input>
                    <el-input v-else v-model="form.imgTitle" placeholder="请输入提示语"></el-input>
                </el-form-item>
                <el-form-item label="跳转地址">
                    <el-input v-if="dialogStatus == 'online'" v-model="form.routeUrl" placeholder="请填写跳转地址" readonly></el-input>
                    <el-input v-else v-model="form.routeUrl" placeholder="请填写跳转地址"></el-input>
                </el-form-item>
                <el-form-item v-if="dialogStatus == 'online'" label="到期时间">
                    <el-date-picker v-model="form.expireTime" type="datetime" placeholder="选择日期时间" default-time="00:00:00" value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel('form')">取消</el-button>
                <el-button v-if="dialogStatus == 'create'" @click="saveImg('form')" type="primary">确定</el-button>
                <el-button v-else-if="dialogStatus == 'online'" @click="imgOnline('form')" type="primary">上线</el-button>
                <el-button v-else @click="updateBannerImg('form')" type="primary">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    systemNames,
    allTypes,
    imgPage,
    saveImg,
    updateImg,
    removeImg,
    imgOnline,
    offline
} from "@/api/content/banner";

export default {
    name: "BannerImages",
    data() {
        return {
            page: {
                currentPage: 1,
                data: [],
                offset: 0,
                pageSize: 10,
                totalCount: 0
            },
            listLoading: true,
            systemList: [],
            typeCodeList: [],
            imgStatusList: [],
            listQuery: {
                page: 1,
                pageSize: 10,
                systemName: undefined,
                typeCode: undefined,
                imgStatus: undefined
            },
            textMap: {
                update: "编辑轮播图片",
                create: "添加轮播图片"
            },
            dialogVisible: false,
            dialogStatus: "",
            dialogFormVisible: false,
            formTypeCodeList: [],
            imageUrl: undefined,
            form: {
                id: undefined,
                imgUrl: undefined,
                imgTitle: undefined,
                typeCode: undefined,
                bannerSystem: undefined,
                routeUrl: undefined,
                expireTime: undefined,
                imgOrder: 0
            },
            rules: {
                imgUrl: [
                    {
                        required: true,
                        message: "请上传轮播图片",
                        trigger: "blur"
                    }
                ],
                bannerSystem: [
                    {
                        required: true,
                        message: "请选择客户端系统",
                        trigger: "blur"
                    }
                ],
                typeCode: [
                    {
                        required: true,
                        message: "请选择轮播类型",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        getData() {
            this.bannerImages();
            systemNames().then(response => {
                if (response.code === 200) {
                    this.systemList = response.data;
                }
            });
        },
        bannerImages() {
            imgPage(this.listQuery).then(response => {
                if (response.code === 200) {
                    this.page = response.data;
                    this.listLoading = false;
                }
            });
        },
        systemCange(value) {
            allTypes(value).then(response => {
                if (response.code === 200) {
                    this.typeCodeList = response.data;
                }
            });
        },
        formSystemCange(value) {
            allTypes(value).then(response => {
                if (response.code === 200) {
                    this.formTypeCodeList = response.data;
                }
            });
        },
        beforeAvatarUploade(file) {
            if (!(file.size / 1024 / 1024 < 2)) {
                this.$message.error("上传图片大小不能超过2MB！");
                return false;
            }
            return true;
        },
        handleAvatarSucess(res, file) {
            this.form.imgUrl = file.response.msg;
            this.imageUrl = file.response.msg;
            this.imgStatus = true;
        },
        handleCreate() {
            this.resetForm();
            this.dialogStatus = "create";
            this.dialogFormVisible = true;
        },
        saveImg(formName) {
            const set = this.$refs;
            set[formName].validate(valid => {
                if (!this.form.imgUrl) {
                    valid = false;
                }
                if (valid) {
                    saveImg(this.form).then(response => {
                        if (response.code === 200) {
                            this.dialogFormVisible = false;
                            this.$notify({
                                title: "成功",
                                message: "轮播图片添加成功",
                                duration: 2000
                            });
                        }
                        this.bannerImages();
                    });
                }
            });
        },
        updateBannerImg(formName) {
            const set = this.$refs;
            set[formName].validate(valid => {
                if (valid) {
                    updateImg(this.form).then(response => {
                        if (response.code === 200) {
                            this.dialogFormVisible = false;
                            this.$notify({
                                title: "成功",
                                message: "轮播图片修改成功",
                                duration: 2000
                            });
                        }
                        this.bannerImages();
                    });
                }
            });
        },
        remove(row) {
            this.$confirm("确认删除该轮播图片？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                removeImg(row.id).then(response => {
                    this.$notify({
                        title: "成功",
                        message: "删除成功",
                        duration: 2000
                    });
                    this.bannerImages();
                });
            });
        },
        resetForm() {
            this.form = {
                id: undefined,
                imgUrl: undefined,
                imgTitle: undefined,
                typeCode: undefined,
                bannerSystem: undefined,
                routeUrl: undefined
            };
            this.imageUrl = undefined;
        },
        cancel() {
            this.resetForm();
            this.dialogFormVisible = false;
        },
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.bannerImages();
        },
        handleSizeChange(val) {
            this.listQuery.pageSize = val;
            this.bannerImages();
        },
        handleUpdate(row, option) {
            this.resetForm();
            this.form.id = row.id;
            this.imageUrl = row.imgUrl;
            this.form.imgTitle = row.imgTitle;
            this.form.bannerSystem = row.bannerSystem;
            this.form.routeUrl = row.routeUrl;
            allTypes(row.bannerSystem).then(response => {
                if (response.code === 200) {
                    this.formTypeCodeList = response.data;
                }
            });
            this.form.typeCode = row.bannerType;
            this.dialogStatus = option;
            this.dialogFormVisible = true;
        },
        imgOnline() {
            let id = this.form.id;
            let expireTime = this.form.expireTime;
            let imgOrder = this.form.imgOrder;
            imgOnline(id, expireTime, imgOrder).then(response => {
                if (response.code === 200) {
                    this.dialogFormVisible = false;
                    this.$notify({
                        title: "成功",
                        message: "轮播图片上线成功",
                        duration: 2000
                    });
                }
                this.bannerImages()
            });
        },
        imgOffline(row) {
            this.$confirm("确认下线该轮播图片？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                offline(row.id).then(response => {
                    this.$notify({
                        title: "成功",
                        message: "删除成功",
                        duration: 2000
                    });
                    this.bannerImages();
                });
            });
        }
    },
    created() {
        this.getData();
    }
};
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
    border-color: #409eff;
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
    width: 690px;
    height: 260px;
    display: block;
}
</style>
