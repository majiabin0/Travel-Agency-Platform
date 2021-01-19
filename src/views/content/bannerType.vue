<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-select v-model="form.systemName" placeholder="请选择">
                <el-option v-for="item in systemList" :key="item.key" :label="item.name" :value="item.key"></el-option>
            </el-select>
            <el-button-group>
                <el-button type="primary" icon="plus" @click="cretaPlate">添加类型</el-button>
            </el-button-group>
        </div>
        <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
            <el-table-column label="系统名称" align="center" width="200">
                <template slot-scope="scope">{{scope.row.systemName}}</template>
            </el-table-column>
            <el-table-column label="类型编码" align="center" width="200">
                <template slot-scope="scope">{{scope.row.typeCode}}</template>
            </el-table-column>
            <el-table-column label="备注" align="center" width="300">
                <template slot-scope="scope">{{scope.row.remark}}</template>
            </el-table-column>
            <el-table-column label="添加时间" align="center" width="180">
                <template slot-scope="scope">{{scope.row.createTime}}</template>
            </el-table-column>
            <el-table-column label="修改时间" align="center" width="180">
                <template slot-scope="scope">{{scope.row.updateTime}}</template>
            </el-table-column>
        </el-table>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisble">
            <el-form :model="form" ref="form" :rules="rules" label-width="100px">
                <el-form-item label="系统" prop="systemName">
                    <el-select v-model="form.systemName" placeholder="请选择系统">
                        <el-option v-for="item in systemList" :key="item.key" :label="item.name" :value="item.key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类型编码" prop="typeCode">
                    <el-input v-model="form.typeCode" placeholder="请输入类型编码"></el-input>
                </el-form-item>

                <el-form-item label="描述">
                    <el-input v-model="form.remark" placeholder="请输入描述" type="textarea" :rows="2"></el-input>
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
import { allTypes, systemNames, saveType } from "@/api/content/banner";
export default {
    name: "BannerType",
    data() {
        return {
            systemList: [],
            listLoading: true,
            list: [],
            textMap: {
                update: "编辑",
                create: "创建"
            },
            dialogFormVisble: false,
            dialogStatus: "update",
            form: {
                id: undefined,
                typeCode: undefined,
                plateName: undefined,
                remark: undefined,
                systemName: undefined
            },
            rules: {
                systemName: [
                    { required: true, message: "请选在系统", trigger: "blur" }
                ],
                typeCode: [
                    {
                        required: true,
                        message: "请输入类型编码",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        getData() {
            allTypes().then(response => {
                if (response.code === 200) {
                    this.list = response.data;
                    this.listLoading = false;
                }
            });
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.typeName.indexOf(value) !== -1;
        },
        handleUpdate(row) {
            this.form.id = row.id;
            this.form.plateCode = row.plateCode;
            this.form.plateName = row.plateName;
            this.form.plateSort = row.plateSort;
            this.form.plateType = row.plateType;
            this.dialogFormVisble = true;
            this.dialogStatus = "update";
        },
        cancel(formName) {
            this.dialogFormVisble = false;
            this.$refs[formName].resetFields();
        },
        cretaPlate() {
            this.dialogFormVisble = true;
            this.dialogStatus = "create";
            this.$refs["form"].resetFields();
        },
        savePlate(formName) {
            const set = this.$refs;
            set[formName].validate(valid => {
                if (valid) {
                    this.dialogFormVisble = false;
                    saveType(this.form).then(response => {
                        this.dialogFormVisble = false;
                        this.getData();
                        this.$notify({
                            title: "成功",
                            message: "板块添加成功",
                            duration: 2000
                        });
                    });
                }
            });
        }
    },
    created() {
        this.getData();
        systemNames().then(response => {
            if (response.code === 200) {
                this.systemList = response.data;
            }
        });
    },
    watch: {}
};
</script>

