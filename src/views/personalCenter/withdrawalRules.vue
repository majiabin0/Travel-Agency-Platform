<template>
  <div class="reviewList">
    <div class="header-manage">
      <i class="el-icon-s-shop"></i>
    </div>
    <div class="header-manage">
      余额和提现规则
    </div>
    <div class="header-manage-list">
      <el-row>
        待客户提供
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
        name: "withdrawalRules",
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
</style>
