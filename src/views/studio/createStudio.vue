<template>
  <div class="app-container">

    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" label-position="top">

     <div style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;width: 630px">

       <el-form-item label="机构名字" width="200px" prop="name">
         <el-input v-model="form.name" style="width: 300px"></el-input>
       </el-form-item>


       <el-form-item label="机构地址" width="200px" prop="address">
         <el-input v-model="form.address"  style="width: 300px"></el-input>
       </el-form-item>

     </div>


      <div style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;width: 1500px">

        <el-form-item label="机构经度" width="200px" prop="longitude">
          <el-input v-model="form.longitude" type="number" style="width: 300px"></el-input>
        </el-form-item>

        <el-form-item label="机构纬度" width="200px" prop="latitude">
          <el-input v-model="form.latitude" type="number" style="width: 300px"></el-input>
        </el-form-item>


        <el-form-item label="机构排序" width="200px" prop="sortNum">
          <el-input v-model="form.sortNum" type="number" style="width: 300px"></el-input>
        </el-form-item>



        <el-form-item label="机构电话" width="200px" prop="tel">
          <el-input v-model="form.tel" style="width: 300px" type="number"></el-input>
        </el-form-item>

        <el-form-item label="机构状态"  prop="statusID" width="200px">
          <el-select v-model="form.statusID" placeholder="请选择机构状态">
            <el-option
              v-for="item in form.options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>


      </div>


      <!--        banner-->
      <el-form-item label="机构图片(最多1张)" prop="activePic">

        <el-upload
          :file-list="fileList"
          name="file"
          :limit="Number(1)"
          :action="url"
          list-type="picture-card"
          :before-upload="beforeAvatarUpload"
          :on-preview="handlePictureCardPreview"
          :on-success="handleSuccess"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="主图">
        </el-dialog>

      </el-form-item>



      <!--        content-->
      <el-form-item label="机构详情" prop="content">

        <Tinymce ref="editor" v-model="form.content" :height="800" />

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
  import {createStudio,upStudio} from '@/api/studio'
  import {mapGetters} from "vuex";
  import {UPLOADURLSingle} from "@/api/course";
  export default {
    name: "createStudio",
    components: {Tinymce},
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    created() {
      console.log(this.$route.params,"00000000");

    },
    data() {
      return {
        url:UPLOADURLSingle,
        dialogImageUrl: this.$route.params && this.$route.params.imgurl, //查看大图
        dialogVisible: false,
        fileList: this.$route.params && this.$route.params.id?[
          {name:'',url:this.$route.params && this.$route.params.imgurl}
        ]:[],
        form: {
          tel:this.$route.params.tel||'',
          address:this.$route.params.address||'',
          name: this.$route.params.name||'',
          sortNum: this.$route.params.sort_num+''||'',
          content:  this.$route.params.content||'',
          options:[
            {id:1,name:"显示"},
            {id:2,name:"隐藏"},
          ],
          activePic:this.$route.params.img||'',
          statusID:this.$route.params.status||'',
          longitude:this.$route.params.longitude+''||'',
          latitude:this.$route.params.latitude+''||'',
        },

        rules: {
          name: [
            { required: true,min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          address: [
            { required: true,min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
          ],
          longitude: [
            { required: true,min: 3, max: 20, message: '百度地图查找经纬度 http://api.map.baidu.com/lbsapi/getpoint/index.html', trigger: 'blur' }
          ],
          latitude: [
            { required: true,min: 3, max: 20, message: '百度地图查找经纬度 http://api.map.baidu.com/lbsapi/getpoint/index.html', trigger: 'blur' }
          ],
          sortNum: [
            { required: true,min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          tel: [
            { required: true,min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' }
          ],
          //图片
          activePic: [
            { required: true, message: '请上传主图', trigger: 'blur' }
          ],
          statusID: [
            { required: true, message: '请选择机构状态', trigger: 'change' }
          ],
          content: [
            { required: true,min: 3, message: '最少3个字符', trigger: 'blur' }
          ],


        },



      }
    },
    methods: {

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

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },

      handlePictureCardPreview(file) {
        this.dialogImageUrl1 = file.url;
        this.dialogVisible1 = true;
      },

      handleSuccess(response, file, fileList){

        this.dialogImageUrl = response.files.file;
        this.form.activePic=response.files.imgName
      },

      //  创建
      onSubmit(rule) {
        if (this.$route.params && this.$route.params.id){
          this.$refs[rule].validate(async valid => {
            if (valid) {
              let params={
                id:Number(this.$route.params && this.$route.params.id),
                name:this.form.name,
                sort_num:Number(this.form.sortNum),
                tel:this.form.tel,
                status:Number(this.form.statusID),
                address:this.form.address,
                content:this.form.content,
                longitude:Number(this.form.longitude),
                latitude:Number(this.form.latitude),
                img:this.form.activePic,  //图片地址
              }

              const res=await upStudio(params).catch(error=>error)
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
        }else {
          this.$refs[rule].validate(async valid => {
            if (valid) {
              let params={
                name:this.form.name,
                sort_num:Number(this.form.sortNum),
                tel:this.form.tel,
                status:Number(this.form.statusID),
                address:this.form.address,
                content:this.form.content,
                longitude:Number(this.form.longitude),
                latitude:Number(this.form.latitude),
                img:this.form.activePic,  //图片地址
              }

              const res=await createStudio(params).catch(error=>error)
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


    },



  }
</script>

<style scoped>

</style>
