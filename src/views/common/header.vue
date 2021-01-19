<template>
  <div>
    <div class="line"></div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <router-link to="/dateSet" class="header1">
        <el-menu-item index="6"><a>档期管理</a></el-menu-item>
      </router-link>
      <router-link to="/orderList" class="header1">
        <el-menu-item index="4"><a>财务管理</a></el-menu-item>
      </router-link>
      <router-link to="/evaluateList" class="header1">
        <el-menu-item index="1">评价管理</el-menu-item>
      </router-link>
      <router-link to="/orderList" class="header1">
        <el-menu-item index="4"><a>订单管理</a></el-menu-item>
      </router-link>
<!--      <router-link to="/test" class="header2">-->
<!--        <el-menu-item index="5"><a>飞牛旅行社</a></el-menu-item>-->
<!--      </router-link>-->
    </el-menu>
  </div>
</template>

<script>
    export default {
        name: "header",
      data() {
        return {
          // activeIndex: '1',
          // activeIndex2: '1'
        };
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style scoped>
  .btn{
    border: 1px solid;
    height: 28px;
    line-height: 28px;
    display: inline-block;
    background: #ddd;
    width: 112px;
    text-align: center;
    border-radius: 7px;
  }
  .header1{
    /*display: inline-block;*/
    margin-left: 110px;
  }
  .header2{
    display: inline-block;
    float: right;
  }
</style>
