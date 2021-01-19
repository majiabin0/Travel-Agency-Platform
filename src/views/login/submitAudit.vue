<template>
  <el-card class="box-card">
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <div style="text-align: center;    margin: 40px;font-size: 20px;">入驻审核</div>
        <el-form
          label-position="left"
          label-width="110px"
          :model="formRegister"
          :rules="rules"
          ref="formRegister">
          <el-form-item label="id" prop="name">
            <el-input  v-model="id" placeholder="请输入id" readonly="readonly"></el-input>
          </el-form-item>
<!--          <el-form-item label="选择入驻方式" prop="name">-->
          <!--            <el-radio-group v-model="joinWay">-->
          <!--              <el-radio :label="1">个人</el-radio>-->
          <!--              <el-radio :label="2">企业</el-radio>-->

          <!--            </el-radio-group>-->
          <!--          </el-form-item>-->
          <el-form-item label="机构名称">
            <el-input  v-model="institutionName" placeholder="请输入机构名称" readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="name">
            <el-input  v-model="mapAddress" placeholder="地址"style="width: 430px;" readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" prop="name">
            <el-input  v-model="address" placeholder="请输入详细地址" readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="负责人" prop="name">
            <el-input  v-model="boss"placeholder="请输入负责人" readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="name">
            <el-input  v-model="phone"placeholder="请输入联系方式" readonly="readonly"></el-input>
          </el-form-item>
          <!--            <button @click=closeCode>-->
          <!--              关闭倒计时-->
          <!--            </button>-->
          <!--            <el-input v-model="formRegister.msgCode"></el-input>-->
          <el-form-item label="邀请码" prop="name">
            <el-input v-model="introduceCode"placeholder="(选填)请输入邀请码" ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addUser">提交</el-button>
            <!--            <router-link to="/login">-->
            <el-button @click="backLogin">取消</el-button>
            <el-button @click="modification">修改</el-button>

          </el-form-item>
        </el-form>
        <el-dialog
          title="修改信息"
          :visible.sync="dialogVisible"
          width="30%"
          :append-to-body="true"
          @close="kcDialog = false"
          :before-close="handleClose">
          <el-form :model="form"  label-width="100px">
            <el-form-item label="id" prop="name">
              <el-input  v-model="form.id" placeholder="请输入机构名称"></el-input>
            </el-form-item>
            <el-form-item label="机构名称">
              <el-input  v-model="form.institutionName" placeholder="请输入机构名称"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="name">
              <el-button type="text" @click="openDialog">点我打开地图</el-button>
              <el-dialog
                title="提示"
                :visible.sync="dialogMap"
                width="30%"
                :append-to-body="true"
                @close="kcDialog = false"
                :before-close="handleClose">
                <span>这是一段信息</span>
                <div class="mapbox">

                  <baidu-map :center="center" :zoom="zoom" @ready="handler" style="height:800px" @click="getClickInfo">

                    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>

                    <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>

                    <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>

                    <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT">
                    </bm-city-list>
                  </baidu-map>
                </div>
                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogMap = false">取 消</el-button>
    <el-button type="primary" @click="dialogMap = false">确 定</el-button>
  </span>
              </el-dialog>
              <el-input  v-model="form.mapAddress" placeholder="地址"style="width: 430px;" disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="详细地址" prop="name">
              <el-input  v-model="form.address" placeholder="请输入详细地址"></el-input>
            </el-form-item>
            <el-form-item label="负责人" prop="name">
              <el-input  v-model="form.boss"placeholder="请输入负责人"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="name">
              <el-input  v-model="form.phone"placeholder="请输入联系方式"></el-input>
            </el-form-item>
            <el-form-item label="申请状态" prop="name">
              <el-input  v-model="form.applyState"></el-input>
            </el-form-item>
            <el-form-item label="邀请码" prop="name">
              <el-input v-model="form.introduceCode"placeholder="(选填)请输入邀请码"></el-input>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="update">确 定</el-button>
  </span>
        </el-dialog>
      </el-col>
    </el-row>
  </el-card>
</template>

