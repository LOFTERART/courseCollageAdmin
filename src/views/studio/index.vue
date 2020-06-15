<template>
  <div class="app-container">

    <el-button type="success" icon="el-icon-plus" @click="createIndexData" class="addButton" >添加机构</el-button>

    <el-table
      :data="list"
      style="width: 100%">

      <el-table-column
        prop="id"
        label="id"
      >
      </el-table-column>

      <el-table-column
        prop="name"
        label="机构名"
      >
      </el-table-column>

      <el-table-column
        prop="longitude"
        label="机构经度"
      >
      </el-table-column>

      <el-table-column
        prop="latitude"
        label="机构经度"
      >
      </el-table-column>

      <el-table-column
        prop="sort_num"
        label="排序"
      >
      </el-table-column>

      <el-table-column
        label="状态"
      >
        <template slot-scope="{row}">
          <span>{{row.status===1?'显示':'隐藏'}}</span>
        </template>

      </el-table-column>

      <el-table-column
        prop="address"
        label="地址"
      >
      </el-table-column>

      <el-table-column
        prop="tel"
        label="电话"
      >
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


  </div>
</template>

<script>
  import {getStudio} from '@/api/studio'
  export default {
    name: "index",
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
        const res=await getStudio().catch(error=>error)
        if(res.code!==20000){
          return  this.$message.error(res.msg);
        }
        this.list=res.data

      },

      //  创建Studio数据
      createIndexData(){
        this.$router.push({ path: "createStudio" })
      },

      //  编辑
      clickEditClassify(info){
        this.$router.push({ name: 'createStudio',params:info })

      },



    }
  }
</script>

<style scoped>

</style>
