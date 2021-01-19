<template>
  <div style="font-size: 16px;margin: 0 30px;">
    <router-link to="/historicalRecord">
      <div>
        <el-button type="primary" size="mini" class="record">提现记录</el-button>
      </div>
    </router-link>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <div class="balance">余额：￥{{balance}}</div>
    <div class="postContent">
      <el-button  @click="handlePost" type="primary">提现</el-button>
      <el-button  @click="handleBack">返回</el-button>
    </div>
  </div>
</template>

<script>
  import { getBalance } from '@/api/admin/personalCenter'
  export default {
    name: "onlinePay",
    data() {
      return {
        form: {}, //对应日期字段名
        balance:'',
        input:''
      };
    },
    mounted() {
      this.getList()
    },
    methods:{
      handlePost(){
        getBalance({id:1}).then(response => {
          this.balance=response.data.balance
          this.$notify({
            title: '成功',
            message: '成功',
            duration: 2000
          })
          this.$router.push('/personalCenter')
        })
      },
      getList(){
        getBalance({id:1}).then(response => {
          this.balance=response.data.balance
        })
      },
      handleBack(){
        this.$router.push('/personalCenter')
      }
    }
  }
</script>

<style scoped>
  .record{
    float: right;
    margin: 40px 0;
  }
  .postContent{
    text-align: center;
    margin-top: 200px;
  }
  .balance{
    margin-top: 15px;
  }
</style>

