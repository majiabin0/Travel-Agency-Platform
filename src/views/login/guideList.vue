<template>
    <div>
      <div>
        <div class="line"></div>
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <router-link to="/guideList" class="header1">
            <el-menu-item index="6"><a>导游列表</a></el-menu-item>
          </router-link>
          <router-link to="/passwordForgot" class="header1">
            <el-menu-item index="1">评价管理</el-menu-item>
          </router-link>
          <router-link to="/orderList" class="header1">
            <el-menu-item index="4"><a>订单管理</a></el-menu-item>
          </router-link>
<!--          <router-link to="/test" class="header2">-->
<!--            <el-menu-item index="5"><a>飞牛旅行社</a></el-menu-item>-->
<!--          </router-link>-->
        </el-menu>
      </div>
      <div style="margin: 40px">
      <div style="float: left;margin-right: 25px">
        <span>时间：</span>
        <div style="display: inline-block;">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <span>精通语言：</span>
      <el-select v-model="value" placeholder="请选择" style="margin-right: 25px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.dictLabel"
          :value="item.dictValue">
        </el-option>
      </el-select>
      <span>性别：</span>
      <el-select v-model="sex" placeholder="请选择" style="margin-right: 45px">
        <el-option
          v-for="item in sexOptions"
          :key="item.value"
          :label="item.dictLabel"
          :value="item.dictValue">
        </el-option>
      </el-select>
      <span >证书等级：</span>
      <el-select v-model="certificateGrade" placeholder="请选择">
        <el-option
          v-for="item in certificate"
          :key="item.value"
          :label="item.dictValue"
          :value="item.dictValue">
        </el-option>
      </el-select>
      <el-button  @click="guideList" type="primary">查询</el-button>
      <div>

        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" style="margin-top: 25px;width: 1021px;">
          <el-checkbox v-for="(items,index) in coursesCampus" :label="items" :key="items" style="margin-top: 25px;margin-bottom: 17px">{{items.username}}&nbsp&nbsp&nbsp&nbsp{{items.qualifications}}<el-button  @click="showList(index)">评价</el-button></el-checkbox>
        </el-checkbox-group>
      </div>
        <el-button  @click="guideSubmit" type="primary">提交</el-button>
      <div  class="paging-container" style="margin-top: 100px">
        <el-pagination :total="page.total" :current-page.sync="listQuery.pageNum" :page-size="listQuery.pageSize" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, jumper" @size-change="handleSizeChange"></el-pagination>
      </div>
        <el-dialog  :visible.sync="dialogFormVisible">
          <el-form :model="form" ref="form" :rules="rules" label-width="100px">
            <el-form-item label="姓名">
              <div v-for="item in checkedGuide">
                <div style="float: left; margin-right: 10px;">{{item.username}}</div>
              </div>
            </el-form-item>
            <div class="block">
              <span class="demonstration">选择日期</span>
              <el-date-picker
                v-model="value1"
                value-format="yyyy-MM-dd"
                @change="getValue"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
            <el-form-item label="人数" style="margin-top: 30px">
              <el-input v-model="form.peopleNum"></el-input>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel('form')">取消</el-button>
            <el-button v-if="dialogStatus == 'create'" @click="saveUser('form')" type="primary">确定</el-button>
            <el-button v-else @click="updateUser('form')" type="primary">发送</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
</template>

