<template>
  <div class="app-container calendar-list-container">
    <div style="text-align: center;    margin: 40px;font-size: 20px;">机构信息</div>

      <el-form
        label-position="left"
        label-width="110px"
        :model="certificate"
        :rules="rules"
        ref="formRegister">
        <el-form-item label="logo">
          <img :src="certificate.logoFile" style="width: 200px;height: 200px"alt="logo"></img>
        </el-form-item>
        <el-form-item label="机构名称">
          <el-input  v-model="certificate.orgName" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="机构编号" prop="name">
          <el-input  v-model="certificate.legalPersonName"style="width: 430px;" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="校区" prop="name">
          <el-input  v-model="certificate.campusName"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="name">
          <el-input  v-model="certificate.cityName" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="name">
          <el-input  v-model="certificate.orgAddress" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="机构电话" prop="name">
          <el-input  v-model="certificate.orgTelephone" readonly="readonly"></el-input>
        </el-form-item>
      </el-form>


  </div>
</template>
<script>
    import { page, getOrgServiceOrderById, detail, addCourse, removeCourse, updateRole, onSale, haltSale, forbidSale} from '@/api/admin/basicInformation'
    export default {
        name: 'basicInformation',
        components: {
            // 'role-user': () => import('./components/roleUser.vue'),
            // 'role-resource': () => import('./components/roleResource.vue')
        },
        data() {
            return {
                dialogFormEdit:false,
                filterText: '',
                listLoading: true,
                certificate:{},
                page: {
                    // total: 0,
                    // pageSizes: [10, 20, 30, 50],
                    // totalPage: 0,
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
                    orgId:''
                },
                details: {

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
                resourcesTitle: undefined
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                var _this=this;
                this.listLoading = true;
                var orgId=localStorage.getItem('organization')
                var NumberOrgId= JSON.parse(orgId);
                this.listQuery.orgId=NumberOrgId
                page(this.listQuery).then(response => {
                    _this.certificate = response.data
                    // this.page.data = response.data
                    console.log(_this.certificate, 'page')
                    this.listLoading = false
                })
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
                updateRole(this.details).then(response => {
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
                this.formPaySucceed.courseId = row.id;
                detail(this.formPaySucceed).then(response => {
                    let data=response.data;
                    this.details=data;
                    // console.log( this.details.courseStatus,'abcd')
                    if(this.details.courseStatus=='0'){
                        this.details.courseStatus='新建';
                    }
                    else if(this.details.courseStatus=='-1'){
                        this.details.courseStatus='删除';
                    }
                    else if(this.details.courseStatus=='1'){
                        this.details.courseStatus='下架';
                    }
                    else if(this.details.courseStatus=='2'){
                        this.details.courseStatus='上架';
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
            saveRole(formName) {
                const set = this.$refs
                this.form.menuId = this.listQuery.menuId
                set[formName].validate(valid => {
                    if (valid) {
                        addCourse(this.form).then(response => {
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
        }
    }
</script>


