<template>
    <div class="app-container">

      <el-table
        stripe
        :data="tableData"
        style="width: 100%">
        <el-table-column
          type="index"
          label="ID"
          >
        </el-table-column>
        <el-table-column
          prop="name"
          label="课程分类"
          >
        </el-table-column>


        <el-table-column
          prop="courseName"
          label="课程名字"
        >
        </el-table-column>

        <el-table-column
          prop="creata_people"
          label="创建人"
        >
        </el-table-column>

        <el-table-column
          prop="coursePrice"
          label="价格"
        >
        </el-table-column>


        <el-table-column
          prop="view"
          label="浏览量">
        </el-table-column>
      </el-table>

    </div>
</template>

<script>

import {GetCourseRank} from '@/api/user'

    export default {
        name: "index",
      data() {
        return {
          tableData: []
        }
      },
      created () {
          this.getRank()
      },
      methods:{
          async getRank(){
            const res = await GetCourseRank().catch(error=>error)
            if (res.code !== 20000){
              return  this.$message.error(data.msg);
            }
            this.tableData=res.data
          }
      }



    }
</script>

<style scoped>

</style>
