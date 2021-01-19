<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <span>班级状态：</span>
      <el-select v-model="id" placeholder="请选择校区名称" label="校区名称"  @change="getValue">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

        <el-input v-model="classNameValue" placeholder="请输入班级名称" style="width: 150px;"></el-input>

      <el-button-group>
        <el-button type="primary" icon="plus" @click="handleRight">确定</el-button>
      </el-button-group>
      <el-button-group>
        <el-button type="primary" icon="plus" @click="handleCreate">添加</el-button>
      </el-button-group>
    </div>
    <el-table :data="page" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column align="center" label="班级id" width="120">
        <template scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column align="center" label="机构id" width="120">
        <template scope="scope">{{scope.row.orgId}}</template>
      </el-table-column>
      <el-table-column align="center" label="课程id" width="120">
        <template scope="scope">{{scope.row.courseId}}</template>
      </el-table-column>
      <el-table-column align="center" label="课时类型id" width="120">
        <template scope="scope">{{scope.row.classTimeId}}</template>
      </el-table-column>
      <el-table-column align="center" label="课程名" width="130">
        <template scope="scope">{{scope.row.courseName}}</template>
      </el-table-column>
      <el-table-column align="center" label="课时类型" width="100">
        <template scope="scope">{{scope.row.classTimeType}}</template>
      </el-table-column>
      <el-table-column align="center" label="班级名" width="100">
        <template scope="scope">{{scope.row.className}}</template>
      </el-table-column>
      <el-table-column align="center" label="计划开始时间" width="180">
        <template scope="scope">{{scope.row.estimatedOpeningTime}}</template>
      </el-table-column>
      <el-table-column align="center" label="计划结束时间" width="180">
        <template scope="scope">{{scope.row.estimatedEndTime}}</template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="100">
        <template scope="scope">{{scope.row.classStatus}}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template scope="scope">
          <el-button type="primary" @click="userList(scope.row)" size="mini" style="margin-bottom: 5px">查看详情</el-button>
          <el-button type="primary" @click="courseList(scope.row)" size="mini" style="margin-bottom: 5px">班级课表</el-button>
          <el-button type="primary" icon="edit" @click="handleEdit(scope.row)" size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="paging-container">
      <el-pagination :total="page.total" :current-page.sync="listQuery.page" :page-size="listQuery.pageSize" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, jumper" @size-change="handleSizeChange"></el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules" label-width="100px">
        <!--        <el-form-item label="班课类型id">-->
        <!--          <el-input v-model="form.classTimeId" placeholder="请输入班课类型id"></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item label="班级名称">
          <el-input v-model="form.className" placeholder="请输入班级名称"></el-input>
        </el-form-item>
        <el-form-item label="课程名">
          <el-input v-model="form.courseName" placeholder="请输入课程名"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取消</el-button>
        <el-button v-if="dialogStatus == 'create'" @click="saveRole('form')" type="primary">确定</el-button>
        <el-button v-else @click="updateRole('form')" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <!--    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormPay">-->
    <!--      <el-form :model="formRefuse" ref="form" :rules="rules" label-width="100px">-->
    <!--        <el-form-item label="拒绝原因">-->
    <!--          <el-input v-model="formRefuse.refuseReason" placeholder="请输入拒绝原因"></el-input>-->
    <!--        </el-form-item>-->
    <!--      </el-form>-->
    <!--      <div slot="footer" class="dialog-footer">-->
    <!--        <el-button @click="cancelPay('form')">取消</el-button>-->
    <!--        <el-button v-if="dialogStatus == 'create'" @click="saveRole('form')" type="primary">确定</el-button>-->
    <!--        <el-button v-else @click="updatePay('form')" type="primary">确定</el-button>-->
    <!--      </div>-->
    <!--    </el-dialog>-->
    <el-dialog  :visible.sync="dialogFormSucceed">
      <el-dialog
        width="30%"
        title="教师列表"
        :visible.sync="innerVisible1"
        append-to-body>
        <el-dialog
          width="27%"
          title="修改成员状态"
          :visible.sync="innerVisibleFurther"
          append-to-body>
          <el-form :model="member" ref="form" :rules="rules" label-width="100px" style="margin-bottom: 20px">
            <!--            <span>会员类型：</span>-->
            <!--            <el-radio v-model="memberType1" label="1">学生</el-radio>-->
            <!--            <el-radio v-model="memberType1" label="2">老师</el-radio>-->
            <el-form-item label="成员id" style="margin-top: 20px; margin-left: -30px">
              <el-select v-model="member.realName" placeholder="请选择"@change="getMember">
                <el-option
                  v-for="item in member"
                  :key="item.id"
                  :label="item.realName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <span>在读状态：</span>
            <el-radio v-model="studentStatus" label="0">未移除状态</el-radio>
            <el-radio v-model="studentStatus" label="-1">移除状态</el-radio>
          </el-form>

          <el-button @click="cancelEditTeacher('form')">取消</el-button>
          <el-button  @click="updateRole2('form')" type="primary">确定</el-button>
        </el-dialog>
        <div v-for="item in teacher">
          <div style="float: left; margin-right: 10px;">{{item.realName}}</div>
          <el-button   type="primary" @click="changeState1">修改状态</el-button>
        </div>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" style="margin-top: 25px">
          <el-checkbox v-for="items in coursesCampus" :label="items.id" :key="items.id">{{items.realName}}</el-checkbox>
        </el-checkbox-group>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelEditCampus('form')">取消</el-button>
          <el-button  @click="updateCampus('form')" type="primary">确定</el-button>
        </div>
      </el-dialog>
      <el-dialog
        width="30%"
        title="学生列表"
        :visible.sync="innerVisible2"
        append-to-body>
        <div v-for="item in teacher">
          <div style="float: left; margin-right: 10px;">{{item.realName}}</div>
          <el-button   type="primary" @click="changeState1">修改状态</el-button>
        </div>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" style="margin-top: 25px">
          <el-checkbox v-for="items in coursesCampus" :label="items.id" :key="items.id">{{items.name}}</el-checkbox>
        </el-checkbox-group>
       <span v-if="!inClass">课时数：</span>
          <el-input v-model="classTimes" placeholder="请输入课时数" style="width: 40%;margin-top: 15px" v-if="!inClass"></el-input>

        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelEditCampus2('form')">取消</el-button>
          <el-button  @click="updateCampus2('form')" type="primary">确定</el-button>
        </div>
      </el-dialog>
      <el-form :model="details"  :rules="rules" label-width="100px">
        <div style="margin: 20px;font-size: 21px;margin-left: 0">班级:</div>
        <div>班级名称：{{className}}</div>
