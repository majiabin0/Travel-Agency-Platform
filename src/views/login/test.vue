<template>
    <div>wo获取code</div>
</template>

<script>
  import { wxAuth,callBack } from '@/api/admin/user'
    export default {
        name: "test",
      data(){
          return{
            code:''
          }
      },
      mounted() {
          this.GetRequest()
        this.getCode()
      },
      methods:{
        GetRequest() {
          var url = window.location.href //获取url中"?"符后的字串
          var theRequest = new Object();
          if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("?");
            for(var i = 0; i < strs.length; i ++) {
              theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
            }
          }
          console.log(theRequest.code,'theRequest') ;
          this.code=theRequest.code
        },
        getCode(){
          callBack(
            {code: this.code}
          ).then(response => {
            console.log( response,'response')
            this.$router.push('/personalCenter')

          })
        },
      }

    }
</script>

<style scoped>

</style>
