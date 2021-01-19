<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <span>校区名称：</span>
      <el-select v-model="id" placeholder="请选择校区名称" label="校区名称"  @change="getValue">
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
      <el-button-group style="margin-left: 50%;">
        <el-button type="primary" icon="plus" @click="handleCreate">添加员工</el-button>
      </el-button-group>
    </div>
    <el-table :data="page" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column align="center" label="成员id" width="250">
        <template scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column align="center" label="真实姓名" width="200">
        <template scope="scope">{{scope.row.realName}}</template>
      </el-table-column>
      <el-table-column align="center" label="性别" width="170">
        <template scope="scope">{{scope.row.gender}}</template>
      </el-table-column>
      <el-table-column align="center" label="职务名称" width="150">
        <template scope="scope">{{scope.row.postName}}</template>
      </el-table-column>
      <el-table-column align="center" label="职务码" width="150">
        <template scope="scope">{{scope.row.postCode}}</template>
      </el-table-column>
      <el-table-column align="center" label="机构id" width="170">
        <template scope="scope">{{scope.row.orgId}}</template>
      </el-table-column>
      <el-table-column align="center" label="手机号" width="150">
        <template scope="scope"> {{scope.row.mobilePhone}}</template>
      </el-table-column>
      <el-table-column align="center" label="头像地址" width="270">
        <template scope="scope">{{scope.row.portraitAddress}}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template scope="scope">
          <el-button type="primary" @click="userList(scope.row)" size="mini" style="margin-bottom: 5px">{{edit}}</el-button>
