<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-select v-model="listQuery.systemType" placeholder="请选择系统类型">
                <el-option v-for="item in systemTypes" :key="item.key" :label="item.name" :value="item.key"></el-option>
            </el-select>
            <el-button type="primary" icon="plus" @click="getList">查询</el-button>
        </div>
        <el-table :data="page.data" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
            <el-table-column type="index" width="50" align="center"></el-table-column>
            <el-table-column align="center" label="系统类型" width="120">
                <template scope="scope">{{scope.row.systemType}}</template>
            </el-table-column>
            <el-table-column align="center" label="名称" width="200">
                <template scope="scope">{{scope.row.permissionName}}</template>
            </el-table-column>
            <el-table-column align="center" label="路径" width="400">
                <template scope="scope">{{scope.row.url}}</template>
            </el-table-column>
            <el-table-column align="center" label="公共权限" width="200">
                <template scope="scope">
                    <span v-if="scope.row.permissionLogin === false" style="color: red;">否</span>
                    <span v-else style="color: green">是</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="内部权限" width="200">
                <template scope="scope">
                    <span v-if="scope.row.permissionInner === false" style="color: red;">否</span>
                    <span v-else style="color: green">是</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="状态" width="120">
                <template scope="scope">{{scope.row.permissionStatus}}</template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="200">
                <template scope="scope">
                    <el-button type="primary" @click="updateName(scope.row)">修改名称</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div v-show="!listLoading" class="paging-container">
            <el-pagination :total="page.totalCount" :current-page.sync="listQuery.page" :page-size="listQuery.pageSize"
                @current-change="handleCurrentChange" layout="total, sizes, prev, pager, jumper"
                @size-change="handleSizeChange"></el-pagination>
        </div>
    </div>
</template>
<script>
import { page, updateName,  } from "@/api/admin/permission";
import { systemName } from "@/api/public/public";
export default {
    name: "permission",
    data() {
        return {
            systemTypes: [],
            filterText: "",
            listLoading: true,
            page: {
                totalCount: 0,
                pageSizes: [10, 20, 30, 50],
                totalPage: 0,
                data: []
            },
            listQuery: {
                systemType: "organization",
                page: 1,
                pageSize: 10
            }
        };
    },
    created() {
        systemName().then(response => {
            if (response.code === 200) {
                this.systemTypes = response.data;
            }
        });
        this.getList();
    },
    methods: {
        getList() {
            this.listLoading = true;
            page(this.listQuery).then(response => {
                this.page = response.data;
                this.listLoading = false;
            });
        },
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.getList();
        },
        handleSizeChange(val) {
            this.listQuery.pageSize = val;
            this.getList();
        },
        updateName(row) {
            this.$prompt("请输入名称", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(({ value }) => {
                if (value) {
                    updateName(row.id, value).then(response => {
                        if (response.code === 200) {
                            this.$notify({
                                title: "成功",
                                message: "修改成功",
                                duration: 2000
                            });
                            this.getList()
                        }
                    });
                }
            }).catch(() => {});
        }
    }
};
</script>
