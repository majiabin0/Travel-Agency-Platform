<template>
    <div class="filter-container">
        <el-select v-model="courseTypeCode" placeholder="选择一级课程类型" @change="subCourseType">
            <el-option v-for="item in courseTypeList" :key="item.code" :label="item.typeName" :value="item.code">
            </el-option>
        </el-select>
        <el-select v-model="secondCourseType" placeholder="选择二级课程类型" @change="selectedSecond">
            <el-option v-for="item in secondCourseTypeList" :key="item.code" :label="item.typeName" :value="item.code">
            </el-option>
        </el-select>
        <el-select v-model="thirdCourseType" placeholder="选择三级课程类型" @change="selectThird">
            <el-option v-for="item in thirdCourseTypeList" :key="item.code" :label="item.typeName" :value="item.code">
            </el-option>
        </el-select>
    </div>
</template>

<script>
import { allTypes } from "@/api/public/courseType";
export default {
    name: "course-type-select",
    data() {
        return {
            courseTypeList: [],
            secondCourseTypeList: [],
            thirdCourseTypeList: [],
            courseTypeCode: undefined,
            secondCourseType: undefined,
            thirdCourseType: undefined,
            courseType: undefined
        };
    },
    methods: {
        selectData() {
            allTypes().then(response => {
                if (response.code === 200) {
                    this.courseTypeList = response.data;
                }
            });
        },
        subCourseType(value) {
            this.courseTypeList.forEach(courseType => {
                if (courseType.code === value) {
                    this.secondCourseTypeList = courseType.subCourse;
                    this.courseType = courseType;
                }
            });
        },
        selectedSecond(value) {
            this.secondCourseTypeList.forEach(courseType => {
                if (courseType.code === value) {
                    this.thirdCourseTypeList = courseType.subCourse;
                    this.courseType.subCourse = courseType;
                }
            });
        },
        selectThird(value) {
            this.thirdCourseTypeList.forEach(courseType => {
                if (courseType.code === value) {
                    this.courseType.subCourse.subCourse = courseType;
                }
            });
        }
    },
    created() {
        this.selectData();
    }
};
</script>

