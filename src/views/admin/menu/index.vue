<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-select v-model="listQuery.systemType" placeholder="请选择系统类型" @change="getList">
                <el-option v-for="item in systemTypes" :key="item.key" :label="item.name" :value="item.key"></el-option>
            </el-select>
            <!-- <el-button-group> -->
            <el-button type="primary" icon="plus" @click="handlerAdd">添加</el-button>
            <el-button type="primary" icon="edit" @click="handlerUpdate">编辑</el-button>
            <el-button type="danger" icon="delete" @click="handlerDelete">删除</el-button>
            <!-- </el-button-group> -->
        </div>
        <el-row>
            <el-col :span="8" style="margin-top: 15px">
                <el-input v-model="filterText" placeholder="请输入关键字进行过滤"></el-input>
                <el-tree :data="treeData" class="filter-tree" node-key="id" highlight-current :props="defaultProps"
                    :filter-node-method="filterNode" @node-click="getNodeData"></el-tree>
            </el-col>
            <el-col :span="16" style="margin-top: 15px">
                <el-card class="box-card">
                    <el-form :label-position="labelPosition" :rules="menuRules" ref="form" :model="form">
                        <el-form-item label="菜单名称" label-width="80px" prop="resourceName">
                            <el-input v-model="form.resourceName" placeholder="请输入菜单名称" :disabled="formEdit"></el-input>
                        </el-form-item>
                        <el-form-item label="菜单编码" label-width="80px" prop="resourceCode">
                            <el-input v-model="form.resourceCode" placeholder="请输入菜单编码" :disabled="formEdit"></el-input>
                        </el-form-item>
                        <el-form-item label="菜单路径" label-width="80px">
                            <el-input v-model="form.path" placeholder="请输入菜单路径" :disabled="formEdit"></el-input>
                        </el-form-item>
                        <el-form-item label="父级节点" label-width="80px">
                            <el-input v-model="form.parentName" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="图标" label-width="80px">
                            <el-input v-model="form.icon" placeholder="请输入图标名称" :disabled="formEdit"></el-input>
                        </el-form-item>
                        <el-form-item label="菜单类型" label-width="80px" prop="systemType">
                            <el-radio-group v-model="form.systemType">
                                <el-radio label="admin">系统菜单</el-radio>
                                <el-radio label="organization">机构菜单</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="菜单描述" label-width="80px">
                            <el-input v-model="form.remarks" placeholder="请输入菜单描述" :disabled="formEdit"></el-input>
                        </el-form-item>
                        <el-form-item v-if="formStatus == 'update'">
                            <el-button type="primary" @click="update('form')">更新</el-button>
                        </el-form-item>
                        <el-form-item v-if="formStatus == 'create'">
                            <el-button type="primary" @click="create('form')">保存</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
                <el-card>
                    <span>按钮或资源</span>
                    <menu-element :menu="currentMenu" ref="menuElement"></menu-element>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { menuTree, getMenu, create, update, remove } from "@/api/admin/menu";
import { systemName } from "@/api/public/public";
export default {
    name: "MenuManager",
    components: {
        "menu-element": () => import("./components/element.vue")
    },
    data() {
        return {
            systemTypes: [],
            filterText: "",
            treeData: [],
            listQuery: {
                name: undefined,
                systemType: undefined
            },
            defaultProps: {
                children: "subResource",
                label: "resourceName"
            },
            formEdit: true,
            formStatus: "",
            labelPosition: "right",
            form: {
                resourceName: undefined,
                resourceCode: undefined,
                parentId: undefined,
                icon: undefined,
                path: undefined,
                systemType: undefined,
                remarks: undefined,
                parentName: undefined
            },
            currentMenu: undefined,
            menuRules: {
                resourceName: [
                    {
                        required: true,
                        message: "请输入菜单名称",
                        trigger: "blur"
                    }
                ],
                resourceCode: [
                    {
                        required: true,
                        message: "请输入菜单编码",
                        trigger: "blur"
                    }
                ],
                systemType: [
                    {
                        required: true,
                        message: "请输入选择菜单类型",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        getList() {
            menuTree(this.listQuery).then(data => {
                this.treeData = data.data;
                this.currentMenu = undefined;
                this.restForm();
            });
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        getNodeData(data) {
            if (!this.formEdit) {
                this.formStatus = "update";
            }
            getMenu(data.id).then(response => {
                this.form = response.data;
            });
            this.currentMenu = data;
            this.$refs.menuElement.menu = data;
            this.$refs.menuElement.listQuery.menuId = data.id;
            this.$refs.menuElement.getElementList();
        },
        handlerAdd() {
            this.restForm();
            this.formEdit = false;
            this.formStatus = "create";
        },
        handlerUpdate() {
            this.formEdit = false;
            this.formStatus = "update";
        },
        handlerDelete() {
            this.$confirm("菜单将永久删除，是否继续？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                remove(this.currentMenu.id).then(() => {
                    this.getList();
                    this.restForm();
                    this.onCancel();
                    this.$notify({
                        title: "成功",
                        message: "菜单删除成功",
                        type: "success",
                        duation: "2000"
                    });
                });
            });
        },
        create(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    create(this.form).then(() => {
                        this.getList();
                        this.$notify({
                            title: "成功",
                            message: "菜单添加成功",
                            type: "success",
                            duation: "2000"
                        });
                    });
                }
            });
        },
        update(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    update(this.form.id, this.form).then(() => {
                        this.getList();
                        this.$notify({
                            title: "成功",
                            message: "菜单更新成功",
                            type: "success",
                            duration: "2000"
                        });
                    });
                }
            });
        },
        onCancel() {
            this.formEdit = true;
            this.formStatus = "";
        },
        restForm() {
            this.form = {
                menuName: undefined,
                code: undefined,
                parentId: this.currentMenu ? this.currentMenu.id : "root",
                icon: undefined,
                menuHref: undefined,
                systemType: 1,
                description: undefined,
                parentName: this.currentMenu
                    ? this.currentMenu.resourceName
                    : ""
            };
        }
    },
    created() {
        systemName().then(response => {
            if (response.code === 200) {
                this.systemTypes = response.data;
            }
        });
        this.listQuery.systemType = "admin";
        this.getList();
    }
};
</script>

