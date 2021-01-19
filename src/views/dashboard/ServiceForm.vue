<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">

    </div>
    <el-table :data="page.data" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column align="center" label="服务单id" width="120">
        <template scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column align="center" label="服务单号" width="200">
        <template scope="scope">{{scope.row.serviceNo}}</template>
      </el-table-column>
      <el-table-column align="center" label="订单id" width="180">
        <template scope="scope">{{scope.row.orderId}}</template>
      </el-table-column>
      <el-table-column align="center" label="服务单状态" width="100">
        <template scope="scope">{{scope.row.status}}</template>
      </el-table-column>
      <el-table-column align="center" label="类型" width="100">
        <template scope="scope">{{scope.row.serviceType}}</template>
      </el-table-column>
      <el-table-column align="center" label="退款方式" width="100">
        <template scope="scope">{{scope.row.refundType}}</template>
      </el-table-column>
      <el-table-column align="center" label="退款课程数量" width="100">
        <template scope="scope">{{scope.row.refundCourseAmount}}</template>
      </el-table-column>
      <el-table-column align="center" label="退款金额" width="100">
        <template scope="scope">{{scope.row.refundMoney}}</template>
      </el-table-column>
      <el-table-column align="center" label="退款原因类型" width="100">
        <template scope="scope">{{scope.row.refundReasonType}}</template>
      </el-table-column>
      <el-table-column align="center" label="机构操作结果" width="100">
        <template scope="scope">{{scope.row.orgOptionResult}}</template>
      </el-table-column>
      <el-table-column align="center" label="机构操作备注" width="100">
        <template scope="scope">{{scope.row.orgOptionRemark}}</template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="300">
        <template scope="scope">
          <el-button type="primary" @click="userList(scope.row)">查看详情</el-button>
          <el-button type="primary" icon="edit" @click="handleConsent (scope.row)">同意</el-button>
          <el-button type="primary" icon="edit" @click="handleRefuse(scope.row)">拒绝</el-button>
          <!--          <el-button type="primary" icon="edit" @click="handleLoadRoleGranted(scope.row)">分配资源</el-button>-->
          <!--          <el-button type="danger" icon="delete" @click="removRole(scope.row)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="paging-container">
      <el-pagination :total="page.total" :current-page.sync="listQuery.page" :page-size="listQuery.pageSize" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, jumper" @size-change="handleSizeChange"></el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules" label-width="100px">
        <el-form-item label="角色名称">
          <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.gender" placeholder="请输入性别"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="form.idNo" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-input v-model="form.birthday" placeholder="请输入生日"></el-input>
        </el-form-item>
        <el-form-item label="监护人手机号">
          <el-input v-model="form.urgentPhone" placeholder="请输入监护人手机号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取消</el-button>
        <el-button v-if="dialogStatus == 'create'" @click="saveRole('form')" type="primary">确定</el-button>
        <el-button v-else @click="updateRole('form')" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormPay">
      <el-form :model="formRefuse" ref="form" :rules="rules" label-width="100px">
        <el-form-item label="拒绝原因">
          <el-input v-model="formRefuse.refuseReason" placeholder="请输入拒绝原因"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelPay('form')">取消</el-button>
        <el-button v-if="dialogStatus == 'create'" @click="saveRole('form')" type="primary">确定</el-button>
        <el-button v-else @click="updatePay('form')" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog  :visible.sync="dialogFormSucceed">
      <el-form :model="formPaySucceed"  :rules="rules" label-width="100px">
        <div style="    font-size: 18px;margin-left: 50px;">确定同意吗？</div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelPaySucceed('form')">取消</el-button>
        <el-button v-if="dialogStatus == 'create'" @click="saveRole('form')" type="primary">确定</el-button>
        <el-button v-else @click="updatePaySucceed('form')" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="userTitle" :visible.sync="dialogVisible" width="60%" @opened="roleUsersOpen">
      <!--      <role-user :roleId="roleId" ref="roleUser"></role-user>-->
      <el-form :model="details" ref="details" :rules="rules" label-width="100px">
        <el-form-item label="ID">
          <el-input v-model="details.id"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="来源">
          <el-input v-model="details.source"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="关闭原因">
          <el-input v-model="details.serviceNo"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="details.orderId" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="details.status"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="支付渠道">
          <el-input v-model="details.serviceType"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="支付方式">
          <el-input v-model="details.refundType"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="支付状态">
          <el-input v-model="details.refundCourseAmount"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="实际支付">
          <el-input v-model="details.refundMoney"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="支付总金额">
          <el-input v-model="details.refundReasonType"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="订单上课人ID">
          <el-input v-model="details.orgOptionResult"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="订单上课人ID">
          <el-input v-model="details.orgOptionRemark"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <div v-for='item in details.list' >
            <img :src="item"style="width: 300px;height: 300px">
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
    import { page, refuseServiceOrder, consentServiceOrder, getOrgServiceOrderById } from '@/api/admin/ServiceForm'
    export default {
        name: 'studentList',
        components: {
            // 'role-user': () => import('./components/roleUser.vue'),
            // 'role-resource': () => import('./components/roleResource.vue')
        },
        data() {
            return {
                id:'',
                filterText: '',
                listLoading: true,
                page: {
                    total: 0,
                    pageSizes: [10, 20, 30, 50],
                    totalPage: 0,
                    data: []
                },
                listQuery: {
                    roleName: undefined,
                    page: 1,
                    pageSize: 10
                },
                details: {
                    list:''
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
                    id:undefined
                },
                formRefuse:{
                    refuseReason: undefined,
                    serviceOrderId: undefined,
                },
                formPaySucceed: {
                    serviceOrderId:'',
                },
                rules: {
                    refuseReason: [{ required: true, message: '请输入拒绝原因', trigger: 'blur' }],
                    description: [{ required: true, message: '请选择角色类型', trigger: 'blur' }]
                },
                roleId: undefined,
                userTitle: undefined,
                resourcesTitle: undefined
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = true
                page(this.listQuery).then(response => {
                    this.page = response.data
                    const data= response.data.data;
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
                        if(data[i].status=='1'){
                            data[i].status='新建,待支付';
                        }else if(data[i].status=='2'){
                            data[i].status='机构拒绝';
                        }else if(data[i].status=='3'){
                            data[i].status='机构审核通过';
                        }else if(data[i].status=='4'){
                            data[i].status='退款成功,完成';
                        }else if(data[i].status=='5'){
                            data[i].status='用户撤回申请';
                        }else if(data[i].status=='6'){
                            data[i].status='退款中';
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
                let _this=this;
                // this.roleId = row.id
                // this.userTitle = row.roleName + '用户'
                this.formPaySucceed.serviceOrderId = row.id
                getOrgServiceOrderById(this.formPaySucceed).then(response => {
                    var evidences=response.data.evidences;
                    this.details=response.data;
                    var str1=evidences.split(",")
                    _this.details.list=str1;

                    console.log(_this.details.list,'abcd')

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

                this.form.phone = row.phone
                this.form.name = row.name
                this.form.roleType = row.roleType
                this.form.idNo = row.idNo
                this.form.urgentPhone = row.urgentPhone
                this.form.gender = row.gender
                this.form.birthday = row.birthday
                this.form.id =
                    this.dialogStatus = 'update'
                this.dialogFormVisible = true
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
            }
        }
    }
</script>


