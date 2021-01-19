<template>
  <div style="margin: 0 30px">
    <div style="text-align: center;font-size: 19px;margin: 30px 0">支出详情</div>
    <el-form label-position="left" label-width="110px" :model="adminList" :rules="rules" ref="formRegister">

      <el-form-item label="订单号">
        <el-input v-model="adminList.orderNum" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="金额" >
        <el-input v-model="adminList.reward" style="width: 180px!important;"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-input v-model="adminList.orderState"></el-input>
      </el-form-item>
      <el-form-item>
        <router-link to="/detailAccount">
          <el-button>取消</el-button>
        </router-link>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import { detailsOrderservice } from '@/api/admin/personalCenter'
  export default {
    name: "spendingDetails",
    data(){
      return{
        adminList:{

        },
        classGetList:{
          newClassName:'',
          newClassTimes:''
        },
        newClassTimes:'',
        newClassName:'',
        dialogFormVisible:false,
      }
    },
    created() {
      this.getList()
    },
    methods:{
      changeRole(e){
        console.log(e,'e')
      },
      getList(){
        detailsOrderservice({
          id:this.$route.query.reasonFrom,
        }).then(response => {
          console.log(response,'getClassByStuId')
          let data=response.data.guideOrderService;
          this.adminList=data;
          console.log( this.adminList,'adminList')
          if (this.adminList.orderState == '0') {
            this.adminList.orderState = '待确认';
          } else if (this.adminList.orderState == '1') {
            this.adminList.orderState = '已确认';
          } else if (this.adminList.orderState == '2') {
            this.adminList.orderState = '已完成';
          }
        })
      },
      cancel(){
        this.dialogFormVisible=false;
      }
    }
  }
</script>

<style scoped>

</style>
