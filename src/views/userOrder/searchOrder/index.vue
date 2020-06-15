<template>


  <div class="app-container">

    <div style="display: flex;flex-direction: row;width: 400px;margin-bottom: 40px;box-sizing: border-box">

      <el-input v-model="searchContent" placeholder="请输入下单电话查询" clearable @clear="clickClear"></el-input>
      <el-button
        @click="clickSearch"
        type="primary" icon="el-icon-search" style="margin-left: 10px" size="medium">搜索一下</el-button>

    </div>

    <el-table
      :row-class-name="tableRowClassName"
      stripe
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="#"
        type="index"
      >
      </el-table-column>

      <el-table-column
        label="发货日期"
        prop="express_created_at">
      </el-table-column>

      <el-table-column
        label="快递"
        prop="express">
      </el-table-column>

      <el-table-column
        label="快递单号"
        prop="express_number">
      </el-table-column>

      <el-table-column
        label="发货人"
        prop="operator">
      </el-table-column>



      <el-table-column
        label="姓名"
        prop="address.true_name">
      </el-table-column>

      <el-table-column
        label="电话"
        prop="address.tel_phone">
      </el-table-column>

      <el-table-column
        label="省份"
        prop="address.province">
      </el-table-column>


      <el-table-column
        label="详细地址"
         width="400">

        <template slot-scope="scope">
          <span>{{scope.row.address.full_address_add}}</span>

          <el-button  type="text"  size="mini" v-clipboard:copy="scope.row.address.full_address_add" v-clipboard:success="clipboardSuccess">
            复制
          </el-button>


        </template>

      </el-table-column>


      <el-table-column
        label="科目"
        prop="course.name">
      </el-table-column>

      <el-table-column
        label="课程内容"
        prop="course.courseName">
      </el-table-column>

      <el-table-column
        align="right">

        <template slot-scope="scope">
          <el-button
            icon="el-icon-truck"
            slot="reference" size="mini"
            type="danger"
           >{{scope.row.send_type===1?"发货":"已发货"}}</el-button>
        </template>
      </el-table-column>


    </el-table>


  </div>

</template>

<script>
  import {getUserOrder,upUserOrderSendType} from "@/api/order";
  import clipboard from '@/directive/clipboard/index.js'
  import { mapGetters } from "vuex"; // use clipboard by v-directive
  export default {
    name: "index",
    directives: {
      clipboard
    },
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    data(){
      return{

        page:1,
        size:10,
        total:0,
        //搜索
        searchContent:"",

        tableData: [],

        dialogFormVisible: false,
        form: {
          exName: '',
          exRegion: '',
          orderID:null
        },
        rules: {
          exName: [
            { required: true, message: '请输入快递单号', trigger: 'blur' },
            { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
          ]
        },
        formLabelWidth: '80px'

      }

    },



    methods:{

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.size=val
        this.fetchData(this.page,this.size);
        console.log(11,"-----每页----");
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page=val
        this.fetchData(val,this.size);
        console.log(11,"-----当前页----");
      },

      //    清空搜索
      clickClear(){
        this.fetchData();
      },
      // 搜索列表
      async clickSearch(){
        if (!this.searchContent){
          this.$message.error('请输入搜索内容');
          this.fetchData(this.page,this.size);
        }
        console.log(this.searchContent);

        //待发货订单
        let params ={
          tel_phone:this.searchContent,
          page:1,
          size:5,
        }
        const res=await getUserOrder(params).catch( error => error)

        if (res.code !== 20000){
          return  this.$message.error(res.msg);
        }
        this.tableData=res.data.items
        this.total=res.data.total

      },


      //点击发货
      handleSend(){
      },
      //确认发货
      handleSendOK(index,row){
        this.dialogFormVisible = true
        this.form.orderID=row.id
      },

      //发货
      clickOk(){
        this.$refs.ruleForm.validate( async valid => {
          if (valid) {
            let params ={
              operator:this.name,
              send_type:2,
              exName:this.form.exRegion,
              exRegion:this.form.exName,
              order_id:Number(this.form.orderID)
            }
            const res= await upUserOrderSendType(params).catch( error => error)

            console.log(res,"-----res-----");
            if (res.code !== 20000){
              return  this.$message.error(res.msg);
            }
            this.dialogFormVisible=false
            this.$refs.ruleForm.resetFields() //清空上一次填充的数据
            this.fetchData();
            this.$message({
              message: '恭喜你，发货成功',
              type: 'success'
            });

          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },

      //  地址复制
      clipboardSuccess() {
        this.$message({
          message: '复制成功',
          type: 'success',
          duration: 1500
        })
      },


      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      }

    }


  }
</script>

<style scoped>
  .el-table .warning-row {
    background: #fdf5e6;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

