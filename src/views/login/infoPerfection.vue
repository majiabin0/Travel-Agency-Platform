<template>
  <div>
    <div class="header-manage">
      信息完善
    </div>
    <el-card class="box-card">
      <el-row type="flex">
        <el-col>
          <el-form
            label-position="left"
            :model="formRegister"
            :rules="rules"
            ref="formRegister">
            <el-form-item prop="realname">
<!--              <el-input  v-model="formRegister.realname" placeholder="请输入姓名"></el-input>-->
              <mt-field placeholder="请输入用户名" v-model="formRegister.realname"></mt-field>
            </el-form-item>
            <el-form-item prop="birth">
              <span @click="dateClick1()" v-if="!isDateClick1">{{ date1}}</span>
              <span @click="dateClick1()" v-if="isDateClick1">{{ date1 | dataVal1}}</span>

              <mt-datetime-picker v-model="formRegister.birth" type="date" ref="picker1" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm1">
              </mt-datetime-picker>
<!--              <mt-datetime-picker-->
<!--                v-model="formRegister.birth"-->
<!--                type="date"-->
<!--                year-format="{value} 年"-->
<!--                month-format="{value} 月"-->
<!--                date-format="{value} 日"-->
<!--              >-->
<!--              </mt-datetime-picker>-->
<!--              <el-date-picker-->
<!--                v-model="formRegister.birth" class="pickstyle"-->
<!--                start-placeholder="出生日期">-->
<!--              </el-date-picker>-->
<!--              <el-input  v-model="formRegister.birth"  placeholder="请输入年龄"></el-input>-->
            </el-form-item>
            <el-form-item prop="homecity">
<!--              <el-input  v-model="formRegister.homecity" placeholder="家乡"></el-input>-->
              <mt-field placeholder="家乡" v-model="formRegister.homecity"></mt-field>
            </el-form-item>
            <el-row>
              <el-col :span="10">
                <el-form-item prop="country">
                  <el-select v-model="country" filterable placeholder="请选择">
                    <el-option v-for="item in contries" :value="item.name" :label="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item prop="city">
                  <el-select v-model="city" filterable placeholder="请选择">
                    <el-option v-for="item in cities" :value="item.name" :label="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item prop="livetime">
<!--              <el-input type="number" v-model="formRegister.livetime" placeholder="居住时长"></el-input>-->
              <mt-field placeholder="居住时长" type="number" v-model="formRegister.livetime"></mt-field>
            </el-form-item>
            <el-form-item prop="serviceExperience">
<!--              <el-input  v-model="formRegister.serviceExperience" placeholder="服务经验"></el-input>-->
              <mt-field placeholder="服务经验" v-model="formRegister.serviceExperience"></mt-field>
            </el-form-item>
            <el-form-item prop="education">
<!--              <el-input  v-model="formRegister.education" placeholder="最高学历"></el-input>-->
              <mt-field placeholder="最高学历" v-model="formRegister.education"></mt-field>
            </el-form-item>
            <el-form-item prop="contact">
<!--              <el-input  v-model="formRegister.contact" placeholder="联系方式"></el-input>-->
              <mt-field placeholder="联系方式" v-model="formRegister.contact"></mt-field>
            </el-form-item>
            <el-form-item prop="profile">
<!--              <el-input  v-model="formRegister.profile" placeholder="简介"></el-input>-->
              <mt-field placeholder="简介" v-model="formRegister.profile"></mt-field>
            </el-form-item>
            <el-form-item prop="wechat">
<!--              <el-input  v-model="formRegister.wechat" placeholder="微信"></el-input>-->
              <mt-field placeholder="微信" v-model="formRegister.wechat"></mt-field>
            </el-form-item>
            <el-form-item label="服务语言：" prop="language">
