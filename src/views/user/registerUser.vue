<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-row>
                <el-col :span="9">
                    <regionSelect ref="region"></regionSelect>
                </el-col>
                <el-col :span="14">
                    <el-input v-model="listQuery.nickName" placeholder="请输入昵称" type="text" style="width: 200px"></el-input>
                    <el-input v-model="listQuery.mobilePhone" placeholder="请输入手机号码" type="tesxt" style="width: 200px"></el-input>
                    <el-input v-model="listQuery.interactionNumber" placeholder="请输入互动号" type="tesxt" style="width: 200px"></el-input>
                    <el-button type="primary" icon="plus" @click="getList">查询</el-button> 
                </el-col>
            </el-row> 
        </div>
        <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
            <el-table-column type="index" width="50" align="center"></el-table-column>
            <el-table-column align="center" label="昵称" width="200">
                <template slot-scope="scope">{{ scope.row.nickName }}</template>
            </el-table-column>
            <el-table-column align="center" label="手机" width="200">
                <template slot-scope="scope">{{ scope.row.mobilePhone }}</template>
            </el-table-column>
            <el-table-column align="center" label="互动号" width="120">
                <template slot-scope="scope">{{ scope.row.interactionNumber }}</template>
            </el-table-column>
            <el-table-column align="center" label="性别" width="120">
                <template slot-scope="scope">
                    <span v-if="scope.row.gender === 1">男</span>
                    <span v-else-if="scope.row.gender === 0">女</span>
                    <span v-else>未设置</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="注册地" width="240">
                <template slot-scope="scope">{{ scope.row.cityFullName }}</template>
            </el-table-column>
            <el-table-column align="center" label="状态" width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.userStatus === 1">正常</span>
                    <span v-else-if="scope.row.userStatus === 0">禁用</span>
                    <span v-else>删除</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="注册时间" width="200">
                <template slot-scope="scope">{{ scope.row.createTime }}</template>
            </el-table-column>
            <el-table-column align="center" label="修改时间" width="200">
                <template slot-scope="scope">{{ scope.row.updateTime }}</template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button type="primary" @click="applyDetail(scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :total="listQuery.total" :current-page.sync="listQuery.page" :page-size="listQuery.pageSize"
            @current-change="handleCurrentChange" layout="total, sizes, prev, pager, jumper" @size-change="handleSizeChange"></el-pagination>
    </div>
</template>
<script>
import { page } from "@/api/user/registerUser";
export default {
    name: "OrganizationApply",
    components: {
        regionSelect: () => import("@/components/RegionSelect")
    },
    data() {
        return {
            list: [],
            listLoading: true,
            listQuery: {
                page: 1,
                pageSize: 20,
                total: undefined,
                cityCode: undefined,
                mobilePhone: undefined,
                interactionNumber: undefined,
                nickName: undefined,
                userStatus: undefined,
                gender: undefined
            },
            courseSuite: [
                { text: "课程", value: 0 },
                { text: "套餐", value: 1 },
                { text: "课程包", value: 2 }
            ],
            courseStatus: [
                { text: "删除", value: -1 },
                { text: "新建", value: 0 },
                { text: "下架", value: 1 },
                { text: "上架", value: 2 }
            ]
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            this.listLoading = true;
            page(this.listQuery).then(response => {
                this.list = response.data.data;
                this.listQuery.total = response.data.totalCount;
                this.listLoading = false;
            });
        },
        openSearch() {
            this.dialogSearchVisible = true
        },
        applyDetail(row) {
            // this.currentId = row.id
            // this.dialogVisible = true
        },
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.getList();
        },
        handleSizeChange(val) {
            this.listQuery.pageSize = val;
            this.getList();
        }
    }
};
</script>
