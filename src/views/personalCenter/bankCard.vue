<template>
    <div>
      bank card
      <div>
        <!--        <el-calendar v-model="value" type="daterange" @pick="pickDate"></el-calendar>-->
        <ele-calendar
          :render-content="renderContent"
          :data="datedef"
          :prop="prop"
          @pick="datePick"
        ></ele-calendar>
      </div>
    </div>
</template>

<script>
  import eleCalendar from 'ele-calendar'
    export default {
      name: "bankCard",
      components: {
        eleCalendar
      },
      data() {
        return {
          datedef: [
            {'date': "2019-05-01", 'content': '休息', "cid": null},
            {'date': "2019-05-02", 'content': '休息', "cid": null},
          ],
          prop: 'date' //对应日期字段名
        };
      },
      methods:{

      }
    }
</script>

<style scoped>

</style>
