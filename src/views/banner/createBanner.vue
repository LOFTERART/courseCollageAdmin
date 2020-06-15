<template>
  <div class="app-container">

    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" label-position="top">


      <div style="display: flex;flex-direction: row;align-items: center">

        <el-form-item label="广告名字" width="200px" prop="name">
          <el-input v-model="form.name" style="width: 600px" placeholder="请输入广告名字"></el-input>
        </el-form-item>

        <el-form-item label="广告排序" width="200px" prop="sortNum" style="margin-left: 40px;margin-right: 40px">
          <el-input v-model="form.sortNum" type="number" style="width: 600px" placeholder="请输入广告排序"></el-input>
        </el-form-item>

        <el-form-item label="广告状态"  prop="statusID" width="200px">
          <el-select v-model="form.statusID" placeholder="请选择广告状态">
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
      <el-form-item label="广告图片(最多1张)" prop="activePic">

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


      <el-form-item label="注意说明">
        <span>下边三项为互斥关系,任意填写一个就可以了,前端优先选择 微信公众号链接 其次 文章ID 最后 广告详情的内容 </span>
      </el-form-item>


      <div style="display: flex;flex-direction: row;align-items: center">

        <el-form-item label="微信公众号链接(1)" width="200px" style="margin-right: 40px">
          <el-input v-model="form.link" style="width: 600px" placeholder="仅限关联公众号的的文章链接"></el-input>
        </el-form-item>

        <el-form-item label="文章ID(2)" width="200px" >
          <el-input v-model="form.articleId" type="number" style="width: 600px" placeholder="CMS模块中=>文章管理=>id"></el-input>
        </el-form-item>

      </div>



      <!--        content-->
      <el-form-item label="广告详情(3)">

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
  import {createBanner,upBanner} from '@/api/banner'
  import {mapGetters} from "vuex";
  import {UPLOADURLSingle} from "@/api/course";
  export default {
    name: "createBanner",
    components: {Tinymce},
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    created() {

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
          link:this.$route.params.link||'',
          articleId:this.$route.params.local_num||'',
          name: this.$route.params.name||'',
          sortNum: this.$route.params.sort_num||'',
          content:  this.$route.params.content||'',
          options:[
            {id:1,name:"显示"},
            {id:2,name:"隐藏"},
          ],
          activePic:this.$route.params.img||'',
          statusID:this.$route.params.status||'',
        },

        rules: {
          name: [
            { required: true,min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          //图片
          activePic: [
            { required: true, message: '请上传主图', trigger: 'blur' }
          ],
          statusID: [
            { required: true, message: '请选择广告状态', trigger: 'change' }
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
                id:this.$route.params && Number(this.$route.params.id),
                name:this.form.name,
                sort_num:Number(this.form.sortNum),
                link:this.form.link,
                status:Number(this.form.statusID),
                local_num:Number(this.form.articleId),
                content:this.form.content,
                img:this.form.activePic,  //图片地址
              }

              const res=await upBanner(params).catch(error=>error)
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
                link:this.form.link,
                status:Number(this.form.statusID),
                local_num:Number(this.form.articleId),
                content:this.form.content,
                img:this.form.activePic,  //图片地址
              }

              const res=await createBanner(params).catch(error=>error)
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