<!--        <div>班级类型：{{classTimeType}}</div>-->
        <div>课程名称：{{courseName}}</div>
        <div>课程状态：{{classStatus}}</div>
        <div>课程ID：{{classId}}</div>
        <div style="margin: 20px;font-size: 21px;margin-left: 0">教师:</div>
        <div v-for="(item,index) in details.teachers">
          <div>{{item.realName}}</div>
<!--          <div @click="changeTeacherList(index)">查看详情</div>-->
        </div>
        <el-button   type="primary"  @click="getTeacher">添加教师</el-button>
        <el-button   type="primary"  @click="removeTeacher">移除教师</el-button>
        <div style="margin: 20px;font-size: 21px;margin-left: 0">学生:</div>
        <div v-for="(item,index) in details.students">
          <div>{{item.name}} <el-button   type="primary"  @click="changeStudentList(index)" size="mini" style="margin: 8px 0">转班</el-button></div>
        </div>
        <el-button   type="primary" @click="getStudent">添加学生</el-button>
        <el-button   type="primary"  @click="removeStudent">移除学生</el-button>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelPaySucceed('form')">取消</el-button>
        <el-button v-if="dialogStatus == 'create'" @click="saveRole('form')" type="primary">确定</el-button>
        <el-button v-else @click="cancelPaySucceed('form')" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="userTitle1" :visible.sync="dialogVisible" width="60%" >
      <el-form-item label="成员id">
        <el-select v-model="member.id" placeholder="请选择">
          <el-option
            v-for="item in member"
            :key="item.value1"
            :label="item.label"
            :value="item.value1">
          </el-option>
        </el-select>
      </el-form-item>

      <el-radio v-model="memberType2" label="1">学生</el-radio>
      <el-radio v-model="memberType2" label="2">老师</el-radio>


      <!--      <el-radio v-model="studentStatus" label="0">在读状态</el-radio>-->
      <!--      <el-radio v-model="studentStatus" label="1">学生转出</el-radio>-->
      <!--      <el-radio v-model="studentStatus" label="-1">结业状态</el-radio>-->

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit('form')">取消</el-button>
        <el-button  @click="updateRole2('form')" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="userTitle3" :visible.sync="dialogFormEdit">
      <el-form :model="details" ref="form" :rules="rules" label-width="100px">

          <el-form-item label="班级id" >
            <el-input v-model="details.classId"></el-input>
          </el-form-item>
          <el-form-item label="班级名">
            <el-input v-model="details.className"></el-input>
          </el-form-item>
          <el-form-item label="课程名">
            <el-input v-model="details.courseName"  ></el-input>
          </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit('form')">取消</el-button>
        <el-button  @click="updateRole3('form')" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="userTitle3" :visible.sync="dialogFormEditSudent">
      <el-form :model="member" ref="form" :rules="rules" label-width="100px">
        <el-form-item label="成员id" style="margin-top: 20px; margin-left: -30px">
          <el-select v-model="member.realName" placeholder="请选择"@change="getMember">
            <el-option
              v-for="item in member"
              :key="item.id"
              :label="item.realName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit('form')">取消</el-button>
        <el-button  @click="updateRole4('form')" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="userTitle1" :visible.sync="dialogVisibleCourse" width="60%" >
      <span>选择课程表方式：</span>
      <el-radio-group v-model="radio">
        <el-radio :label="3">自动</el-radio>
        <el-radio :label="6">循环</el-radio>
      </el-radio-group>
      <div v-if="radio=='3'">
      <div>选择日期：</div>
      <el-date-picker
        v-model="value1"
        type="date"
        @change="changeCourse"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
        placeholder="选择日期">
      </el-date-picker>
