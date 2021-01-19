<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
    </div>
    <el-table :data="page.data" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <!--      <el-table-column align="center" label="角色名称" width="120">-->
      <!--        <template scope="scope">{{scope.row.name}}</template>-->
      <!--      </el-table-column>-->
      <el-table-column align="center" label="ID" width="120">
        <template scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column align="center" label="来源" width="100">
        <template scope="scope">{{scope.row.source}}</template>
      </el-table-column>
      <el-table-column align="center" label="关闭原因" width="120">
        <template scope="scope">{{scope.row.cancelReason}}</template>
      </el-table-column>
      <el-table-column align="center" label="备注" width="120">
        <template scope="scope">{{scope.row.orderNotes}}</template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="100">
        <template scope="scope">{{scope.row.status}}</template>
      </el-table-column>
      <el-table-column align="center" label="支付渠道" width="100">
        <template scope="scope">{{scope.row.payChannel}}</template>
      </el-table-column>
      <el-table-column align="center" label="支付方式" width="100">
        <template scope="scope">{{scope.row.payType}}</template>
      </el-table-column>
      <el-table-column align="center" label="支付状态" width="100">
        <template scope="scope">{{scope.row.paymentStatus}}</template>
      </el-table-column>

      <el-table-column align="center" label="实际支付" width="100">
        <template scope="scope">{{scope.row.realPay}}</template>
      </el-table-column>
      <el-table-column align="center" label="支付总金额" width="100">
        <template scope="scope">{{scope.row.totalPay}}</template>
      </el-table-column>
      <el-table-column align="center" label="订单上课人ID" width="180">
        <template scope="scope">{{scope.row.accepterId}}</template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="350">
        <template scope="scope">
          <el-button type="primary" @click="userList(scope.row)" size="mini">查看</el-button>
          <el-button type="primary" icon="edit" @click="handleUpdate(scope.row)" size="mini">编辑</el-button>
          <el-button type="primary" icon="edit"  @click="handlePay(scope.row)" size="mini">锁定订单</el-button>
          <el-button type="primary" icon="edit" @click="handleSucceed(scope.row)" size="mini">支付成功</el-button>
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
        <el-form-item label="备注">
          <el-input v-model="form.orderNotes" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item label="实际支付">
          <el-input v-model="form.realPay" placeholder="请输入实际支付"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取消</el-button>
        <el-button v-if="dialogStatus == 'create'" @click="saveRole('form')" type="primary">确定</el-button>
        <el-button v-else @click="updateRole('form')" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormPay">
      <el-form :model="formPay"  :rules="rules" label-width="100px">
        <!--        <el-form-item label="支付渠道">-->
        <!--          <el-input v-model="details.payChannel" placeholder="请输入支付渠道"></el-input>-->
        <!--        </el-form-item>-->
        <el-radio v-model="formPay.payChannel" label="wxpay">微信</el-radio>
        <el-radio v-model="formPay.payChannel" label="alipay">支付宝</el-radio>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelPay('form')">取消</el-button>
        <el-button v-if="dialogStatus == 'create'" @click="saveRole('form')" type="primary">确定</el-button>
        <el-button v-else @click="updatePay('form')" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog  :visible.sync="dialogFormSucceed">
      <el-form :model="formPaySucceed"  :rules="rules" label-width="100px">

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
          <el-input v-model="details.cancelReason" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="details.orderNotes" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="details.status"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="支付渠道">
          <el-input v-model="details.payChannel"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="支付方式">
          <el-input v-model="details.payType"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="支付状态">
          <el-input v-model="details.paymentStatus"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="实际支付">
          <el-input v-model="details.realPay"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="支付总金额">
          <el-input v-model="details.totalPay"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="订单上课人ID">
          <el-input v-model="details.accepterId"  readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="list">
          <!--          <el-input v-model="details.list" placeholder="请输入订单上课人ID" readonly="readonly"></el-input>-->
          <div v-for='item in details.list' >
            <div>列表：{{item.courseName}}</div>
            <div v-for="value in item.relationVos">

              <span placeholder="请输入订单上课人ID" readonly="readonly">课程名：{{value.courseName}}</span>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :title="resourcesTitle"  :visible.sync="dialogResourceVisible" @opened="roleResourceData">
      <role-resource ref="roleResouce"></role-resource>
      <div slot="footer" class="dialog-footer">
        <!--        <el-form-item label="订单上课人ID">-->
        <!--          <el-input v-model="details.accepterId" placeholder="请输入订单上课人ID" readonly="readonly"></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item label="list">
          <!--          <el-input v-model="details.list" placeholder="请输入订单上课人ID" readonly="readonly"></el-input>-->
          <div v-for='item in details.list' >
            <span>{{item.courseName}}</span>
          </div>
        </el-form-item>
        <el-button @click="dialogResourceVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleResources">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
    import { page, orderId, updateRole, orgLockOrder, orgPaySuccess, getOrgServiceOrderById } from '@/api/admin/refund'
    export default {
        name: 'refund',
        components: {
            // 'role-user': () => import('./components/roleUser.vue'),
            // 'role-resource': () => import('./components/roleResource.vue')
        },
        data() {
            return {
                id:'',
                payType:'',
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
                dialogFormPay:false,
                dialogFormSucceed:false,
                dialogVisible: false,
                dialogStatus: '',
                dialogFormVisible: false,
                dialogResourceVisible: false,
                textMap: {
                    update: '编辑',
                    create: '创建',
                    payChannel:'请选择支付渠道'
                },
                form: {
                    // paymentStatus: undefined,
                    // payType: undefined,
                    orderId:'',
                    realPay:'',
                    orderNotes:''
                },
                formPay:{
                    orderId:'',
                    payChannel:'wxpay',
                },
                formPaySucceed: {
                    orderId:'',
                },
                details: {
                    list:''
                },
                rules: {
                    roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
                    description: [{ required: true, message: '请选择角色类型', trigger: 'blur' }]
                },
                roleId: undefined,
                userTitle: undefined,
                resourcesTitle: undefined
            }
        },
        created() {
            this.getList();

        },
        methods: {

            getList() {
                let _this=this
                this.listLoading = true
                page(this.listQuery).then(response => {
                    console.log(response,'888')
                    this.page = response.data
                    // this.payType==
                    const data= response.data.data
                    this.page.total = response.data.totalCount
                    this.listLoading = false;
                    for(let i=0;i<data.length;i++){
                        if(data[i].payType=='1'){
                            data[i].payType='线上支付';
                            _this.payType="false"
                        }else if(data[i].payType=='2'){
                            data[i].payType='线下支付';
                            _this.payType="true"
                        }else if(data[i].payType=='3'){
                            data[i].payType='银联';
                        }else if(data[i].paymentStatus=='1'){
                            data[i].paymentStatus='待支付';
                        }else if(data[i].paymentStatus=='2'){
                            data[i].paymentStatus='已支付';
                        }
                    }
                    for(let i=0;i<data.length;i++){
                        if(data[i].paymentStatus=='1'){
                            data[i].paymentStatus='新建,待支付';
                        }else if(data[i].paymentStatus=='2'){
                            data[i].paymentStatus='支付中,订单锁定';
                        }else if(data[i].paymentStatus=='3'){
                            data[i].paymentStatus='支付成功';
                        }else if(data[i].paymentStatus=='4'){
                            data[i].paymentStatus='支付失败';
                        }else if(data[i].paymentStatus=='5'){
                            data[i].paymentStatus='订单过期';
                        }else if(data[i].paymentStatus=='-1'){
                            data[i].paymentStatus='删除';
                        }else if(data[i].paymentStatus=='0'){
                            data[i].paymentStatus='订单取消 订单关闭';
                        }
                    }
                    for(let i=0;i<data.length;i++){
                        if(data[i].status=='1'){
                            data[i].status='新建,待支付';
                        }else if(data[i].status=='2'){
                            data[i].status='支付中,订单锁定';
                        }else if(data[i].status=='3'){
                            data[i].status='支付成功';
                        }else if(data[i].status=='4'){
                            data[i].status='支付失败';
                        }else if(data[i].status=='5'){
                            data[i].status='订单过期';
                        }else if(data[i].status=='-1'){
                            data[i].status='删除';
                        }else if(data[i].status=='0'){
                            data[i].status='订单取消 订单关闭';
                        }
                    }
                    for(let i=0;i<data.length;i++){
                        if(data[i].source=='1'){
                            data[i].source='机构';
                        }else if(data[i].source=='2'){
                            data[i].source='学生端';
                        }
                    }
                    for(let i=0;i<data.length;i++){
                        if(data[i].payChannel=='alipay'){
                            data[i].payChannel='支付宝';
                        }else if(data[i].payChannel=='wxpay'){
                            data[i].payChannel='微信';
                        }
                    }
                    console.log(_this.payType,'556')
                })
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
                this.form.orderId = row.id

                this.form.orderNotes = row.orderNotes
                this.form.realPay = row.realPay
                this.dialogStatus = 'update'
                this.dialogFormVisible = true
            },
            handleSucceed(row) {
                this.formPaySucceed.orderId = row.id

                this.dialogFormSucceed = true
            },
            handlePay (row){
                //  if(this.formPay.payChannel=='alipay'){
                //     this.formPay.payChannel='支付宝'
                // }else {
                //     this.formPay.payChannel='微信'
                // }
                this.dialogStatus = 'payChannel'
                this.dialogFormPay = true
                this.formPay.orderId = row.id;
                this.formPay.payChannel = row.payChannel
            },
            updateRole(form) {
                updateRole(this.form).then(response => {
                    console.log(response,'555')
                    if (response.code === 200) {
                        this.dialogFormVisible = false
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
                orgLockOrder(this.formPay).then(response => {
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
            updatePaySucceed(form) {
                orgPaySuccess(this.formPaySucceed).then(response => {
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
                this.form.orderId = row.id
                orderId(this.form).then(response => {
                    console.log(response)
                    this.details.list=response.data.list
                    this.details=response.data;
                    if(this.details.status=='0'){
                        this.details.status='订单取消 订单关闭';
                    }
                    else if(this.details.status=='-1'){
                        this.details.status='删除';
                    }
                    else if(this.details.status=='1'){
                        this.details.status='新建,待支付';
                    }
                    else if(this.details.status=='2'){
                        this.details.status='支付中,订单锁定';
                    }
                    else if(this.details.status=='3'){
                        this.details.status='支付成功';
                    }
                    else if(this.details.status=='4'){
                        this.details.status='支付失败';
                    }

                        if(this.details.payType=='1'){
                            this.details.payType='线上支付';
                        }else if(this.details.payType=='2'){
                            this.details.payType='线下支付';
                        }else if(this.details.payType=='3'){
                            this.details.payType='银联';
                        }else if(this.details.paymentStatus=='1'){
                            this.details.paymentStatus='待支付';
                        }else if(this.details.paymentStatus=='2'){
                            this.details.paymentStatus='已支付';
                        }


                        if(this.details.paymentStatus=='1'){
                            this.details.paymentStatus='新建,待支付';
                        }else if(this.details.paymentStatus=='2'){
                            this.details.paymentStatus='支付中,订单锁定';
                        }else if(this.details.paymentStatus=='3'){
                            this.details.paymentStatus='支付成功';
                        }else if(this.details.paymentStatus=='4'){
                            this.details.paymentStatus='支付失败';
                        }else if(this.details.paymentStatus=='5'){
                            this.details.paymentStatus='订单过期';
                        }else if(this.details.paymentStatus=='-1'){
                            this.details.paymentStatus='删除';
                        }else if(this.details.paymentStatus=='0'){
                            this.details.paymentStatus='订单取消 订单关闭';
                        }

                        if(this.details.source=='1'){
                            this.details.source='机构';
                        }else if(this.details.source=='2'){
                            this.details.source='学生端';
                        }


                        if(this.details.payChannel=='alipay'){
                            this.details.payChannel='支付宝';
                        }else if(this.details.payChannel=='wxpay'){
                            this.details.payChannel='微信';
                        }

                })
                this.dialogVisible = true
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
            roleResourceData() {
                this.$refs.roleResouce.roleId = this.roleId
                this.$refs.roleResouce.roleResourceData()
            },
        }
    }
</script>

