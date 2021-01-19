<template>
  <div>
    <Header ref="header"></Header>
    <div class="footer-btn">
      <router-link to="/passwordForgot">
      <el-button class="footer-btn-left" type="info">首页</el-button>
      </router-link>
      <router-link to="/personalCenter">
        <el-button class="footer-btn-right" type="info">个人中心</el-button>
      </router-link>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { mapState } from 'vuex'
  import { reviewList,save,delete2 } from '@/api/admin/review'
    export default {
        name: 'passwordForgot',

      computed: mapState({
        userInfo: (state) => state.userInfo
      }),
      components: {
        "Header": () => import('../common/header.vue')
      },
      data() {
        return {
          username:this.$store.state.user.userInfo.username,
          input: '',
          radio: '1',
          dialogFormVisible:false,
          content:'',
          form:{
            beEvaluateUserName:'',
            createTime:'',
            evaluateTime:'',
          },
          listQuery: {
            pageSize:5,
            pageNum:1,
            evaluateUserId: this.input?this.input:1,
            beEvaluateUserId:''
          },
          page: {
            total: 0,
            pageSizes: [10, 20, 30, 50],
            totalPage: 0,
          },
          current:'',
          rateScoreText: '',
          rateScoreDesc: ['非常不满意，各方面都很差', '不满意，比较差', '一般，还需改善', '比较满意，仍可改善', '非常满意,无可挑剔'],
          stara:'../../static/img/details/shoucang.png',//亮星星
          list:[0,1,2,3,4],
          starb:'../../static/img/details/shouc.png',//暗星星
          xing:0,
        };
      },
      created() {
        this.getList()
        this.getCurrentDate()
        // console.log(this.$store.state.user.userInfo.username,'userInfo')
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        clickStars(i){
          this.rateScoreText=this.rateScoreDesc[i]
          this.xing = i+1
          console.log("点击了"+(i+1)+"颗星")
        },
        handleCreate(item) {
          this.form.beEvaluateUserName=item.beEvaluateUserName;
          this.form.createTime=item.createTime;
          this.form.evaluateTime=item.evaluateTime;
          this.content=item.content;
          this.dialogFormVisible = true
        },
        removeUser(item) {
          this.$confirm('确认删除这条评论吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log(item.id)
            delete2({id:item.id}).then(response => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                duration: 2000
              })
              this.getList()
            })
          })
        },
        getList() {
          this.listLoading = true
          reviewList(this.listQuery).then(response => {
            this.form = response.data.orderEvaluateList
            console.log(this.form,'form')
            this.page.total=response.data.total
          })
        },
        cancel(){
          this.dialogFormVisible = false
        },
        updateUser(){
          save({
            content:this.content,
            attitudeStar:4,
            professionalStar:4,
            evaluateTime:this.current
          }).then(response => {
            // this.form = response.data.orderEvaluateList
            // console.log(this.form,'form')
          })
        },
        getCurrentDate() {
          var timeStr = '-';
          var curDate = new Date();
          var curYear =curDate.getFullYear();  //获取完整的年份(4位,1970-????)
          var curMonth = curDate.getMonth()+1;  //获取当前月份(0-11,0代表1月)
          var curDay = curDate.getDate();       //获取当前日(1-31)
          var curWeekDay = curDate.getDay();    //获取当前星期X(0-6,0代表星期天)
          var curHour = curDate.getHours();      //获取当前小时数(0-23)
          var curMinute = curDate.getMinutes();   // 获取当前分钟数(0-59)
          var curSec =curDate.getSeconds();      //获取当前秒数(0-59)
          var Current= curYear+timeStr+curMonth+timeStr+curDay+' '+curHour+':'+curMinute+':'+curSec;
          this.current=Current;
          console.log(this.current)

          // this.datetime=Current;
          return Current;
        },
        handleCurrentChange(val) {
          this.listQuery.pageNum = val
          this.getList()
        },
        handleSizeChange(val) {
          this.listQuery.pageSize = val
          this.getList()
        },
      }
    }
</script>
<style >
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
  }
  .reviewList{
    margin: 0 10%;
  }
  .header-manage{
    font-size: 26px;
    padding: 40px 0;
    border-bottom: 1px solid;
  }
  .header-manage-list{
    padding: 15px 0;
  }
  .header-manage-radio{
    padding: 15px 0;
  }
  .border-style .el-input__inner{
    border: none!important;
  }
  .beEvaluate div{
    margin: 20px 0;
  }
  .beEvaluate{
    margin-top: 52px!important;
    margin-bottom: 30px;
  }
  .StarsWrap{
    width: 100%;
    height: 0.2rem;
    margin: 0.1rem 0;
  }
  .StarsWrap li{
    float: left;
    margin-right: 0.1rem;
  }

  .footer-btn{position:fixed; bottom:5px;}
  .footer-btn-left{
    margin-left: 15px;
    width: 165px;
  }
  .footer-btn-right{
    width: 165px;
  }
</style>
