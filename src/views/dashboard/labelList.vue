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
<!--      <span>类型：</span>-->
<!--      <el-select v-model="listQuery.isLabel" placeholder="请选择类型" @change="getValue1">-->
<!--        <el-option-->
<!--          v-for="item in optionsType"-->
<!--          :key="item.value"-->
<!--          :label="item.label"-->
<!--          :value="item.value">-->
<!--        </el-option>-->
<!--      </el-select>-->
      <el-button-group>
        <el-button type="primary" icon="plus" @click="handleRight">确定</el-button>
      </el-button-group>
      <el-button-group style="margin-left: 50%;">
        <el-button type="primary" icon="plus" @click="handleCreate">添加员工</el-button>
      </el-button-group>
    </div>
    <el-table :data="page" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column align="center" label="id" width="350">
        <template scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column align="center" label="职务名" width="300">
        <template scope="scope">{{scope.row.postName}}</template>
      </el-table-column>
      <el-table-column align="center" label="职务编码" width="250">
        <template scope="scope">{{scope.row.postCode}}</template>
      </el-table-column>
      <el-table-column align="center" label="描述" width="280">
        <template scope="scope">{{scope.row.description}}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="400">
        <template scope="scope">
          <!--          <el-button type="primary" @click="userList(scope.row)" size="mini" style="margin-bottom: 5px">查看详情</el-button>-->
                    <el-button type="primary" icon="edit" @click="handleEdit(scope.row)" size="mini">编辑</el-button>
          <!--          <el-button type="primary" icon="edit" @click="handleLoadRoleGranted(scope.row)">分配资源</el-button>-->
          <el-button size="small" type="danger" @click="removeList(scope.row)">删除</el-button>
          <!--          <el-button type="primary" icon="edit" @click="handlePrice(scope.row)" size="mini">编辑价格</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="paging-container">
      <el-pagination :total="page.total" :current-page.sync="listQuery.page" :page-size="listQuery.pageSize" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, jumper" @size-change="handleSizeChange"></el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules" label-width="100px">
