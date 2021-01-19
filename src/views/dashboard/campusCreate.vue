<template>
  <el-card class="box-card">
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <div style="text-align: center;    margin: 50px;font-size: 22px;">添加校区</div>
        <el-form
          label-position="left"
          label-width="110px"
          :model="formRegister"
          :rules="rules"
          ref="formRegister">
          <el-form-item label="入驻方式" prop="applyType">
            <el-radio-group v-model="formRegister.applyType">
              <el-radio :label="1">个人</el-radio>
              <el-radio :label="2">企业</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="学校名称" prop="campusName">
            <el-input  v-model="formRegister.campusName" placeholder="请输入学校名称"></el-input>
          </el-form-item>
          <el-form-item label="类别">
            <el-input  value="分校"></el-input>
          </el-form-item>
          <el-form-item label="地区">
            <el-button type="text" @click="openDialog">点我打开地图</el-button>

            <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
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
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
            </el-dialog>
            <el-input  v-model="formRegister.mapAddress" placeholder="请从地图中选择地址"style="width: 430px;margin-left: 30px" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" prop="orgAddress">
            <el-input  v-model="formRegister.orgAddress"placeholder="请输入详细地址(具体到门牌号)"></el-input>
          </el-form-item>
<!--          <el-form-item label="机构电话" prop="phone">-->
<!--            <el-input  v-model="formRegister.orgAddress"placeholder="请输入机构电话"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="管理员" prop="orgAdminId">
<!--            <el-input  v-model="formRegister.orgAdminId"placeholder="请输入管理员"></el-input>-->
            <el-button @click="openVisible">点我选择</el-button>
            <el-input  v-model="formRegister.orgAdminId" placeholder="请从弹出框中选择"style="width: 430px;margin-left: 30px" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="培训内容" prop="shorthandName">
            <el-input  v-model="formRegister.shorthandName"placeholder="请输入培训内容"></el-input>
          </el-form-item>
          <el-form-item label="学校LOGO">
            <el-upload
              action="/api/oss/file/uploadFile"
              list-type="picture-card"
              :on-success="uplodaeSucess1"
              :on-preview="handlePictureCardPreview1"
              :on-remove="handleRemove1">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisibleLogo">
              <img width="100%" :src="formRegister.orgLogo" alt="">
            </el-dialog>
            <!--          <el-input v-model="form.videoCover" placeholder="请输入视频封面"></el-input>-->
          </el-form-item>
          <el-form-item label="简介(选填)">
            <el-input  v-model="formRegister.description"placeholder="请输入简介"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addUser">提交</el-button>
            <!--            <router-link to="/login">-->
            <el-button @click="backLogin">取消</el-button>
            <el-button @click="test">测试</el-button>

          </el-form-item>
          <el-dialog  :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="form" :rules="rules" label-width="100px">
              <div class="filter-container">
                <el-select v-model="id" placeholder="请选择"  @change="getValue">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.orgName"
                    :value="item.id">
                  </el-option>
                </el-select>
                <el-button-group>
                  <el-button type="primary" icon="plus" @click="handleRight">确定</el-button>
                </el-button-group>
