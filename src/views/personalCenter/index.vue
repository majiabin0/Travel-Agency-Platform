<template>
<div>
  <div style="font-size: 16px">
    <div class="accountType">
      <router-link to="/infoPerfection">
        <div>
          <i class="el-icon-user icon_user" ></i>
        </div>
      </router-link>

      <router-link :to="username?'/onlinePay':'/login'">
        <span style="float: left;margin-right: 20px">
          {{username?username:'登录/注册'}}
        </span>
      </router-link>
      <router-link to="/onlinePay">
      <div style="margin-top: 15px;margin-bottom: 15px;">
        <el-button size="mini">会员</el-button>
        <div v-if="authenticate == 1" style="color: #13ce66;margin-left: 36%">已认证</div>
<!--        <span v-if="authenticate == 1" style="margin-left: 5%;color: #13ce66">{{authenticate}}</span>-->
        <div v-else style="color: #c0c4cc; margin-left: 36%">未认证</div>
      </div>
      </router-link>
      <router-link to="/systemSet">
        <div>
        <i class="el-icon-s-tools" style="margin-left: 60%;"></i>
        </div>
      </router-link>
      <span>账户余额：￥{{balance}}</span>
      <router-link to="/withdrawDeposit">
        <el-button type="primary" size="mini">提现</el-button>
      </router-link>
    </div>
    <div>
<!--      <div class="payCenter">-->
<!--        <i class="el-icon-c-scale-to-original" ></i>-->
<!--        <span>支付中心</span>-->
<!--        <div>-->
<!--          <router-link to="/detailAccount">-->
<!--          <span>-->
<!--            <el-button size="mini" >收支明细</el-button>-->
<!--          </span>-->
<!--          </router-link>-->
<!--          <router-link to="/bankCard">-->
<!--          <span>-->
<!--            <el-button size="mini">银行卡绑定</el-button>-->
<!--          </span>-->
<!--          </router-link>-->
<!--        </div>-->
<!--      </div>-->
      <router-link to="/priceSet">
      <div class="priceSet">
        <i class="el-icon-edit-outline"></i>
        <span>价格设置</span>
      </div>
      </router-link>
      <router-link to="/languageSet">
        <div class="languages">
          <i class="el-icon-data-line"></i>
          <span>多语言</span>
        </div>
      </router-link>
      <div class="financial">
        <i class="el-icon-s-data"></i>
        <span>财务统计</span>
      </div>
      <router-link to="/callUs">
        <div class="accountSecurity">
          <i class="el-icon-phone"></i>
          <span>联系我们</span>
        </div>
      </router-link>
      <el-button @click="backLogin">退出登录</el-button>
    </div>
  <div class="footer-btn">
    <router-link to="/passwordForgot">
  <el-button class="footer-btn-left" type="info">首页</el-button>
    </router-link>
  <router-link to="/personalCenter">
    <el-button class="footer-btn-right" type="info">个人中心</el-button>
  </router-link>
</div>
</div>
</div>
</template>

<script>
  import { getBalance } from '@/api/admin/personalCenter'
  import {  getAuthenticate } from '@/api/admin/user'
  import {  removeToken,getToken } from '@/utils/auth'
    export default {
        name: "personalCenter",
      created() {
        this.getAuthenticate();
      },
      data() {
        return {
          prop: 'date', //对应日期字段名
          balance:'',
          username:'',
          authenticate:'',
          userId:localStorage.getItem('userId')
        };
      },
      mounted() {
          this.getList()
      },
      methods:{
        getList() {
          this.listLoading = true
          getBalance({id:this.userId}).then(response => {
            this.balance=response.data.balance
            this.username=localStorage.getItem('userInfo')
          }).catch(function (reason) {
            console.log(reason,'reason')
            // this.backLogin()
            // this.username=false
          })
        },
        getAuthenticate(){
          getAuthenticate(this.userId).then(res=>{
            this.authenticate = res.data.authenticate;
            // if(res.data.authenticate == 1){
            //   this.authenticate = '已认证';
            //   //$("#authenticate").css("color","red")
            // }else{
            //   this.authenticate = '未认证'
            // }
          })
        },
        backLogin(){
          removeToken();
          this.$router.push('/login')
        },
      }
    }
</script>

<style scoped>
  .footer-btn{position:fixed; bottom:5px;}
  .footer-btn-left{
    margin-left: 15px;
    width: 165px;
  }
  .footer-btn-right{
    width: 165px;
  }
  .el-icon-user{
    font-size: 90px;
  }
  .accountType{
    border-bottom: 1px solid #ddd;
    padding-bottom: 45px;
  }
  .priceSet, .languages, .accountSecurity, .financial, .payCenter{
    margin: 50px 25px;
  }
  .icon_user{
    display: block;
    float: left;
  }
</style>
