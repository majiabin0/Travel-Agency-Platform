<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <!-- <el-button-group>
                <el-button type="primary" icon="plus" @click="cretaPlate">创建文章</el-button>
            </el-button-group> -->
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
            <el-table-column label="状态" align="center" width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.articleStatus === 1"> 草稿</span>
                    <span v-else-if="scope.row.articleStatus === 2">待审核</span>
                    <span v-else-if="scope.row.articleStatus === 3">审核中</span>
                    <span v-else-if="scope.row.articleStatus === 4">已发布</span>
                    <span v-else-if="scope.row.articleStatus === 5">未发布</span>
                    <span v-else>审核结束</span>
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
                    <el-button v-if="scope.row.articleStatus === 1 || scope.row.articleStatus === 5" size="small" type="primary"
                        @click="handleUpdate(scope.row)">编辑</el-button>
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
import { myArticle, allPlate } from "@/api/content/article";

export default {
    name: "Article",
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
            plateList: [],
            listQuery: {
                page: 1,
                pageSize: 10
            }
        };
    },
    methods: {
        getData() {
            this.articleData();
            allPlate().then(response => {
                if (response.code === 200) {
                    this.plateList = response.data;
                }
            });
        },
        articleData() {
            myArticle(this.listQuery).then(response => {
                if (response.code === 200) {
                    this.page = response.data;
                    this.listLoading = false;
                }
            });
        },
        handleUpdate(row) {
            this.$router.push("/content/editArticle/" + row.id);
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

