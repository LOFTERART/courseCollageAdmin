
<template>
  <div class="app-container">
<!--    add buttton-->
<!--    <el-button type="success" icon="el-icon-plus" @click="dialogVisible = true" class="addButton">添加</el-button>-->
    <el-button type="success" icon="el-icon-plus" @click="createCourse" class="addButton">添加</el-button>

<!--    table-->

    <el-table  :data="list"  stripe >


      <el-table-column type="expand">
        <template slot-scope="{row}">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="活动开始时间">
              <span>{{ row.startTime |timeStamp }}</span>
            </el-form-item>
            <el-form-item label="活动结束时间">
              <span>{{ row.endTime |timeStamp}}</span>
            </el-form-item>

            <el-form-item label="活动创建时间">
              <span>{{ row.date }}</span>
            </el-form-item>

            <el-form-item label="标记">
              <span>{{ row.mark }}</span>
            </el-form-item>

            <el-form-item label="书籍">
              <span>{{ row.book_list?row.book_list.length:0 }}本</span>
            </el-form-item>

            <el-form-item label="书籍名字" v-for="(item,index) in row.book_list" :key="item.id">
              <span><< {{ item.title }} >></span>
            </el-form-item>


          </el-form>
        </template>
      </el-table-column>


      <el-table-column  label="ID" >
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column   label="创建人">
        <template slot-scope="{row}">
          <span >{{ row.creata_people }}</span>
        </template>
      </el-table-column>

      <el-table-column   label="排序/编号">
        <template slot-scope="{row}">
          <span>{{ row.sort_num }}</span>
        </template>
      </el-table-column>

      <el-table-column   label="科目">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column   label="课程标题">
        <template slot-scope="{row}">
          <span>{{ row.courseName }}</span>
        </template>
      </el-table-column>

      <el-table-column   label="价格/人数" width="400px">
        <template slot-scope="{row}">
          <span>原价/优惠价:{{ row.class_orPrice }}￥/{{ row.coursePrice}}￥</span>
          <span> &nbsp &nbsp人数/剩余:{{ row.studentsNum }}/{{ row.surplus_student }}</span>
        </template>
      </el-table-column>



      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="{row}">
          <router-link :to="'/course/reEdit/'+row.id">
            <el-button type="text" size="small">
              编辑
            </el-button>
          </router-link>
        </template>
      </el-table-column>


<!--
 <el-table-column align="center" label="状态" >
        <template slot-scope="scope">
          <el-switch
            @change="clickSwitch(scope.row,scope.$index)"
            :value="scope.row.status"
            active-text="启用"
            inactive-text="关闭">
          </el-switch>

        </template>
      </el-table-column>
-->



<!--
    <el-table-column  label="名称" align="center">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.name" class="edit-input" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              取消
            </el-button>
          </template>
          <span v-else>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="功能" >

        <template slot-scope="{row}">
          <el-button
            v-if="row.edit"
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(row)"
          >
            确定
          </el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="row.edit=!row.edit"
          >
            修改
          </el-button>
        </template>

      </el-table-column>
-->




      </el-table>


<!--    dialog-->
    <el-dialog
      :show-close="false"
      title="增加分类"
      :visible.sync="dialogVisible"
      width="50%"
    >

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"  label-position="right">

        <el-form-item label="课程分类" prop="name">
          <el-input v-model="ruleForm.name"  placeholder="课程分类名字"></el-input>
        </el-form-item>

        <el-form-item label="课程备注" prop="desc">
          <el-input v-model="ruleForm.desc" placeholder="备注信息"> </el-input>
        </el-form-item>

        <el-form-item label="课程名字" prop="courseTitle">
          <el-input v-model="ruleForm.courseTitle" placeholder="课程名字"></el-input>
        </el-form-item>

        <el-form-item label="课程排序" prop="sort_num">

          <div style="display: flex;flex-direction: row;align-items: center">
            <el-input v-model="ruleForm.sort_num" placeholder="课程排序" type="number"  style="width: 400px"></el-input>
            <span style="font-size: 12px;margin-left: 10px;color: #606266">数字越大越靠前</span>
          </div>

        </el-form-item>


        <el-form-item label="活动时间" prop="activeTime">

          <el-date-picker
            v-model="ruleForm.activeTime"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"

            :default-time="['12:00:00', '08:00:00']">
          </el-date-picker>

        </el-form-item>



        <div style="display: flex;flex-direction: row">
          <el-form-item label="原价" prop="orPrice">
            <el-input
              type="number"
              placeholder="原价"
              suffix-icon="el-icon-money"
              v-model="ruleForm.orPrice">
            </el-input>
          </el-form-item>

          <el-form-item label="优惠价" prop="price">
            <el-input
              type="number"
              placeholder="优惠价"
              suffix-icon="el-icon-money"
              v-model="ruleForm.price">
            </el-input>
          </el-form-item>

          <el-form-item label="课程人数" prop="stuNumber">
            <el-input
              type="number"
              placeholder="人数"
              suffix-icon="el-icon-user"
              v-model="ruleForm.stuNumber">
            </el-input>
          </el-form-item>


        </div>




      </el-form>



      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="clickDone('ruleForm')">确 定</el-button>
     </span>

    </el-dialog>


  </div>
