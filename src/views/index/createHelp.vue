<template>
  <div class="app-container">

    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" label-position="top">

      <el-form-item label="主题" width="200px" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="子主题" width="200px" prop="subName">
        <el-input v-model="form.subName"></el-input>
      </el-form-item>

      <el-form-item label="分类"  prop="classifyID" width="200px">
        <el-select v-model="form.id" placeholder="请选择分类">
          <el-option
            v-for="item in form.options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>


      <!--        content-->
      <el-form-item label="帮助文档详情" prop="content">

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
  import {CreateArticleHelp} from '@/api/helpArticle'
  import {mapGetters} from "vuex";
  import {getClassify} from "@/api/classify";
  import Vue from "vue";
  export default {
    name: "createHelp",
    components: {Tinymce},
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    created() {
      this.getList()
    },
    data() {
      return {
        form: {
          name: this.$route.params.name||'',
          subName: this.$route.params.sub_name||'',
          content:  this.$route.params.content||'',
          options:[],
          id:this.$route.params && this.$route.params.classify && this.$route.params.classify.id||'', //分类ID
        },

        rules: {
          name: [
            { required: true,min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          subName: [
            { required: true,min: 3, max: 200, message: '长度在 3 到 200 个字符', trigger: 'blur' }
          ],
          id: [
            { required: true, message: '请选择关联分类目录', trigger: 'change' }
          ],
          content: [
            {  required: true, message: '请编辑活动内容', trigger: 'blur' }
          ],

        },



      }
    },
    methods: {

      //  获取分类
      async getList(){
        const res = await getClassify().catch(error=>error)

        if(res.code!==20000){
          Vue.prototype.$message({
            message: res.msg,
            duration: 1500
          })
        }

        this.form.options=res.data

      },
      //  创建
      onSubmit(rule) {

        if (this.$route.params && this.$route.params.id){
          this.$refs[rule].validate(async valid => {
            if (valid) {
              let params={
                id:this.$route.params && Number(this.$route.params.id),
                name:this.form.name,
                sub_name:this.form.subName,
                content:this.form.content,
                classify_id:Number(this.form.id), //分类ID
                is_edit:true,
              }

              const res=await CreateArticleHelp(params).catch(error=>error)
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
                sub_name:this.form.subName,
                content:this.form.content,
                classify_id:Number(this.form.id), //分类ID
                is_edit:false,
              }

              const res=await CreateArticleHelp(params).catch(error=>error)
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
