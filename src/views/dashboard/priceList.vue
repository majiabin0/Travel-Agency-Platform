<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button-group>
        <el-button type="primary" icon="plus" @click="handleCreate">添加</el-button>
      </el-button-group>
    </div>
    <el-table :data="page" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column align="center" label="价格id" width="120">
        <template scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column align="center" label="课时类型" width="200">
        <template scope="scope">{{scope.row.classTimeType}}</template>
      </el-table-column>
      <el-table-column align="center" label="价格名" width="180">
        <template scope="scope">{{scope.row.classTimeName}}</template>
      </el-table-column>
      <el-table-column align="center" label="原价" width="100">
        <template scope="scope">{{scope.row.originalPrice}}</template>
      </el-table-column>
      <el-table-column align="center" label="现价" width="100">
        <template scope="scope">{{scope.row.currentPrice}}</template>
      </el-table-column>
      <el-table-column align="center" label="价格状态" width="100">
        <template scope="scope">{{scope.row.priceStatus}}</template>
      </el-table-column>
      <el-table-column align="center" label="课次数" width="100">
        <template scope="scope">{{scope.row.classTimeCount}}</template>
      </el-table-column>
      <el-table-column align="center" label="价格版本" width="100">
        <template scope="scope">{{scope.row.priceVersion}}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template scope="scope">
          <el-button type="primary" @click="userList(scope.row)" size="mini" style="margin-bottom: 5px">查看详情</el-button>
          <el-button type="primary" icon="edit" @click="handleEdit(scope.row)" size="mini">编辑</el-button>
          <el-button type="danger" icon="delete" @click="removeUser(scope.row)" size="mini">删除</el-button>
          <el-button type="danger" icon="delete" @click="putAway(scope.row)" size="mini">上架</el-button>
          <el-button type="danger" icon="delete" @click="soldOut(scope.row)" size="mini">下架</el-button>
          <el-button type="danger" icon="delete" @click="establish(scope.row)" size="mini">新建</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="paging-container">
      <el-pagination :total="page.total" :current-page.sync="listQuery.page" :page-size="listQuery.pageSize" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, jumper" @size-change="handleSizeChange"></el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules" label-width="100px">
        <el-form-item label="课程类型id">
          <el-select v-model="form.courseId.classTimeType" placeholder="请选择" @change="tryIt">
            <el-option
              v-for="item in form.courseId"
              :key="item.id"
              :label="item.classTimeType"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="课程id">-->
