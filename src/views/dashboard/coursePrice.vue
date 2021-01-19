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
        <el-button type="primary" icon="plus" @click="handleCreate" style="margin-right: 20px">新建课程</el-button>
        <el-button type="primary" icon="plus" @click="handleAllocation">分配课程</el-button>
      </el-button-group>
    </div>
    <el-table :data="page" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column align="center" label="课程id" width="250">
        <template scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column align="center" label="课程名" width="200">
        <template scope="scope">{{scope.row.courseName}}</template>
      </el-table-column>
      <el-table-column align="center" label="副标题" width="150">
        <template scope="scope">{{scope.row.subheading}}</template>
      </el-table-column>
      <el-table-column align="center" label="课程状态" width="100">
        <template scope="scope">{{scope.row.courseStatus}}</template>
      </el-table-column>
      <el-table-column align="center" label="适合年龄段" width="100">
        <template scope="scope">{{scope.row.ageGrading}}</template>
      </el-table-column>
      <el-table-column align="center" label="是否支持退款" width="100">
        <template scope="scope">{{scope.row.supportRefund}}</template>
      </el-table-column>
      <el-table-column align="center" label="描述" width="150">
        <template scope="scope">{{scope.row.description}}</template>
      </el-table-column>
      <el-table-column align="center" label="介绍" width="180">
        <template scope="scope">{{scope.row.introduction}}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="350">
        <template scope="scope">
<!--          <el-button type="primary" @click="userList(scope.row)" size="mini" style="margin-bottom: 5px">查看详情</el-button>-->
<!--          <el-button type="primary" icon="edit" @click="handleEdit(scope.row)" size="mini">编辑</el-button>-->
          <!--          <el-button type="primary" icon="edit" @click="handleLoadRoleGranted(scope.row)">分配资源</el-button>-->
          <el-button type="primary" icon="delete" @click="putAway(scope.row)" size="mini">上架</el-button>
          <el-button type="danger" icon="delete" @click="soldOut(scope.row)" size="mini">下架</el-button>
          <el-button type="danger" icon="delete" @click="removeUser(scope.row)" size="mini">禁售</el-button>
          <el-button type="primary" icon="delete" @click="establish(scope.row)" size="mini">解除禁售</el-button>
<!--          <el-button type="primary" icon="edit" @click="handlePrice(scope.row)" size="mini">编辑价格</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="paging-container">
      <el-pagination :total="page.total" :current-page.sync="listQuery.page" :page-size="listQuery.pageSize" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, jumper" @size-change="handleSizeChange"></el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules" label-width="100px">
<!--        <el-form-item label="套餐类型">-->
<!--          <el-radio v-model="form.suite" label="0">单一</el-radio>-->
<!--          <el-radio v-model="form.suite" label="1">套餐</el-radio>-->
<!--          <el-radio v-model="form.suite" label="2">课程包</el-radio>-->
<!--        </el-form-item>-->
        <el-form-item label="课程名称">
          <el-input v-model="form.courseName" placeholder="请输入课程名称"></el-input>
        </el-form-item>
        <el-form-item label="课程类型编码">
          <div>
          <span v-for="item in first">
            <el-button size="small" type="primary"@click="firstItem(item)" style="margin-right: 10px">{{item.typeName}}</el-button>
          </span>
          </div>
          <div>
          <span v-for="value in getByParent">
            <el-button size="small" type="info"@click="getByParentItem(value)" style="margin-right: 10px">{{value.typeName}}</el-button>
          </span>
          </div>
          <div>
          <span v-for="val in three">
            <el-button size="small" @click="threeItem(val)" style="margin-right: 10px">{{val.typeName}}</el-button>
          </span>
          </div>
<!--          <div>{{form.courseTypeCode}}</div>-->
          <el-input v-model="form.courseTypeCode"  placeholder="请从上方按钮中选择" style="margin-top: 20px"></el-input>
        </el-form-item>
        <el-form-item label="课程类型名称">
          <el-input v-model="form.courseTypeName" placeholder="请输入类型名称"></el-input>
        </el-form-item>
        <el-form-item label="副标题">
          <el-input v-model="form.subheading" placeholder="请输入副标题"></el-input>
        </el-form-item>
        <el-form-item label="课程详情">
          <el-input v-model="form.description" placeholder="请输入课程详情"></el-input>
        </el-form-item>
        <el-form-item label="课程LOGO">
          <el-upload action="/api/oss/file/uploadFile" :show-file-list="true" :on-success="uplodaeSucess" :before-uploade="beforeUploade">
            <img v-if="form.courseLogo" :src="form.courseLogo" class="avatar">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
