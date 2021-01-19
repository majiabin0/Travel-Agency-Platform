<template>
    <div class="app-container calendar-list-container">
        <el-tabs type="border-card">
            <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i>机构信息</span>
                <el-row>
                    <el-col :span="4">机构名称：</el-col>
                    <el-col :span="20">{{applyDetailData.orgName}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">所在城市：</el-col>
                    <el-col :span="20">{{applyDetailData.placeOfCity}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">详细地址：</el-col>
                    <el-col :span="20">{{applyDetailData.orgAddress}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">申请人昵称：</el-col>
                    <el-col :span="20">{{applyDetailData.applyUser.nickName}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">互动号：</el-col>
                    <el-col :span="20">{{applyDetailData.applyUser.interactionNumber}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">联系电话：</el-col>
                    <el-col :span="20">{{applyDetailData.applyUser.mobilePhone}}</el-col>
                </el-row>
            </el-tab-pane>
            <!-- <el-tab-pane label="申请人信息">申请人信息</el-tab-pane> -->
            <el-tab-pane label="机构地图">
                <baidu-map :center="center" :zoom="zoom" @ready="mapReady" style="height: 400px; whidth: 800px;">
                    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                    <!-- <bm-map-type :map-type="['BMP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type> -->
                    <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
                </baidu-map>
            </el-tab-pane>
            <el-tab-pane label="机构图片">
                <el-carousel indicator-position="outside" type="card">
                    <el-carousel-item v-for="item in applyDetailData.applyImages" :key="item.id">
                        <img :src="item.ossAddress" style="width:232px; height: 308px;" />
                    </el-carousel-item>
                </el-carousel>
            </el-tab-pane>
            <el-tab-pane label="申请记录">申请记录</el-tab-pane>
        </el-tabs>
        <div style="margin-top: 15px;">
            <el-button type="primary" @click="examine">通过</el-button>
            <el-button type="danger" @click="refuse">拒绝</el-button>
        </div>
        <el-dialog width="30%" title="拒绝原因" :visible.sync="refuseVisible" append-to-body>
            <el-form :model="refuseForm" ref="refuseForm" :rules="rules" label-width="100px">
                <el-form-item label="类型" prop="resultType">
                    <el-select v-model="refuseForm.resultType" placeholder="请选拒绝类型">
                        <el-option v-for="item in resultTypeList" :key="item.code" :label="item.value"
                            :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述" prop="resultMessage">
                    <el-input v-model="refuseForm.resultMessage" placeholder="请输入描述" type="textarea" :rows="2">
                    </el-input>
                </el-form-item>
            </el-form>
            <el-button type="danger" @click="refuse">取消</el-button>
            <el-button type="primary" @click="failure('refuseForm')">确定</el-button>
        </el-dialog>
    </div>
</template>
<script>
import { get, adoptExamine, failureExamine } from "@/api/organization/orgApply";
export default {
    name: "ApplyDetail",
    props: ["applyId"],
    data() {
        return {
            dataLoading: true,
            applyDetailData: {
                id: undefined,
                orgName: undefined,
                applyUserId: undefined,
                contactsName: undefined,
                contactsPhone: undefined,
                qq: undefined,
                cityCode: undefined,
                placeOfCity: undefined,
                orgAddress: undefined,
                remarks: undefined,
                applyStatus: undefined,
                campusName: undefined,
                mainCourse: undefined,
                createTime: undefined,
                update: undefined,
                applyExamineResults: [],
                applyUser: {},
                applyImages: []
            },
            map: {},
            center: {
                lng: 0,
                lat: 0
            },
            zoom: 16,
            refuseVisible: false,
            refuseForm: {
                applyId: undefined,
                resultType: undefined,
                resultMessage: undefined
            },
            resultTypeList: [
                { code: "simulate", value: "虚假信息" },
                { code: "dataError", value: "数据错误" },
                { code: "incomplete", value: "数据不完整" }
            ],
            rules: {
                resultType: [
                    {
                        required: true,
                        message: "请选择拒绝类型",
                        trigger: "blur"
                    }
                ],
                resultMessage: [
                    {
                        required: true,
                        message: "请填写类型描述",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        applyDetail() {
            this.dataLoading = true;
            get(this.applyId).then(response => {
                this.applyDetailData = response.data;
                this.center.lng = this.applyDetailData.lng;
                this.center.lat = this.applyDetailData.lat;
            });
        },
        mapReady({ BMap, map }) {
            this.map = map;
            this.map.enableScrollWheelZoom();
        },
        drawLocation() {
            if (this.center.lng !== "" && this.center.lat !== "") {
                this.map.clearOverlays();
                const new_point = new BMap.Point(
                    this.center.lng,
                    this.center.lat
                );
                const marker = new BMap.Marker(new_point);
                this.map.addOverlay(marker);
                this.map.panTo(new_point);
            }
        },
        examine() {
            this.$confirm("确认通过该审核？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                adoptExamine(this.applyId).then(response => {
                    if (response.code === 200) {
                        this.$notify({
                            title: "成功",
                            message: "通过成功",
                            duration: 2000
                        });
                        //刷新父组件数据
                        this.$emit("refresh");
                    }
                });
            });
        },
        refuse() {
            this.refuseVisible = true;
            this.refuseForm.applyId = this.applyId;
        },
        failure(formName) {
            const set = this.$refs;
            set[formName].validate(valid => {
                if (valid) {
                    failureExamine(this.refuseForm).then(response => {
                        if (response.code === 200) {
                            this.dialogFormVisible = false;
                            this.$notify({
                                title: "成功",
                                message: "审核拒绝成功",
                                duration: 2000
                            });
                            this.refuseVisible = false;
                        }
                        this.$emit("refresh");
                    });
                }
            });
        }
    },
    created() {
        this.applyDetail();
    },
    watch: {
        center: {
            handler() {
                this.drawLocation();
            },
            deep: true
        }
    }
};
</script>