<!--          <el-input v-model="form.classTimeId" placeholder="请输入课程名称"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="课程类型名称">
          <el-input v-model="form.classTimeName" placeholder="请输入课程类型名称"></el-input>
        </el-form-item>
        <el-form-item label="原价">
          <el-input v-model="form.originalPrice" placeholder="请输入原价"></el-input>
        </el-form-item>
        <el-form-item label="现价">
          <el-input v-model="form.currentPrice" placeholder="请输入现价"></el-input>
        </el-form-item>
        <el-form-item label="课次数">
          <el-input v-model="form.classTimeCount" placeholder="请输入课次数"></el-input>
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
        <el-form-item label="课时类型" >
          <el-input v-model="details.classTimeType"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="价格名" >
          <el-input v-model="details.classTimeName"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="原价" >
          <el-input v-model="details.originalPrice" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="现价">
          <el-input v-model="details.currentPrice"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="价格状态">
          <el-input v-model="details.priceStatus"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="课次数">
          <el-input v-model="details.classTimeCount"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="价格版本">
          <el-input v-model="details.priceVersion"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="details.createTime"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-input v-model="details.activeEndTime"  readonly="readonly"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :title="userTitle2" :visible.sync="dialogFormEdit" width="60%" @opened="roleUsersOpen">
      <!--      <role-user :roleId="roleId" ref="roleUser"></role-user>-->
      <el-form :model="details" ref="details" :rules="rules" label-width="100px">
        <el-form-item label="课程id" >
          <el-input v-model="details.id"  ></el-input>
        </el-form-item>
        <el-form-item label="课时类型" >
          <el-input v-model="details.classTimeType" ></el-input>
        </el-form-item>
        <el-form-item label="价格名"  >
          <el-input v-model="details.classTimeName" ></el-input>
        </el-form-item>
        <el-form-item label="原价">
          <el-input v-model="details.originalPrice" ></el-input>
        </el-form-item>
        <el-form-item label="现价">
          <el-input v-model="details.currentPrice"  ></el-input>
        </el-form-item>
        <el-form-item label="价格状态">
          <el-input v-model="details.priceStatus"  ></el-input>
        </el-form-item>
        <el-form-item label="课次数">
          <el-input v-model="details.classTimeCount" ></el-input>
        </el-form-item>
        <el-form-item label="价格版本" >
          <el-input v-model="details.priceVersion" ></el-input>
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
    import { page, detail, updateRole, addCoursePrice, getCourseTypeList, deleteCoursePrice, onSale, haltSale, forbidSale} from '@/api/admin/priceList'
    export default {
        name: 'priceList',
        components: {
            // 'role-user': () => import('./components/roleUser.vue'),
            // 'role-resource': () => import('./components/roleResource.vue')
        },
        data() {
            return {
                dialogFormEdit:false,
                checkedCities:[],
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
                    courseId:'',
                    page: 1,
                    pageSize: 10
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
                    courseId:''
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
            tryIt (e){
                console.log(e)
            },
            getList() {
                this.listQuery.courseId=this.$route.query.courseId;
                this.form.courseId=this.$route.query.courseId;
                console.log(this.listQuery.courseId)
                this.listLoading = true
                page(this.listQuery).then(response => {
                    this.page = response.data;
                    const data= response.data;
                    this.page.total = response.data.totalCount;
                    for(let i=0;i<data.length;i++){
                        this.form.classTimeId=data[i].id
                    }
                    console.log( this.form.classTimeId)
                    for(let i=0;i<data.length;i++){
                        if(data[i].serviceType=='1'){
                            data[i].serviceType='退款';
                        }else if(data[i].serviceType=='2'){
                            data[i].serviceType='其他';
                        }
                    }
                    for(let i=0;i<data.length;i++){
                        if(data[i].priceStatus=='-1'){
                            data[i].priceStatus='删除';
                        }else if(data[i].priceStatus=='0'){
                            data[i].priceStatus='新建';
                        }else if(data[i].priceStatus=='1'){
                            data[i].priceStatus='下架';
                        }else if(data[i].priceStatus=='2'){
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
                this.formPaySucceed.id = row.id;
                detail(this.formPaySucceed).then(response => {
                    this.details=response.data;
                        if( this.details.priceStatus=='-1'){
                            this.details.priceStatus='删除';
                        }else if( this.details.priceStatus=='0'){
                            this.details.priceStatus='新建';
                        }else if( this.details.priceStatus=='1'){
                            this.details.priceStatus='下架';
                        }else if( this.details.priceStatus=='2'){
                            this.details.courseStatus='上架';
                        }
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

            },
            saveRole(formName) {
                const set = this.$refs
                this.form.menuId = this.listQuery.menuId
                set[formName].validate(valid => {
                    if (valid) {
                        addCoursePrice(
                            {
                                classTimeName:this.form.classTimeName,
                                originalPrice:this.form.originalPrice,
                                currentPrice:this.form.currentPrice,
                                classTimeCount:this.form.classTimeCount,
                                courseId:this.$route.query.courseId,
                                classTimeId:this.form.courseId.classTimeType,


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
                this.formPaySucceed.id = row.id;
                detail(this.formPaySucceed).then(response => {
                    this.details=response.data;
                    if( this.details.priceStatus=='-1'){
                        this.details.priceStatus='删除';
                    }else if( this.details.priceStatus=='0'){
                        this.details.priceStatus='新建';
                    }else if( this.details.priceStatus=='1'){
                        this.details.priceStatus='下架';
                    }else if( this.details.priceStatus=='2'){
                        this.details.courseStatus='上架';
                    }
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

