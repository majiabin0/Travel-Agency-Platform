<template>
  <div>
    <div class="order-list">订单列表</div>
    <div style="font-size: 16px">
      <div class="accountType">
       <div v-for="items in form">
         <span>￥{{items.num}}</span>
         <span>{{items.endTime}}</span>
         <span>{{items.orderState}}</span>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getBalance, getDetails } from '@/api/admin/personalCenter'
  export default {
    name: "personalCenter",
    data() {
      return {
        form: {}, //对应日期字段名
        balance:''
      };
    },
    mounted() {
      this.getList()
    },
    methods:{
      getList() {
        console.log(2222)
        this.listLoading = true
        getDetails({orderFrom:1}).then(response => {
          console.log(response,'response')
          this.form=response.data.list
          let data=response.data.list
          for (let i = 0; i < data.length; i++) {
            if (data[i].orderState == '0') {
              data[i].orderState = '待确认';
            } else if (data[i].orderState == '1') {
              data[i].orderState = '已确认';
            } else if (data[i].orderState == '2') {
              data[i].orderState = '已拒绝';
            } else if (data[i].orderState == '3') {
              data[i].orderState = '申请退款';
            } else if (data[i].orderState == '4') {
              data[i].orderState = '取消订单';
            } else if (data[i].orderState == '5') {
              data[i].orderState = '订单支付';
            } else if (data[i].orderState == '6') {
              data[i].orderState = '确认完成';
            }
          }
          // this.balance=response.balance
        })
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
    padding: 13px 0;
  }
  .priceSet, .languages, .accountSecurity, .financial, .payCenter{
    margin: 50px 25px;
  }
  .accountType span{
    margin: 0 15px;
  }
  .order-list{
    font-size: 16px;
    text-align: center;
    margin: 30px 0;
  }
</style>
