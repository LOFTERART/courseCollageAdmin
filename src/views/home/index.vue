<template>
  <div class="dashboard-container">

    <div class="dashboard-text">欢迎{{name}} ^^ </div>

    <el-row :gutter="20">
      <el-col :span="6" v-for="(item,index) in dataInfo">
        <div class="grid-content bg-purple" >
          <div><i :class="index|iconFilter" :style="index|colorFilter" class="iconStyle"></i></div>
          <div style="text-align: center">
            <p style="line-height: 18px;color: rgba(0,0,0,0.4);font-size: 14px;margin-bottom: 12px">总{{item.name}}</p>
            <p style="font-weight: 400;-webkit-box-direction: normal;font-size: 24px">{{item.num}}</p>
          </div>
        </div>
      </el-col>
    </el-row>



    <div class="dashboard-text">订单数</div>

    <el-row :gutter="20">
      <el-col :span="3" v-for="(item,index) in courseNum" :key="index">
        <div class="grid-content bg-purple" >
          <div><i  style="color: #36a3f7" class="iconStyle el-icon-s-goods"></i></div>
          <div style="text-align: center">
            <p style="line-height: 18px;color: rgba(0,0,0,0.4);font-size: 14px;margin-bottom: 12px">{{item.name}}</p>
            <p style="font-weight: 400;-webkit-box-direction: normal;font-size: 24px">{{item.user_order_length}}单</p>
          </div>
        </div>
      </el-col>
    </el-row>



    <div class="dashboard-text">价格&名额信息</div>

    <el-row :gutter="20">
      <el-col :span="6" v-for="(item,index) in courseNum" :key="index">
        <div class="grid-content bg-purple" >
          <div><i  style="color: #40c9c6" class="iconStyle el-icon-user-solid"></i></div>
          <div style="text-align: center">
            <p style="line-height: 18px;color: rgba(0,0,0,0.4);font-size: 14px;margin-bottom: 12px">{{item.name}}</p>
            <p style="font-weight: 400;-webkit-box-direction: normal;font-size: 18px">{{item.class_orPrice}}/{{item.coursePrice}}￥</p>
            <p style="font-weight: 400;-webkit-box-direction: normal;font-size: 18px"> {{item.studentsNum}}/余{{item.surplus_student}} 人</p>
          </div>
        </div>
      </el-col>
    </el-row>





    <audio controls="controls" ref="newOrder" class="audio-class">
      <source src="./dd.mp3" type="audio/mp3">
    </audio>



  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Notification } from 'element-ui';
import {getHomeInfo} from "@/api/home";

export default {
  name: 'home',
  filters: {
    iconFilter(index) {
      const iconMap = [
         'el-icon-user-solid',
         'el-icon-s-goods',
         'el-icon-s-order',
         'el-icon-notebook-1'
      ]
      return iconMap[index]
    },
    iconFilterGood(index) {
      const iconMap = [
        'el-icon-s-goods',
        'el-icon-s-goods',
        'el-icon-s-goods',
        'el-icon-s-goods'
      ]
      return iconMap[index]
    },
    colorFilter(index){
      const colorMap = [
        {color:'#40c9c6'},
        {color:'#36a3f7'},
        {color:'#f4516c'},
        {color:'#34bfa3'},
      ]
      return colorMap[index]

    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data(){
    return{
      //总信息
      dataInfo:[],
    //  课程订单信息
      courseNum:[]
    }
  },

  created () {

    this.getHomeData()

  },

  mounted () {
    this.WebSocketTest()
  },
  methods:{

     async getHomeData(){
      const {data:res}=await getHomeInfo().catch(error=>error)
      this.dataInfo=res.infoNum
      this.courseNum=res.courseNum
     },

     WebSocketTest(){
       // 打开一个 web socket
       let ws = new WebSocket("wss://order.meishuquanyunxiao.com/v1/adminSocket");
       ws.onmessage =  evt => {
         let received_msg = JSON.parse(evt.data);
         this.$notify({
           title: '新订单提醒',
           message: received_msg.name
         });
         this.$refs.newOrder.play();
       };

       ws.onclose = function(){
         // 关闭 websocket
         console.log("连接已关闭...");
       };
    }
  }
}
</script>

<style lang="scss" scoped>

  .emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }

  .dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
    margin-bottom: 30px;
  }
}
.audio-class {
  height: 0;  // * 重要
}

.iconStyle{
  font-size: 60px;
  transition: all .38s ease-out;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 108px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 2px 20px rgba(0,0,0,.1);
  background: white;
  cursor: pointer;
  margin-bottom: 10px;
}


.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}


</style>
