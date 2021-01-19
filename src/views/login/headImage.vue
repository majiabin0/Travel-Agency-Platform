<template>
    <div>
        <div class="header-manage">
          上传头像
        </div>

      <div>
        <img v-bind:src="options.img" @click="editCropper()" class="img-circle img-lg" />
<!--        <el-dialog :title="title" :visible.sync="open" width="80%">-->
          <el-row>
            <el-col :xs="24" :md="12" class="imgsty">
              <vue-cropper
                ref="cropper"
                :img="options.img"
                :info="true"
              />
            </el-col>
          </el-row>
          <br />
          <el-row>
            <el-col :lg="2" :md="2" style="text-align: center">
              <el-upload action="#" :http-request="requestUpload" :show-file-list="false" :before-upload="beforeUpload">
                <el-button size="small" class="btnsty">
                  上传
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
              </el-upload>
            </el-col>
            <el-col :lg="{span: 2, offset: 6}" :md="2" style="text-align: center">
              <el-button type="primary" size="small" class="btnsty" @click="uploadImg()">提 交</el-button>
            </el-col>
          </el-row>
<!--        </el-dialog>-->
      </div>

      </div>
</template>

<script>
  import {details, uploadAvatar} from "../../api/admin/user";
  import store from "@/store";
  import { VueCropper } from "vue-cropper";
    import QS from 'qs';
    import {param} from "../../utils";

    export default {
      name: "headImage",
      components: {
        "Header": () => import('../common/header.vue'),
        VueCropper
      },
      props: {
        user: {
          type: Object
        }
      },
      created() {
        this.getTravelAgency();
      },
      data(){
        return{
          // 是否显示弹出层
          open: false,
          // 弹出层标题
          title: "修改头像",
          options: {
            img: store.getters.avatar, //裁剪图片的地址
          },
          previews: {},
          userId: '43'
        }
      },
      methods: {
        //获取旅行社资料
        getTravelAgency(){
          details(this.userId).then(response=>{
            console.log(response.data.guideUserBasic.headImageURL)
            var path = require('../../../vue.config')
            this.options.img = path.devServer.proxy["/api"].target + response.data.guideUserBasic.headImageURL;
          })
        },
        // 编辑头像
        editCropper() {
          this.open = true;
        },
        // 覆盖默认的上传行为
        requestUpload() {
        },
        // 上传预处理
        beforeUpload(file) {
          if (file.type.indexOf("image/") == -1) {
            alert('文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。')
            //this.msgError("");
          } else {
            const isLt1M = file.size / 1024 / 1024 < 1;
            if (!isLt1M) {
              //this.msgError("上传图片大小不能超过 2MB!");
              alert('上传图片大小不能超过 1MB!')
            }else{
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                this.options.img = reader.result;
              };
            }
          }
        },
        // 上传图片
        uploadImg() {
          this.$refs.cropper.getCropBlob(data => {
            let formData = new FormData();
            formData.append("avatarfile", data);
            console.log(formData)
            uploadAvatar(formData).then(response => {
              if (response.code === 0) {
                this.open = false;
                this.options.img = process.env.VUE_APP_BASE_API + response.imgUrl;
                //this.msgSuccess("修改成功");
                //参数传递到上级画面
                this.$router.push({
                  path: '/infoPerfection',
                  query: {
                    headImageUrl: response.data.avatar
                  }
                })
              } else {
                alert("上传失败");
                //this.msgError(response.msg);
              }
              this.$refs.cropper.clearCrop();
            });
          });
        },
        //关闭
        closePage(){
          this.$router.push({path:'/travelAgency'});
        }
      }
    }
</script>

<style >
  .header-manage{
    font-size: 24px;
    padding: 40px 0;
    border-bottom: 1px solid;
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .imgsty{
    height: 152px;
    width: 70%;
    margin-left: 10%;
  }
  .btnsty{
    margin-top: 10%;
  }
</style>
