

<template xmlns="http://www.w3.org/1999/html">
  <div class="app-container">
    <!--    add buttton-->
    <el-select v-model="value" placeholder="分类筛选" clearable>
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>

    <el-button type="primary" icon="el-icon-search" style="margin-left: 20px;margin-right: 20px" @click="clickSearch">搜索</el-button>
    <el-button type="success" icon="el-icon-plus" @click="dialogVisible = true" class="addbutton" >添加书籍</el-button>



    <el-table
      :data="books"
      stripe
      >

      <el-table-column
       type="index"
        label="#">
      </el-table-column>

      <el-table-column
        prop="course.name"
        sortable
        label="课程">
      </el-table-column>

      <el-table-column
        prop="title"
        label="书籍"
        >
      </el-table-column>
      <el-table-column
        prop="tip"
        label="标记">
      </el-table-column>

      <el-table-column
        prop="create_people"
        label="创建人">
      </el-table-column>


      <el-table-column
        label="图片">
        <template slot-scope="scope">
          <el-image
            style="width: 40px; height: 40px;"
            :src="scope.row.img_url"
            :preview-src-list="[scope.row.img_url]">
          </el-image>
        </template>
      </el-table-column>





      <el-table-column
        label="操作">

        <template scope="{row}">
          <el-button type="text"  @click="clickDelBook(row)">删除</el-button>
        </template>


      </el-table-column>

    </el-table>



    <!--    dialog-->

    <el-dialog
      :show-close="false"
      title="增加分类"
      :visible.sync="dialogVisible"
      width="50%"
    >

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="书籍名字" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="书籍提示" prop="tip">
          <el-input v-model="ruleForm.tip"></el-input>
        </el-form-item>

        <el-form-item label="书籍图片" prop="img">
          <el-upload
            name="upload[]"
            class="upload-demo"
            drag
            :limit=1
            auto-upload
            show-file-list
            :file-list="fileList"
            :action="UPLOADURL"
            :on-exceed="clickImgExceed"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            <div style="color: #ccc;font-size: 12px">只能上传<em>1张</em> jpg文件，且不超过1M,分辨率为300*300</div>
            </div>
          </el-upload>

        </el-form-item>

        <el-form-item label="课程目录"  prop="options">
          <el-select v-model="courseId" placeholder="请选择课程目录">
            <el-option
              v-for="item in ruleForm.options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>



      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="clickDone('ruleForm')">确 定</el-button>
     </span>

    </el-dialog>


  </div>
</template>






<script>

  import {delBookById,getCourseList,getBookList,createBook,UPLOADURL} from '@/api/course'
  import { mapGetters } from "vuex";

  export default {
    name: 'index',
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    data() {
      return {
        books:[],
        UPLOADURL:UPLOADURL,
        imageUrl:'',
        fileList: [], //文件上传列表
        dialogVisible: false,
        ruleForm: {
          name: '',
          tip: '',//备注
          img:'',//图片
          options: [], //课程目录分类
        },
        courseId: null,//筛选值
        rules: {
          name: [
            { required: true, message: '请输入书籍名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          tip: [
            { required: false, message: '请填写书籍运营标记', trigger: 'blur' }
          ],
          img: [
            { required: true, message: '请上传图片', trigger: 'blur' }
          ],
          options: [
            { required: true, message: '请选择关联课程目录', trigger: 'blur' }
          ]
        },

        options: [],
        value: '' //筛选课程ID
      }
    },


    created () {
    //  获取course分类
      this.getCourse()
    //  获取书籍
      this.getBooks({course_id:0})
    },


    methods: {

      //删除书籍
      clickDelBook(info){
        console.log(info);
        this.$confirm('此操作将删除该书籍, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {

          let params={
            id:Number(info.id)
          }
          const data=await delBookById(params).catch(error=>error)

          console.log(data,"shanchuzhihou");

          if (data.code !== 20000){
            return  this.$message.error(data.msg);
          }
          //  获取书籍
          this.getBooks()

          this.$message({
            type: 'success',
            message: data.msg
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });


      },

      //获取课程
      async getCourse(){
        const res= await getCourseList().catch( error => error)
        if (res.code !== 20000){
          return  this.$message.error(res.msg);
        }
        this.ruleForm.options=res.data
        this.options=res.data
      },

      //获取书籍
      async getBooks(params){
        const res= await getBookList(params).catch( error => error)
        if (res.code !== 20000){
          return  this.$message.error(res.msg);
        }
        this.books=res.data
      },

      //创建书籍
      clickDone(rule){
        let name =this.name;
        this.$refs[rule].validate(  async valid => {
          if (valid) {
            let params ={
              create_people:name,
              title:this.ruleForm.name,
              tip:this.ruleForm.tip,
              img:this.imageUrl,
              course_id:Number(this.courseId)
            }
            console.log(params,"pass params");
            const res= await createBook(params).catch( error => error)
            if (res.code !== 20000){
              return  this.$message.error(res.msg);
            }
            this.dialogVisible=false
            this.imageUrl=""
            this.fileList=[]
            this.$refs.ruleForm.resetFields() //清空上一次填充的数据

            this.getBooks()

          } else {
            return false;
          }
        });

      },


      //点击搜索

      clickSearch(){

        let params={
          course_id:this.value||0
        }
        //获取书籍
        this.getBooks(params)

      },


      //图片超过提示

      clickImgExceed(files, fileList){
        console.log(files, fileList)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },

      handleAvatarSuccess(res, file) {
        this.imageUrl = res.files.imgName;
        this.ruleForm.img=res.files.imgName
        console.log(this.imageUrl,"-----",res);
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



    }
  }

</script>







<style scoped>
  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
  .addbutton{
    margin-bottom: 20px;
  }



</style>



