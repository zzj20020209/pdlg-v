<template>
  <div align="left">

    <el-button class="el-button el-icon-plus el-button--success" @click="dialogVisible = true">
      添加新的员工
    </el-button>

    <el-button class="el-button el-icon-plus el-button--danger" @click="deleteall">
      批量删除
    </el-button>

    <el-input style="width: 200px;margin-left: 20px" placeholder="请输入要查询的关键字" v-model="search" @blur="sou"></el-input>

    <el-select style="width: 210px" v-model="sex" @change="sexs">
      <el-option value="全部性别">全部性别</el-option>
      <el-option value="男">男</el-option>
      <el-option value="女">女</el-option>
    </el-select>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%;text-align: center"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="ename"
        label="员工名字"
        width="110%">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="110%">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="100%">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        width="140%">
      </el-table-column>
      <el-table-column
        prop="idCard"
        label="身份证"
        width="200%">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="120%">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="warning"
            size="mini"
            @click="Edit(scope.row.id)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="Delete(scope.row.id)" v-popover:popover5>删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="addClose">
      <el-form ref="empAdd" :model="empAdd" label-width="100px">
        <el-form-item label="员工名字:" prop="ename">
          <el-input placeholder="请输入内容" v-model="empAdd.ename"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="10">
            <el-form-item label="员工年龄:" prop="age">
              <el-input style="width: 210px" placeholder="请输入内容" v-model="empAdd.age"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" class="el-col-offset-3">
            <el-form-item label="员工性别:" prop="sex">
              <el-select style="width: 210px" v-model="empAdd.sex" placeholder="请选择">
                <el-option value="男">男</el-option>
                <el-option value="女">女</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="用户名:" prop="username">
          <el-input placeholder="请输入内容" v-model="empAdd.username"></el-input>
        </el-form-item>

        <el-form-item label="密码:" prop="password">
          <el-input placeholder="请输入内容" v-model="empAdd.password"></el-input>
        </el-form-item>

        <el-form-item label="确认密码:">
          <el-input placeholder="请输入内容" v-model="empAdd.password1"></el-input>
        </el-form-item>

        <el-form-item label="电话号码:" prop="phone">
          <el-input placeholder="请输入内容" v-model="empAdd.phone"></el-input>
        </el-form-item>

        <el-form-item label="身份证:" prop="idCard">
          <el-input placeholder="请输入内容" v-model="empAdd.idCard"></el-input>
        </el-form-item>

        <el-form-item label="员工住址:" prop="address">
          <el-input placeholder="请输入内容" v-model="empAdd.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="empadd">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="upts"
      width="50%"
      :before-close="addClose">
      <el-form ref="empUpt" :model="empUpt" label-width="100px">
        <el-form-item label="员工名字:" prop="ename">
          <el-input placeholder="请输入内容" v-model="empUpt.ename"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="10">
            <el-form-item label="员工年龄:" prop="age">
              <el-input style="width: 210px" placeholder="请输入内容" v-model="empUpt.age"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" class="el-col-offset-3">
            <el-form-item label="员工性别:" prop="sex">
              <el-select style="width: 210px" v-model="empUpt.sex" placeholder="请选择">
                <el-option value="男">男</el-option>
                <el-option value="女">女</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="用户名:" prop="username">
          <el-input placeholder="请输入内容" v-model="empUpt.username"></el-input>
        </el-form-item>

        <el-form-item label="密码:" prop="password">
          <el-input placeholder="请输入内容" v-model="empUpt.password"></el-input>
        </el-form-item>

        <el-form-item label="确认密码:">
          <el-input placeholder="请输入内容" v-model="empUpt.password1"></el-input>
        </el-form-item>

        <el-form-item label="电话号码:" prop="phone">
          <el-input placeholder="请输入内容" v-model="empUpt.phone"></el-input>
        </el-form-item>

        <el-form-item label="身份证:" prop="idCard">
          <el-input placeholder="请输入内容" v-model="empUpt.idCard"></el-input>
        </el-form-item>

        <el-form-item label="员工住址:" prop="address">
          <el-input placeholder="请输入内容" v-model="empUpt.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="upts = false">取 消</el-button>
        <el-button type="primary" @click="empupt">确 定</el-button>
      </span>
    </el-dialog>
    <el-pagination @current-change="pagechange" layout="prev, pager, next" :total="total" :page-size="rows">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "employee",
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      visible2: false,
      total: 1,
      page: 1,
      rows: 5,
      empUpt: {
        ename: "",
        sex: "",
        age: 18,
        username: "",
        password: "",
        password1: "",
        phone: "",
        idCard: "",
        address: ""
      },
      sex: "",
      search: "",
      empAdd: {
        ename: "",
        sex: "",
        age: 18,
        username: "",
        password: "",
        password1: "",
        phone: "",
        idCard: "",
        address: ""
      },
      upts: false,
    }
  },
  methods: {
    getData() {
      var _this = this;
      var pamar = new URLSearchParams();
      pamar.append("page", this.page);
      pamar.append("rows", this.rows);

      this.$axios.post("/queryEmployeeCount.action", pamar).then(function (result) {
        _this.tableData = result.data.rows;
        _this.total = result.data.total;
      }).catch(function (error) {
        alert(error)
      });
    },
    sou() {
      var _this = this;
      var pamar = new URLSearchParams();
      pamar.append("page", this.page);
      pamar.append("rows", this.rows);
      pamar.append("employees", this.search);
      if (this.sex != "全部性别") {
        pamar.append("sex", this.sex);
      }

      this.$axios.post("/queryEmployeeCount.action", pamar).then(function (result) {
        _this.tableData = result.data.rows;
      }).catch(function (error) {
        alert(error)
      });
    },
    sexs() {
      var _this = this;
      var pamar = new URLSearchParams();
      pamar.append("page", this.page);
      pamar.append("rows", this.rows);
      pamar.append("employees", this.search);
      if (this.sex != "全部性别") {
        pamar.append("sex", this.sex);
      }

      this.$axios.post("/queryEmployeeCount.action", pamar).then(function (result) {
        _this.tableData = result.data.rows;
      }).catch(function (error) {
        alert(error)
      });
    },
    empadd(empadd) {
      let _this = this;
      let pamer = new URLSearchParams();
      pamer.append("ename", _this.empAdd.ename);
      pamer.append("sex", _this.empAdd.sex);
      pamer.append("age", _this.empAdd.age);
      pamer.append("username", _this.empAdd.username);
      pamer.append("password", _this.empAdd.password);
      pamer.append("phone", _this.empAdd.phone);
      pamer.append("idCard", _this.empAdd.idCard);
      pamer.append("address", _this.empAdd.address);
      /* this.$refs[this.empAdd].validate((valid) => {*/
      this.$axios.post("/addEmployee.action", pamer).then(function (result) {
        _this.dialogVisible = false;
        _this.getData();
        _this.$message(result.data.msg);
      }).catch(function (error) {
        alert(error)
      })
    },
    Edit() {
      this.$confirm('此操作将编辑该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.upts = true
      }).catch(function (error) {
        _this.$message({
          message: "已关闭",
          type: 'success'
        });
      });
    },
  upts(){
    let _this = this;
    let pamer = new URLSearchParams();
    pamer.append("ename", _this.empUpt.ename);
    pamer.append("sex", _this.empUpt.sex);
    pamer.append("age", _this.empUpt.age);
    pamer.append("username", _this.empUpt.username);
    pamer.append("password", _this.empUpt.password);
    pamer.append("phone", _this.empUpt.phone);
    pamer.append("idCard", _this.empUpt.idCard);
    pamer.append("address", _this.empUpt.address);
    /* this.$refs[this.empAdd].validate((valid) => {*/
    this.$axios.post("/uptEmployee.action", pamer).then(function (result) {
      _this.upts = false;
      _this.getData();
      _this.$message(result.data.msg);
    }).catch(function (error) {
      alert(error)
    })
  },
    Delete(id) {
      var _this = this;
      var pamar = new URLSearchParams();
      let ids = id + ","
      pamar.append("ids", ids);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post("/delEmployee.action", pamar).then(function (result) {
          _this.$message({
            message: result.data.msg,
            type: 'success'
          });
          _this.getData();
        }).catch(function (error) {
          _this.$message({
            message: "删除失败",
            type: 'success'
          });
        });
        _this.getData();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    addClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteall() {
      var _this = this;
      var pamar = new URLSearchParams();
      if (_this.$refs.multipleTable.selection.length != 0) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = "";
          _this.$refs.multipleTable.selection.forEach((item) => {
            ids += item.id + ",";
          })
          pamar.append("ids", ids);
          this.$axios.post("/delEmployee.action", pamar).then(function (result) {
            _this.$message({
              message: result.data.msg,
              type: 'success'
            });
            _this.getData();
          }).catch(function (error) {
            _this.$message({
              message: "删除失败",
              type: 'success'
            });
          });
          _this.getData();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else {
        _this.$message("请选择至少一条记录");
      }
    },
    pagechange(pageindex) {  //页码变更时
      this.page = pageindex;

      var _this = this;
      var pamar = new URLSearchParams();
      pamar.append("page", this.page);
      pamar.append("rows", this.rows);
      pamar.append("employees", this.search);
      pamar.append("sex", this.sex);

      this.$axios.post("/queryEmployeeCount.action", pamar).then(function (result) {
        _this.tableData = result.data.rows;
      }).catch(function (error) {
        alert(error)
      });

    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped>
.el-pagination {
  text-align: center;
}
</style>
