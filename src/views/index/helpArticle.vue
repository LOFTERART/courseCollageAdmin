<template>
    <div class="app-container">

      <el-button type="success" icon="el-icon-plus" @click="createIndexData" class="addButton" >添加文章</el-button>

      <el-table
        :data="list"
        style="width: 100%">

        <el-table-column
          prop="id"
          label="id"
          >
        </el-table-column>

        <el-table-column
          prop="create_time"
          label="创建时间"
        >
        </el-table-column>

        <el-table-column
          prop="classify.name"
          label="分类"
        >
        </el-table-column>



        <el-table-column
          prop="name"
          label="主标题"
          >
        </el-table-column>
        <el-table-column
          prop="sub_name"
          label="子标题">
        </el-table-column>


        <el-table-column
          label="操作">
          <template scope="{row}">
            <el-button type="text"  @click="clickEditClassify(row)">编辑</el-button>
          </template>
        </el-table-column>



      </el-table>


    </div>
</template>

<script>
  import {GetArticleHelp} from '@/api/helpArticle'
    export default {
        name: "helpArticle",
      data(){
        return{
          list:[],
        }
      },

      created() {
        this.getList()
      },


      methods:{

        async getList(){
          const res=await GetArticleHelp().catch(error=>error)
          if(res.code!==20000){
            return  this.$message.error(res.msg);
          }
          this.list=res.data

        },

        //  创建首页数据
        createIndexData(){
          this.$router.push({ path: '/index/createHelp' })
        },

      //  编辑
        clickEditClassify(info){
          this.$router.push({ name: 'createHelp',params:info })

        },



      }
    }
</script>

<style scoped>

</style>