<script>
  import { list2,guideList,orderSave } from '@/api/admin/guideList'
    export default {
      name: "guideList",
      data() {
        return {
          label:'',
          activeIndex: '6',
          activeIndex2: '6',
          input: '',
          radio: '1',
          // checkedCities:'',
          sex:'',
          dialogFormVisible:false,
          content:'',
          startTime:'',
          endTime:'',
          dataValue:'',
          form:{
            // beEvaluateUserName:'',
            // createTime:'',
            // evaluateTime:'',
            peopleNum:''

          },
          listValue:{},
          checkedGuide:[],
          checkedCities: [],
          isIndeterminate: true,
          certificateGrade:'',
          value1: '',
          current:'',
          rateScoreText: '',
          rateScoreDesc: ['非常不满意，各方面都很差', '不满意，比较差', '一般，还需改善', '比较满意，仍可改善', '非常满意,无可挑剔'],
          stara:'../../static/img/details/shoucang.png',//亮星星
          list:[0,1,2,3,4],
          starb:'../../static/img/details/shouc.png',//暗星星
          xing:0,
          coursesCampus:[],
          listQuery: {
            pageSize:10,
            pageNum:1
          },
          page: {
            total: 0,
            pageSizes: [10, 20, 30, 50],
            totalPage: 0,
          },
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }],
          sexOptions: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
          certificate: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
          value: ''
        };
      },
      created() {
        this.handleSex()
        this.guideList()
      },
      methods: {
        showList(index){
          this.$router.push({
            path:'/guideDetail',
            query: {
              userId: this.coursesCampus[index].id,
            },

          })
        },
        updateUser(){
          console.log(this.checkedGuide,'checkedGuide')
          // this.form.orderTo=this.dataValue.join(',');
          // this.form.startTime=this.startTime;
          // this.form.endTime=this.endTime;
          // this.form.orderFrom=1;
          console.log(typeof (this.form.orderTo),'form')
          axios.post('http://192.168.105.168:8012/webApi/order/save',{id:9,orderFrom:6,peopleNum:1}).then(function(res){
            console.log(res);//处理成功的函数 相当于success
          }).catch(function(error){
            console.log(error)//错误处理 相当于error
          })
          // orderSave({
          //   id:9,orderFrom:6,peopleNum:15
          // }).then(response => {
          //   console.log( response,'abc')
          //   let sexOptions=response.data.list;
          //   this.sexOptions=sexOptions
          //   console.log(this.sexOptions)
          // });
        },
        getValue(e){
          console.log(e[0]);
          this.startTime=e[0];
          this.endTime=e[1]
        },
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        handleCheckedCitiesChange(value) {
          let dataValue=[]
          for(let i=0;i<value.length;i++){
            // this.listValue=value[i].id;
            dataValue.push(value[i].id)
          }
          console.log(dataValue,'listValue')
          this.dataValue=dataValue
          console.log(this.dataValue,'dataValue')
          this.checkedGuide=value;
          let checkedCount = value.length;
          this.checkAll = checkedCount === this.coursesCampus.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.coursesCampus.length;
        },
        handleSex(){
          list2({
            dictType:"sys_user_sex"
          }).then(response => {
            console.log( response,'abc')
            let sexOptions=response.data.list;
            this.sexOptions=sexOptions
            console.log(this.sexOptions)
          });
          list2({
            dictType:"wx_can_language"
          }).then(response => {
            console.log( response,'abc')
            let options=response.data.list;
            this.options=options
            console.log(this.options)
          })
          list2({
            dictType:"wx_certification_level"
          }).then(response => {
            console.log( response,'abc')
            let certificate=response.data.list;
            this.certificate=certificate
            console.log(this.certificate)
          })
        },
        guideList(){
          guideList(this.listQuery).then(response => {
            console.log( response,'response')
            // let certificate=response.data.list;
            // this.certificate=certificate
            // console.log(this.certificate)
            this.coursesCampus=response.data.guideUserList;
            this.page.total=response.data.total
          })
        },
        guideSubmit(){
          this.dialogFormVisible=true;
        },
        clickStars(i){
          this.rateScoreText=this.rateScoreDesc[i]
          this.xing = i+1
          console.log("点击了"+(i+1)+"颗星")
        },
        handleCreate(item) {
          // this.form.beEvaluateUserName=item.beEvaluateUserName;
          // this.form.createTime=item.createTime;
          // this.form.evaluateTime=item.evaluateTime;
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
        // getList() {
        //   console.log(2222)
        //   this.listLoading = true
        //   reviewList({
        //     evaluateUserId: this.input?this.input:1,
        //     beEvaluateUserId:1,
        //   }).then(response => {
        //     this.form = response.data.orderEvaluateList
        //     console.log(this.form,'form')
        //   })
        // },
        cancel(){
          this.dialogFormVisible = false
        },
        // updateUser(){
        //   save({
        //     content:this.content,
        //     attitudeStar:4,
        //     professionalStar:4,
        //     evaluateTime:this.current
        //   }).then(response => {
        //     // this.form = response.data.orderEvaluateList
        //     // console.log(this.form,'form')
        //   })
        // },
        getCurrentDate()
        {
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
          this.guideList()
        },
        handleSizeChange(val) {
          this.listQuery.pageSize = val
          this.guideList()
        },
      }

    }
</script>

<style scoped>
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
    margin-left: 110px;
  }
  .header2{
    display: inline-block;
    float: right;
  }

</style>
