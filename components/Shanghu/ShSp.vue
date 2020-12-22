<template>
    <div>
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="用户账号">
          <el-input v-model="yhmcx" placeholder="输入用户账号查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="sid" label="id" width="180">
        </el-table-column>
        <el-table-column prop="sname" label="商户名" width="180">
        </el-table-column>
        <el-table-column prop="yhm" label="用户名">
        </el-table-column>
        <el-table-column prop="password" label="密码">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column prop="stele" label="手机号">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-popconfirm title="确定同意这条申请吗？" @confirm="shspcg(scope.row.sid)">
            <el-button type="success" slot="reference">通过</el-button>
            </el-popconfirm>
            <el-popconfirm title="确定拒绝这条申请吗？" @confirm="shspjj(scope.row.sid)">
              <el-button type="danger" slot="reference">拒绝</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @current-change="pagechange" layout="prev, pager, next" :total="total" :page-size="5">
      </el-pagination>

    </div>
</template>

<script>
  export default {
    name: 'ShSp',
    data() {
      return {
        tableData: [],
        dialogFormVisible: false,
        total:1,
        page:1,
        shm: "",
        yhmcx: "",
        password: "",
        address: "",
        stele: "",
        sid:"",
        sname:""
      }
    },
    methods: {
      getData() { //获取数据方法

        var _this = this;

        var params = new URLSearchParams();
        params.append("page", this.page);
        params.append("yhm", this.yhmcx);
        this.$axios.post("/shspcxs",params).
        then(function(result) {
          _this.tableData = result.data.rows;
          _this.total = result.data.total;
        }).
        catch(function(error) {
          /*alert(error)*/
        });

      },onSubmit(){
        this.getData()
      },
      shspcg(val){
        var _this = this;
        var params = new URLSearchParams();
        params.append("sid", val);

        this.$axios.post("shspcg", params).
        then(function(result) {
          _this.$message({
            message: result.data,
            type: 'success'
          });
          //刷新数据
          _this.getData();
        }).catch(function() {
          _this.$message({
            message: '审批失败',
            type: 'success'
          });
        });
      },
      shspjj(val) { //拒绝
        var _this = this;
        var params = new URLSearchParams();
        params.append("sid", val);

        this.$axios.post("shspsb", params).
        then(function(result) {
          _this.$message({
            message: result.data,
            type: 'success'
          });
          //刷新数据
          _this.getData();
        }).catch(function() {
          _this.$message({
            message: '审批失败',
            type: 'success'
          });
        });
      },
      pagechange(pageindex){  //页码变更时
        //console.log(pageindex)
        this.page = pageindex;
        //根据pageindex  获取数据
        this.getData();
      }
    },
    created() { //钩子函数  vue对象初始化完成后  执行
      this.getData();
    }
  }
</script>

<style scoped>

</style>