<!--              <el-select v-model="language" filterable placeholder="请选择">-->
<!--                <el-option v-for="item in cities" :value="item.name" :label="item.name">-->
<!--                </el-option>-->
<!--              </el-select>-->
              <el-select v-model="formRegister.language" multiple placeholder="请选择">
                <el-option
                  v-for="item in languageOptions"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="gender">
              <el-radio v-model="formRegister.gender" label="1">男</el-radio>
              <el-radio v-model="formRegister.gender" label="0">女</el-radio>
            </el-form-item>
            <el-form-item label="是否有车：" prop="havecar">
              <el-radio v-model="formRegister.havecar" label="1">是</el-radio>
              <el-radio v-model="formRegister.havecar" label="0">否</el-radio>
            </el-form-item>
            <el-form-item label="是否会开车：" prop="license">
              <el-radio v-model="formRegister.license" label="1">是</el-radio>
              <el-radio v-model="formRegister.license" label="0">否</el-radio>
            </el-form-item>
            <div>
              <el-row>
                <el-col>
                  <router-link to="/coverPhoto" class="textstyle">上传封面照</router-link>
                  <router-link to="/liveImage" class="textstyle">上传生活照</router-link>
                  <router-link to="/headImage" class="textstyle">上传头像</router-link>
                </el-col>
              </el-row>
            </div>
            <el-form-item style="text-align: center; margin-top: 5%">
              <el-button type="primary" @click="addUser">提交</el-button>
              <el-button @click="backLogin">取消</el-button>

            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>

</template>

