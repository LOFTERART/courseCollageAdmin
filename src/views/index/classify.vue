<template>
    <div class="app-container">

      <el-button type="success" icon="el-icon-plus" @click="dialogFormVisible = true" class="addButton" >添加分类</el-button>
<!--表格内容S-->
      <el-table
        :data="tableData"
        style="width: 100%">

        <el-table-column
          prop="id"
          label="ID"
        >
        </el-table-column>


        <el-table-column
          prop="name"
          label="分类名称"
        >
        </el-table-column>

        <el-table-column
          prop="sort_num"
          label="排序">
        </el-table-column>

        <el-table-column
          label="图片">
          <template slot-scope="scope">
            <el-image
              style="width: 40px; height: 40px;"
              :src="scope.row.imgurl"
              :preview-src-list="[scope.row.imgurl]">
            </el-image>
          </template>
        </el-table-column>

        <el-table-column
          label="操作">

          <template scope="{row}">
            <el-button type="text"  @click="clickEditClassify(row)">编辑</el-button>
          </template>


        </el-table-column>






      </el-table>
<!--表格内容e-->


<!--      分类添加S-->
      <el-dialog title="添加分类" :visible.sync="dialogFormVisible">

        <el-form :model="form" :rules="rules" ref="ruleForm" label-position="top">

          <el-form-item label="分类名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="排序(越大排序越靠前)" prop="sortNum">
            <el-input v-model="form.sortNum"  type="Number"></el-input>
          </el-form-item>


          <!--        banner-->
          <el-form-item label="分类图片(最多1张 图片分辨率为128*128,大小不超过50KB)" prop="activePic" style="width: 600px">

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

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="clickDone('ruleForm')">确 定</el-button>
        </div>

      </el-dialog>
<!--      分类添加E-->


    </div>
</template>

<script>


  import {createClassify,getClassify,upClassify} from '@/api/classify'
  import Vue from "vue";
  import {UPLOADURLSingle} from "@/api/course";

    export default {
        name: "classify",
      data() {
        return {
          url:UPLOADURLSingle,
          dialogImageUrl: '', //查看大图
          dialogVisible: false,
          fileList: [],
          dialogFormVisible: false,
          form: {
            name: '',
            sortNum:'',
            activePic:'',
          },
          classifyId:'',

          isEdit:false,

          rules:{
            name:[
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
            ],
            //图片
            activePic: [
              { required: true, message: '请上传主图', trigger: 'blur' }
            ],
            sortNum: [
              { required: true, message: '请填写排序', trigger: 'blur' }
            ],
          },

          tableData: []
        }
      },

      created() {
          this.getList()
      },


      methods:{

        //  获取分类
        async getList(){
          const res = await getClassify().catch(error=>error)

          if(res.code!==20000){
            Vue.prototype.$message({
              message: res.msg,
              duration: 1500
            })
          }

          this.tableData=res.data

        },

        //  点击确定
      async  clickDone(formName){

          //是编辑
          if(this.isEdit){
            let params={
              id:this.classifyId,
              img:this.form.activePic,
              name:this.form.name,
              sort_num:Number(this.form.sortNum)
            }
            const res =await upClassify(params).catch(error=>error)
            if(res.code!==20000){
              Vue.prototype.$message({
                message: res.msg,
                duration: 1500
              })
            }
            this.dialogFormVisible=false
            this.getList()
            this.$refs[formName].resetFields()
            this.isEdit=false
          }else {
            this.$refs[formName].validate( async (valid) => {
              if (valid) {
                let params={
                  img:this.form.activePic,
                  name:this.form.name,
                  sort_num:Number(this.form.sortNum)
                }
                const res =await createClassify(params).catch(error=>error)

                if(res.code!==20000){
                  Vue.prototype.$message({
                    message: res.msg,
                    duration: 1500
                  })
                }

                this.getList()
                this.dialogFormVisible=false
                this.fileList=[]
                this.$refs[formName].resetFields()

              } else {
                console.log('error submit!!');
                return false;
              }
            });
          }



        },



      //  编辑分类

       async  clickEditClassify(info){

          this.dialogFormVisible=true
          this.form.name=info.name
          this.form.sortNum=info.sort_num
         this.classifyId=info.id
         this.fileList=[{name:'',url:info.imgurl}]
         this.isEdit=true

        },





        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
          const isLt1M = file.size / 1024 / 1024 < 0.05;
          if (!isJPG) {
            this.$message.error('只支持图片 格式!');
          }
          if (!isLt1M) {
            this.$message.error('上传图片大小不能超过 50KB!');
          }
          return isJPG && isLt1M;
        },

        handleRemove(file, fileList) {
          console.log(file, fileList);
        },

        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },

        handleSuccess(response, file, fileList){

          this.dialogImageUrl = response.files.file;
          this.form.activePic=response.files.imgName
        },



      }

    }
</script>

<style scoped>

</style>
