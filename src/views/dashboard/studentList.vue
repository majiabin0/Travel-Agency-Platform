<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button-group>
        <el-button type="primary" icon="plus" @click="handleCreate">添加</el-button>
      </el-button-group>
    </div>
    <el-table :data="page" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column align="center" label="学生id" width="200">
        <template scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column align="center" label="生日" width="200">
        <template scope="scope">{{scope.row.birthday}}</template>
      </el-table-column>
      <el-table-column align="center" label="性别" width="150">
        <template scope="scope">{{scope.row.gender}}</template>
      </el-table-column>
      <el-table-column align="center" label="手机号" width="200">
        <template scope="scope">{{scope.row.phone}}</template>
      </el-table-column>
      <el-table-column align="center" label="姓名" width="150">
        <template scope="scope">{{scope.row.name}}</template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="480">
        <template scope="scope">
          <el-button type="primary" @click="userList(scope.row)" size="mini" style="margin-bottom: 5px">查看详情</el-button>
          <el-button type="primary" icon="edit" @click="handleEdit(scope.row)" size="mini">编辑</el-button>
          <el-button type="primary" icon="edit" @click="handleEditPeriod(scope.row)" size="mini">课时管理</el-button>
          <el-button type="primary" icon="edit" @click="divideClassList(scope.row)" size="mini">分班</el-button>
<!--          <el-button type="primary" icon="edit" @click="changeClassList(scope.row)" size="mini">转班</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="paging-container">
      <el-pagination :total="page.total" :current-page.sync="listQuery.page" :page-size="listQuery.pageSize" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, jumper" @size-change="handleSizeChange"></el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules" label-width="100px">
        <el-form-item label="学生姓名">
          <el-input v-model="form.name" placeholder="请输入课程名称"></el-input>
        </el-form-item>
        <el-form-item label="学生身份证号码">
          <el-input v-model="form.idNo" placeholder="请输入类型编码"></el-input>
        </el-form-item>
        <el-form-item label="套餐类型">
          <el-radio v-model="form.gender" label="1">男</el-radio>
          <el-radio v-model="form.gender" label="0">女</el-radio>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone" placeholder="请输入课程名称"></el-input>
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
      <el-form :model="formPaySucceed"  :rules="rules" label-width="100px">

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelPaySucceed('form')">取消</el-button>
        <el-button v-if="dialogStatus == 'create'" @click="saveRole('form')" type="primary">确定</el-button>
        <el-button v-else @click="updatePaySucceed('form')" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="userTitle1" :visible.sync="dialogVisible" width="60%" @opened="roleUsersOpen">
      <!--      <role-user :roleId="roleId" ref="roleUser"></role-user>-->
      <el-form :model="details" ref="details" :rules="rules" label-width="100px">
        <el-form-item label="学生id" >
          <el-input v-model="details.id"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="生日" >
          <el-input v-model="details.birthday"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="性别"  >
          <el-input v-model="details.gender"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="手机号" >
          <el-input v-model="details.phone" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input v-model="details.updateTime"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="details.createTime"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="最后在线时间">
          <el-input v-model="details.activeEndTime"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="details.name"  readonly="readonly"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :title="userTitle2" :visible.sync="dialogFormEdit" width="60%" @opened="roleUsersOpen">
      <!--      <role-user :roleId="roleId" ref="roleUser"></role-user>-->
      <el-form :model="details" ref="details" :rules="rules" label-width="100px">
        <el-form-item label="学生id" >
          <el-input v-model="details.id"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-input v-model="details.birthday"></el-input>
        </el-form-item>
        <el-form-item label="性别"  >
          <el-input v-model="details.gender"  ></el-input>
        </el-form-item>
        <el-form-item label="手机号" >
          <el-input v-model="details.phone" ></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input v-model="details.updateTime" ></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="details.createTime" ></el-input>
        </el-form-item>
        <el-form-item label="最后在线时间">
          <el-input v-model="details.activeEndTime" ></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="details.name" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit('form')">取消</el-button>
        <el-button  @click="updateRole('form')" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="分班" :visible.sync="dialogFormEditClass" width="60%" @opened="roleUsersOpen">
      <!--      <role-user :roleId="roleId" ref="roleUser"></role-user>-->
      <el-dialog
        width="30%"
        title="查看详情"
        :visible.sync="innerVisibleList"
        append-to-body>
