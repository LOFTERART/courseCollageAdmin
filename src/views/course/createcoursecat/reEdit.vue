<template>

<div class="app-container">

  <div class="createPost-main-container">

    <el-form ref="postForm" :model="postForm" :rules="rules"  label-width="80px">

      <el-form-item label="课程分类" prop="name">
        <el-input v-model="postForm.name"  placeholder="课程分类名字" style="width: 600px" ></el-input>
      </el-form-item>

      <el-form-item label="课程备注" prop="desc">
        <el-input v-model="postForm.desc" placeholder="备注信息" style="width: 600px" > </el-input>
      </el-form-item>

      <el-form-item label="课程名字" prop="courseTitle">
        <el-input v-model="postForm.courseTitle" placeholder="课程名字"  style="width: 600px"></el-input>
      </el-form-item>

      <el-form-item label="课程排序" prop="sort_num">

        <div style="display: flex;flex-direction: row;align-items: center">
          <el-input v-model="postForm.sort_num" placeholder="课程排序" type="number"  style="width: 600px" ></el-input>
          <span style="font-size: 12px;margin-left: 10px;color: #606266">数字越大分类排名越靠前</span>
        </div>

      </el-form-item>


      <el-form-item label="课程日期" prop="activeTime">

        <el-date-picker
          v-model="postForm.activeTime"
          type="daterange"
          align="right"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="timestamp"
        >
        </el-date-picker>

      </el-form-item>



      <div style="display: flex;flex-direction: row;align-items: center">
        <el-form-item label="课程原价" prop="orPrice">
          <el-input
            style="width: 200px"
            type="number"
            placeholder="原价"
            suffix-icon="el-icon-money"
            v-model="postForm.orPrice">
          </el-input>
        </el-form-item>

        <el-form-item label="促销价格" prop="price" style="margin-left: 20px;margin-right: 20px">
          <el-input
            style="width: 200px"
            type="number"
            placeholder="优惠价"
            suffix-icon="el-icon-money"
            v-model="postForm.price">
          </el-input>
        </el-form-item>

        <el-form-item label="课程人数" prop="stuNumber">
          <el-input
            style="width: 200px"
            type="number"
            placeholder="人数"
            suffix-icon="el-icon-user"
            v-model="postForm.stuNumber">
          </el-input>
        </el-form-item>
      </div>



      <el-form-item prop="content" style="margin-bottom: 30px;" label="内容编辑">
        <Tinymce ref="editor" v-model="postForm.content" :height="600" />
      </el-form-item>


      <div style="float: right;margin-bottom: 30px">
        <el-button type="primary" @click="createCourse('postForm')">提交</el-button>
        <el-button type="info">取消</el-button>
      </div>

    </el-form>

  </div>



</div>



</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import { createCourse,getCourseDetail } from "@/api/course";
  import { mapGetters } from "vuex";
  export default {
      name: "reEdit",
      components: { Tinymce},
    filters: {
    },
    data() {
        return {
          startTime:'',
          endTime:'',
          postForm: {
            name: '',
            desc: '',//备注
            activeTime:null,//活动时间
            courseTitle:'', //课程名字
            sort_num:'',
            orPrice:"",//原价
            price:"", //优惠价
            stuNumber:"",
            content:'', //文章内容
          },
          loading: false,
          userListOptions: [],
          rules: {
            content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
            name: [
              { required: true, message: '请输入课程分类名称', trigger: 'blur' },
              { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
            ],
            desc: [
              { required: true, message: '请填写课程备注信息', trigger: 'blur' }
            ],
            activeTime: [
              { required: true, message: '请填写活动时间', trigger: 'blur' }
            ],
            courseTitle: [
              { required: true,min: 2, max: 50, message: '请填写课程名字', trigger: 'blur' }
            ],
            orPrice: [
              { required: true, message: '请填写课程原价', trigger: 'blur' }
            ],
            price: [
              { required: true, message: '请填写课程现在价格', trigger: 'blur' }
            ],
            stuNumber: [
              { required: true, message: '请填写课程人数', trigger: 'blur' }
            ],
            sort_num: [
              { required: true, message: '请填写课程排序', trigger: 'blur' }
            ]
          },
          tempRoute: {}
        }
      },
      computed: {
        ...mapGetters([
          'name'
        ])
      },
      created() {
        const id = this.$route.params && this.$route.params.id
        this.getCourseDetail(id)
      },
      methods: {
        //获取课程详情
         async getCourseDetail(id){

           let params={
             id:Number(id)
           }

         const{data:res} = await getCourseDetail(params).catch(error=>error)
             this.PeopleCreate=res.creata_people

           this.postForm= {
                name: res.name,
                desc: res.name,//备注
                activeTime:[res.startTime,res.endTime],//活动时间

                courseTitle:res.courseName, //课程名字
                sort_num:res.sort_num,
                orPrice:res.class_orPrice,//原价
                price:res.coursePrice, //优惠价
                stuNumber:res.studentsNum,
                content:res.content, //文章内容
           }


         },

        //创建课程分类
        createCourse(rule){


          let createPeople =this.name
          this.$refs[rule].validate( async valid => {
            if (valid) {
              let params ={

                id:this.$route.params && Number(this.$route.params.id), //传递id 更新course
                name:this.postForm.name,
                mark:this.postForm.desc,
                create_people:this.PeopleCreate+"更新人=>"+createPeople, //vuex获取
                sub_name:this.postForm.courseTitle,
                class_price:Number(this.postForm.price),
                class_orPrice:Number(this.postForm.orPrice),

                //日期
                class_time:this.postForm.activeTime[0],
                class_end_time:this.postForm.activeTime[1],

                class_student:Number(this.postForm.stuNumber),
                surplus_student:Number(this.postForm.stuNumber),
                sort_num:Number(this.postForm.sort_num), //排序
                content:this.postForm.content, //排序
              }
              const res= await createCourse(params).catch( error => error)
              if (res.code !== 20000){
                return  this.$message.error(res.msg);
              }
              console.log(11);
              this.$refs[rule].resetFields() //清空上一次填充的数据
              this.$router.go(-1)
              console.log(22);
            } else {
              console.log('error submit!!');
              return false;
            }
          });

        },






      }
    }
</script>



<style lang="scss" scoped>

  /*@import "../../../styles/mixin";*/
  @import "@/styles/mixin.scss";

  .createPost-container {
    position: relative;

    .createPost-main-container {
      padding: 40px 45px 20px 50px;

      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;

        .postInfo-container-item {
          float: left;
        }
      }
    }

    .word-counter {
      width: 40px;
      position: absolute;
      right: 10px;
      top: 0px;
    }
  }

  .article-textarea{
    textarea {
      padding-right: 40px;
      resize: none;
      border: none;
      border-radius: 0px;
      border-bottom: 1px solid #bfcbd9;
    }
  }
</style>