<!--      <div v-for="item in courseChoose" style="margin-bottom: 15px;margin-top: 15px">-->
<!--        <div>开始时间：{{item.beginTime}}</div>-->
<!--        <div>结束时间：{{item.endTime}}</div>-->
<!--        <div>老师名：{{item.teacherName}}</div>-->
<!--        <div>课程名：{{item.courseName}}</div>-->
<!--        <div>日期：{{item.classDate}}</div>-->
<!--      </div>-->
<!--      <div>{{resultTime}}</div>-->
<!--      <div>{{end}}</div>-->
        <el-dialog
          width="30%"
          title="选择时间"
          :visible.sync="innerVisibleTime"
          append-to-body>
          <el-time-select
            placeholder="起始时间"
            v-model="time.start"
            :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }">
          </el-time-select>
          <el-time-select
            placeholder="结束时间"
            v-model="time.end"
            :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
      minTime: startTime
    }">
          </el-time-select>
          <el-button  @click="updateCourseTime('form')" type="primary">确定</el-button>
        </el-dialog>
      <div v-for="value in calssesTime">
      <div v-for="(item,index) in value.times" >
        上课时间：{{item.start}}-{{item.end}}
      </div>
      </div>
      <el-button @click="addTime('form')" v-if="decide">添加时间</el-button>
      </div>
      <div v-if="radio=='6'">
        <div>循环周期：</div>
        <div class="block">
          <el-date-picker
            v-model="value3"
            @change="changeValue3"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
        <el-dialog
          width="30%"
          title="选择时间"
          :visible.sync="innerVisibleTimeWeek"
          append-to-body>
          <el-time-select
            placeholder="起始时间"
            v-model="time.start"
            :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }">
          </el-time-select>
          <el-time-select
            placeholder="结束时间"
            v-model="time.end"
            :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
      minTime: startTime
    }">
          </el-time-select>
          <el-button  @click="updateCourseTime2('form')" type="primary">确定</el-button>
        </el-dialog>
        <div v-for="(value,index) in weeksLoop">
          <div style="margin-bottom: 10px;margin-top: 5px">{{value.week}}<el-button @click="addTimeWeek(index)" type="primary" size="mini" v-if="weeksLoopTrue">添加时间</el-button>
          </div>
          <div v-for="(val,index) in value.times">{{val.start}}  {{val.end}}</div>
        </div>

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelVisible('form')">取消</el-button>
        <el-button  @click="updateCourse('form')" type="primary">确定</el-button>
      </div>
    </el-dialog>z

  </div>
