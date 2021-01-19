<template>
  <el-card class="box-card">
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <div style="text-align: center;font-size: 22px;margin: 50px">注册</div>
        <el-form label-position="left" :model="formRegister" :rules="rules" ref="formRegister">
          <el-form-item label="国家：" prop="country">
            <el-select v-model="city" filterable placeholder="请选择">
              <el-option v-for="item in contries" :value="item.dictValue" :label="item.dictLabel" >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="phone">
            <el-span>{{city}}</el-span>
            <el-input v-model="formRegister.phone" placeholder="请输入手机号" style="border: none"></el-input>
          </el-form-item>

<!--          <el-form-item label="图片验证码" prop="name">-->
<!--            <el-input type="text" name="code" placeholder="请输入图片验证码" v-model="post.code" style="    width: 180px;"></el-input>-->
<!--            <img :src="imgsrc" alt="" width="180" height="60" @click="getCode()" v-if="show2">-->
<!--            <el-button v-if="show" @click="getCode()">点我获取图片验证码</el-button>-->
<!--          </el-form-item>-->
          <el-form-item prop="msgCode">
            <el-input v-model="formRegister.msgCode" placeholder="短信验证码" style="width: 180px!important;"></el-input>
            <ge-code :config="config" class="btn" ref="geCode" />
          </el-form-item>
          <!--            <button @click=closeCode>-->
          <!--              关闭倒计时-->
          <!--            </button>-->
          <!--            <el-input v-model="formRegister.msgCode"></el-input>-->

          <el-form-item prop="password">
            <el-input v-model="formRegister.password" placeholder="设置登录密码"></el-input>
          </el-form-item>
          <el-form-item prop="checkPassword">
            <el-input v-model="formRegister.checkPassword" placeholder="确认密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addUser">立即注册</el-button>
            <router-link to="/login">
              <el-button>取消</el-button>
            </router-link>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script type="text/javascript">

import geCode from 'vue-gecode'
import { getContryCode } from '@/api/admin/user'
export default {
  name: 'register',
  created() {
    this.getContryCode();
  },
  data () {
    //表单验证国家
    let checkCountry = (rule, value, cb) => {
      if (!this.city) {
        return cb(new Error('请选择国家!'))
      } else {
        cb(); // 将判断传递给后面
      }
    }
    //表单验证手机号
    let checkPhone = (rule, value, cb) => {
      if (!value) {
        return cb(new Error('手机号码不能为空!'))
      } else {
        cb(); // 将判断传递给后面
      }

    }
    //表单验证短信验证码
    let checkUserName = (rule, value, cb) => {
      if (!value) {
        return cb(new Error('短信验证码不能为空!'))
      } else {
        cb(); // 将判断传递给后面
      }

    }
    //表单验证密码
    let checkPassword = (rule, value, cb) => {
      if (!value) {
        return cb(new Error('密码不能为空!'))
      } else {
        cb();
      }
    }
    //验证密码是否一致
    let checkPasswordAgain = (rule, value, cb) => {
      if (!value) {
        return cb(new Error('再次输入密码不能为空!'))
      } else if (value !== this.formRegister.password) {
        return cb(new Error('两次输入密码不一致!'));
      } else {
        cb();
      }
    }

    return {
      show: true,
      show2: false,
      msgCode: '',
      imgsrc: '//www.baidu.com/img/superlogo_c4d7df0a003d3db9b65e9ef0fe6da1ec.png?where=super',
      post: {
        code: ''
      },
      city:'',
      contries:[],
      config: {
        //开始时候的文本
        startText: '发送验证码',
        //获取验证码结束后文本
        endText: '再次获取',
        //验证码倒计时总时间(秒)
        totalTime: 60,
        //验证码每次隔多久变一次(秒)
        tickTime: 1,
        //倒计时执行期添加的class 默认 isRun
        activeClass: 'isRun',
        //自定义倒计时期间文本的显示内容
        computeText (num) {
          //num 倒计时时间
          return '重新获取 ' + num + 's';
        },
        //是否可以发送
        canTodo: () => {
          //返回值判定是否可以发送
          let result = /^1[345678]\d{9}$/.test(this.formRegister.phone);
          console.log('判断是否可以发送验证码', result);
          if (!result) {
            alert('手机号格式不正确');
          }
          return result;
        },
        //canTode验证成功后执行 发送短信验证码
        todo: () => {
          //这里写验证码的获取程序
          console.log('发送验证码')
          this.$store.dispatch('user/MsgCode', {
            mobilePhone: this.formRegister.phone, areaCode: this.city
          })
            .then(res => {
              console.dir(res.data)

              // this.$router.push('/login')

            })
            .catch(err => {
              this.$message.error(`${err.message}`)
            })
        },
        //发送完成后的回调
        endCallback (type, config) {
          //type 回调产生原因  0: 时间结束   其他值由this.$refs.geCode.stop(1)调入自定义
          //config config配置
          console.log('发送完成后的回调', type, config);

        },
        //每次点击都会被调用
        click (isRun) {
          //isRun 是否在运行中
          console.log(`当前验证码状态是:${isRun ? '发送中' : '可发送'}状态`)
        },
        //是否可用   默认ture
        canUse: true,
        //不可用时的类名  默认no-can
        noCanClass: 'no-can',
      },
      phone: '',
      formRegister: {
        country: '',
        city: '',
        phone: '',
        msgCode: '',
        password: ''
      },
      rules: {
        country:[
          { validator: checkCountry, trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        msgCode: [
          { validator: checkUserName, trigger: 'blur' }
        ],
        password: [
          { validator: checkPassword, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: checkPasswordAgain, trigger: 'blur' }
        ]
      },
      //国家字典数据
      dictType:'wx_phone_country'
    }
  },
  // mounted(){
  //     this.getCode()
  // },
  methods: {
    getContryCode(){
      //获取国家字典
      this.listLoading = true
      getContryCode(this.dictType).then(response => {
        this.contries = response.data.list;
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    closeCode () {
      console.log('关闭');
      this.$refs.geCode.stop(1);
    },

    alert (text) {
      console.log(text)
    },
    getCode () {
      //这里写验证码的获取程序
      this.show = false;
      this.show2 = true;
      console.log('发送')
      this.$store.dispatch('user/getCode', {

        phone: this.formRegister.phone, areaCode: this.city
      })
        .then(res => {
          this.imgsrc = res.data.imageCode
          // if (res.data.error) {

          //     return false;
          // }else{
          //     this.$router.push('/login')
          // }
        })
        .catch(err => {
          this.$message.error(`${err.message}`)
        })
    },
    // 用户注册
    addUser () {
      let user = this.formRegister;
      let formData = {
        country: user.country,
        areaCode: this.city,
        phone: user.phone,
        code: user.msgCode,
        password: user.password
      };
      // 表单验证
      this.$refs['formRegister'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/register', formData)
            .then(res => {
              this.$message.success("注册成功");
              this.$router.push('/infoPerfection')

            })
            .catch(err => {
              // this.$message.error(`${err.message}`)
            })
        } else {
          this.$message.error('表单验证失败!')
          return false;
        }
      })
    }
  }
}
</script>
<style scoped>
.btn {
  border: 1px solid;
  height: 28px;
  line-height: 28px;
  display: inline-block;
  background: #ddd;
  width: 112px;
  text-align: center;
  border-radius: 7px;
}
.inputstyle{
  border: none !important;
}
</style>
