<template>
  <div>
    <div class="header-manage">
      设置档期
    </div>
    <div>
      <div>
        <span>From：</span>
        <el-date-picker class="pickstyle"
          v-model="guide_user_schedule.startDate"
          start-placeholder="开始日期">
        </el-date-picker>
      </div>
      <div>
        <span class="pickstyle">To：</span>
        <el-date-picker
          v-model="guide_user_schedule.endDate" class="pickstyle"
          start-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div>
        <el-input class="pickstyle" style="width: 80%;"
        type="textarea"
        placeholder="请填写备注"
        v-model="guide_user_schedule.remark">
        </el-input>
      </div>
    </div>

    <div class="butstyle">
      <el-button  @click="guideSubmit" type="primary" style="width: 70%">提交</el-button>
    </div>
  </div>
</template>

<script>
  import eleCalendar from 'ele-calendar'
  import Calendar from "vue-calendar-component"
  import axios from 'axios'
  import moment from "moment"
  import {getRemark} from "../../api/admin/user"

  export default {
    name: "dataSet",
    components: {
      eleCalendar,
      Calendar
    },
    data() {
      return {
        test: this.$route.query.chooseDate,
        arr2:[],
        guide_user_schedule:{
          id:'',
          userId:'33',
          startDate:'',
          endDate:'',
          state:'',
          delFlag:'',
          remark:''
        }
      };
    },
    created() {
      //获取备注
      this.getRemark();
      this.guide_user_schedule.startDate = new Date(this.$route.query.chooseDate);
      this.guide_user_schedule.endDate = new Date(this.$route.query.chooseDate);
    },

    methods: {
      guideSubmit(){
        var startD = this.guide_user_schedule.startDate;
        var endD = this.guide_user_schedule.endDate;
        // 验证日期起讫
        if(startD > endD){
          alert("开始时间不可大于结束时间！")
        }else{
          this.guide_user_schedule.startDate = moment(this.guide_user_schedule.startDate).format("YYYY-MM-DD");
          this.guide_user_schedule.endDate = moment(this.guide_user_schedule.endDate).format("YYYY-MM-DD");
          console.log(this.guide_user_schedule)
          axios.post('http://192.168.105.188:8080//wxApi/UserSchedule/save', this.guide_user_schedule,{
            headers:{
              'Authentication': 'web-token',
            }
          }).then(function (res) {
            if(res.data.code == 0){
              alert('设置成功！');
            }
          })
          this.$router.push({path:'/dateSet'});
        }
      },
      getRemark(){
        getRemark(this.guide_user_schedule.userId, this.$route.query.chooseDate).then(res=>{
          console.log(res)
          this.guide_user_schedule.remark=res.data.guideUserSchedule.remark
        })
      }
    }
  }
</script>

<style scoped>
  .header-manage{
    font-size: 21px;
    padding: 40px 0;
    text-align: center;
  }
  .header2{
    display: inline-block;
    float: right;
  }
  .butstyle{
    margin-top: 20%;
    text-align: center;
  }
  .pickstyle{
    margin-left: 5%;
    margin-top: 5%;
  }

</style>