<!--        <el-form-item label="职务编码">-->
<!--          <el-input v-model="form.postCode" placeholder="请输入职务编码"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="职务名">
          <el-input v-model="form.labelName" placeholder="请输入职务名"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" placeholder="请输入描述"></el-input>
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
        <el-form-item label="更新时间">
          <el-input v-model="details.updateTime"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="details.createTime"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="最后在线时间">
          <el-input v-model="details.activeEndTime"  readonly="readonly"></el-input>
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
        <el-form-item label="标签名" >
          <el-input v-model="details.labelName"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="details.description" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit('form')">取消</el-button>
        <el-button  @click="updateName('form')" type="primary">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
    import { posts, first, addCourse, removeCourse, updateRole, getByParent, changeStatus, insertPost, updatePost, deletePost, postsPage} from '@/api/dashboard/positionLabel'
    import qs from 'qs'
    import { getOrgCampus} from '@/api/dashboard/employees'
    export default {
        name: 'positionLabel',
        components: {
            // 'role-user': () => import('./components/roleUser.vue'),
            // 'role-resource': () => import('./components/roleResource.vue')
        },
        data() {
            return {
                dialogFormEdit:false,
                innerVisible:false,
                id:'',
                priceName:'',
                courseTime:'',
                courseNumber:'',
                originalPrice:'',
                currentPrice:'',
                first:{},
                getByParent:{},
                three:{},
                filterText: '',
                listLoading: true,
                page: {
                    total: 1,
                    pageSizes: [10, 20, 30, 50],
                    totalPage: 0,
                    isLabel:true,
                    data: []
                },
                page2: {

                    isLabel:true,

                },
                optionsType:[{
                    value: 'false',
                    label: '职务'
                }, {
                    value: 'true',
                    label: '标签'
                }],
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
                value: '职务',
                coursePriceList:[{
                    priceName:'Lucy',
                    courseTime:20,
                    courseNumber:'阅读',
                    originalPrice:'12',
                    currentPrice:'11',
                },
                    {
                        priceName:'Lucy22',
                        courseTime:20,
                        courseNumber:'阅读2',
                        originalPrice:'122',
                        currentPrice:'112',
                    }],
                newPerson:{
                    priceName:'',
                    courseTime:'',
                    courseNumber:'',
                    originalPrice:'',
                    currentPrice:'',
                },
                listQuery: {
                    isLabel:'',
                    orgId:'',
                    showAdmin:true,
                    page: 1,
                    pageSize: 10
                },
                details: {
                    description:'',
                    labelName:'',
                    labelId:''
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
                    isLabel:undefined,
                    height:undefined,
                    width:undefined,
                    courseLogo:undefined,
                    labelName:''
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
            this.getListLoad();
            this.openVisible()
        },
        methods: {
            getValue(e){
                // this.listQuery.isLabel=e
                // console.log(this.listQuery.isLabel)
                console.log(e,'e')

            },
            getValue1(e){
                console.log(e,'e')
                this.listQuery.isLabel=e
                console.log(this.listQuery.isLabel)
            },
            handleRight(e){

                this.getList()
            },
            updateCourse(){
                this.coursePriceList.push(this.newPerson);
                // 添加完newPerson对象后，重置newPerson对象
                this.newPerson = {
                    priceName:'',
                    courseTime:'',
                    courseNumber:'',
                    originalPrice:'',
                    currentPrice:'',
                }
                this.innerVisible=false
            },
            deletePerson(index){
                console.log(index)
                this.coursePriceList.splice(index,1);
            },
            firstItem(item){
                console.log(item.id,'value')
                getByParent({
                    parentId:item.id
                }).then(response => {
                    console.log(response,'getByParent')
                    this.getByParent=response.data
                    this.listLoading = false
                })
            },



            getByParentItem(item){
                console.log(item,'item')
                getByParent({
                    parentId:item.id
                }).then(response => {
                    this.three=response.data
                    console.log(this.three,'three')
                    this.listLoading = false
                })
            },
            threeItem(item){
                let that=this
                this.form.courseTypeCode=item.code
                console.log(this.form.courseTypeCode,'item2')
                this.$forceUpdate();

            },
            getList() {
                this.listLoading = true
                // if(this.listQuery.isLabel=='0'){
                //     this.listQuery.isLabel=false
                // }else if(this.listQuery.isLabel=='1') {
                //     this.listQuery.isLabel=true
                // }
                postsPage(this.listQuery).then(response => {
                    console.log(response,'response')
                    this.page = response.data.data
                    // const data= response.data;
                    // // this.details=response.data;
                    // // console.log(this.details,'888')
                    this.page.total = response.data.totalCount
                    console.log(this.page.total,'total')
                    // this.$forceUpdate();
                    this.listLoading = false
                    // if(this.listQuery.isLabel==false){
                    //     this.listQuery.isLabel='职务'
                    // }else {
                    //     this.listQuery.isLabel='标签'
                    // }
                })
                // console.log(this.listQuery.isLabel)
                // if(this.listQuery.isLabel=='0'){
                //     this.listQuery.isLabel=false
                // }else if(this.listQuery.isLabel=='1') {
                //     this.listQuery.isLabel=true
                // }
                // posts(this.listQuery).then(response => {
                //     this.page = response.data
                //     const data= response.data;
                //     // this.details=response.data;
                //     // console.log(this.details,'888')
                //     // this.page.total = response.data.totalCount
                //     this.listLoading = false
                //     // if(this.listQuery.isLabel==false){
                //     //     this.listQuery.isLabel='职务'
                //     // }else {
                //     //     this.listQuery.isLabel='标签'
                //     // }
                // })
            },
            getListLoad() {
                this.listQuery.orgId=this.id;
                postsPage(this.listQuery).then(response => {
                    this.page = response.data.data
                    const data= response.data;
                    console.log(data,'888')
                    this.page.total = response.data.totalCount
                    this.listLoading = false
                    if(this.listQuery.isLabel==false){
                        this.listQuery.isLabel='职务'
                    }else {
                        this.listQuery.isLabel='标签'
                    }
                    this.listQuery.isLabel=''
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
                addCourse(this.details).then(response => {
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
            updateName(form) {
                updatePost(this.details).then(response => {
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
                addCourse().then(response => {
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
                console.log(val,'val')
                this.listQuery.page = val
                this.getList()
            },
            handleSizeChange(val) {
                console.log(val,'val')
                this.listQuery.pageSize = val
                this.$forceUpdate();
                this.getList()
            },
            handleCreate() {
                this.resetForm()
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
                // first().then(response => {
                //     console.log(response,'first')
                //     this.first=response.data
                //     this.listLoading = false
                // })
                // getByParent({
                //     parentId:'355'
                // }).then(response => {
                //     console.log(response,'getByParent')
                //     this.listLoading = false
                // })
            },
            saveRole(formName) {
                this.form.orgId=this.id;
                const set = this.$refs
                this.form.menuId = this.listQuery.menuId
                set[formName].validate(valid => {
                    if (valid) {
                        insertPost(this.form).then(response => {
                            if (response.code === 200) {
                                this.dialogFormVisible = false
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
                this.formPaySucceed.postId = row.id;
                // updatePost(this.formPaySucceed).then(response => {
                //     // var evidences=response.data.evidences;
                //     // this.details=response.data;
                //     // var str1=evidences.split(",")
                //     // _this.details.list=str1;
                //     this.details=response.data;
                //
                //     console.log( this.details,'abcd')
                //
                // })

                this.dialogFormEdit = true
                this.details.labelName=row.postName;
                this.details.description=row.description;
                this.details.labelId = row.id;
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
            removeList(row) {
                this.$confirm('确认删除该类型？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
                ).then(() => {
                    console.log(row.id)
                    deletePost({
                        id:row.id,
                    }).then(response => {
                        this.$notify({
                            title: '成功',
                            message: '成功',
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
                    changeStatus({
                        courseId:row.id,
                        status:2,
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
                    changeStatus({
                        courseId:row.id,
                        status:1,
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
                this.$confirm('确认解除禁售该类型？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(row.id)
                    changeStatus({
                        courseId:row.id,
                        status:4,
                    }).then(response => {
                        this.$notify({
                            title: '成功',
                            message: '成功',
                            duration: 2000
                        })
                        this.getList()
                    })
                })
            },
        }
    }
</script>


