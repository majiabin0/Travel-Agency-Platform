<template>
  <div class="reviewList">
    <div class="header-manage">
      <i class="el-icon-s-shop"></i>
    </div>
    <div class="header-manage">
      导游平台
    </div>
    <div class="header-manage-list">
      <el-row>
        <span style="margin-left: 10%"></span> 通过导游平台，导游进行灵活的进行线上接单时间和地点的设置。每月固定时间免费将收入提取到自己名下的银行卡。
        每单行程收入提成补助可见。打造平等相互尊重的评价体系是香蕉导游的理想。
        香蕉导游互评体系可以维护导游与游客的双方利益。公正客观的处理投诉与反馈。
        另一方面，评价体系定时动态更新，让每位导游都看得见自己的进步和成长。
      </el-row>
      <el-row style="margin-top: 50%; margin-left: 45%">
        <span class="spansty">导游平台  Copyright 2020</span>
      </el-row>
<!--      <el-row class="header-manage-list">-->
<!--        <el-button type="primary" @click="closePage">关闭 </el-button>-->
<!--      </el-row>-->
    </div>
  </div>
</template>

<script>
    export default {
        name: "aboutGuide",
      methods:{
        closePage(){
          this.$router.push({path:'/systemSet'});
        }
      }
    }
</script>

<style >
  .header-manage-list{
    padding: 15px 0;
  }
  .spansty{
    font-size: small;
    color: rgba(0,0,0,0.5);
  }
  .header-manage{
    font-size: 21px;
    padding: 40px 0;
    text-align: center;
  }
</style>