<!--                <div v-for='item in member' style="margin: 25px;">-->
<!--                  <span>姓名：{{item.realName}}</span>-->
<!--                  <span>性别：{{item.gender}}</span>-->
<!--                </div>-->
                <el-form-item >
                    <el-radio :label="item.id" :key="item.id" v-for="item in member" v-model="radio" style="margin: 25px;">姓名：{{item.realName}} &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp 性别：{{item.gender}}</el-radio>
                </el-form-item>
              </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancel('form')">取消</el-button>
              <el-button @click="updateRole('form')" type="primary">确定</el-button>
            </div>
          </el-dialog>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script type="text/javascript">

    import geCode from 'vue-gecode'
    import { getToken, setToken, removeToken } from '@/utils/auth'
    import axios from 'axios'
    import { page, getOrgCampus, getOrgMember } from '@/api/admin/campusCreate'
    export default {
        name: 'campusCreate',
        data(){


            return{
                id:'',
                options:{},
                center: {lng:0, lat:0},
                lng:'',
                lat:'',
                zoom:13,
                suite:'',
                member:'',
                dialogVisible: false,
                dialogVisibleLogo:false,
                introduceCode:'',

                dialogFormVisible:false,
                mapAddress:'',
                boss:'',
                applyType:'',
                institutionName:'',
                address:'',
                radio: '',
                show:true,
                show2:false,
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
                    orgAdminId: '',
                    orgLogo:'',
                    shorthandName: '',
                    mapAddress: '',
                    description:'',
                    applyType:'',
                    campusName:'',
                    orgAddress:''
                },
                rules:{
                    phone: [
                        { required: true, message: '请输入联系方式', trigger: 'blur' }
                    ],
                    boss:[
                        { required: true, message: '请输入负责人', trigger: 'blur' }
                    ],
                    orgAddress:[
                        { required: true, message: '请输入详细地址', trigger: 'blur' }
                    ],
                    shorthandName:[
                        { required: true, message: '请输入培训内容', trigger: 'blur' }
                    ],
                    campusName: [
                        { required: true, message: '请输入学校名称', trigger: 'blur' }
                    ],
                    applyType: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    orgAdminId: [
                        { required: true, message: '请输入管理员id', trigger: 'blur' }
                    ],
                },
                // request: axios.create({
                //     baseURL: 'ips', // api的base_url
                //     timeout: 15000
                // })
            }
        },
        // mounted(){
        //     this.getCode()
        // },
        methods:{
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            getValue(e){
                this.suite=e
                console.log(this.suite,'suite')

            },
            updateRole(){
                console.log(this.radio)
                this.formRegister.orgAdminId=this.radio;
                this.dialogFormVisible=false
            },
            cancel(){
                this.dialogFormVisible=false
            },
            openVisible(){
                this.dialogFormVisible=true
                getOrgCampus().then(response => {
                    console.log(response,'getOrgCampus')
                    let data=response.data;
                    this.options=data
                    this.listLoading = false
                })
            },
            handleRight(){
                getOrgMember({orgId:this.suite}).then(response => {
                    let data=response.data;
                    for(let i=0;i<data.length;i++){
                        if(data[i].gender){
                            data[i].gender='男'
                        }else {
                            data[i].gender='女'
                        }
                    }
                    this.member=data;
                    console.log(this.member,'getOrgMember')
                })
            },
            uplodaeSucess1(res, file) {
                this.formRegister.orgLogo = res.data.address
            },
            handleRemove1(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview1(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisibleLogo = true;
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
            openDialog(){
                // 百度地图API功能
                this.dialogVisible=true;
            },
            handler ({BMap, map}) {

                console.log(BMap, map)

                this.center.lng =117.137416

                this.center.lat =36.692815

                this.zoom =this.zoom


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

                // axios.defaults.baseURL='http://api.map.baidu.com';
                axios.get('ips/geocoder/v2/?ak=AAux2OA2FFpltiYYksfug7AzomEoaT7c&location=' + latitude + ',' + longitude + '&output=json&pois=1',{
                        params:{
                            courseId:'d04e24ee-f66b-4b21-9879-601ddaaef862',
                        }
                    }
                ).then(function(resp){
                    console.log(resp,'resp')
                })

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
            // 用户注册
            addUser(){
                let that=this
                // console.log(parseInt('的'),'222')

                let formData = {
                    applyType: this.formRegister.applyType,
                    orgLogo:this.formRegister.orgLogo,
                    description:this.formRegister.description,
                    orgAddress:this.formRegister.orgAddress,
                    cityCode:370982,
                    orgAdminId:this.formRegister.orgAdminId,
                    // city:this.formRegister.mapAddress,
                    shorthandName:this.formRegister.shorthandName,
                    campusName:this.formRegister.campusName,
                    lng:this.lng,
                    lat:this.lat

                };
                console.log(formData.applyType, 'applyType')
                // 表单验证
                this.$refs['formRegister'].validate((valid)=>{
                    if(valid){
                        page(formData).then(response => {
                            console.log(response,'888')
                            this.page = response.data
                            const data= response.data
                            this.page.total = response.data.totalCount
                            for(let i=0;i<data.length;i++){
                                if(data[i].gender){
                                    data[i].gender='男'
                                }else {
                                    data[i].gender='女'
                                }
                            }
                            this.listLoading = false
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