<!--        <el-form :model="classList" ref="details" :rules="rules" label-width="100px">-->
<!--          <div v-for="(items,index) in classList"style="margin-top: 30px">-->
<!--            <div>id：{{items.id}}</div>-->
<!--            <div>课时：{{items.classTimes}}</div>-->
<!--            <div>创建时间：{{items.createTime}}</div>-->
<!--          </div>-->
<!--        </el-form>-->
        <el-radio-group v-model="adminRole" @change="changeRole">
          <el-radio v-for="item in adminRoles" :key="item.id" :label="item.id" style="margin-right: 200px;margin-bottom: 10px">{{item.className}}</el-radio>
        </el-radio-group>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelList('form')">取消</el-button>
          <el-button  @click="updateRoleChoose('form')" type="primary">确定</el-button>
        </div>
      </el-dialog>
      <el-form :model="divideClass" ref="details" :rules="rules" label-width="100px">
        <el-form-item label="分配班级" >
          <div @click="chooseList"><el-button type="primary" style="margin-bottom: 10px">点我选择</el-button></div>
          <el-input v-model="divideClass.id"></el-input>
        </el-form-item>
        <el-form-item label="设置课时">
          <el-input v-model="divideClass.classTimes"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEditAdd('form')">取消</el-button>
        <el-button  @click="updateRoleAdd('form')" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="课程管理" :visible.sync="dialogFormEditList" width="60%" @opened="roleUsersOpen">
      <!--      <role-user :roleId="roleId" ref="roleUser"></role-user>-->
      <el-dialog
        width="30%"
        title="查看详情"
        :visible.sync="innerVisible"
        append-to-body>
        <el-form :model="timeList" ref="details" :rules="rules" label-width="100px">
          <div v-for="(items,index) in timeList"style="margin-top: 30px">
            <div>id：{{items.id}}</div>
            <div>课时：{{items.classTimes}}</div>
            <div>创建时间：{{items.createTime}}</div>
          </div>
        </el-form>
      </el-dialog>
      <el-dialog
        width="30%"
        title="编辑"
        :visible.sync="innerVisibleEdit"
        append-to-body>
        <el-form :model="editList" ref="details" :rules="rules" label-width="100px">
          <el-form-item label="课程名">
            {{editList.className}}
          </el-form-item>
            <el-form-item label="id" >
              {{editList.id}}
            </el-form-item>
            <el-form-item label="课时数">
              <div>{{editList.classTimes}}</div>
              <el-radio-group v-model="radio"  @change="getChange">
              <el-radio  label="1">加课</el-radio>
              <el-radio label="2">减课</el-radio>
              </el-radio-group>
              <el-input v-model="classTimes"></el-input>
            </el-form-item>
            <el-form-item label="备注"  >
              <el-input v-model="editList.remark"  ></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelEdit1('form')">取消</el-button>
          <el-button  @click="updateRole1('form')" type="primary">确定</el-button>
        </div>
      </el-dialog>
      <el-form :model="list" ref="details" :rules="rules" label-width="100px">
        <div v-for="(items,index) in list" style="margin-top: 20px">
          <span>课程名：{{items.className}}</span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
          <span>课时：{{items.classTimes}}</span>
          <el-button  @click="handleDetails(index)" type="primary" size="mini">查看详情</el-button>
          <el-button type="primary" icon="edit" @click="handleEditClass(index)" size="mini">编辑</el-button>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEditList('form')">取消</el-button>
        <el-button  @click="updateList('form')" type="primary">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
    import { orgStudents, getOrgCampus, getOrgStuInfo, updateTeacher, selectTeacherById, updateStudent, selectMemberById, addStudent, updateClassTime, getClassTimeList, getClassTimeRecordPage, classList, allocateClass} from '@/api/dashboard/studentList'
    export default {
        name: 'studentList',
        components: {
            // 'role-user': () => import('./components/roleUser.vue'),
            // 'role-resource': () => import('./components/roleResource.vue')
        },
        data() {
            return {
                dialogFormEdit:false,
                dialogFormEditList:false,
                innerVisible:false,
                innerVisibleEdit:false,
                innerVisibleList:false,
                dialogFormEditClass:false,
                classId:'',
                memberId:'',
                stateChange:'',
                className:'',
                classTimes:'',
                remark:'',
                id:'',
                filterText: '',
                radio:'',
                classList:{

                },
                adminRole:'',
                adminRoles:{

                },
                listLoading: true,
                page: {
                    total: 0,
                    pageSizes: [10, 20, 30, 50],
                    totalPage: 0,
                    data: []
                },
                options: [{
                    value: '0',
                    label: '单一'
                }, {
                    value: '1',
                    label: '套餐'
                }, {
                    value: '2',
                    label: '课程表'
                }],
                value: '套餐',
                listQuery: {
                    page:0,
                    pageSize:10
                },
                details: {

                },
                list: {

                },
                timeList:{

                },
                divideClass:{

                },
                editList:{
                    remark:'',
                    classTimes:'',
                    id:'',
                    className:''
                },
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
                    gender: undefined,
                    name: undefined,
                    roleType: undefined,
                    idNo: undefined,
                    phone: undefined,
                    urgentPhone: undefined,
                    birthday:undefined,
                    id:undefined,
                    supportRefund:undefined,
                    suite:undefined,
                    height:undefined,
                    width:undefined,
                    courseLogo:undefined
                },
                formRefuse:{
                    refuseReason: undefined,
                    serviceOrderId: undefined,
                },
                formPaySucceed: {
                    stuId:'',
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
                resourcesTitle: undefined
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getValue(e){
                this.listQuery.suite=e
                console.log(this.listQuery.suite)

            },
            getChange(e){
              console.log(e,'e')
                this.stateChange=e;
            },
            handleRight(e){

                this.getList()
            },
            cancelEditAdd(){
                this.dialogFormEditClass=false
            },
            cancelList(){
                this.innerVisibleList=false
            },
            changeClassList(row){
              this.$router.push({
                  path:'/changeClass',
                  query: {
                      studentId: row.id,
                  },

              })
            },
            getList() {
                this.listLoading = true
                orgStudents(this.listQuery).then(response => {
                    this.page = response.data.data
                    const data= response.data.data;
                    console.log(data,'888')
                    this.page.total = response.data.totalCount;
                    for(let i=0;i<data.length;i++){
                        if(data[i].gender=='1'){
                            data[i].gender='男';
                        }else if(data[i].gender=='0'){
                            data[i].gender='女';
                        }
                    }
                    for(let i=0;i<data.length;i++){
                        if(data[i].courseStatus=='-1'){
                            data[i].courseStatus='删除';
                        }else if(data[i].courseStatus=='0'){
                            data[i].courseStatus='新建';
                        }else if(data[i].courseStatus=='1'){
                            data[i].courseStatus='下架';
                        }else if(data[i].courseStatus=='2'){
                            data[i].courseStatus='上架';
                        }
                    }
                    for(let i=0;i<data.length;i++){
                        if(data[i].refundType=='1'){
                            data[i].refundType='线上';
                        }else if(data[i].refundType=='2'){
                            data[i].refundType='线下';
                        }
                    }
                    for(let i=0;i<data.length;i++){
                        if(data[i].orgOptionResult=='1'){
                            data[i].orgOptionResult='同意';
                        }else if(data[i].orgOptionResult=='2'){
                            data[i].orgOptionResult='拒绝';
                        }
                    }
                    this.listLoading = false
                })
            },
            handleDetails(index){
              // console.log(this.list[index].id,'index')
                getClassTimeRecordPage({
                    classMemberId:this.list[index].id,
                    page:1,
                    pageSize:10
                }).then(response => {
                    console.log(response,'getClassTimeRecordPage')
                    let data=response.data.data;
                    this.timeList=data;
                    console.log( data,'abcd')
                })
                this.innerVisible = true
            },
            handleEditClass(index){
                console.log(index,'index')
                this.innerVisibleEdit=true
                this.editList.id=this.list[index].id;
                this.editList.className=this.list[index].className;
                this.editList.classTimes=this.list[index].classTimes;
                this.editList.remark=this.list[index].remark;
                console.log(this.editList.className,'className')
            },
            handlePrice(row){
                this.$router.push({
                    path: '/priceList',
                    query: {courseId: row.id},
                });
            },
            chooseList(){
                classList({
                }).then(response => {
                    console.log(response,'classList')
                    let data=response.data;
                    this.adminRoles=data;
                    console.log( this.adminRoles,'adminRoles')
                })
                // this.divideClass=this.classId
                this.innerVisibleList=true
            },
            changeRole(e){
                console.log(e,'e')
                this.classId=e
            },
            updateRoleChoose(){
                this.divideClass.id=this.classId;
                this.innerVisibleList=false
            },
            divideClassList(row){
                // classList({
                // }).then(response => {
                //     console.log(response,'classList')
                //     let data=response.data.data;
                //     // this.timeList=data;
                //     console.log( data,'abcd')
                // })
                this.memberId=row.id;
                this.dialogFormEditClass=true
            },
            updateRoleAdd(){
                allocateClass({
                    memberIds:this.memberId,
                    memberType:1,
                    classId:this.divideClass.id,
                    classTimes:this.divideClass.classTimes

                }).then(response => {
                    console.log(response,'classList')
                    let data=response.data.data;
                    // this.timeList=data;
                })
                this.dialogFormEditClass=false
            },
            updateRole(form) {
                console.log(this.id,'id')
                this.details.orgStuId=this.id
                updateStudent(this.details).then(response => {
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
                // this.roleId = row.id
                // this.userTitle = row.roleName + '用户'
                // this.formPaySucceed.stuId = row.id;
                // console.log(this.formPaySucceed.stuId,'stuId')
                // getOrgStuInfo().then(response => {
                //     console.log(response,'stuId')
                //     let data=response.data;
                //     this.details=data;
                //     console.log( this.details.courseStatus,'abcd')
                //
                // })
                // this.dialogVisible = true
                getOrgStuInfo({
                    stuId:row.id,
                    postCode:'1',
                    labelCode:'1'
                }).then(response => {
                        console.log(response,'stuId')
                        let data=response.data;
                        this.details=data;
                        this.id=response.data.id
                        console.log( this.details.gender,'abcd')
                    if(this.details.gender=='1'){
                        this.details.gender="男"
                    }else{
                        this.details.gender="女"
                    }
                })
                this.dialogVisible = true
            },
            handleCurrentChange(val) {
                this.listQuery.page = val
                this.getList()
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val
                this.getList()
            },
            cancelEditList(){
              this.dialogFormEditList=false
            },
            updateList(){
                this.dialogFormEditList=false
            },
            handleCreate() {
                this.resetForm()
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
            },
            saveRole(formName) {
                const set = this.$refs
                this.form.menuId = this.listQuery.menuId
                set[formName].validate(valid => {
                    if (valid) {
                        addStudent(this.form).then(response => {
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

                this.form.phone = row.phone;
                this.form.name = row.name;
                this.form.roleType = row.roleType;
                this.form.idNo = row.idNo;
                this.form.urgentPhone = row.urgentPhone;
                this.form.gender = row.gender;
                this.form.birthday = row.birthday;
                this.dialogStatus = 'update';
                this.dialogFormVisible = true
            },
            handleEditPeriod(row){
                getClassTimeList({
                    orgStuId:row.id,
                }).then(response => {
                    console.log(response,'stuId')
                    let data=response.data;
                    this.list=data;
                    console.log( data,'abcd')
                });
                this.dialogFormEditList = true
            },
            handleEdit(row) {
                // this.formPaySucceed.courseId = row.id;
                // detail(this.formPaySucceed).then(response => {
                //     // var evidences=response.data.evidences;
                //     // this.details=response.data;
                //     // var str1=evidences.split(",")
                //     // _this.details.list=str1;
                //     this.details=response.data;
                //
                //     console.log( this.details,'abcd')
                //
                // })
                //
                // this.dialogFormEdit = true
                getOrgStuInfo({
                    stuId:row.id,
                    postCode:'1',
                    labelCode:'1'
                }).then(response => {
                    console.log(response,'stuId')
                    let data=response.data;
                    this.details=data;
                    console.log( this.details.courseStatus,'abcd')
                })
                this.dialogFormEdit = true
            },
            handleConsent(row) {
                this.formPaySucceed.serviceOrderId = row.id
                this.dialogFormSucceed = true
            },
            handleRefuse (row){
                this.dialogFormPay = true
                this.formRefuse.serviceOrderId = row.id;
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
            cancelEdit1(){
                this.innerVisibleEdit=false
            },
            updateRole1(){
              if(this.stateChange==2){
                  this.classTimes='-'+this.classTimes
              }
                updateClassTime({
                    classMemberId:this.editList.id,
                    classTimes:this.classTimes,
                    remark:this.editList.remark
                }).then(response => {
                    console.log(response,'stuId')
                    let data=response.data;
                    if (response.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: '成功',
                            duration: 2000
                        })
                    }
                })
                this.innerVisibleEdit = false;
                this.dialogFormEditList=false

            },
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
                    removeCourse({id:row.id}).then(response => {
                        this.$notify({
                            title: '成功',
                            message: '删除成功',
                            duration: 2000
                        })
                        this.getList()
                    })
                })
            },
            putAway(row) {
                this.$confirm('确认删除该类型？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(row.id)
                    onSale({
                        courseId:row.id,
                        courseType:1,
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
                this.$confirm('确认删除该类型？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(row.id)
                    haltSale({
                        courseId:row.id,
                        courseType:1,
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
            establish(row) {
                this.$confirm('确认删除该类型？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(row.id)
                    forbidSale({
                        courseId:row.id,
                        courseType:1,
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
        }
    }
</script>