</template>
<script>
    import { getClassPage, updateClass, addClass, getCourseTypeList, deleteCoursePrice, orgCourses, getMemberBind, allocateClass, classDetail, classTeacher, updateMemberStatus, classStudent,getDayOfSchedule,addManualSchedule,addCircleSchedule,removeClassMember} from '@/api/dashboard/classList'
    export default {
        name: 'classList',
        components: {
            // 'role-user': () => import('./components/roleUser.vue'),
            // 'role-resource': () => import('./components/roleResource.vue')
        },
        data() {
            return {
                student:'',
                teacher:'',
                member:'',
                classId:'',
                chooseIndex:'',
                checkedCities:[],
                value1: '套餐',
                classTimes:'',
                valueTime:{
                    startTime: '',
                    endTime: ''
                },
                coursesCampus:{},
                classStatus:'2',
                courseName:'',
                decide:false,
                isIndeterminate: true,
                innerVisibleTimeWeek:false,
                courseChoose:{

                },
                // resultTime:[
                //     {times:[
                //             {
                //                 startTime:'',
                //                 endTime:''
                //             }
                //         ]}
                // ],
                resultTime: [],
                calssesTime: [{
                    day: undefined,
                    times: []
                }],
                time: {
                    start: '',
                    end: '',
                },
                weeksLoop:[
                    {
                        week:"MONDAY",
                        times:[
                            {
                                start: '',
                                end: '',
                            }
                        ]
                    },
                    {
                        week:"TUESDAY",
                        times:[
                            {
                                start: '',
                                end: '',
                            }
                        ]
                    },
                    {
                        week:"WEDNESDAY",
                        times:[
                            {
                                start: '',
                                end: '',
                            }
                        ]
                    },
                    {
                        week:"THURSDAY",
                        times:[
                            {
                                start: '',
                                end: '',
                            }
                        ]
                    },
                    {
                        week:"FRIDAY",
                        times:[
                            {
                                start: '',
                                end: '',
                            }
                        ]
                    },
                    {
                        week:"SATURDAY",
                        times:[
                            {
                                start: '',
                                end: '',
                            }
                        ]
                    },
                    {
                        week:"SUNDAY",
                        times:[
                            {
                                start: '',
                                end: '',
                            }
                        ]
                    },
                ],
                memberType1:'1',
                memberType2:'1',
                studentStatus:'0',
                dialogFormEdit:false,
                innerVisibleFurther:false,
                dialogFormEditSudent:false,
                dialogVisibleCourse:false,
                innerVisibleTime:false,
                className:'',
                classNameValue:'',
                classTimeType:'',
                id:'',
                filterText: '',
                radio:'',
                startDate:'',
                endDate:'',
                courseIds:'',
                listLoading: true,
                page: {
                    total: 0,
                    pageSizes: [10, 20, 30, 50],
                    totalPage: 0,
                    data: []
                },
                options: [{
                    value: '2',
                    label: '开课中'
                }, {
                    value: '3',
                    label: '已结课'
                }, {
                    value: '-1',
                    label: '删除'
                }],
                value: '开课中',
                listQuery: {
                    className:this.classNameValue,
                    pageSize:10,
                    page:1
                },
                details: {
                    courseName:'',
                    className:'',
                    classId:''
                },
                classDetails: {
                    classId:'',
                },
                innerVisible1:false,
                innerVisible2:false,
                dialogVisible: false,
                dialogStatus: '',
                dialogFormVisible: false,
                dialogResourceVisible: false,
                dialogFormPay:false,
                dialogFormSucceed:false,
                textMap: {
                    update: '编辑',
                    create: '创建'
                },
                form: {
                    openingTime: undefined,
                    endTime: undefined,
                    estimatedOpeningTime: undefined,
                    estimatedEndTime: undefined,
                    phone: undefined,
                    urgentPhone: undefined,
                    birthday:undefined,
                    id:'',
                    supportRefund:undefined,
                    suite:undefined,
                    height:undefined,
                    width:undefined,
                    courseId:'',
                    courseName:''
                },
                formRefuse:{
                    refuseReason: undefined,
                    serviceOrderId: undefined,
                },
                formPaySucceed: {
                    courseId:'',
                },
                rules: {
                    height: [
                        { required: true, message: '不能为空'},
                        { type: 'number', message: '必须为数字值'}
                    ],
                    width: [
                        { required: true, message: '不能为空'},
                        { type: 'number', message: '必须为数字值'}
                    ],
                },
                roleId: undefined,
                userTitle1: '查看详情',
                userTitle2: '编辑',
                userTitle3: '新增成员',
                resourcesTitle: undefined,
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value1: '',
                value2: '',
                value3: '',
                weeksLoopTrue:true,
                inClass:false
            }
        },
        mounted() {

            this.getList()
            // this.tryIt()
        },
        methods: {
            tryIt (){
                this.$store.dispatch('user/getInfo')
                    .then(res => {
                        console.dir(res,'getInfo')
                        // if (res.data.error) {
                        //     this.$message.error(res.data.error);
                        //     return false;
                        // }
                        // this.$message.success("提交成功");
                        // this.$router.push('/submitAudit')

                    })
            },
            // changeTeacherList(index){
            //
            // },
            changeStudentList(index){
                console.log(this.classDetails.classId)
                this.$router.push({
                    path:'/changeClass',
                    query: {
                        studentId: this.details.students[index].id,
                        classId:this.classDetails.classId
                    },

                })
            },
            inClassChange1(e){
                console.log(e,'e')
                this.time.start=e;
            },
            inClassChange2(e){
                console.log(e,'e')
                this.time.end=e;
            },
            changeValue3(e){
                console.log(e,'e')
                this.startDate=e[0]
                this.endDate=e[1]
            },
            addTime(){
              this.innerVisibleTime=true
            },
            getValue(e){
                this.classStatus=e;
                console.log(e,'e')
            },
            cancelVisible(){
               this.dialogVisibleCourse=false
            },
            changeCourse(e){
              console.log(e,'e')
                this.decide=true;
                getDayOfSchedule({
                    day:e,
                    classId:this.classId
                }).then(response => {
                    this.courseChoose=response.data;
                    console.log( this.courseChoose,'courseChoose')
                })
            },
            handleRight(){
                this.getList()
            },
            userList3(row){
                console.log(row)
            },
            getTime1(e){
                console.log(e)
                this.form.openingTime=e[0];
                this.form.endTime=e[1];
            },
            getTime2(e){
                console.log(e)
                this.form.estimatedOpeningTime=e[0];
                this.form.estimatedEndTime=e[1];
            },
            addTimeWeek(index){
                console.log(index,'index')
                this.chooseIndex=index;
                this.innerVisibleTimeWeek=true
            },
            getList() {
                this.listLoading = true
                getClassPage(this.listQuery).then(response => {
                    this.page = response.data.data;
                    const data= response.data;
                    console.log(data,'data')
                    this.page.total = response.data.totalCount;
                    for(let i=0;i<data.length;i++){
                        this.form.classTimeId=data[i].id
                    }
                    for(let i=0;i<data.length;i++){
                        this.classId=data[i].id
                    }
                    console.log( this.form.classTimeId)
                    for(let i=0;i<data.length;i++){
                        if(data[i].classStatus=='-1'){
                            data[i].classStatus='删除';
                        }else if(data[i].classStatus=='2'){
                            data[i].classStatus='开课中';
                        }else if(data[i].classStatus=='3'){
                            data[i].classStatus='已结课';
                        }
                    }
                    this.listLoading = false
                })
            },
            updateCampus(){
                if (this.inClass){
                    removeClassMember(
                        {
                            memberIds:this.checkedCities.toString(),
                            memberType:2,
                            classId:this.classId
                        }
                    ).then(response => {
                        console.log(response,'555')
                        if (response.code === 200) {
                            this.dialogFormEdit = false
                            this.getList()
                            this.$notify({
                                title: '成功',
                                message: '成功',
                                duration: 2000
                            })
                        }
                        this.innerVisible1=false;
                        this.dialogFormSucceed=false
                        this.getList()
                    })
                }else {
                    allocateClass(
                        {
                            memberIds:this.checkedCities.toString(),
                            memberType:2,
                            classId:this.classId
                        }
                    ).then(response => {
                        console.log(response,'555')
                        if (response.code === 200) {
                            this.dialogFormEdit = false
                            this.getList()
                            this.$notify({
                                title: '成功',
                                message: '成功',
                                duration: 2000
                            })
                        }
                        this.innerVisible1=false;
                        this.dialogFormSucceed=false
                        this.getList()
                    })
                }
            },
            updateCampus2(){
                if (this.inClass){
                    removeClassMember(
                        {
                            memberIds:this.checkedCities.toString(),
                            memberType:1,
                            classId:this.classId,
                        }
                    ).then(response => {
                        console.log(response,'555')
                        if (response.code === 200) {
                            this.dialogFormEdit = false
                            this.getList()
                            this.$notify({
                                title: '成功',
                                message: '成功',
                                duration: 2000
                            })
                        }
                        this.innerVisible2=false;
                        this.dialogFormSucceed=false
                        this.getList()
                    })
                }else {
                    allocateClass(
                        {
                            memberIds:this.checkedCities.toString(),
                            memberType:1,
                            classId:this.classId,
                            classTimes:this.classTimes
                        }
                    ).then(response => {
                        console.log(response,'555')
                        if (response.code === 200) {
                            this.dialogFormEdit = false
                            this.getList()
                            this.$notify({
                                title: '成功',
                                message: '成功',
                                duration: 2000
                            })
                        }
                        this.innerVisible2=false;
                        this.dialogFormSucceed=false
                        this.getList()
                    })
                }
            },
            cancelEditCampus(){
                this.innerVisible1 = false
            },
            cancelEditCampus2(){
                this.innerVisible2 = false
            },
            removeTeacher(){
                this.inClass=true
                this.innerVisible1 = true
                classTeacher(
                    {
                        inClass:this.inClass,
                        classId:this.classId
                    }
                ).then(response => {
                    console.log(response,'555')
                    this.coursesCampus=response.data;


                })
            },
            removeStudent(){
                this.inClass=true
                this.innerVisible2 = true
                classStudent(
                    {
                        inClass:this.inClass,
                        classId:this.classId
                    }
                ).then(response => {
                    console.log(response,'555')
                    this.coursesCampus=response.data;


                })
            },
            getMember(e){
                console.log(e)
                this.member.id=e
            },
            updateCourseTime(){
                this.innerVisibleTime=false
                let calssesTime=this.calssesTime
                for(let i=0; i<calssesTime.length;i++){
                    calssesTime[i].times.push({'start':this.time.start,'end':this.time.end})
                    calssesTime[i].day=this.value1
                }
                // this.calssesTime.times.push(this.time)
                // this.resultTime.push(this.calssesTime.times);
                this.$forceUpdate();
                console.log(this.time,'time')

            },
            updateCourseTime2(){
                this.innerVisibleTimeWeek=false
                let weeksLoop=this.weeksLoop
                let chooseIndex=this.chooseIndex;
                    weeksLoop[chooseIndex].times.push({'start':this.time.start,'end':this.time.end})
                console.log(weeksLoop,'weeksLoop')
                // this.calssesTime.times.push(this.time)
                // this.resultTime.push(this.calssesTime.times);
                this.$forceUpdate();
                // console.log(weeksLoop,'weeksLoop')

            },
            updateCourse(){
                this.calssesTime=JSON.stringify(this.calssesTime);
                this.weeksLoop=JSON.stringify(this.weeksLoop);
                console.log(this.calssesTime);
                if(this.radio=='3'){
                    addManualSchedule({
                        json:this.calssesTime,
                        classId:this.classId
                    }).then(response => {
                        // this.member=response.data;
                        console.log( response,'member')
                    })
                } else if(this.radio=='6'){
                    addCircleSchedule({
                        json:this.weeksLoop,
                        classId:this.classId,
                        startDate:this.startDate,
                        endDate:this.endDate
                    }).then(response => {
                        // this.member=response.data;
                        console.log( response,'weeksLoop')
                    })
                }
                this.weeksLoopTrue=false
            },
            changeState1(){
                this.innerVisibleFurther = true;
                classTeacher({
                    inClass:true,
                    classId:this.classId
                }).then(response => {
                    this.member=response.data;
                    console.log( this.member,'member')
                })
            },
            courseList(row){
                this.classId=row.id;
                this.dialogVisibleCourse=true
            },
            getTeacher(){
                this.inClass=false
                this.innerVisible1 = true
                classTeacher(
                    {
                        inClass:this.inClass,
                        classId:this.classId
                    }
                ).then(response => {
                    console.log(response,'555')
                    this.coursesCampus=response.data;

                })
            },
            getStudent(){
                this.inClass=false
                this.innerVisible2 = true;
                classStudent(
                    {
                        // memberId:this.member.id,
                        inClass:this.inClass,
                        classId:this.classId
                    }
                ).then(response => {
                    console.log(response,'555')
                    this.coursesCampus=response.data;
                    // this.getList()
                })

            },
            handleCheckedCitiesChange(value) {
                console.log(value)
                this.courseIds=value;
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            },
            updateRole1(form) {
                allocateClass(
                    {
                        memberId:this.member.id,
                        memberType:2,
                        classId:this.classId
                    }
                ).then(response => {
                    console.log(response,'555')
                    if (response.code === 200) {
                        this.dialogFormEdit = false
                        this.getList()
                        this.$notify({
                            title: '成功',
                            message: '修改成功',
                            duration: 2000
                        })
                    }
                    this.getList()
                })
            },
            updateRole3(form) {
                updateClass(
                    {
                        className:this.details.className,
                        courseName:this.details.courseName,
                        classId:this.details.classId
                    }
                ).then(response => {
                    console.log(response,'555')
                    if (response.code === 200) {
                        this.dialogFormEdit = false
                        this.getList()
                        this.$notify({
                            title: '成功',
                            message: '修改成功',
                            duration: 2000
                        })
                    }
                    this.getList()
                })
            },
            updateRole4(form) {
                allocateClass(
                    {
                        memberId:this.member.id,
                        memberType:1,
                        classId:this.classId
                    }
                ).then(response => {
                    console.log(response,'555')
                    if (response.code === 200) {
                        this.dialogFormEdit = false
                        this.getList()
                        this.$notify({
                            title: '成功',
                            message: '修改成功',
                            duration: 2000
                        })
                    }
                    this.getList()
                })
            },
            updateRole2(form) {
                updateMemberStatus(
                    {
                        memberId:this.member.id,
                        memberType:2,
                        classId:this.classId,
                        status:this.studentStatus
                    }
                ).then(response => {
                    console.log(response,'555')
                    // this.teacher=response.data;
                    this.innerVisible1=false
                    this.innerVisibleFurther=false
                    this.dialogFormSucceed = false
                    this.getList()
                    this.$notify({
                        title: '成功',
                        message: '修改成功',
                        duration: 2000
                    })

                })
            },
            updatePay(form) {
                const set = this.$refs
                refuseServiceOrder(this.formRefuse).then(response => {
                    // console.log(response,'555')
                    if (response.code === 200) {
                        this.dialogFormPay = false
                        this.getList()
                        this.$notify({
                            title: '成功',
                            message: '修改成功',
                            duration: 2000
                        })
                    }
                    this.getList()
                })
            },
            userList(row) {
                this.classDetails.classId = row.id;
                classDetail(this.classDetails).then(response => {
                    this.details=response.data;
                    // this.details.class=response.data;
                    if(this.details.class.classStatus=='-1'){
                        this.details.class.classStatus='删除';
                        }else if(this.details.class.classStatus=='2'){
                        this.details.class.classStatus='开课中';
                        }else if(this.details.class.classStatus=='3'){
                        this.details.class.classStatus='已结课';
                        }
                    this.classId=this.details.class.id;
                    this.className=this.details.class.className;
                    this.courseName=this.details.class.courseName;
                    this.classStatus=this.details.class.classStatus;
                    this.classTimeType=this.details.class.classTimeType
                    console.log( this.details,'abcd')
                })
                this.dialogFormSucceed = true
            },
            handleCurrentChange(val) {
                this.listQuery.page = val
                this.getList()
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val
                this.getList()
            },
            putAway(row) {
                this.$confirm('确认上架该类型？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(row.id)
                    onSale({
                        courseId:row.id,
                        courseType:2,
                        allCoursePrice:false
                    }).then(response => {
                        this.$notify({
                            title: '成功',
                            message: '上架成功',
                            duration: 2000
                        })
                        this.getList()
                    })
                })
            },
            soldOut(row) {
                this.$confirm('确认下架该类型？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(row.id)
                    haltSale({
                        courseId:row.id,
                        courseType:2,
                    }).then(response => {
                        this.$notify({
                            title: '成功',
                            message: '下架成功',
                            duration: 2000
                        })
                        this.getList()
                    })
                })
            },
            establish(row) {
                this.$confirm('确认新建该类型？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(row.id)
                    forbidSale({
                        courseId:row.id,
                        courseType:2,
                    }).then(response => {
                        this.$notify({
                            title: '成功',
                            message: '新建成功',
                            duration: 2000
                        })
                        this.getList()
                    })
                })
            },
            handleCreate() {
                this.dialogFormVisible = true
                // this.resetForm()
                this.dialogStatus = 'create';
                getCourseTypeList().then(response => {
                    console.log( response,'abc')
                    let data=response.data;
                    this.form.courseId=data
                    console.log(this.form.courseId,'hu')
                    // for(let i=0;i<data.length;i++){
                    //     // this.form.courseId[i]=data[i].id
                    //     for(let i=0;i< this.form.courseId.length;i++){
                    //         this.form.courseId[i].value=data[i].id;
                    //         this.form.courseId[i].label=data[i].id;
                    //         this.form.courseId.length=data.length
                    //         console.log(data.length)
                    //     }
                    // }
                })
                orgCourses({suite:0}).then(response => {
                    console.log( response,'课程')
                    let data=response.data;
                    this.form.id=data;
                    console.log(this.form,'hu2')
                    // for(let i=0;i<data.length;i++){
                    //     // this.form.courseId[i]=data[i].id
                    //     for(let i=0;i< this.form.courseId.length;i++){
                    //         this.form.courseId[i].value=data[i].id;
                    //         this.form.courseId[i].label=data[i].id;
                    //         this.form.courseId.length=data.length
                    //         console.log(data.length)
                    //     }
                    // }
                })

            },
            saveRole(formName) {
                const set = this.$refs
                this.form.menuId = this.listQuery.menuId
                set[formName].validate(valid => {
                    if (valid) {
                        addClass(
                            {
                                plannedStudentNumber:this.form.plannedStudentNumber,
                                totalClassPeriod:this.form.totalClassPeriod,
                                headTeacher:this.form.headTeacher,
                                className:this.form.className,
                                courseName:this.form.courseName,
                                courseId:this.form.id.id,
                                description:this.form.description,
                                classTimeId:this.form.courseId.classTimeType,
                                estimatedEndTime:this.form.estimatedEndTime,
                                estimatedOpeningTime:this.form.estimatedOpeningTime,
                                endTime:this.form.endTime,
                                openingTime:this.form.openingTime,
                            }
                        ).then(response => {
                            if (response.code === 200) {
                                this.dialogFormVisible = false
                                this.getList()
                                this.$notify({
                                    title: '成功',
                                    message: '角色添加成功',
                                    duration: 2000
                                })
                            }
                            this.getList()
                        })
                    }
                })
            },
            handleUpdate(row) {

                this.form.phone = row.phone
                this.form.name = row.name
                this.form.roleType = row.roleType
                this.form.idNo = row.idNo
                this.form.urgentPhone = row.urgentPhone
                this.form.gender = row.gender
                this.form.birthday = row.birthday
                this.dialogStatus = 'update'
                this.dialogFormVisible = true
            },
            handleEdit(row) {
                this.details.classId = row.id;
                this.details.className = row.className;
                this.details.courseName = row.courseName;
                this.dialogFormEdit = true
                // classTeacher({
                //     inClass:false,
                //     classId:row.id
                // }).then(response => {
                //     console.log(response,'response1')
                //     this.member=response.data;
                //     console.log( this.member,'abcd')
                // })
            },

            handleConsent(row) {
                this.formPaySucceed.serviceOrderId = row.id
                this.dialogFormSucceed = true
            },
            handleRefuse (row){
                this.dialogFormPay = true
                this.formRefuse.serviceOrderId = row.id;
                // this.formPay.payChannel = row.payChannel
            },
            updatePaySucceed(form) {
                consentServiceOrder(this.formPaySucceed).then(response => {
                    // console.log(response,'555')
                    if (response.code === 200) {
                        this.dialogFormSucceed = false
                        this.getList()
                        this.$notify({
                            title: '成功',
                            message: '修改成功',
                            duration: 2000
                        })
                    }
                    this.getList()
                })
            },

            roleUsersOpen() {
                this.$refs.roleUser.listQuery.roleId = this.roleId
                this.$refs.roleUser.getRoleUserList()
            },
            resetForm() {
                this.form = {
                    gender: undefined,
                    name: undefined,
                    roleType: undefined,
                    idNo: undefined,
                    phone: undefined,
                    urgentPhone: undefined,
                    birthday:undefined
                }
            },
            cancel(){
                this.dialogFormVisible = false
            },
            cancelPay(){
                this.dialogFormPay = false
            },
            cancelPaySucceed(){
                this.dialogFormSucceed = false
            },
            cancelEdit(){
                this.dialogFormEdit = false
            },
            cancelEditTeacher(){
                this.innerVisibleFurther=false
            },
            // handleLoadRoleGranted(row) {
            //     if (!row.id) {
            //         return
            //     }
            //     this.roleId = row.id
            //     this.resourcesTitle = '分配资源-' + row.roleName
            //     this.dialogResourceVisible = true
            // },
            roleResourceData() {
                this.$refs.roleResouce.roleId = this.roleId
                this.$refs.roleResouce.roleResourceData()
            },
            saveRoleResources() {
                const resourceId = this.$refs.roleResouce.$refs.resourceTree.getCheckedKeys()
                const elements = this.$refs.roleResouce.elementSelectedId
                elements.forEach(element => {
                    resourceId.push(element)
                })
                // 角色资源保存
                updateRoleResource(this.roleId, resourceId.join(',')).then(response => {
                    if (response.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: '资源分配成功',
                            duration: 2000
                        })
                    }
                    this.dialogResourceVisible = false
                })
            },
            removeUser(row) {
                this.$confirm('确认删除该类型？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(row.id)
                    deleteCoursePrice({id:row.id}).then(response => {
                        this.$notify({
                            title: '成功',
                            message: '删除成功',
                            duration: 2000
                        })
                        this.getList()
                    })
                })
            },
        }
    }
</script>

