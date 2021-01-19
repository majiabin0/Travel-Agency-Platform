<template>
    <div class="accountSecurity">
      <div class="header-manage">
        密码修改
      </div>
      <div>
        <el-col :span="2">
          <span>
            <i class="el-icon-user-solid"></i>
          </span>
        </el-col>
        <el-col :span="6">
          <!--          <el-input type="text" v-model="username"></el-input>-->
          <span>{{username}}</span>
        </el-col>
      </div>
      <div class="oldPassword">
        <span>原密码：</span>
        <el-input v-model="form.oldPassword" placeholder="请输入原密码"></el-input>
      </div>
      <div class="newPassword">
        <span>新密码：</span>
        <el-input v-model="form.newPassword" placeholder="请输入新密码"></el-input>
      </div>
      <div class="postContent">
        <el-button  @click="handlePost" type="primary">确定</el-button>
        <el-button  @click="handleBack">返回</el-button>
      </div>
    </div>
</template>

<script>
  import { updatePassword } from '@/api/admin/personalCenter'
    export default {
        name: "accountSecurity",
      data() {
        return {
          username: localStorage.getItem('userInfo'),
           form:{
             id:1,
             oldPassword:'',
             newPassword:'',
           }
        };
      },
      methods:{
        handlePost(){
          updatePassword(this.form).then(response => {
            console.log( response,'response')
            // let certificate=response.data.list;
            // this.certificate=certificate
            // console.log(this.certificate)
            // this.coursesCampus=response.data.guideUserList;
            // this.page.total=response.data.total
            this.$notify({
              title: '成功',
              message: '修改成功',
              duration: 2000
            })
            this.$router.push('/personalCenter')
          })
        },
        handleBack(){
          this.$router.push('/systemSet')
        }
      }
    }
</script>

<style scoped>
  .accountSecurity{
    font-size: 16px;
    margin: 0 30px;
  }
  .postContent{
    text-align: center;
    margin-top: 200px;
  }
  .oldPassword{
    margin: 30px 0;
  }
  .newPassword{
    margin: 30px 0;
  }
  .newPassword div{
    margin: 10px 0;
  }
  .oldPassword div{
    margin: 10px 0;
  }
  .header-manage{
    font-size: 21px;
    padding: 40px 0;
    text-align: center;
  }
</style>
