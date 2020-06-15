<template>
    <div>

      <el-table
        :data="liveList"
        stripe
        style="width: 100%">
        <el-table-column
          prop="roomid"
          label="直播间ID"
          >
        </el-table-column>
        <el-table-column
          prop="name"
          label="直播间名称"
          >
        </el-table-column>
        <el-table-column
          label="直播间状态">
          <template slot-scope="{row}">
            <span>{{row.live_status |formateStatus}}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="直播开始时间">
          <template slot-scope="{row}">
            <span>{{row.start_time |formatTime}}</span>
          </template>

        </el-table-column>

        <el-table-column
          label="直播结束时间">
          <template slot-scope="{row}">
            <span>{{row.end_time |formatTime}}</span>
          </template>

        </el-table-column>

        <el-table-column
          prop="anchor_name"
          label="主播名">
        </el-table-column>

        <el-table-column
          label="封面图">
          <template slot-scope="{row}">
            <el-image
              style="width: 40px; height: 40px;"
              :src="row.cover_img"
              :preview-src-list="[row.cover_img]">
            </el-image>
          </template>
        </el-table-column>

        <el-table-column
          label="分享图">
          <template slot-scope="{row}">
            <el-image
              style="width: 40px; height: 40px;"
              :src="row.share_img"
              :preview-src-list="[row.share_img]">
            </el-image>
          </template>
        </el-table-column>

      </el-table>



    </div>
</template>

<script>
  import {GetLiveVideoList} from '@/api/live'
    export default {
        name: "livehome",
      filters:{
        formatTime(val){
          var date = new Date(val*1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
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
        },
        formateStatus(val){

          let status ={
            101:"直播中",
            102:"未开始",
            103:"已结束",
            104:"禁播",
            105:"暂停",
            106:"异常",
            107:"已过期",
          }
          return status[val]

        },
      },

      data(){

        return{
          liveList:[]
        }
      },

      created() {
          this.getList()
      },


      methods:{

          async getList(){

            let params={
              start:0,
              limit:100
            }

            const res=await GetLiveVideoList(params).catch(error=>error)
            this.liveList=res.room_info

          },
      }
    }
</script>

<style scoped>

</style>