<!--          <el-input v-model="form.courseLogo" placeholder="请输入课程LOGO"></el-input>-->
        </el-form-item>
        <el-form-item label="课程封面">
          <el-upload action="/api/oss/file/uploadFile" :show-file-list="true" :on-success="uplodaeSucess1" :before-uploade="beforeUploade1">
            <img v-if="form.courseCovers" :src="form.courseCovers" class="avatar">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
<!--          <el-input v-model="form.courseCovers" placeholder="请输入课程封面"></el-input>-->
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
          <el-upload action="/api/oss/file/uploadFile" :show-file-list="true" :on-success="uplodaeSucess2" :before-uploade="beforeUploade2">
            <img v-if="form.videoCover" :src="form.videoCover" class="avatar">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
<!--          <el-input v-model="form.videoCover" placeholder="请输入视频封面"></el-input>-->
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
        <el-form-item label="教师id字符串">
          <el-input v-model="form.teachers" placeholder="请输入教师id，多个以“,”分割"></el-input>
        </el-form-item>
        <el-form-item label="课程价格JSON">
<!--          <el-input v-model="form.coursePrice" placeholder="请输入课程价格JSON"></el-input>-->
          <el-dialog
            width="30%"
            title="课程价格"
            :visible.sync="innerVisible"
            append-to-body>
            <el-form-item label="价格名称">
              <el-input v-model="newPerson.priceName" placeholder="请输入价格名称"></el-input>
            </el-form-item>
            <el-form-item label="时长/课">
              <el-input v-model="newPerson.courseTime" placeholder="请输入时长/课"></el-input>
            </el-form-item>
            <el-form-item label="课时数">
              <el-input v-model="newPerson.courseNumber" placeholder="请输入价格名称"></el-input>
            </el-form-item>
            <el-form-item label="原价">
              <el-input v-model="newPerson.originalPrice" placeholder="请输入原价"></el-input>
            </el-form-item>
            <el-form-item label="现价">
              <el-input v-model="newPerson.currentPrice" placeholder="请输入现价"></el-input>
            </el-form-item>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancelInnerVisible('form')">取消</el-button>
              <el-button @click="updateCourse('form')" type="primary">确定</el-button>
            </div>
          </el-dialog>
          <div v-for="(person,index) in coursePrice">
            <span>{{person.priceName}}</span>
            <span>{{person.currentPrice}}</span>
            <span :class="'text-center'"><button @click="deletePerson(index)">删除</button></span>
          </div>
          <el-button size="small" type="primary" @click="innerVisible = true">点我添加</el-button>
        </el-form-item>
        <el-form-item label="教师id字符串">
          <!--          <el-input v-model="form.coursePrice" placeholder="请输入课程价格JSON"></el-input>-->
          <el-dialog
            width="30%"
            title="教师列表"
            :visible.sync="innerVisibleTeacher"
            append-to-body>
            <div>
              <el-checkbox-group v-model="adminRole" @change="changeRole" style="margin-top: 25px">
                <el-checkbox v-for="items in teacherList" :label="items.id" :key="items.id">{{items.realName}}</el-checkbox>
              </el-checkbox-group>
