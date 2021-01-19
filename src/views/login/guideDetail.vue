<template>
  <el-card class="box-card">
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <div style="text-align: center;    margin: 50px;font-size: 22px;">导游详情</div>
        <el-form label-position="left" label-width="110px" :model="formRegister" :rules="rules" ref="formRegister">
          <el-form-item label="导游">
            <el-input v-model="formRegister.username" ></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="formRegister.phone" ></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="formRegister.email" ></el-input>
          </el-form-item>

          <el-form-item label="资质信息">
            <el-input v-model="formRegister.qualifications" ></el-input>
          </el-form-item>
          <el-form-item label="服务语言">
            <el-input v-model="formRegister.serviceLanguage" ></el-input>
          </el-form-item>
          <el-form-item label="服务价格">
            <el-input v-model="formRegister.servicePrice" ></el-input>
          </el-form-item>
          <el-form-item label="是否开车">
            <el-input v-model="formRegister.isCar" ></el-input>
          </el-form-item>
          <el-form-item label="是否会开车">
            <el-input v-model="formRegister.isDrivingcar" ></el-input>
          </el-form-item>
          <el-form-item label="接单数">
            <el-input v-model="formRegister.receiptNum" ></el-input>
          </el-form-item>
          <el-form-item label="评分">
            <el-input v-model="formRegister.score" ></el-input>
          </el-form-item>
          <el-form-item>
