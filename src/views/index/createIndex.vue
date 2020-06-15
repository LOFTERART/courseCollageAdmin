<template>
    <div class="app-container">

        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" label-position="top">

        <el-form-item label="活动主题" width="200px" prop="name">
          <el-input v-model="form.name" style="width: 600px"></el-input>
        </el-form-item>

        <el-form-item label="活动子主题" width="200px" prop="name">
            <el-input v-model="form.sub_name" style="width: 600px"></el-input>
          </el-form-item>

          <el-form-item label="首页拼单价" width="200px" prop="name">
            <el-input v-model="form.pin_price" style="width: 600px" type="number"></el-input>
          </el-form-item>

          <el-form-item label="首页单独购买价" width="200px" prop="name">
            <el-input v-model="form.pin_or_price" style="width: 600px" type="number"></el-input>
          </el-form-item>

          <el-form-item label="首页拼单描述" width="200px" prop="name">
            <el-input v-model="form.pin_desc" style="width: 600px"></el-input>
          </el-form-item>




<!--        banner-->
        <el-form-item label="活动主图(最多1张)" prop="activePic">

          <el-upload
            :file-list="fileList1"
            name="file"
            :limit="limitNum"
            :action="url"
            list-type="picture-card"
            :before-upload="beforeAvatarUpload"
            :on-preview="handlePictureCardPreview1"
            :on-success="handleSuccess1"
            :on-remove="handleRemove1">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible1">
            <img width="100%" :src="dialogImageUrl1" alt="主图">
          </el-dialog>

        </el-form-item>

        <!--        banner-->
        <el-form-item label="拼团流程图(最多1张)" prop="pinPic">

          <el-upload
            :file-list="fileList2"
            name="file"
            :limit="limitNum"
            :action="url"
            list-type="picture-card"
            :before-upload="beforeAvatarUpload"
            :on-preview="handlePictureCardPreview2"
            :on-success="handleSuccess2"
            :on-remove="handleRemove2">
            <i class="el-icon-plus"></i>
          </el-upload>

          <el-dialog :visible.sync="dialogVisible2">
            <img width="100%" :src="dialogImageUrl2" alt="流程图">
          </el-dialog>

        </el-form-item>