<!--              <el-radio-group v-model="adminRole" @change="changeRole">-->
<!--                <el-radio v-for="item in teacherList" :key="item.id" :label="item.id" style="margin-right: 200px;margin-bottom: 10px">{{item.realName}}</el-radio>-->
<!--              </el-radio-group>-->
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancelListTeacher('form')">取消</el-button>
              <el-button  @click="updateRoleTeacher('form')" type="primary">确定</el-button>
            </div>
          </el-dialog>
          <el-button size="small" type="primary" @click="openInnerVisible">点我添加</el-button>
          <el-input v-model="form.teachers"  placeholder="请从上方按钮中选择" style="margin-top: 20px"></el-input>
        </el-form-item>
        <el-form-item label="推荐课程id">
          <el-input v-model="form.recommendCourses" placeholder="请输入推荐课程id,多个以“,”分割"></el-input>
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
    <el-dialog title="分配课程" :visible.sync="dialogFormAllocation" width="60%" @opened="roleUsersOpen">
      <!--      <role-user :roleId="roleId" ref="roleUser"></role-user>-->
      <el-form :model="details" ref="details" :rules="rules" label-width="100px">
        <span>校区名称：</span>
        <el-select v-model="campusId" placeholder="请选择校区名称" label="校区名称"  @change="getValue2">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.orgName"
            :value="item.id">
          </el-option>
        </el-select>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" style="margin-top: 25px">
          <el-checkbox v-for="items in coursesCampus" :label="items.id" :key="items.id">{{items.courseName}}</el-checkbox>
        </el-checkbox-group>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEditCampus('form')">取消</el-button>
        <el-button  @click="updateCampus('form')" type="primary">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
    import { courseList, first, addCourse, removeCourse, updateRole, getByParent, changeStatus, forbidSale, allotCourse, courseAllot, getMemberByPostCode} from '@/api/dashboard/coursePrice'
    import qs from 'qs'
    import { getOrgCampus} from '@/api/dashboard/employees'
    export default {
        name: 'coursePrice',
        components: {
            // 'role-user': () => import('./components/roleUser.vue'),
            // 'role-resource': () => import('./components/roleResource.vue')
        },
        data() {
            return {
                dialogFormEdit:false,
                innerVisible:false,
                dialogFormAllocation:false,
                innerVisibleTeacher:false,
                checkedCities:[],
                id:'',
                campusId:'',
                priceName:'',
                courseTime:'',
                courseNumber:'',
                originalPrice:'',
                currentPrice:'',
                subOrgId:'',
                courseIds:'',
                isIndeterminate: true,
                first:{},
                getByParent:{},
                three:{},
                coursesCampus:{},
                teacherIds:[],
                adminRole:[],
                teacherList:{},
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
                coursePrice:[{
                    priceName:'Lucy',
                    courseTime:20,
                    courseNumber:'阅读',
                    originalPrice:'12',
                    currentPrice:'11',
                },
                ],
                newPerson:{
                    priceName:'',
                    courseTime:'',
                    courseNumber:'',
                    originalPrice:'',
                    currentPrice:'',
                },
                listQuery: {
                    suite:'1',
                    page: 1,
                    pageSize: 10,
                    orgId:this.id,
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
                    courseLogo:undefined,
                    courseTypeCode:''
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
            this.getList();
            this.openVisible()
        },
        methods: {
            getValue(e){
                this.listQuery.suite=e
                console.log(this.listQuery.suite)

            },
            getValue2(e){
                console.log(e,'e')
                this.subOrgId=e;
                allotCourse({
                    subOrgId:e
                }).then(response => {
                    console.log(response,'allotCourse');
                    this.coursesCampus=response.data
                    this.listLoading = false
                })
            },
            openInnerVisible(){
                this.innerVisibleTeacher=true;
                getMemberByPostCode({
                    postCode:'jiaoshi',
                }).then(response => {
                    this.teacherList=response.data.data
                    console.log(teacherList,'getMemberByPostCode')
                    this.listLoading = false
                })

            },
            handleCheckedCitiesChange(value) {
                console.log(value)
                this.courseIds=value;

                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            },
            changeRole(value) {
                console.log(value)
                this.teacherIds=value;
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            },
            cancelEditCampus(){
                this.dialogFormAllocation=false
            },
            updateCampus(){
                courseAllot({
                    subOrgId:this.subOrgId,
                    courseIds:this.courseIds.toString()
                }).then(response => {
                    console.log(response,'allotCourse')
                    this.listLoading = false
                    this.$notify({
                        title: '成功',
                        message: '分配成功',
                        duration: 2000
                    })
                })
                this.dialogFormAllocation=false
            },
            updateRoleTeacher(){
                this.form.teachers=this.teacherIds
                console.log(this.form.teacherIds,'teacherIds')
                this.innerVisibleTeacher=false
            },
            cancelListTeacher(){
                this.innerVisibleTeacher=false
            },
            handleRight(e){

                this.getList()
            },
            updateCourse(){
                this.coursePrice.push(this.newPerson);
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
            cancelInnerVisible(){
                this.innerVisible=false
            },
            handleAllocation(){
                this.dialogFormAllocation=true
            },
            deletePerson(index){
                console.log(index)
                this.coursePrice.splice(index,1);
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
                courseList(this.listQuery).then(response => {
                    this.page = response.data.data
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
                        if(data[i].courseStatus=='3'){
                            data[i].courseStatus='禁售';
                        }else if(data[i].courseStatus=='4'){
                            data[i].courseStatus='解除禁售';
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
                first().then(response => {
                    console.log(response,'first')
                    this.first=response.data
                    this.listLoading = false
                })
                getByParent({
                    parentId:'355'
                }).then(response => {
                    console.log(response,'getByParent')
                    this.listLoading = false
                })
            },
            saveRole(formName) {
                const set = this.$refs
                this.form.menuId = this.listQuery.menuId
                set[formName].validate(valid => {
                    if (valid) {
                        this.form.coursePrice=JSON.stringify(this.coursePrice)
                        var coursePrice=this.form.coursePrice;
                        // coursePrice.splice(0, 1)
                        // let arr=[]
                        // for(let i=1;i<coursePrice.length-1;i++){
                        //     // i=coursePrice.length-1
                        //     arr.push(coursePrice[i])
                        //     // console.log(arr,'coursePrice')
                        //
                        // }
                        console.log(coursePrice,'coursePrice')
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
            removeUser(row) {
                this.$confirm('确认禁售该类型？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(row.id)
                    changeStatus({
                        courseId:row.id,
                        status:3,
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


