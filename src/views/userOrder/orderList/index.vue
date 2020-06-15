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
      label="订单创建时间"
      prop="created_at">
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

      <template slot-scope="{row}">
        <span>{{row.address.full_address_add}}</span>

        <el-button  type="text"  size="mini" v-clipboard:copy="row.address.full_address_add" v-clipboard:success="clipboardSuccess">
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
          @click="handleSendOK(scope.$index, scope.row)">{{scope.row.send_type===1?"发货":"已发货"}}</el-button>
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


  <!--  dialog-->
  <el-dialog title="发货信息" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="ruleForm">

      <el-form-item label="快递单号" :label-width="formLabelWidth"  prop="exNum">
        <el-input v-model="form.exNum" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="快递公司" :label-width="formLabelWidth" >
        <el-select v-model="value" placeholder="请选择快递公司">

          <el-option
            v-for="item in form.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>

        </el-select>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="clickOk">确 定</el-button>
    </div>
  </el-dialog>

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

            tableData: [],
            value: '',
            dialogFormVisible: false,
            form: {
              exNum: '',
              orderID:null,
              options: [
                {value: '申通快递',label: '申通快递'},
                {value: '圆通快递',label: '圆通快递'},
                {value: '中通快递',label: '中通快递'},
                {value: '韵达快递',label: '韵达快递'},
                {value: '顺丰快递',label: '顺丰快递'},
              ], //课程目录分类
            },
            rules: {
              exNum: [
                { required: true, message: '请输入快递单号', trigger: 'blur' },
                { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
              ]
            },
            formLabelWidth: '80px'

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



      async fetchData (page ,size){
        //待发货订单
        let params ={
          send_type:1,
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
              operator:this.name, //操作人
              send_type:2,  //发货状态
              ExName:this.value, //快递名字
              exRegion:this.form.exNum,  // 快递单号
              order_id:Number(this.form.orderID)
            }
            const res= await upUserOrderSendType(params).catch( error => error)

            console.log(res,"-----res-----");
            if (res.code !== 20000){
              return  this.$message.error(res.msg);
            }
            this.dialogFormVisible=false
            this.$refs.ruleForm.resetFields() //清空上一次填充的数据
            this.fetchData(this.page,this.size);
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
