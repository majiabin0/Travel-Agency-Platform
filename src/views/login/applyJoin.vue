<template>
<div>
  <ul class="StarsWrap">
    <li v-for="(i,index) in list" :key="index" @click="clickStars(index)">
      <img :src="xing>index?stara:starb"/>
    </li>
  </ul>
  <p>{{rateScoreText}}</p>
</div>
</template>

<script>

  export default {
    name: 'evaluate',
    data () {
      return {
        rateScoreText: '',
        rateScoreDesc: ['非常不满意，各方面都很差', '不满意，比较差', '一般，还需改善', '比较满意，仍可改善', '非常满意,无可挑剔'],
        stara:'../../static/img/details/shoucang.png',//亮星星
        list:[0,1,2,3,4],
        starb:'../../static/img/details/shouc.png',//暗星星
        xing:0,
      }
    },
    methods:{
      clickStars(i){
        this.rateScoreText=this.rateScoreDesc[i]
        this.xing = i+1
        console.log("点击了"+(i+1)+"颗星")
      }
    },
  }
</script>

<style scoped>
  .StarsWrap{
    width: 100%;
    height: 0.2rem;
    margin: 0.1rem 0;
  }
  .StarsWrap li{
    float: left;
    margin-right: 0.1rem;
  }
</style>
