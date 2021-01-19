<template>
  <div class="app-container calendar-list-container">
    <div>反馈成功</div>

  </div>
</template>
<script>
    import { page, updateRole, addStudent } from '@/api/admin/feedback'
    export default {
        name: 'feedback',
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
                    content: '8',
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
                this.listLoading = true
                page(this.listQuery).then(response => {
                    console.log(response,'888')
                    this.page = response.data
                    const data= response.data
                    this.page.total = response.data.totalCount
                    for(let i=0;i<data.length;i++){
                        if(data[i].gender){
                            data[i].gender='男'
                        }else {
                            data[i].gender='女'
                        }
                    }
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


