<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">
          {{ $t('login.title') }}
        </h3>
      </div>

      <el-form-item prop="userName">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="loginForm.username"
          :placeholder="$t('login.username')"
          name="username"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          v-model="loginForm.password"
          :type="passwordType"
          :placeholder="$t('login.password')"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
<!--      <router-link to="/test">-->
      <div style="color: #ffffff;" @click="weChat"><a :href="weChatPath">忘记密码</a></div>
<!--      </router-link>-->
      <router-link to="/Register">
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">
        {{ $t('login.logIn') }}
      </el-button>
      </router-link>
      <router-link to="/auth-redirect">
      <el-button type="primary" style="width:100%;margin-bottom:30px;" >
        注册
      </el-button>
        </router-link>
    </el-form>
    <el-dialog
      title="请选择机构"
      :visible.sync="dialogVisible"
      width="30%"
      :append-to-body="true">
<!--      <div @click="showInfo1"style="font-size: 20px;margin-top: 9px"><a>{{institutionName1}}</a></div>-->
<!--      <div @click="showInfo2"style="font-size: 20px;margin-top: 29px"><a>{{institutionName2}}</a></div>-->
<!--      <div @click="showInfo3"style="font-size: 20px;margin-top: 29px"><a>{{institutionName3}}</a></div>-->
      <span slot="footer" class="dialog-footer">
