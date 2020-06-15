<template>


  <div class="app-container">



    <el-table
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
        sortable
        prop="express_created_at">
      </el-table-column>
      <el-table-column
        label="快递名称"
        prop="express">
      </el-table-column>
      <el-table-column
        label="快递单号"
        prop="express_number">
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
        sortable
        label="操作人"
        prop="operator">
      </el-table-column>

    <el-table-column
        label="订单号"
        prop="merchant_order">
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
        label="发货状态"
        align="right">

        <template slot-scope="scope">
          <el-button
            slot="reference" size="mini"
            type="danger"
           >已发货</el-button>
        </template>
      </el-table-column>


    </el-table>


    <div style="margin-top: 20px;float: right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total,sizes,prev, pager, next"
        :page-sizes="[10, 15, 20]"
        :total="total">
      </el-pagination>

    </div>




  </div>

</template>

<script>
  import {getUserOrder,upUserOrderSendType} from "@/api/order";
  import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive
  export default {
    name: "index",
    directives: {
      clipboard
    },
    data(){
      return{

        page:1,
        size:10,
        total:0,
        tableData: [],

      }

    },

    created() {
      this.fetchData(this.page,this.size);
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
      //    搜索
      async clickSearch(){
        if (!this.searchContent){
          this.$message.error('请输入搜索内容');
          this.fetchData(this.page,this.size);
        }
        console.log(this.searchContent);

        //已发货订单
        let params ={
          tel_phone:this.searchContent,
          page:1,
          size:5
        }
        const res=await getUserOrder(params).catch( error => error)

        if (res.code !== 20000){
          return  this.$message.error(res.msg);
        }
        this.tableData=res.data.items
        this.total=res.data.total

      },

      async fetchData (page ,size){
        //待发货订单
        let params ={
          send_type:2,
          page:page,
          size:size,
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
      }




    }


  }
</script>

<style scoped>
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
