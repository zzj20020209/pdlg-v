<template>
    <div>
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
            <el-button type="success" @click="shdgcx(scope.row.sid)">编辑</el-button>

            <el-popconfirm title="确定删除这条记录吗？" @confirm="delsh(scope.row.sid)">
              <el-button type="danger" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @current-change="pagechange" layout="prev, pager, next" :total="total" :page-size="5">
      </el-pagination>

      <el-dialog title="编辑页面" :visible.sync="dialogFormVisible">
        <!--将编辑页面子组件加入到列表页面 -->
        <div>
          <input v-model="sid" hidden="hidden"/><br>
          商户名:
          <el-input v-model="shm" placeholder="请输入商户名"></el-input>
          <br>
          用户名:
          <el-input v-model="yhm" placeholder="请输入用户名"></el-input>
          <br>
          密　码:
          <el-input v-model="password" placeholder="请输入密码"></el-input>
          <br>
          地　址:
          <el-input v-model="address" placeholder="请输入地址"></el-input>
          <br>
          电　话:
          <el-input v-model="stele" placeholder="请输入联系电话"></el-input>
          <br>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="shxg()" >确 定</el-button>
        </div>
      </el-dialog>


    </div>
</template>

<script>
  export default {
    name: 'Sh',
    data() {
      return {
        tableData: [],
        dialogFormVisible: false,
        total:1,
        page:1,
        shm: "",
        yhm: "",
        password: "",
        address: "",
        stele: "",
        sid:""
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
          /*alert(error)*/
        });

      },
      delsh(val) { //删除数据
        var _this = this;
        var params = new URLSearchParams();
        params.append("sid", val);

        this.$axios.post("shdel", params).
        then(function(result) {
          _this.$message({
            message: result.data,
            type: 'success'
          });
          //刷新数据
          _this.getData();
        }).      catch(function() {
          _this.$message({
            message: '删除失败',
            type: 'success'
          });
        });
      },
      shdgcx(val) { //编辑按钮按下  打开编辑模态框
        //获取到要编辑的巨记录  通过val（id）
        this.dialogFormVisible = true;
        var _this = this
        var params = new URLSearchParams();
        params.append("sid", val);

        this.$axios.post("/shcxdg", params).then(function (result) {
          _this.shm = result.data.sname;
          _this.yhm=result.data.yhm;
          _this.password=result.data.password;
          _this.address=result.data.address;
          _this.stele=result.data.stele;
          _this.sid=result.data.sid;
        }).catch(function (error) {
          alert(error)
        });
      },
      shxg(){
        this.dialogFormVisible = false;
        var _this = this
        var params = new URLSearchParams();
        params.append("sid", _this.sid);
        params.append("sname",_this.shm);
        params.append("yhm",_this.yhm);
        params.append("password",_this.password);
        params.append("address",_this.address);
        params.append("stele",_this.stele);

        this.$axios.post("/shxg", params).then(function (result) {
          _this.$message({
            message: result.data,
            type: 'success'
          });
          //刷新数据
          _this.getData();
        }).catch(function (error) {
          alert("修改失败:"+error)
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