<!--    <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
  </span>
                      <div v-for='(item,index) in organizationsLength' :key="item.orgId"style="margin: 25px;">
                        <div @click="getId(item)" style="font-size: 20px;margin-top: 29px">{{item.orgName}}</div>
                      </div>
    </el-dialog>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { wxAuth,callBack } from '@/api/admin/user'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
        institutionName1:'',
        institutionName2:'',
        institutionName3:'',
        appId:'',
        organizationsLength:{},
        dialogVisible:false,
        orgId:{
            orgId:''
        },
       weChatPath:'',
        loginForm: {
            username: '张三4',
            password: '123456',

        },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
          console.log(route)
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    // this.getAppID()
    // this.getCode()
    // window.addEventListener('storage', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {

    getAppID(){
      wxAuth().then(response => {
        console.log( response,'response')
        // 授权回调域名
        let host = `http://192.168.105.96:8080/#/test`
// 授权后重定向url地址 注意是编码后url，不编码#后面的参数会消失
//         let redirectUrl = encodeURIComponent(`${host}/wechat_login`)
        // let redirectUrl = 'https%3A%2F%2Fwx.triosys-solutions.com.cn%2Fguide%2FwxLogin%2FcallBack'
        this.appId=response.data.appid
        console.log(this.weChatPath,'weChatPath')
        // this.weChatPath=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appId}&redirect_uri=` +
        //   `${host}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
          // let certificate=response.data.list;
      })
    },
    // getCode(){
    //   callBack(
    //     {code:123}
    //   ).then(response => {
    //     console.log( response,'response')
    //
    //   })
    // },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then((res) => {
                console.log(res,'res');
                let user=res.data.guideUser.username
              let userToken=res.data.token
              let userId=res.data.guideUser.id;
              this.$store.dispatch('user/recordUser',user)
              this.$store.dispatch('user/recordToken',userToken)
              this.$store.dispatch('user/recordId',userId)
              // console.log(this.redirect,'redirect')
              this.$router.replace({ path: '/passwordForgot' })

                //
                //
                // if(res.data.identity== 'user'){
                //     console.log('identity')
                //     this.$router.push({ path: '/applyJoin' })
                //     // this.$router.push({ path: this.redirect || '/' })
                // }else if(res.data.identity== 'orgMember'){
                //     // this.$router.push({ path: '/applyJoin' })
                //     this.dialogVisible=true;
                //     // this.$router.push({ path: '/applyJoin' })
                // }
                // else if(res.data.identity== 'orgApply'){
                //     this.$router.push({ path: '/submitAudit' })
                //
                // }
                // const organizationsLength=res.data.organizations
                // this.organizationsLength=organizationsLength
                // console.log(this.organizationsLength,'organizationsLength')
                // if(organizationsLength.length==2){
                //     this.institutionName1=res.data.organizations[0].orgName;
                //     this.institutionName2=res.data.organizations[1].orgName;
                //     this.orgId1.orgId=res.data.organizations[0].orgId;
                //     this.orgId2.orgId=res.data.organizations[1].orgId;
                // }else if(organizationsLength.length==3){
                //     this.institutionName1=res.data.organizations[0].orgName;
                //     this.institutionName2=res.data.organizations[1].orgName;
                //     this.institutionName3=res.data.organizations[2].orgName;
                //     this.orgId1.orgId=res.data.organizations[0].orgId;
                //     this.orgId2.orgId=res.data.organizations[1].orgId;
                //     this.orgId3.orgId=res.data.organizations[2].orgId;
                // }else if(organizationsLength.length==1){
                //     this.institutionName1=res.data.organizations[0].orgName;
                //     this.orgId1.orgId=res.data.organizations[0].orgId;
                // }
                // this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
      getId(item) {
          console.log(item,'event')
          this.orgId.orgId=item.orgId
          console.log(this.orgId,"orgId")
          this.$store.dispatch('user/chooseOrgIdentity', this.orgId)
              .then((res) => {
                  localStorage.setItem('organization',JSON.stringify(res.data.organization.id))
                  // this.$store.commit('handleUserName',res.data.organization);
                  this.$router.push({ path: this.redirect || '/' })
              })
              .catch(() => {

              })
      },
    weChat(){
      // wxAuth().then(response => {
      //   console.log( response,'response')
      //   // let certificate=response.data.list;
      //   // this.certificate=certificate
      //   // console.log(this.certificate)
      //   // this.coursesCampus=response.data.guideUserList;
      //   // this.page.total=response.data.total
      // })
        // 授权回调域名
        let host = `https://wx.triosys-solutions.com.cn/guidePC`
// 授权后重定向url地址 注意是编码后url，不编码#后面的参数会消失
        let redirectUrl = encodeURIComponent(`https://wx.triosys-solutions.com.cn/guidePC/#/test`)
        // let redirectUrl = 'https%3A%2F%2Fwx.triosys-solutions.com.cn%2Fguide%2FwxLogin%2FcallBack'
        this.appId='wxbc4150ff61de6994'
        this.weChatPath=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appId}&redirect_uri=` +
          `${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
      console.log(this.weChatPath,'weChatPath')
      console.log(window.location.href,'window.location.href')
        // let certificate=response.data.list;
        // this.certificate=certificate
        // console.log(this.certificate)
        // this.coursesCampus=response.data.guideUserList;
        // this.page.total=response.data.total

    }
      // showInfo1(){
      //
      //     this.$store.dispatch('user/chooseOrgIdentity', this.orgId1)
      //         .then((res) => {
      //             localStorage.setItem('organization',JSON.stringify(res.data.organization.id))
      //             // this.$store.commit('handleUserName',res.data.organization);
      //             this.$router.push({ path: this.redirect || '/' })
      //         })
      //         .catch(() => {
      //
      //         })
      //     console.log(this.orgId1)
      // },
      // showInfo2(){
      //     this.$store.dispatch('user/chooseOrgIdentity', this.orgId2)
      //         .then((res) => {
      //             localStorage.setItem('organization',JSON.stringify(res.data.organization.id))
      //             // this.$router.push({ path: this.redirect || '/' })
      //             this.$router.push({ path: this.redirect || '/' })
      //         })
      //         .catch(() => {
      //
      //         })
      //     console.log(this.orgId2)
      // },
      // showInfo3(){
      //     this.$store.dispatch('user/chooseOrgIdentity', this.orgId3)
      //         .then((res) => {
      //             localStorage.setItem('organization',JSON.stringify(res.data.organization.id))
      //             // this.$router.push({ path: this.redirect || '/' })
      //             this.$router.push({ path: this.redirect || '/' })
      //         })
      //         .catch(() => {
      //
      //         })
      // }
  }
}
</script>

<style lang="scss">
$bg:#283443;
$light_gray:#eee;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;

    &::first-line {
      color: $light_gray;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
