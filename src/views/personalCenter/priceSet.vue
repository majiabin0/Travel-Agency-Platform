<template>
  <div class="reviewList">
    <div class="header-manage">
      价格设置
    </div>
    <div style="font-size: 16px;margin: 0 30px;margin-top: 80px;">
      <span>服务价格：</span>
      <span class="priceSet">
       <el-input v-model="input" placeholder="请输入价格"></el-input>
    </span>
      <span>单位/天</span>
      <div class="postContent">
        <el-button  @click="handlePost" type="primary">确定</el-button>
        <el-button  @click="handleBack">返回</el-button>
      </div>
    </div>
  </div>

</template>

<script>
  import { setServicePrice } from '@/api/admin/personalCenter'
  export default {
    name: "priceSet",
    data() {
      return {
        prop: 'date', //对应日期字段名
        input:''
      };
    },
    mounted() {
      this.getList()
    },
    methods:{
      handlePost() {
        console.log(2222)
        this.listLoading = true
        setServicePrice({id:1,servicePrice:this.input}).then(response => {
          // this.balance=response.data.balance
          this.$notify({
            title: '成功',
            message: '成功',
            duration: 2000
          })
          this.$router.push('/personalCenter')
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
  .priceSet .el-input--medium{
    display: inline-block;
    width: 45% !important;
  }
  .header-manage{
    font-size: 25px;
    margin-top: 10%;
    text-align: center;
  }
  .reviewList{
    margin: 0 10%;
  }
</style>
