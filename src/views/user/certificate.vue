<template>
  <div class="app-container calendar-list-container">
    <div style="text-align: center;    margin: 40px;font-size: 20px;margin-left: 0">机构证件</div>
    <el-form
      label-position="left"
      label-width="110px"
      :model="certificate"
      :rules="rules"
      ref="formRegister"style="    margin-left: 25%;">
      <el-form-item label="联系人">
        <el-input  v-model="certificate.contactsName" placeholder="请输入联系人"style="width: 530px;" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="联系人手机号">
        <el-input  v-model="certificate.contactsPhone" placeholder="请输入联系人"style="width: 530px;" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="法人姓名" prop="name">
        <el-input  v-model="certificate.legalPersonName" placeholder="请输入法人姓名"style="width: 530px;" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="name">
        <el-input  v-model="certificate.companyName"style="width: 530px;"  readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="社会统一信用代码" prop="name">
        <el-input  v-model="certificate.businessLicenseNumber" readonly="readonly"style="width: 530px;"></el-input>
      </el-form-item>
      <el-form-item label="学校法人身份证" prop="name">
        <el-input  v-model="certificate.urgentPhone" readonly="readonly"style="width: 530px;"></el-input>
      </el-form-item>
      <!--            <button @click=closeCode>-->
      <!--              关闭倒计时-->
      <!--            </button>-->
      <!--            <el-input v-model="formRegister.msgCode"></el-input>-->
      <el-form-item label="营业执照">
      <img :src="certificate.businessLicenseImg" style="width: 200px;height: 200px"></img>
    </el-form-item>
      <el-form-item label="服务许可证">
        <img :src="certificate.serviceLicenseImg" style="width: 200px;height: 200px"></img>
      </el-form-item>
      <el-form-item label="学校照片图片">
        <span v-for="item in certificate.schoolImg">
          <img :src="item" style="width: 200px;height: 200px;margin-right: 25px"></img>
        </span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addUser">提交</el-button>
        <!--            <router-link to="/login">-->
        <el-button @click="backLogin">取消</el-button>
        <el-button @click="modification">修改</el-button>

      </el-form-item>
    </el-form>
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
    <el-dialog :title="userTitle" :visible.sync="dialogVisible" width="60%" @opened="roleUsersOpen">
      <role-user :roleId="roleId" ref="roleUser"></role-user>
    </el-dialog>
    <el-dialog :title="resourcesTitle"  :visible.sync="dialogResourceVisible" @opened="roleResourceData">
      <role-resource ref="roleResouce"></role-resource>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogResourceVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleResources">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
    import { page, updateRole, addStudent } from '@/api/admin/certificate'
    export default {
        name: 'certificate',
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
                certificate:{

                },
                listQuery: {
                    id: undefined,
                    page: 1,
                    pageSize: 10
                },
                dialogVisible: false,
                dialogStatus: '',
                dialogFormVisible: false,
                dialogResourceVisible: false,
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
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = true;
                var orgId=localStorage.getItem('organization')
                var NumberOrgId= JSON.parse(orgId);
                this.listQuery.id=NumberOrgId
                console.log('8888')
                page(this.listQuery).then(response => {
                    console.log(response,'888')
                    this.certificate = response.data
                    console.log(this.certificate.schoolImg,'data')
                    let schoolImg=this.certificate.schoolImg
                    let certificate=schoolImg.join('')
                    let img=certificate.split(",")
                    console.log(certificate,'schoolImg')
                    // const data= response.data
                    // this.page.total = response.data.totalCount
                    // for(let i=0;i<data.length;i++){
                    //     if(data[i].gender){
                    //         data[i].gender='男'
                    //     }else {
                    //         data[i].gender='女'
                    //     }
                    // }
                    this.listLoading = false
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
            updateRole(formName) {
                let _this=this;
                const set = this.$refs
                this.form.menuId = this.menuId;
                console.log(_this.form.gender)
                if(_this.form.gender=='男'){
                    _this.form.gender='1'
                }else {
                    _this.form.gender='0'
                }
                set[formName].validate(valid => {
                    if (valid) {
                        updateRole(this.form).then(response => {
                            if (response.code === 200) {
                                this.dialogFormVisible = false
                                this.getList()
                                this.$notify({
                                    title: '成功',
                                    message: '角色修改成功',
                                    duration: 2000
                                })
                            }
                            this.getList()
                        })
                    }
                })
            },
            // removRole(row) {
            //     this.$confirm('确认删除该类型？', '提示', {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //         type: 'warning'
            //     }).then(() => {
            //         removRole(row.id).then(response => {
            //             this.$notify({
            //                 title: '成功',
            //                 message: '删除成功',
            //                 duration: 2000
            //             })
            //             this.getList()
            //         })
            //     })
            // },
            // userList(row) {
            //     this.roleId = row.id
            //     this.userTitle = row.roleName + '用户'
            //     this.dialogVisible = true
            // },
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