<!--          <el-button type="primary" v-if="teacher" icon="edit" @click="handleEdit(scope.row)" size="mini">编辑</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="paging-container">
      <el-pagination :total="page.total" :current-page.sync="listQuery.page" :page-size="listQuery.pageSize" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, jumper" @size-change="handleSizeChange"></el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules" label-width="100px">
        <el-form-item label="选择校区">
        <el-select v-model="form.orgId" placeholder="请选择校区名称"  @change="getValue">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.orgName"
            :value="item.id">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.memberName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="职务">
          <el-select v-model="form.postIds" placeholder="请选择职务"  @change="getValue">
            <el-option
              v-for="item in dutyOptions"
              :key="item.id"
              :label="item.postName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签">
          <el-select v-model="form.labelTypes" placeholder="请选择标签"  @change="getValue">
            <el-option
              v-for="item in titleOptions"
              :key="item.id"
              :label="item.postName"
              :value="item.id">
            </el-option>
          </el-select>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取消</el-button>
        <el-button v-if="dialogStatus == 'create'" @click="saveRole('form')" type="primary">确定</el-button>
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
        <el-form-item label="成员id" >
          <el-input v-model="details.id"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" >
          <el-input v-model="details.realName"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="性别"  >
          <el-input v-model="details.gender"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="职务名称" >
          <el-input v-model="details.postName" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="职务码">
          <el-input v-model="details.postCode"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="details.createTime"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="机构id">
          <el-input v-model="details.orgId"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="details.mobilePhone"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="头像地址">
          <el-input v-model="details.portraitAddress"  readonly="readonly"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :title="userTitle2" :visible.sync="dialogFormEdit" width="60%" @opened="roleUsersOpen">
      <!--      <role-user :roleId="roleId" ref="roleUser"></role-user>-->
      <el-form :model="detailsTeacher" ref="details" :rules="rules" label-width="100px">
        <el-form-item label="成员id" >
          <el-input v-model="detailsTeacher.id"  ></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" >
          <el-input v-model="detailsTeacher.realName"  ></el-input>
        </el-form-item>
        <el-form-item label="职务名称" >
          <el-input v-model="detailsTeacher.postName" ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="detailsTeacher.memberStatus" ></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="detailsTeacher.nickName" ></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="detailsTeacher.idNo" ></el-input>
        </el-form-item>
        <el-form-item label="用户所在部门数量">
          <el-input v-model="detailsTeacher.departmentsNum"  ></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="detailsTeacher.mobilePhone"  ></el-input>
        </el-form-item>
        <el-form-item label="头像地址">
          <el-input v-model="detailsTeacher.portraitAddress" ></el-input>
        </el-form-item>
        <el-form-item label="教龄">
          <el-input v-model="detailsTeacher.teacherAge"  ></el-input>
        </el-form-item>
        <el-form-item label="教育经历">
          <el-input v-model="detailsTeacher.educationExperience"  ></el-input>
        </el-form-item>
        <el-form-item label="教师简介">
          <el-input v-model="detailsTeacher.teacherIntroduction" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit('form')">取消</el-button>
        <el-button  @click="updateRole('form')" type="primary">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
    import { getOrgMember, getOrgCampus, detail, updateTeacher, selectTeacherById, updateRole, selectMemberById, addMember, posts} from '@/api/dashboard/employees'
    export default {
        name: 'employees',
        components: {
            // 'role-user': () => import('./components/roleUser.vue'),
            // 'role-resource': () => import('./components/roleResource.vue')
        },
        data() {
            return {
                dialogFormEdit:false,
                edit:'查看详情',
                id:'',
                teacher:true,
                duty:'',
                filterText: '',
                title:'',
                memberId:'',
                listLoading: true,
                options:{},
                dutyOptions:{},
                titleOptions:{},
                page: {
                    // total: 0,
                    // pageSizes: [10, 20, 30, 50],
                    // totalPage: 0,
                    // data: []
                },
                listQuery: {
                    orgId:'',
                    page: 1,
                    pageSize: 10
                },
                details: {

                },
                detailsTeacher:{

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
                    postIds: undefined,
                    labelTypes: undefined,
                    memberName: undefined,
                    orgId:undefined,
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
                userTitle2: '查看详情（可编辑）',
                resourcesTitle: undefined
            }
        },
        created() {
            this.getList()
            this.openVisible()
        },
        methods: {
            // one(row){
            //     console.log(row,'row')
            //     if(row.postName=='教师'){
            //         row.nickName='编辑'
            //     }
            // },
            getValue(e){
                console.log(e,'e')
                this.listQuery.suite=e
                console.log(this.listQuery.suite,'suite')

            },
            handleRight(row){
                console.log(row,'row')
                getOrgMember({orgId:this.listQuery.suite}).then(response => {
                    let data=response.data;
                    for(let i=0;i<data.length;i++){
                        // console.log(data[i].postName,'teacher')
                        if(data[i].gender){
                            data[i].gender='男'
                        }else {
                            data[i].gender='女'
                        }
                        // if(data[i].postName=='教师'){
                        //     this.edit='编辑'
                        //     console.log(data[i].postName,'teacher')
                        // }else {
                        //     this.edit='查看详情'
                        // }
                    }
                    this.page=data;
                    console.log(this.page,'getOrgMember')
                })
            },
            openVisible(){
                // this.dialogFormVisible=true
                getOrgCampus().then(response => {
                    console.log(response,'getOrgCampus')
                    let data=response.data;
                    this.options=data;
                    // this.id=data[0].id
                    console.log(this.options,'options')
                    this.listLoading = false
                })

            },
            getList() {
                // var orgId=localStorage.getItem('organization')
                // var NumberOrgId= JSON.parse(orgId);
                // this.listQuery.orgId=NumberOrgId
                // console.log("9999")
                // this.listLoading = true
            },
            beforeUploade(file) {
                if (!(file.size / 1024 / 1024 < 2)) {
                    this.$message.error('上传图片大小不能超过2MB！')
                    return false
                }
                return true
            },
            uplodaeSucess(res, file) {
                if(res.code === 200) {
                    this.form.courseLogo = res.data.address
                }
            },
            beforeUploade1(file) {
                if (!(file.size / 1024 / 1024 < 2)) {
                    this.$message.error('上传图片大小不能超过2MB！')
                    return false
                }
                return true
            },
            uplodaeSucess1(res, file) {
                if(res.code === 200) {
                    this.form.courseCovers = res.data.address
                }
            },
            beforeUploade2(file) {
                if (!(file.size / 1024 / 1024 < 2)) {
                    this.$message.error('上传图片大小不能超过2MB！')
                    return false
                }
                return true
            },
            uplodaeSucess2(res, file) {
                if(res.code === 200) {
                    this.form.videoCover = res.data.address
                }
            },
            handlePrice(row){
                this.$router.push({
                    path: '/priceList',
                    query: {courseId: row.id},
                });
            },
            updateRole(form) {
                if (this.detailsTeacher.gender=='男'){
                    this.detailsTeacher.gender='1'
                }else {
                    this.detailsTeacher.gender='-1'
                }
                this.detailsTeacher.teacherId=this.memberId
                console.log(this.detailsTeacher,'details')
                updateTeacher(this.detailsTeacher).then(response => {
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
                console.log(row.postName,'row')
                // this.roleId = row.id
                // this.userTitle = row.roleName + '用户'
                this.memberId = row.id;
                if(row.postName=='教师'){
                   // row.mobilePhone='编辑'
                    selectTeacherById({teacherId: this.memberId}).then(response => {
                        let data = response.data.info;
                        this.detailsTeacher = data;
                        this.detailsTeacher.educationExperience=response.data.educationExperience;
                        this.detailsTeacher.teacherAge=response.data.teacherAge;
                        this.detailsTeacher.teacherIntroduction=response.data.teacherIntroduction;
                        console.log( response,'details')
                        if (this.detailsTeacher.gender == '-1') {
                            this.detailsTeacher.gender = '男';
                        } else {
                            this.detailsTeacher.gender = '女';
                        }
                        this.dialogFormEdit = true
                    })
                }else {
                    selectMemberById({memberId: this.memberId}).then(response => {
                        let data = response.data;
                        this.details = data;
                        // console.log( this.details.courseStatus,'abcd')
                        if (this.details.gender == '-1') {
                            this.details.gender = '男';
                        } else {
                            this.details.gender = '女';
                        }
                        this.dialogVisible = true
                    })
                }

            },
            handleCurrentChange(val) {
                this.listQuery.page = val
                this.getList()
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val
                this.getList()
            },
            handleCreate() {
                this.resetForm()
                this.dialogStatus = 'create'
                this.dialogFormVisible = true;
                posts({isLabel:false}).then(response => {
                    console.log(response,'posts')
                    let data=response.data;
                    this.dutyOptions=data;
                    // this.id=data[0].id
                    console.log(this.dutyOptions,'dutyOptions')
                    this.listLoading = false
                })
                posts({isLabel:true}).then(response => {
                    console.log(response,'posts')
                    let data=response.data;
                    this.titleOptions=data;
                    // this.id=data[0].id
                    console.log(this.titleOptions,'titleOptions')
                    this.listLoading = false
                })

            },
            saveRole(formName) {
                console.log(this.form.postId,'postID')
                const set = this.$refs
                this.form.menuId = this.listQuery.menuId
                set[formName].validate(valid => {
                    if (valid) {
                        addMember(this.form).then(response => {
                            if (response.code === 200) {
                                this.dialogFormVisible = false
                                this.getList()
                                this.$notify({
                                    title: '成功',
                                    message: '角色添加成功',
                                    duration: 2000
                                })
                            }
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
                this.formPaySucceed.courseId = row.id;
                detail(this.formPaySucceed).then(response => {
                    // var evidences=response.data.evidences;
                    // this.details=response.data;
                    // var str1=evidences.split(",")
                    // _this.details.list=str1;
                    this.details=response.data;

                    console.log( this.details,'abcd')

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
                // this.$refs.roleUser.listQuery.roleId = this.roleId
                // this.$refs.roleUser.getRoleUserList()
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
            roleResourceData() {
                // this.$refs.roleResouce.roleId = this.roleId
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
        }
    }
</script>