<!--          活动时间-->
        <el-form-item label="课程日期" prop="activeTime">

            <el-date-picker
              v-model="form.activeTime"
              type="daterange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
            >
            </el-date-picker>

          </el-form-item>

        <!--        content-->
        <el-form-item label="内容详情" prop="content">

          <Tinymce ref="editor" v-model="form.content" :height="600" />

        </el-form-item>

      </el-form>


      <div>
        <div style="text-align: right">
          <el-button type="primary" @click="onSubmit('ruleForm')">立即创建</el-button>
          <el-button>取消</el-button>
        </div>
      </div>



    </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import {UPLOADURLSingle} from '@/api/course'
  import {createWeChatIndex} from '@/api/index'
  import {mapGetters} from "vuex";
    export default {
        name: "createIndex",
      components: { Tinymce},
      computed: {
        ...mapGetters([
          'name'
        ])
      },
      data() {
        return {
          fileList1:this.$route.params && this.$route.params.id?[
            {name:'',url:this.$route.params && this.$route.params.active_pic}
          ]:[],
          fileList2:this.$route.params && this.$route.params.id?[
            {name:'',url:this.$route.params && this.$route.params.pin_pic}
          ]:[],
          form: {
            name: this.$route.params && this.$route.params.name,
            sub_name: this.$route.params && this.$route.params.sub_name,


            pin_price: this.$route.params && this.$route.params.pin_price,
            pin_or_price: this.$route.params && this.$route.params.pin_or_price,
            pin_desc: this.$route.params && this.$route.params.pin_desc,


            //提交后台的字符串图片
            activePic: this.$route.params && this.$route.params.active_pic_str,
            pinPic: this.$route.params && this.$route.params.pin_pic_str,

            //完整的图片地址用来前台显示
            activePicStr: this.$route.params && this.$route.params.active_pic,
            pinPicStr: this.$route.params && this.$route.params.pin_pic,

            content: this.$route.params && this.$route.params.content,
            activeTime: [this.$route.params && this.$route.params.active_start_time,this.$route.params && this.$route.params.active_end_time],
          },



          rules: {
            name: [
              { required: true,min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
            ],
            sub_name: [
              { required: true,min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
            ],

            pin_price: [
              { required: true, message: '填写小程序首页拼单价格', trigger: 'blur' }
            ],
            pin_or_price: [
              { required: true,min: 3, max: 15, message: '填写小程序首页原单价', trigger: 'blur' }
            ],
            pin_desc: [
              { required: true,min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ],


            activePic: [
              { required: true, message: '请上传主图', trigger: 'blur' }
            ],
            pinPic: [
              {  required: true, message: '请上传流程图', trigger: 'blur' }
            ],
            content: [
              {  required: true, message: '请编辑活动内容', trigger: 'blur' }
            ],
            activeTime: [
              { required: true, message: '请填写活动时间', trigger: 'blur' }
            ],
          },

          limitNum:1,
          url:UPLOADURLSingle,
          dialogImageUrl1: this.$route.params && this.$route.params.active_pic,
          dialogVisible1: false,

          dialogImageUrl2: this.$route.params && this.$route.params.pin_pic,
          dialogVisible2: false,

        }
      },
      methods: {

        //  创建
          onSubmit(rule) {
            //更新活动主题
            if(this.$route.params && this.$route.params.id){

              let createPeople =this.name
              this.$refs[rule].validate(async valid => {
                if (valid) {
                  let params={
                    id:this.$route.params && Number(this.$route.params.id),
                    name:this.form.name,
                    sub_name:this.form.sub_name,

                    pin_price:Number(this.form.pin_price),
                    pin_or_price:Number(this.form.pin_or_price),
                    pin_desc:this.form.pin_desc,


                    active_pic:this.form.activePicStr===this.form.activePic?this.form.activePic:this.form.activePic,
                    pin_pic:this.form.pinPicStr===this.form.pinPic?this.form.pinPic:this.form.pinPic,
                    content:this.form.content,
                    active_start_time:this.form.activeTime[0],
                    active_end_time:this.form.activeTime[1],
                    create_people:createPeople+"更新人=>"+createPeople
                  }

                  const res=await createWeChatIndex(params).catch(error=>error)

                  console.log(res);

                  if (res.code !== 20000){
                    return  this.$message.error(res.msg);
                  }
                  this.$refs[rule].resetFields() //清空上一次填充的数据
                  this.$router.go(-1)

                } else {
                  console.log('error submit!!');
                  return false;
                }
              });

            }else{
              let createPeople =this.name
              this.$refs[rule].validate(async valid => {
                if (valid) {
                  let params={
                    name:this.form.name,
                    sub_name:this.form.sub_name,

                    pin_price:Number(this.form.pin_price),
                    pin_or_price:Number(this.form.pin_or_price),
                    pin_desc:this.form.pin_desc,

                    active_pic:this.form.activePic,
                    pin_pic:this.form.pinPic,
                    content:this.form.content,
                    active_start_time:this.form.activeTime[0],
                    active_end_time:this.form.activeTime[1],
                    create_people:createPeople
                  }

                  const res=await createWeChatIndex(params).catch(error=>error)

                  console.log(res);

                  if (res.code !== 20000){
                    return  this.$message.error(res.msg);
                  }
                  this.$refs[rule].resetFields() //清空上一次填充的数据
                  this.$router.go(-1)

                } else {
                  console.log('error submit!!');
                  return false;
                }
              });
            }



         },


        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt1M = file.size / 1024 / 1024 < 1;

          if (!isJPG) {
            this.$message.error('上传图片只能是 JPG 格式!');
          }
          if (!isLt1M) {
            this.$message.error('上传图片大小不能超过 1MB!');
          }
          return isJPG && isLt1M;
        },
        //主图
        handleRemove1(file, fileList) {
          console.log(file, fileList);
        },
        handlePictureCardPreview1(file) {
          this.dialogImageUrl1 = file.url;
          this.dialogVisible1 = true;
        },
        handleSuccess1(response, file, fileList){

          this.dialogImageUrl1 = response.files.file;
          this.form.activePic=response.files.imgName
        },

        //拼图
        handleRemove2(file, fileList) {
          console.log(file, fileList);
        },
        handlePictureCardPreview2(file) {
          this.dialogImageUrl2 = file.url;
          this.dialogVisible2 = true;
        },
        handleSuccess2(response, file, fileList){
          this.dialogImageUrl2 = response.files.file;
          this.form.pinPic=response.files.imgName;
        },





      },



    }
</script>

<style scoped>

</style>