</template>

<script>
  import {getCourseList,createCourse} from "@/api/course"
  import { mapGetters } from 'vuex'
  export default {
    name: 'index',
    computed: {
      ...mapGetters([
        'name'
      ])
    },


    filters:{

      timeStamp(val){
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

    data() {
      return {
        dialogVisible: false,
        ruleForm: {
          name: '',
          desc: '',//备注
          activeTime:null,//活动时间
          courseTitle:'', //课程名字
          sort_num:'',
          orPrice:"",//原价
          price:"", //优惠价
          stuNumber:"",
        },
        rules: {
          name: [
            { required: true, message: '请输入课程分类名称', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          desc: [
            { required: false, message: '请填写课程备注信息', trigger: 'blur' }
          ],
          activeTime: [
            { required: true, message: '请填写活动时间', trigger: 'blur' }
          ],
          courseTitle: [
            { required: true,min: 2, max: 50, message: '请填写课程名字', trigger: 'blur' }
          ],
          orPrice: [
            { required: true, message: '请填写课程原价', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请填写课程现在价格', trigger: 'blur' }
          ],
          stuNumber: [
            { required: true, message: '请填写课程人数', trigger: 'blur' }
          ],
          sort_num: [
            { required: true, message: '请填写课程排序', trigger: 'blur' }
          ]
        },
        list: [],
      }
    },
    created() {
      this.getCourse()
    },
    methods: {

      //获取课程分类
      async getCourse(){
        const res= await getCourseList().catch( error => error)
        if (res.code !== 20000){
          return  this.$message.error(res.msg);
        }
        this.list=res.data.map(v => {
          this.$set(v, 'edit', false)
          v.originalTitle = v.name
          return v
        })

      },
      //创建课程分类
      clickDone(rule){
        this.$refs[rule].validate( async valid => {
          if (valid) {
            let params ={
              name:this.ruleForm.name,
              mark:this.ruleForm.desc,
              create_people:this.name, //vuex获取
              sub_name:this.ruleForm.courseTitle,
              class_price:Number(this.ruleForm.price),
              class_orPrice:Number(this.ruleForm.orPrice),
              class_time:this.ruleForm.activeTime[0],
              class_end_time:this.ruleForm.activeTime[1],
              class_student:Number(this.ruleForm.stuNumber),
              sort_num:Number(this.ruleForm.sort_num), //排序
            }
            const {data:res}= await createCourse(params).catch( error => error)
            if (res.code !== 20000){
              return  this.$message.error(res.msg);
            }
            this.dialogVisible=false
            this.$refs.ruleForm.resetFields() //清空上一次填充的数据
            this.getCourse()
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },


      //切换
      createCourse(){
        this.$router.push({ path: '/course/editgoods' })
      },


      cancelEdit(row) {
        row.name = row.originalTitle
        row.edit = false
        this.$message({
          message: '取消修改',
          type: 'warning'
        })
      },
      confirmEdit(row) {
        console.log(row,"row");
        row.edit = false
        row.originalTitle = row.name
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      },


    //  状态切换
      clickSwitch (info,index){
        console.log(info,"----",!(this.list[index].status));
        this.list[index].status = !(this.list[index].status)
      }

    }
  }

</script>

<style scoped>

  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
  .addButton{
    margin-bottom: 20px;
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



