<template>
    <div class="app-container">

      <el-table
        :data="userList"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          >
        </el-table-column>
        <el-table-column
          prop="name"
          label="昵称"
         >
        </el-table-column>

        <el-table-column
          prop="address[0].true_name"
          label="真实姓名"
          >
        </el-table-column>

        <el-table-column
          prop="address[0].tel_phone"
          label="电话"
          >
        </el-table-column>

        <el-table-column
          prop="address[0].province"
          label="省份"
         >
        </el-table-column>

        <el-table-column
          prop="address[0].full_address"
          label="详细地址"
          >
        </el-table-column>

      </el-table>


    </div>
</template>

<script>

import { GetUsers } from "@/api/user";

export default {
        name: "index",
         data(){
          return{
            userList:[]

          }
      },

      created () {
          this.getUsers()
      },

      methods:{
        async getUsers(){
           const res = await GetUsers().catch(error=>error)
          if (res.code !== 20000){
            return  this.$message.error(data.msg);
          }
          this.userList=res.data

        }

      }


    }


</script>

<style scoped>

</style>
