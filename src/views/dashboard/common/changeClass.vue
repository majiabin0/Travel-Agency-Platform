<template>
  <div>
    <div style="text-align: center;font-size: 19px;margin: 30px 0">转班</div>
    <el-radio-group v-model="newClassName" @change="changeRole" style="width: 600px;margin-left: 30%">
      <el-radio v-for="(item,index) in adminList" :key="item.id" :label="item.id" style="margin-right: 200px;margin-bottom: 10px">{{item.courseName}}</el-radio>
      <div @click="adminRolesChange"style="width: 600px;margin-left: 30%"><el-button>下一步</el-button></div>
    </el-radio-group>

  <el-dialog title="转班" :visible.sync="dialogFormVisible">
    <el-form :model="classGetList" ref="form" :rules="rules" label-width="100px">
      <el-form-item label="当前班级">
        <el-input v-model="classGetList.className" placeholder="请输入班级名称"  readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="剩余课时">
        <el-input v-model="classGetList.classTimes" placeholder="请输入课程名"  readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="新班级">
        <el-input v-model="classGetList.newClassName" placeholder="请输入班级名称"  readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="课时数">
        <el-input v-model="newClassTimes" placeholder="请输入课时数"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel('form')">取消</el-button>
      <el-button v-if="dialogStatus == 'create'" @click="saveRole('form')" type="primary">确定</el-button>
      <el-button v-else @click="updateRole('form')" type="primary">确定</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
    import {getClassByStuId,stuClassInfo,changeClass} from '@/api/dashboard/studentList'
    export default {
        name: "changeClass",
        data(){
            return{
                adminList:{

                },
                classGetList:{
                    newClassName:'',
                    newClassTimes:''
                },
                newClassTimes:'',
                newClassName:'',
                dialogFormVisible:false,
            }
        },
        created() {
            this.getList()
        },
        methods:{
            changeRole(e){
              console.log(e,'e')
            },
            getList(){
                getClassByStuId({
                    stuId:this.$route.query.studentId,
                    isNotIn:1
                }).then(response => {
                    console.log(response,'getClassByStuId')
                    let data=response.data;
                    this.adminList=data;
                    console.log( this.adminList,'adminList')
                })
            },
            adminRolesChange(){
                this.dialogFormVisible=true;
                // console.log(this.courseName,'courseName')
                this.classGetList.newClassName=this.newClassName
                stuClassInfo({
                    stuId:this.$route.query.studentId,
                    classId:this.$route.query.classId
                }).then(response => {
                    console.log(response,'getClassByStuId')
                    let data=response.data;
                    this.classGetList=data
                    this.classGetList.newClassName=this.newClassName
                    console.log( this.classGetList,'classGetList')
                })
            },
            updateRole(){
                changeClass({
                    stuId:this.$route.query.studentId,
                    oldClassId:this.$route.query.classId,
                    newClassId:this.newClassName,
                    classTimes:this.newClassTimes
                }).then(response => {
                    console.log(response,'getClassByStuId')
                    let data=response.data;
                    this.$notify({
                        title: '成功',
                        message: '转班成功',
                        duration: 2000
                    })
                    console.log( data,'data')
                })
                this.$router.push({
                    path:'student/classList',
                })
                this.dialogFormVisible=false;
            },
            cancel(){
                this.dialogFormVisible=false;
            }
        }
    }
</script>

<style scoped>

</style>
