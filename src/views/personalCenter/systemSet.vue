<template>
  <div class="reviewList">
    <div class="header-manage">
      系统设置
    </div>
    <div class="header-manage-list">
      <el-row class="rowstyle" >
        <el-col :span="2">
          <span>
            <i class="el-icon-user-solid"></i>
          </span>
        </el-col>
        <el-col :span="6">
<!--          <el-input type="text" v-model="username"></el-input>-->
          <span>{{username}}</span>
        </el-col>
      </el-row>
      <el-row class="rowstyle" >
        <router-link to="/accountSecurity" class="textstyle">账户与安全
        </router-link>

      </el-row>
      <el-row class="rowstyle" >
        <router-link to="/privacyPolicy" class="textstyle">隐私政策
        </router-link>
      </el-row>
      <el-row class="rowstyle" >
        <i class="textstyle" @click="dialogVisible = true">清除缓存</i>
      </el-row>
      <el-row class="rowstyle" >
        <router-link to="/serviceTerms" class="textstyle">用户服务条款
        </router-link>
      </el-row>
      <el-row class="rowstyle" >
        <router-link to="/withdrawalRules" class="textstyle">余额和提现规则
        </router-link>
      </el-row>
      <el-row class="rowstyle" >
        <router-link to="/aboutGuide" class="textstyle">关于导游平台
        </router-link>
      </el-row>
      <el-row class="header-manage-list rowstyle">
        <el-button type="primary" @click="changeUser" class="buttonstyle">切换账户 </el-button>
      </el-row>
      <el-row class="header-manage-list rowstyle">
        <el-button type="info" @click="exitUser" class="buttonstyle">退出登录 </el-button>
      </el-row>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="70%" >
      <span>是否清除缓存</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="cleanCache">确定</el-button>
      </span>
    </el-dialog>
<!--    <el-dialog title="版本信息" :visible.sync="dialogEdition" width="70%">-->
<!--      <span>版本1.1.0</span>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button type="primary" @click="dialogEdition = false">确定</el-button>-->
<!--      </span>-->
<!--    </el-dialog>-->
  </div>
</template>

<script>
  import { getContryCode } from '@/api/admin/user'
  import {  removeToken,getToken } from '@/utils/auth'

    export default {
        name: "systemSet",
      created() {

      },
      data(){
        return{
          username:localStorage.getItem('userInfo'),
          dialogVisible: false,
          //dialogEdition: false,
        }
      },
      methods:{
        //切换账户
        changeUser(){
          this.$router.push({path:'/index'});
        },
        //清除缓存
        cleanCache(){
          //清除缓存
          removeToken();
          this.dialogVisible=false;
        },
        //退出
        exitUser(){
          //清除缓存
          removeToken();
          this.$router.push('/login')
        },

      }
    }
</script>

<style >
  .header-manage{
    font-size: 21px;
    padding: 40px 0;
    text-align: center;
  }
  .reviewList{
    margin: 0 10%;
  }
  .header-manage-list{
    padding: 15px 0;
  }
  .rowstyle{
    margin-top: 5%;
  }
  .buttonstyle{
    width: 90%;
  }

</style>
