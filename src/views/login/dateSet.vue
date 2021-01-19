<template>
    <div>
      <div class="header-manage">
        档期管理
      </div>
      <div>
        <Calendar
          ref="Calendar"
          :markDate="arr2"
          v-on:choseDay="changeDate"
        ></Calendar>
      </div>
    </div>
</template>

<script>
  import eleCalendar from 'ele-calendar'
  import Calendar from "vue-calendar-component"
  import { getDateList } from '../../api/admin/user'

    export default {
      name: "dataSet",
      components: {
        eleCalendar,
        Calendar
      },
      data() {
        return {
          userId:'33',
          arr2:[]
        };
      },
      created() {
        this.getDateList();
      },
      methods: {
        changeDate(e){
          this.$router.push({
            path:'/dateChange',
            query: {
              chooseDate: e
            },
          })
        },
        getDateList(){
          getDateList(this.userId).then(res=>{
            for(var i = 0; i < res.data.guideUserScheduleList.length; i++){
              this.arr2.push(res.data.guideUserScheduleList[i].scheduleDate)
            }
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

</style>
