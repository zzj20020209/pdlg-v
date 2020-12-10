<template>
    <div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="sid" label="ID" width="180">
        </el-table-column>
        <el-table-column prop="sname" label="用户名" width="180">
        </el-table-column>
        <el-table-column prop="yhm" label="账号">
        </el-table-column>
        <el-table-column prop="password" label="密码">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column prop="stele" label="手机号">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" @click="">编辑</el-button>

            <el-popconfirm title="确定删除这条记录吗？" @confirm="">
              <el-button type="danger" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  /*import Edituser from "../components/edituser.vue"*/

  export default {
    name: 'Sh',
    data() {
      return {
        tableData: [],
        dialogFormVisible: false,
        total:1,
        page:1
      }
    },
    methods: {
      getData() { //获取数据方法

        var _this = this;

        var params = new URLSearchParams();
        params.append("page", this.page);

        this.$axios.post("/shcxs",params).
        then(function(result) {
          _this.tableData = result.data.rows;
          _this.total = result.data.total;
        }).
        catch(function(error) {
          alert(error)
        });

      },
      /*deluser(val) { //删除数据
        var _this = this;
        var params = new URLSearchParams();
        params.append("id", val);

        this.$axios.post("deteleuser.action", params).
        then(function(result) {
          _this.$message({
            message: result.data.msg,
            type: 'success'
          });

          //刷新数据
          _this.getData();

        }).
        catch(function() {
          _this.$message({
            message: '删除失败',
            type: 'success'
          });
        });

      },
      edituser(val) { //编辑按钮按下  打开编辑模态框
        //获取到要编辑的巨记录  通过val（id）
        this.dialogFormVisible = true;

      },
      pagechange(pageindex){  //页码变更时
        //console.log(pageindex)
        this.page = pageindex;
        //根据pageindex  获取数据
        this.getData();

      }*/
    },
    created() { //钩子函数  vue对象初始化完成后  执行
      this.getData();
    }/*,
    components: { //子组件
      edituser: Edituser
    }*/
  }
</script>

<style scoped>

</style>
