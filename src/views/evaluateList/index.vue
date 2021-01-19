<template>
    <div style="font-size: 14px;">
      <div class="order-list">评价列表</div>
      <div class="reviewList">
        <div v-for='(item,index) in form' :key="item"  class="beEvaluate">
          <div>
            <span>姓名:</span>
            <span>{{item.beEvaluateUserName}}</span>
          </div>
          <div>
            <span>发布时间:</span>
            <span>{{item.createTime}}</span>
          </div>
          <div>
            <span>态度评分:</span>
            <el-rate
              v-model="item.attitudeStar"
              disabled
              show-score
              text-color="#ff9900"
              style="display: inline;"
              score-template="{value}">
            </el-rate>
          </div>
          <div>
            <span>专业评分:</span>
            <el-rate
              v-model="item.professionalStar"
              disabled
              show-score
              text-color="#ff9900"
              style="display: inline;"
              score-template="{value}">
            </el-rate>
          </div>
          <div>
            <span>内容:</span>
            <span>{{item.content}}</span>
          </div>
<!--          <el-button type="primary" @click="removeUser(item)">删除评价</el-button>-->
        </div>
        <div  class="paging-container" style="margin-top: 100px">
          <el-pagination :total="page.total" :current-page.sync="listQuery.pageNum" :page-size="listQuery.pageSize" @current-change="handleCurrentChange" small="true"></el-pagination>
        </div>
        <el-dialog  :visible.sync="dialogFormVisible">
          <el-form :model="form" ref="form" :rules="rules" label-width="100px">
            <el-form-item label="姓名">
              <el-input v-model="form.beEvaluateUserName"  readonly="readonly" class="border-style"></el-input>
            </el-form-item>
            <el-form-item label="订单号">
              <el-input v-model="form.orderId"  readonly="readonly"class="border-style"></el-input>
            </el-form-item>
            <el-form-item label="时间">
              <el-input v-model="form.createTime"  readonly="readonly"class="border-style"></el-input>
            </el-form-item>
            <el-form-item label="下单时间">
              <el-input v-model="form.evaluateTime"  readonly="readonly"class="border-style"></el-input>
            </el-form-item>
            <el-form-item label="评价">
              <el-input v-model="content" type="textarea"  :autosize="{minRows: 3, maxRows: 5}" class="border-style"></el-input>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel('form')">取消</el-button>
            <el-button v-if="dialogStatus == 'create'" @click="saveUser('form')" type="primary">确定</el-button>
            <el-button v-else @click="updateUser('form')" type="primary">确定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
</template>

<script type="text/javascript">
  import { reviewList,save,delete2 } from '@/api/admin/review'
  export default {
    name: 'register',
    components: {
      "Header": () => import('../common/header.vue')
    },
    data() {
      return {
        value: 3.7,
        value2: 4,
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
        console.log(2222)
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
<style>
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
    display: inline-block;
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
  .order-list{
    font-size: 18px;
    text-align: center;
    margin: 30px 0;
  }
  .el-dialog__wrapper .el-dialog{
    width: 85%;
  }
</style>