<!--            <el-button type="primary" @click="addUser">提交</el-button>-->
            <!--            <router-link to="/login">-->
            <el-button @click="backLogin">返回</el-button>

          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script type="text/javascript">
  import { details2 } from '@/api/admin/guideList'
  export default {
    name: 'applyJoin',
    data () {


      return {
        id: '',
        center: { lng: 0, lat: 0 },
        zoom: 13,
        dialogVisible: false,
        institutionName: '',
        address: '',
        radio: 3,
        show: true,
        show2: false,
        msgCode: '',
        imgsrc: '//www.baidu.com/img/superlogo_c4d7df0a003d3db9b65e9ef0fe6da1ec.png?where=super',
        post: {
          code: ''
        },
        selectedOptions: [],
        config: {
          //开始时候的文本
          startText: '获取手机验证码',
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
        formRegister: {
          qualifications:'',
          serviceLanguage: '',
          servicePrice: '',
          isCar: '',
          isDrivingcar: '',
          dialogVisible: false,
          introduceCode: '',
          grade: '',
          phone: '',
          email: '',
          username:'',
          score:'',
          receiptNum:''
        },
        rules: {
          phone: [
            { required: true, message: '请输入联系方式', trigger: 'blur' }
          ],
          boss: [
            { required: true, message: '请输入负责人', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入详细地址', trigger: 'blur' }
          ],
          mapAddress: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
          institutionName: [
            { required: true, message: '请输入机构名称', trigger: 'blur' }
          ],
          joinWay: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
        },
        // request: axios.create({
        //     baseURL: 'ips', // api的base_url
        //     timeout: 15000
        // })
      }
    },
    mounted(){
        this.getList()
    },
    methods: {
      handler ({ BMap, map }) {

        console.log(BMap, map)

        this.center.lng = 117.137416

        this.center.lat = 36.692815

        this.zoom = this.zoom


      },

      getClickInfo (e) {
        var _this = this;
        console.log(e)

        console.log(e.point.lat)
        _this.lng = e.point.lng;
        _this.lat = e.point.lat;
        var latitude = e.point.lat;
        var longitude = e.point.lng;
        let that = this
        console.log(111)
        // function quickApply(data) {
        //     console.log(data ,'1111')
        //     // data.password = md5(data.password)
        //     return request({
        //         url: 'http://api.map.baidu.com/geocoder/v2/?ak=AAux2OA2FFpltiYYksfug7AzomEoaT7c&location=' + latitude + ',' + longitude + '&output=json&pois=1',
        //         method: 'post',
        //         params: data
        //
        //     })
        // }

        // axios.defaults.baseURL='http://api.map.baidu.com';
        axios.get('ips/geocoder/v2/?ak=AAux2OA2FFpltiYYksfug7AzomEoaT7c&location=' + latitude + ',' + longitude + '&output=json&pois=1', {
            params: {
              courseId: 'd04e24ee-f66b-4b21-9879-601ddaaef862',
            }
          }
        ).then(function (resp) {
          console.log(resp, 'resp')
        })
        // $.ajax({
        //     url:'http://api.map.baidu.com/geocoder/v2/?ak=AAux2OA2FFpltiYYksfug7AzomEoaT7c&location=' + latitude + ',' + longitude + '&output=json&pois=1',
        //     dataType: 'jsonp',
        //     callback: 'BMap._rd._cbk43398',
        //     success: function(res) {
        //         console.log(res);
        //         var result = res.result,
        //             addressComponent = result.addressComponent,
        //             adcode = addressComponent.adcode
        //   console.log(adcode,'adcode')
        //     }
        // });


        // console.log(_this.lat,"AAA")
        this.center.lng = e.point.lng
        var geoc = new BMap.Geocoder();
        this.center.lat = e.point.lat
        var pt = e.point;
        geoc.getLocation(pt, function (rs) {
          console.log(rs.addressComponents, 'rs')
          var addComp = rs.addressComponents;
          alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
          _this.formRegister.mapAddress = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber
          console.log(_this.formRegister.mapAddress)
        });

      },
      openDialog () {
        // 百度地图API功能
        this.dialogVisible = true;
        // var map = new BMap.Map("allmap");
        // var point = new BMap.Point(116.331398,39.897445);
        // map.centerAndZoom(point,12);
        // var geoc = new BMap.Geocoder();
        //
        // map.addEventListener("click", function(e){
        //     var pt = e.point;
        //     geoc.getLocation(pt, function(rs){
        //         var addComp = rs.addressComponents;
        //         alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
        //     });
        // });
      },

      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => { });
      },
      backLogin () {
        // removeToken();
        this.$router.push('/guideList')
      },
      test () {
        this.$router.push('/information')
      },
      handleChange (value) {

        console.log(value)

      },

      closeCode () {
        console.log('关闭');
        this.$refs.geCode.stop(1);
      },

      alert (text) {
        console.log(text)
      },
      getList(){
        details2({
          userId:this.$route.query.userId,
        }).then(response => {
          this.formRegister=response.data.guideUser
          if(response.data.guideUser.isCar==1){
            this.formRegister.isCar='是'
          }else {
            this.formRegister.isCar='否'
          }
          if(response.data.guideUser.isDrivingcar==1){
            this.formRegister.isDrivingcar='是'
          }else {
            this.formRegister.isDrivingcar='否'
          }
          console.log(this.formRegister,'formRegister')
          // let data=response.data;
          // this.adminList=data;
          // console.log( this.adminList,'adminList')
        })
      },
      // 用户注册
      addUser () {
        // console.log(parseInt('的'),'222')

        let user = this.formRegister;
        let formData = {
          applyType: this.formRegister.joinWay,
          contactsPhone: this.formRegister.phone,
          contactsName: this.formRegister.boss,
          orgName: this.formRegister.institutionName,
          orgAddress: this.formRegister.address,
          cityCode: 370982,
          // city:this.formRegister.mapAddress,
          businessLicenseFile: 1,
          campusName: 1,
          mainCourse: 1,
          imgAddress: 1,
          lng: this.lng,
          lat: this.lat

        };
        // 表单验证
        this.$refs['formRegister'].validate((valid) => {
          if (valid) {
            this.$store.dispatch('user/quickApply', formData)
              .then(res => {
                console.dir(res.data.organization.id)
                this.id = res.data.organization.id
                console.dir(this.id, 'id')
                // if (res.data.error) {
                //     this.$message.error(res.data.error);
                //     return false;
                // }
                this.$router.push({
                  path: '/information',
                  query: { id: this.id },
                });
                this.$message.success("提交成功");
                // this.$router.push('/submitAudit')

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
  #allmap {
    width: 100%;
    height: 500px;
  }
</style>

