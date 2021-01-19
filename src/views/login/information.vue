<template>
  <el-card class="box-card">
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <div style="text-align: center;    margin: 50px;font-size: 22px;">完善资料</div>
        <el-form
          label-position="left"
          label-width="110px"
          :model="formRegister"
          :rules="rules"
          ref="formRegister">
          <el-form-item label="法人姓名" prop="legalPersonName">
            <el-input  v-model="formRegister.legalPersonName" placeholder="请输入法人姓名"></el-input>
          </el-form-item>
          <el-form-item label="企业名称" prop="companyName">
            <el-input  v-model="formRegister.companyName" placeholder="请输入企业名称"></el-input>
          </el-form-item>
          <el-form-item label="法人身份证正面图片"prop="image">
            <el-upload
              action="/api/oss/file/uploadFile"
              list-type="picture-card"
              :on-success="uplodaeSucess1"
              :on-preview="handlePictureCardPreview1"
              :on-remove="handleRemove1">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="formRegister.legalPersonCardProsImg" alt="">
            </el-dialog>
            <!--          <el-input v-model="form.videoCover" placeholder="请输入视频封面"></el-input>-->
          </el-form-item>
          <el-form-item label="法人身份证反面图片">
            <el-upload
              action="/api/oss/file/uploadFile"
              list-type="picture-card"
              :on-success="uplodaeSucess2"
              :on-preview="handlePictureCardPreview2"
              :on-remove="handleRemove2">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="formRegister.legalPersonCardConsImg" alt="">
            </el-dialog>
            <!--          <el-input v-model="form.videoCover" placeholder="请输入视频封面"></el-input>-->
          </el-form-item>
          <el-form-item label="学校照片">
            <el-upload
              action="/api/oss/file/uploadFile"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview3"
              :on-success="uplodaeSucess3"
              :on-remove="handleRemove3">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="formRegister.schoolImg" alt="">
            </el-dialog>
            <!--          <el-input v-model="form.videoCover" placeholder="请输入视频封面"></el-input>-->
          </el-form-item>
          <el-form-item label="工商许可证编号/社会统一信用代码" prop="name">
            <el-input v-model="introduceCode"placeholder="请输入工商许可证编号/社会统一信用代码"></el-input>
          </el-form-item>
          <el-form-item label="营业执照">
            <el-upload
              action="/api/oss/file/uploadFile"
              list-type="picture-card"
              :on-success="uplodaeSucess4"
              :on-preview="handlePictureCardPreview4"
              :on-remove="handleRemove4">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="formRegister.businessLicenseImg" alt="">
            </el-dialog>
            <!--          <el-input v-model="form.videoCover" placeholder="请输入视频封面"></el-input>-->
          </el-form-item>
          <el-form-item label="工商许可证">
            <el-upload
              action="/api/oss/file/uploadFile"
              list-type="picture-card"
              :on-success="uplodaeSucess5"
              :on-preview="handlePictureCardPreview5"
              :on-remove="handleRemove5">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="formRegister.serviceLicenseImg" alt="">
            </el-dialog>
            <!--          <el-input v-model="form.videoCover" placeholder="请输入视频封面"></el-input>-->
          </el-form-item>
          <el-form-item label="联系人" prop="contactsName">
            <el-input  v-model="formRegister.contactsName"placeholder="请输入联系人"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="name">
            <el-input v-model="formRegister.contactsPhone"placeholder="请输入联系电话"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addUser">提交</el-button>
            <!--            <router-link to="/login">-->
            <el-button @click="backLogin">取消</el-button>
            <el-button @click="test">测试</el-button>

          </el-form-item>
          <el-dialog  :visible.sync="dialogFormSucceed">
            <el-form :model="formPaySucceed"  :rules="rules" label-width="100px">
              <div style="margin-left: 25px;font-size: 16px">提交审核后，审核中不能修改信息，确认提交吗？</div>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancelPaySucceed('form')">取消</el-button>
              <el-button  @click="updatePaySucceed('form')" type="primary">确定</el-button>
            </div>
          </el-dialog>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script type="text/javascript">

    import geCode from 'vue-gecode'
    import axios from 'axios'
    import { currentApply } from '@/api/admin/user'
    import { getToken, setToken, removeToken } from '@/utils/auth'
    export default {
        name: 'quickApply',
        data(){
            return{
                center: {lng:0, lat:0},
                lng:'',
                lat:'',
                zoom:13,
                introduceCode:'',
                joinWay:'',
                phone:'',
                mapAddress:'',
                boss:'',
                institutionName:'',
                address:'',
                radio: 3,
                show:true,
                show2:false,
                msgCode:'',
                orgId:'',
                imgsrc:'//www.baidu.com/img/superlogo_c4d7df0a003d3db9b65e9ef0fe6da1ec.png?where=super',
                post: {
                    code: ''
                },
                dialogImageUrl: '',
                dialogVisible: false,
                dialogFormSucceed:false,
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
                    legalPersonName:'',
                    orgId: '',
                    companyName:'',
                    contactsName:'',
                    contactsPhone:'',
                    legalPersonCardProsImg:'',
                    legalPersonCardConsImg:'',
                    schoolImg:'',
                    businessLicenseImg:'',
                    serviceLicenseImg:'',

                },
                rules:{
                    legalPersonName: [
                        { required: true, message: '请输入法人姓名', trigger: 'blur' }
                    ],
                    contactsName:[
                        { required: true, message: '请输入联系人', trigger: 'blur' }
                    ],
                    mapAddress:[
                        { required: true, message: '请输入地址', trigger: 'blur' }
                    ],
                    companyName: [
                        { required: true, message: '请输入企业名称', trigger: 'blur' }
                    ],
                    image: [{required: true, message: '请上传图片', trigger: 'change'}],
                },
                // request: axios.create({
                //     baseURL: 'http://api.map.baidu.com', // api的base_url
                //     timeout: 15000
                // })
            }
        },
        mounted(){

        },
        methods:{

            handler ({BMap, map}) {

                console.log(BMap, map)

                this.center.lng =117.137416

                this.center.lat =36.692815

                this.zoom =this.zoom


            },
            uplodaeSucess1(res, file) {
                this.formRegister.legalPersonCardProsImg = res.data.address
            },
            uplodaeSucess2(res, file) {
                this.formRegister.legalPersonCardConsImg = res.data.address
            },
            uplodaeSucess3(res, file) {
                console.log(res.data.address)
                this.formRegister.schoolImg+=res.data.address
                let schoolImg=this.formRegister.schoolImg.length;
                console.log(this.formRegister.schoolImg.length,'schoolImg')
                if(schoolImg<120){
                    this.formRegister.schoolImg=res.data.address
                }
                else {
                    this.formRegister.schoolImg += res.data.address+','
                }
                console.log(this.formRegister.schoolImg,'schoolImg')
            },
            uplodaeSucess4(res, file) {
                this.formRegister.businessLicenseImg = res.data.address
            },
            uplodaeSucess5(res, file) {
                this.formRegister.serviceLicenseImg = res.data.address
            },
            // beforeUploade(file) {
            //     if (!(file.size / 1024 / 1024 < 2)) {
            //         this.$message.error('上传图片大小不能超过2MB！')
            //         return false
            //     }
            //     return true
            // },
            handleRemove1(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview1(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleRemove2(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview2(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleRemove3(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview3(res,file) {
                console.log(res,'file')
                this.formRegister.schoolImg = file.url;
                console.log(this.formRegister.schoolImg,'schoolImg')
                this.dialogVisible = true;
            },
            handleRemove4(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview4(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleRemove5(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview5(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            updatePaySucceed(){
                this.dialogFormSucceed=false;
                this.$message.success("提交成功");
                this.$router.push('/review')

            },
            getClickInfo (e) {
                var _this=this;
                console.log(e)

                console.log(e.point.lat)
                _this.lng=e.point.lng;
                _this.lat=e.point.lat;
                var latitude=e.point.lat;
                var longitude=e.point.lng;
                let that=this
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

                axios.defaults.baseURL='http://api.map.baidu.com';
                axios.get('/geocoder/v2/?ak=AAux2OA2FFpltiYYksfug7AzomEoaT7c&location=' + latitude + ',' + longitude + '&output=json&pois=1',{
                        params:{
                            courseId:'d04e24ee-f66b-4b21-9879-601ddaaef862',
                        }
                    }
                ).then(function(resp){
                    console.log(resp,'resp')
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
                geoc.getLocation(pt, function(rs){
                    console.log(rs.addressComponents,'rs')
                    var addComp = rs.addressComponents;
                    alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                    _this.formRegister.mapAddress=addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber
                    console.log(_this.formRegister.mapAddress)
                });

            },
            openDialog(){
                // 百度地图API功能
                this.dialogVisible=true;
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
                this.$router.push('/information')
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
            // 用户注册
            addUser(){
                // console.log(parseInt('的'),'222')
                //
                // let user = this.formRegister;
                let formData = {
                    legalPersonName:this.formRegister.legalPersonName,
                    orgId: this.$route.query.id,
                    companyName:this.formRegister.companyName,
                    contactsName:this.formRegister.contactsName,
                    contactsPhone:this.formRegister.contactsPhone,
                    legalPersonCardProsImg:this.formRegister.legalPersonCardProsImg,
                    legalPersonCardConsImg:this.formRegister.legalPersonCardConsImg,
                    schoolImg:this.formRegister.schoolImg,
                    businessLicenseImg:this.formRegister.businessLicenseImg,
                    serviceLicenseImg:this.formRegister.serviceLicenseImg,

                };
                // 表单验证
                this.$refs['formRegister'].validate((valid)=>{
                    if(valid){
                        this.$store.dispatch('user/addAgencyDocuments',formData)
                            .then(res => {
                                console.dir(res.data)
                                // if (res.data.error) {
                                //     this.$message.error(res.data.error);
                                //     return false;
                                // }
                                this.dialogFormSucceed=true;
                                // this.$message.success("提交成功");
                                // this.$router.push('/submitAudit')

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
   .avatar-uploader .el-upload {
     border: 1px dashed #d9d9d9;
     border-radius: 6px;
     cursor: pointer;
     position: relative;
     overflow: hidden;
   }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>