<script type="text/javascript">

    import geCode from 'vue-gecode'
    import { getToken, setToken, removeToken } from '@/utils/auth'
    export default {
        name: 'mapbox',
        data(){


            return{
                center: {lng:0, lat:0},
                id:'',
                lng:'',
                lat:'',
                zoom:13,
                dialogVisible: false,
                dialogMap:false,
                introduceCode:'',
                // joinWay:2,
                phone:'',
                mapAddress:'',
                boss:'',
                institutionName:'',
                address:'',
                show:true,
                show2:false,
                form:{
                    boss:'',
                    phone:'',
                    institutionName:'',
                    address:'',
                    mapAddress:'',
                    id:'',
                    applyState:'正在审核中',
                },
                msgCode:'',
                imgsrc:'//www.baidu.com/img/superlogo_c4d7df0a003d3db9b65e9ef0fe6da1ec.png?where=super',
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
                    computeText(num) {
                        //num 倒计时时间
                        return '重新获取 ' + num + 's';
                    },
                    //是否可以发送
                    canTodo: () => {
                        //返回值判定是否可以发送
                        let result = /^1[345678]\d{9}$/.test(this.phone);
                        console.log('判断是否可以发送验证码',result);
                        if(!result){
                            alert('手机号格式不正确');
                        }
                        return result;
                    },
                    //canTode验证成功后执行 发送短信验证码
                    todo: () => {
                        //这里写验证码的获取程序
                        console.log('发送验证码')
                        this.$store.dispatch('user/MsgCode',{

                            mobilePhone: this.phone, imageCode:this.post.code, accountType: 'phone', equipmentCode:this.phone, optionType:"register"
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
                    endCallback(type, config) {
                        //type 回调产生原因  0: 时间结束   其他值由this.$refs.geCode.stop(1)调入自定义
                        //config config配置
                        console.log('发送完成后的回调', type, config);

                    },

                    //每次点击都会被调用
                    click(isRun) {
                        //isRun 是否在运行中
                        console.log(`当前验证码状态是:${isRun ? '发送中' : '可发送'}状态`)
                    },
                    //是否可用   默认ture
                    canUse: true,
                    //不可用时的类名  默认no-can
                    noCanClass: 'no-can',
                },
                phone: '',
                formRegister:{
                    mobilePhone: '',
                    msgCode:'',
                    password: '',
                    checkPassword: '',
                    introduceCode:''
                },
                rules:{


                }
            }
        },
        mounted(){
            this.loadPage()
        },
        methods:{
            loadPage (page) {
                console.log(3333)
                this.$store.dispatch('user/currentApply', page).then(res => {
                    console.log(res)
                    this.mapAddress=res.data.placeOfCity;
                    this.address=res.data.orgAddress;
                    this.boss=res.data.contactsName;
                    this.phone=res.data.contactsPhone;
                    this.institutionName=res.data.orgName;
                    this.id=res.data.id;
                    if(res.data.applyExamineResults=='1'){
                        this.form.applyState='新建'
                    }
                    // if (res.data.error) {

                    //     return false;
                    // }else{
                    //     this.$router.push('/login')
                    // }
                });
//                  console.log('suggestions: '+this.$store.getters.suggestions);

            },
            // introduceCode:'',
            // joinWay:'',
            // phone:'',
            // mapAddress:'',
            // boss:'',
            // institutionName:'',
            // address:'',
            // radio: 3,
            handler ({BMap, map}) {

                console.log(BMap, map)

                this.center.lng =117.137416

                this.center.lat =36.692815

                this.zoom =this.zoom


            },

            getClickInfo (e) {
                var _this=this;
                console.log(e.point.lng)

                console.log(e.point.lat)
                _this.lng=e.point.lng;
                _this.lat=e.point.lat;
                // console.log(_this.lat,"AAA")
                this.center.lng = e.point.lng
                var geoc = new BMap.Geocoder();
                this.center.lat = e.point.lat
                var pt = e.point;
                geoc.getLocation(pt, function(rs){
                    var addComp = rs.addressComponents;
                    alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                    _this.form.mapAddress=addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber
                    console.log(_this.form.mapAddress)
                });

            },
            modification(){
                this.dialogVisible=true;
                this.form.boss=this.boss;
                this.form.institutionName=this.institutionName;
                this.form.phone=this.phone;
                this.form.address=this.address;
                this.form.id=this.id;
                this.form.mapAddress=this.mapAddress;


            },
            update(){
                var systemResource = {
                    id: this.form.id,
                    contactsName: this.form.boss,
                    orgType: 1,
                    contactsPhone:this.form.phone,
                    orgName:this.form.institutionName,
                    orgAddress:this.form.address,
                    cityCode:1,
                    qq:1,
                    city:this.form.mapAddress,
                    businessLicenseFile:1,
                    exequaturFile:1,
                    campusName:1,
                    mainCourse:1,
                    imgAddress:1,
                    lng:1,
                    lat:1
                }

                this.dialogVisible=true;
                this.$store.dispatch('user/updateApply',systemResource).then(() => {
                    this.dialogVisible=false;
                    this.loadPage();
                })
            },
            openDialog(){
                this.dialogMap=true;
            },

            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            backLogin(){
                removeToken();
                this.$router.push('/login')
            },
            test(){
                this.$router.push('/submitAudit')
            },
            handleChange (value) {

                console.log(value)

            },

            closeCode() {
                console.log('关闭');
                this.$refs.geCode.stop(1);
            },

            alert(text) {
                console.log(text)
            },
            getCode() {
                //这里写验证码的获取程序
                this.show = false;
                this.show2 = true;
                console.log('发送')
                this.$store.dispatch('user/getCode',{

                    equipmentCode:this.phone, optionType:"register"
                })
                    .then(res => {
                        console.log(res)
                        this.imgsrc=res.data.imageCode
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
            addUser(){
                // console.log(parseInt('的'),'222')

                let user = this.formRegister;
                let formData = {
                    orgType: this.joinWay,
                    contactsPhone:this.phone,
                    contactsName:this.boss,
                    orgName:this.institutionName,
                    orgAddress:this.address,
                    cityCode:1,
                    qq:1,
                    city:this.mapAddress,
                    businessLicenseFile:1,
                    exequaturFile:1,
                    campusName:1,
                    mainCourse:1,
                    imgAddress:1,
                    lng:this.lng,
                    lat:this.lat

                };
                console.log(typeof (this.orgAddress),'9999')
                // 表单验证
                this.$refs['formRegister'].validate((valid)=>{
                    if(valid){
                        this.$store.dispatch('user/orgApply',formData)
                            .then(res => {
                                console.dir(res.data)
                                // if (res.data.error) {
                                //     this.$message.error(res.data.error);
                                //     return false;
                                // }
                                this.$message.success("注册成功");
                                this.$router.push('/login')

                            })
                            .catch(err => {
                                // this.$message.error(`${err.message}`)
                            })
                    }else{
                        this.$message.error('表单验证失败!')
                        return false;
                    }
                })
            }
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
  #allmap {width:100%;height:500px;}
</style>

