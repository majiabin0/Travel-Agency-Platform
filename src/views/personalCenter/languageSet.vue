<template>
  <div class="reviewList">
    <div class="header-manage">
      {{ $t('sidebar.systemSet') }}
<!--      系统设置-->
    </div>
    <div class="header-manage-list">
      <p1>{{ $t('sidebar.languageType') }}</p1>
      <el-row class="textareastyle">
        <el-select v-model="language" filterable class="el-select" @change="languageChange">
          <el-option v-for="item in languages" :value="item.dictValue" :label="item.dictLabel">

          </el-option>
        </el-select>
      </el-row>
      <el-row class="header-manage-list">
        <el-button type="primary" @click="closePage"> {{ $t('sidebar.closeBtn') }} </el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { getContryCode } from '@/api/admin/user'
    export default {
        name: "languageSet",
      data(){
          return{
            languages:[],
            language:'',
            //国家字典数据
            dictType:'wx_can_language'
          }
      },
      created() {
          this.getLanguage();
      },
      methods:{
        //关闭
        closePage(){
          this.$router.push({path:'/personalCenter'});
        },

        //语言下拉菜单
        getLanguage(){
          getContryCode(this.dictType).then(response=>{
            this.languages = response.data.list;
          })
        },
        //切换语言
        languageChange(id){
          console.log(id)
          if(id == '1'){
            this.$i18n.locale = 'zh'
          }else if(id == '2'){
            this.$i18n.locale = 'en'
          }else if(id == '3'){
            this.$i18n.locale = 'ja'
          }
          //this.$i18n.locale='elementEnLocale';
        }
      }
    }
</script>

<style >
  .header-manage-list{
    padding: 15px 0;
  }
  .textareastyle{
    margin-top: 2%;
  }
  .header-manage{
    font-size: 25px;
    margin-top: 10%;
    text-align: center;
  }
  .reviewList{
    margin: 0 10%;
  }

</style>
