<template>
  <div class="reviewList">
    <div class="header-manage">
      <i class="el-icon-service"></i>
    </div>
    <div style="margin-top: 5%; text-align: center">
      联系我们
    </div>
    <div class="header-manage-list">
      <div>
        <span>客服电话</span>
      </div>
      <div class="phonestyle">
        <spam>400-820-12456</spam>
      </div>
      <div>
        <span>微信客服</span>
      </div>
      <div class="phonestyle">
        <span>daoyoupingtai12456</span>
      </div>
      <div style="margin-top: 20%; color: blue">
        <span>您还可以通过关注公众号来表达您的诉求，公众号请搜索“导游平台12456”。</span>
      </div>
      <el-row style="margin-top: 50%; margin-left: 45%">
        <span class="spansty">导游平台  Copyright 2020</span>
      </el-row>
    </div>
  </div>
</template>

<script>
    export default {
        name: "callUs",
      methods:{
        closePage(){
          this.$router.push({path:'/systemSet'});
        }
      }
    }
</script>

<style >
  .reviewList{
    margin: 0 10%;
  }
  .header-manage-list{
    padding: 15px 0;
  }
  .header-manage{
    font-size: 80px;
    margin-top: 10%;
    text-align: center;
  }
  .phonestyle{
    text-align: center;
    margin-top: 5%;
    color: red;
  }
  .spansty{
    font-size: small;
    color: rgba(0,0,0,0.5);
  }
</style>
