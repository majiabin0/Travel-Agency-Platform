<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
        </div>
        <el-table :data="page.data" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
            <el-table-column label="标题" align="center" width="400">
                <template slot-scope="scope">{{scope.row.articleTitle}}</template>
            </el-table-column>
            <el-table-column label="板块" align="center" width="100">
                <template slot-scope="scope">{{scope.row.plateName}}</template>
            </el-table-column>
            <el-table-column label="课程类型" align="center" width="240">
                <template slot-scope="scope">{{scope.row.courseTypeName}}</template>
            </el-table-column>
            <el-table-column label="机构" align="center" width="200">
                <template slot-scope="scope">{{scope.row.orgName}}</template>
            </el-table-column>
            <el-table-column label="作者" align="center" width="100">
                <template slot-scope="scope">{{scope.row.authorName}}</template>
            </el-table-column>
            <el-table-column label="审核状态" align="center" width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.examineStatus === 1">未审核</span>
                    <span v-else-if="scope.row.examineStatus === 2">待审核</span>
                    <span v-else-if="scope.row.examineStatus === 3">审核中</span>
                    <span v-else-if="scope.row.examineStatus === 4">已通过</span>
                    <span v-else-if="scope.row.examineStatus === 5">未通过</span>
                    <span v-else>已结束</span>
                </template>
            </el-table-column>
            <el-table-column label="添加时间" align="center" width="180">
                <template slot-scope="scope">{{scope.row.createTime}}</template>
            </el-table-column>
            <el-table-column label="修改时间" align="center" width="180">
                <template slot-scope="scope">{{scope.row.updateTime}}</template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="180">
                <template slot-scope="scope">
                    <el-button size="small" type="primary" @click="handleUpdate(scope.row)">审核</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div v-show="!listLoading" class="paging-container">
            <el-pagination :total="page.totalCount" :current-page.sync="page.currentPage" :page-size="page.pageSize"
                @current-change="handleCurrentChange" layout="total, sizes, prev, pager, jumper" @size-change="handleSizeChange"></el-pagination>
        </div>
    </div>
</template>

<script>
import { examineArticle } from "@/api/content/article";

export default {
    name: "examineArticle",
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
            list: [],
            listQuery: {
                page: 1,
                pageSize: 10
            }
        };
    },
    methods: {
        getData() {
            examineArticle(this.listQuery).then(response => {
                if (response.code === 200) {
                    this.page = response.data;
                    this.listLoading = false;
                }
            });
        },
        handleUpdate(row) {
            this.$router.push("/content/examineDetails/" + row.id);
        },
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.getData();
        },
        handleSizeChange(val) {
            this.listQuery.pageSize = val;
            this.getData();
        }
    },
    created() {
        this.getData();
    }
};
</script>

