<template>

  <div class="app-container">
<!--    添加按钮-->
    <el-button type="success" icon="el-icon-plus" @click="createIndexData" class="addButton" v-if="list.length>=1?false:true">添加</el-button>
<!--    <el-button type="success" icon="el-icon-plus" @click="createIndexData" class="addButton" >添加</el-button>-->


    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="主题名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="create_people"
        label="创建人">
      </el-table-column>

      <el-table-column
        label="开始日期">
        <template slot-scope="{row}">
          <p>{{row.active_start_time|formatTime}}</p>
        </template>
      </el-table-column>

      <el-table-column
        label="结束日日期">
        <template slot-scope="{row}">
          <p>{{row.active_end_time|formatTime}}</p>
        </template>

      </el-table-column>


      <el-table-column
        label="主图">
        <template slot-scope="scope">
          <el-image
            style="width: 40px; height: 40px;"
            :src="scope.row.active_pic"
            :preview-src-list="[scope.row.active_pic]">
          </el-image>
        </template>
      </el-table-column>

      <el-table-column
        label="流程图">
        <template slot-scope="scope">
          <el-image
            style="width: 40px; height: 40px;"
            :src="scope.row.pin_pic"
            :preview-src-list="[scope.row.pin_pic]">
          </el-image>
        </template>
      </el-table-column>


      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="{row}">
          <el-button type="text"  @click="gotoEdit(row)">
            编辑
          </el-button>
        </template>
      </el-table-column>


    </el-table>

  </div>


</template>

<script>
  import {getWeChatIndexList} from '@/api/index'
    export default {
        name: "index",
      filters:{
        formatTime(val){
          var date = new Date(val);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          var year = date.getFullYear(),
            month = ("0" + (date.getMonth() + 1)).slice(-2),
            sdate = ("0" + date.getDate()).slice(-2),
            hour = ("0" + date.getHours()).slice(-2),
            minute = ("0" + date.getMinutes()).slice(-2),
            second = ("0" + date.getSeconds()).slice(-2);
          // 拼接
          var result = year + "-"+ month +"-"+ sdate +" "+ hour +":"+ minute +":" + second;
          // 返回
          return result;
        }
      },
      data(){
        return{
          list:[],
          isShowAdd:true
        }
      },

      created() {
          this.getList()
      },

      methods:{

        async getList(){
          const res=await getWeChatIndexList().catch(error=>error)
          if(res.code!==20000){
            return  this.$message.error(res.msg);
          }
          this.list=res.data

        },




        //  创建首页数据
        createIndexData(){
          this.$router.push({ path: '/index/createIndex' })
        },

      //  编辑
        gotoEdit(info){
          console.log(info,"---info---");
          this.$router.push({ name: 'createIndex',params:info })
        },

      }


    }
</script>

<style scoped>

</style>
