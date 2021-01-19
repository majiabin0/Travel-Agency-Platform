<template>
  <div>
    <div class="order-list">收支明细</div>
    <div style="font-size: 16px">
      <div class="accountType">
        <div v-for="myAdsItem in myForm" :key="myAdsItem.userId" class="accountType1"@click="getDetails(myAdsItem)">
            <span>￥{{myAdsItem.userId}}</span>
            <span>{{myAdsItem.reasonFromShopName}}</span>
            <span>{{myAdsItem.createTime}}</span>
          </div>
      </div>
      <router-link to="/personalCenter">
        <el-button>取消</el-button>
      </router-link>
    </div>
  </div>

</template>

<script>
  import { getBalance, orderservice } from '@/api/admin/personalCenter'
  export default {
    name: "detailAccount",
    data() {
      return {
        myForm: {},
        balance:'',
        reasonFromType
      };
    },
    mounted() {
      this.getList()
    },
    methods:{
      getList() {
        this.listLoading = true
        orderservice({userId:1}).then(response => {
          this.myForm=response.data.guideWaterBillList
          let data=response.data.guideWaterBillList
          console.log(this.myForm,'response')
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
            if(data[i].reasonFromType='1'){
              this.reasonFromType = true;
            }else if(data[i].reasonFromType='2'){
              this.reasonFromType = false;
              data[i].userId = '-'+ data[i].userId;
              console.log(data[i].userId)
            }
            this.$forceUpdate();
          }
          // this.balance=response.balance
        })
      },
      getDetails(myAdsItem){
        console.log(myAdsItem,'items')
        if(this.reasonFromType){
          this.$router.push({
            path: '/spendingDetails',
            query: {reasonFrom: myAdsItem.reasonFrom},
          });
        }else {
          this.$router.push({
            path: '/orderDetails',
            query: {reasonFrom: myAdsItem.reasonFrom},
          });
        }
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
    padding: 13px 0;
  }
  .accountType1{
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