<script type="text/javascript">

    import Calendar from "vue-calendar-component"
    import { details, saveInformation, getContryCode } from '../../api/admin/user'
    import { getToken, setToken, removeToken } from '@/utils/auth'
    import selectCountry from '../../lang/se';
    import axios from 'axios'
    import moment from "moment"
    import { DatetimePicker, Field } from 'mint-ui'
    import Vue from 'vue'
    Vue.component(DatetimePicker.name, DatetimePicker)
    Vue.component(Field.name, Field)

    export default {
      name: 'infoPerfection',
      components: {
        Calendar
      },
      created() {
        //获取导游信息
        this.getTravelAgency();
        //性别设置
        this.formRegister.gender='1';
        //是否有车
        this.formRegister.havecar='1';
        //是否会开车
        this.formRegister.license='1';
        this.formRegister.coverphoto = this.$route.query.imgUrl;
        this.formRegister.headImageURL = this.$route.query.headImageUrl;
        this.formRegister.lifephoto = this.$route.query.liveImgUrl;

        //console.log(this.$route.query.imgUrl)
      },
      data(){
            return{
              country: '请选择国家',
              city: '',
              contries: selectCountry.arrAll,
              cities: [],
              language:'',
              languageOptions:[],
              dictValue:'',
              dictLabel:'',
              dataVal1: new Date(),
              isDateClick1: false, //默认没有点击
              date1: "出生日期", //默认值
              formRegister:{
                id:localStorage.getItem('userId'),
                realname:'',
                gender:'',
                homecity:'',
                country:this.country,
                city:this.city,
                serviceExperience:'',
                birth:'',
                education:'',
                profile:'',
                contact:'',
                livetime:'',
                wechat:'',
                havecar:'',
                license:'',
                language:'',
                coverphoto:'',
                headImageURL:'',
                lifephoto:''
              },
              rules:{
                realname: [
                      { required: true, message: '请输入法人姓名', trigger: 'blur' }
                  ],
                birth:[
                    { required: true, message: '请输出生日期', trigger: 'blur' }
                ],
                // country:[
                //     { required: true, message: '请输入国家', trigger: 'blur' }
                // ],
                // city: [
                //     { required: true, message: '请输入城市', trigger: 'blur' }
                // ],
                serviceExperience: [
                  { required: true, message: '请输入服务经验', trigger: 'blur' }
                ],
                education: [
                  { required: true, message: '请输入学历', trigger: 'blur' }
                ],
                contact: [
                  { required: true, message: '请输入联系方式', trigger: 'blur' }
                ],
              },
              //国家字典数据
              dictType:'wx_can_language'
            }
        },
        methods:{
          //获取旅行社资料
          getTravelAgency(){
            details(this.formRegister.id).then(response=>{
              console.log(response.data)
              this.formRegister.realname = response.data.guideUserBasic.realname;
              this.formRegister.gender = response.data.guideUserBasic.gender;
              this.formRegister.homecity = response.data.guideUserBasic.homecity;
              this.formRegister.serviceExperience = response.data.guideUserBasic.serviceExperience;
              this.formRegister.birth = response.data.guideUserBasic.birth;
              if(response.data.guideUserBasic.birth == null || response.data.guideUserBasic.birth == ""){
                this.date1 = moment(new Date()).format('YYYY-MM-DD');
              }else{
                this.date1 = response.data.guideUserBasic.birth;
              }
              this.formRegister.education = response.data.guideUserBasic.education;
              this.formRegister.profile = response.data.guideUserBasic.profile;
              this.formRegister.contact = response.data.guideUserBasic.contact;
              this.formRegister.livetime = response.data.guideUserBasic.livetime;
              this.formRegister.wechat = response.data.guideUserBasic.wechat;
              this.formRegister.havecar = response.data.guideUserBasic.havecar == null ? response.data.guideUserBasic.havecar : response.data.guideUserBasic.havecar.toString();
              this.formRegister.license = response.data.guideUserBasic.license == null ? response.data.guideUserBasic.license : response.data.guideUserBasic.license.toString();
              this.country = response.data.guideUserBasic.country;
              this.city = response.data.guideUserBasic.city;
              this.formRegister.language = response.data.guideUserBasic.language == null ? response.data.guideUserBasic.language : response.data.guideUserBasic.language.split(',');
              //获取多语言下拉菜单
              this.getLanguage(response.data.guideUserBasic.language);
            })
          },
          dateClick1() {
            this.$refs.picker1.open();
          },
          handleConfirm1(value) {
            console.log(value);
            this.date1 = moment(value).format('YYYY-MM-DD');
            this.isDateClick1 = true;
          },
          //获得省
          updateCity: function () {
            for (var i in this.contries) {
              var obj = this.contries[i];
              if (obj.name == this.country) {
                this.cities = obj.sub;
                break;
              }
            }
            this.city = this.cities[1].name;
          },
          //获得市
          updateDistrict: function () {
            for (var i in this.cities) {
              var obj = this.cities[i];
              if (obj.name == this.city) {
                this.homecities = obj.sub;
                break;
              }
            }
          },
          //获取语言
          getLanguage: function(data){
            console.log(data)
            getContryCode(this.dictType).then(res=>{
              this.listLoading = true
              this.languageOptions = res.data.list;
              this.listLoading = false
            })
          },
          backLogin(){
              removeToken();
              this.$router.push('/login')
          },
          alert(text) {
              console.log(text)
          },
          // 用户注册
          addUser(){
              // let formData = {
              //   userId:this.formRegister.userId,
              //   realname:this.formRegister.realname,
              //   gender: this.formRegister.gender,
              //   homecity:this.formRegister.homecity,
              //   country:this.formRegister.country,
              //   city:this.formRegister.city,
              //   serviceExperience:this.formRegister.serviceExperience,
              //   birth:this.formRegister.birth,
              //   education:this.formRegister.education,
              //   profile:this.formRegister.profile,
              //   contact:this.formRegister.contact,
              //   livetime:this.formRegister.livetime
              // };
              // 表单验证
              this.$refs['formRegister'].validate((valid)=>{
                  if(valid){
                    //日期格式转换
                    this.formRegister.birth = moment(this.formRegister.birth).format('YYYY-MM-DD');
                    this.formRegister.country = this.country;
                    this.formRegister.city = this.city;
                    console.log(this.formRegister.language)
                    this.formRegister.language = this.formRegister.language.join(',');
                    console.log(this.formRegister)
                    saveInformation(this.formRegister).then(res=>{
                      console.log(res)
                      if(res.code == 0){
                        alert('完善成功！');
                      }
                    })
                    this.$router.push('/personalCenter')
                  }else{
                      this.$message.error('表单验证失败!')
                      return false;
                  }
              })
          }
        },
      beforeMount: function () {
        this.updateCity();
        this.updateDistrict();
      },
      watch: {
        country: function () {
          this.updateCity();
          this.updateDistrict();
        },
        city: function () {
          this.updateDistrict();
        }
      }
    }
</script>
<style scoped>
  .header-manage{
    font-size: 21px;
    padding: 40px 0;
    text-align: center;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .textstyle{
    color: blue;
  }

</style>

