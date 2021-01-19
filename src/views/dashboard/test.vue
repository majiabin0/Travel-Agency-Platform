<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-select v-model="value" placeholder="请选择"  @change="getValue">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button-group>
        <el-button type="primary" icon="plus" @click="handleRight">确定</el-button>
      </el-button-group>
      <el-button-group>
        <el-button type="primary" icon="plus" @click="handleCreate">添加</el-button>
      </el-button-group>
    </div>
    <el-table :data="page" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column align="center" label="课程id" width="120">
        <template scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column align="center" label="机构id" width="120">
        <template scope="scope">{{scope.row.orgId}}</template>
      </el-table-column>
      <el-table-column align="center" label="课程id" width="180">
        <template scope="scope">{{scope.row.courseId}}</template>
      </el-table-column>
      <el-table-column align="center" label="课时类型id" width="100">
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
          <el-button type="primary" icon="edit" @click="handleEdit(scope.row)" size="mini">编辑</el-button>
          <!--          <el-button type="primary" icon="edit" @click="handleLoadRoleGranted(scope.row)">分配资源</el-button>-->
          <el-button type="danger" icon="delete" @click="removeUser(scope.row)" size="mini">删除</el-button>
          <el-button type="danger" icon="delete" @click="putAway(scope.row)" size="mini">上架</el-button>
          <el-button type="danger" icon="delete" @click="soldOut(scope.row)" size="mini">下架</el-button>
          <el-button type="danger" icon="delete" @click="establish(scope.row)" size="mini">新建</el-button>
          <el-button type="primary" icon="edit" @click="handlePrice(scope.row)" size="mini">编辑价格</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="paging-container">
      <el-pagination :total="page.total" :current-page.sync="listQuery.page" :page-size="listQuery.pageSize" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, jumper" @size-change="handleSizeChange"></el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules" label-width="100px">
        <el-form-item label="套餐类型">
          <el-radio v-model="form.suite" label="0">单一</el-radio>
          <el-radio v-model="form.suite" label="1">套餐</el-radio>
          <el-radio v-model="form.suite" label="2">课程包</el-radio>
        </el-form-item>
        <el-form-item label="课程名称">
          <el-input v-model="form.courseName" placeholder="请输入课程名称"></el-input>
        </el-form-item>
        <el-form-item label="课程类型编码" v-if="form.suite =='0'">
          <el-input v-model="form.courseTypeCode" placeholder="请输入类型编码"></el-input>
        </el-form-item>
        <el-form-item label="课程类型名称" v-if="form.suite =='0'">
          <el-input v-model="form.courseTypeName" placeholder="请输入类型名称"></el-input>
        </el-form-item>
        <el-form-item label="副标题">
          <el-input v-model="form.subheading" placeholder="请输入副标题"></el-input>
        </el-form-item>
        <el-form-item label="课程详情">
          <el-input v-model="form.description" placeholder="请输入课程详情"></el-input>
        </el-form-item>
        <el-form-item label="课程LOGO">
          <el-input v-model="form.courseLogo" placeholder="请输入课程LOGO"></el-input>
        </el-form-item>
        <el-form-item label="课程封面">
          <el-input v-model="form.courseCovers" placeholder="请输入课程封面"></el-input>
        </el-form-item>
        <el-form-item label="图片高度" prop="height">
          <el-input v-model.number="form.height" placeholder="请输入图片高度"></el-input>
        </el-form-item>
        <el-form-item label="图片宽度" prop="width">
          <el-input v-model.number="form.width" placeholder="请输入图片宽度"></el-input>
        </el-form-item>
        <el-form-item label="视频地址">
          <el-input v-model="form.video" placeholder="请输入视频地址"></el-input>
        </el-form-item>
        <el-form-item label="视频封面">
          <el-input v-model="form.videoCover" placeholder="请输入视频封面"></el-input>
        </el-form-item>
        <el-form-item label="课程适合年龄段">
          <el-input v-model="form.ageGrading" placeholder="请输入课程适合年龄段"></el-input>
        </el-form-item>
        <el-form-item label="课程简介">
          <el-input v-model="form.introduction" placeholder="请输入课程简介"></el-input>
        </el-form-item>
        <el-form-item label="课程是否支持退款">
          <el-radio v-model="form.supportRefund" label="true">是</el-radio>
          <el-radio v-model="form.supportRefund" label="false">否</el-radio>
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
        <el-form-item label="课程id" >
          <el-input v-model="details.id"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="课程名" >
          <el-input v-model="details.courseName"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="关闭原因"  >
          <el-input v-model="details.orgName"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="机构id" >
          <el-input v-model="details.orderId" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="一级课程类型">
          <el-input v-model="details.courseTypeCodeFirst"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="二级课程类型">
          <el-input v-model="details. courseTypeCodeSecond"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="三级课程类型">
          <el-input v-model="details.courseTypeCodeThird"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="三级自定义课程类型名">
          <el-input v-model="details.courseTypeNameThird"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="课程描述">
          <el-input v-model="details.description"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="课程状态">
          <el-input v-model="details.courseStatus"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="纬度">
          <el-input v-model="details.orgLat"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="经度">
          <el-input v-model="details.orgLng"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="课程LOGO" v-if="details.courseLogo">
          <img :src="details.courseLogo" style="width: 300px;height: 300px" alt="课程logo">
        </el-form-item>
        <el-form-item label="课程图片" v-if="details.courseCoversAddress">
          <img :src="details.courseCoversAddress"style="width: 300px;height: 300px" alt="课程图片">
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :title="userTitle2" :visible.sync="dialogFormEdit" width="60%" @opened="roleUsersOpen">
      <!--      <role-user :roleId="roleId" ref="roleUser"></role-user>-->
      <el-form :model="details" ref="details" :rules="rules" label-width="100px">
        <el-form-item label="课程id" >
          <el-input v-model="details.id"  ></el-input>
        </el-form-item>
        <el-form-item label="课程名" >
          <el-input v-model="details.courseName" ></el-input>
        </el-form-item>
        <el-form-item label="关闭原因"  >
          <el-input v-model="details.orgName" ></el-input>
        </el-form-item>
        <el-form-item label="课程描述">
          <el-input v-model="details.description" ></el-input>
        </el-form-item>
        <el-form-item label="课程状态">
          <el-input v-model="details.courseStatus"  ></el-input>
        </el-form-item>
        <el-form-item label="纬度">
          <el-input v-model="details.orgLat"  ></el-input>
        </el-form-item>
        <el-form-item label="经度">
          <el-input v-model="details.orgLng" ></el-input>
        </el-form-item>
        <el-form-item label="课程LOGO" v-if="details.courseLogo">
          <el-input v-model="details.courseLogo" ></el-input>
        </el-form-item>
        <el-form-item label="课程封面" v-if="details.courseCoversAddress">
          <el-input v-model="details.courseCoversAddress" ></el-input>
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
    import { page, getOrgServiceOrderById, detail, addCourse, removeCourse, updateRole, onSale, haltSale, forbidSale} from '@/api/admin/coursePrice'
    export default {
        name: 'coursePrice',
        components: {
            // 'role-user': () => import('./components/roleUser.vue'),
            // 'role-resource': () => import('./components/roleResource.vue')
        },
        data() {
            return {
                dialogFormEdit:false,
                id:'',
                filterText: '',
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
                    suite:'1'
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
                    width:undefined
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
            getValue(e){
                this.listQuery.suite=e
                console.log(this.listQuery.suite)

            },
            handleRight(e){

                this.getList()
            },
            getList() {
                this.listLoading = true
                page(this.listQuery).then(response => {
                    this.page = response.data
                    const data= response.data;
                    console.log(data,'888')
                    this.page.total = response.data.totalCount
                    for(let i=0;i<data.length;i++){
                        if(data[i].serviceType=='1'){
                            data[i].serviceType='退款';
                        }else if(data[i].serviceType=='2'){
                            data[i].serviceType='其他';
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
                    // var evidences=response.data.evidences;
                    // this.details=response.data;
                    // var str1=evidences.split(",")
                    // _this.details.list=str1;
                    this.details=response.data;

                    console.log( this.details,'abcd')

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
                this.$confirm('确认上架该类型？', '提示', {
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
                this.$confirm('确认下架该类型？', '提示', {
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


