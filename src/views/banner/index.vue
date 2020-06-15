<template>
  <div class="app-container">

    <el-button type="success" icon="el-icon-plus" @click="createIndexData" class="addButton" >添加广告</el-button>

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
        label="广告名字"
      >
      </el-table-column>

      <el-table-column
        label="关联文章ID"
      >
        <template slot-scope="{row}">
          <span>{{row.local_num===0?'无关联':row.local_num}}</span>
        </template>

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
        prop="link"
        label="关联网址"
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
  import {getBanner} from '@/api/banner'
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
        let params={
          status:3
        }
        const res=await getBanner(params).catch(error=>error)
        if(res.code!==20000){
          return  this.$message.error(res.msg);
        }
        this.list=res.data

      },

      //  创建banner数据
      createIndexData(){
        this.$router.push({ path: "createBanner" })
      },

      //  编辑
      clickEditClassify(info){
        this.$router.push({ name: 'createBanner',params:info })

      },



    }
  }
</script>

<style scoped>

</style>
