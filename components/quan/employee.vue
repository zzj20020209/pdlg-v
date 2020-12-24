<template>
  <div align="left">

    <el-button class="el-button el-icon-plus el-button--success" @click="dialogVisible = true">
      添加新的员工
    </el-button>

    <el-button class="el-button el-icon-plus el-button--danger" @click="empdeleteall">
      批量删除
    </el-button>

    <el-input style="width: 200px;margin-left: 100px" placeholder="请输入要查询的关键字" v-model="search" @blur="empsou"></el-input>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%;text-align: center"
      :row-class-name="tableRowClassName"
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
            @click="empEdit(scope.row.id)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="empDelete(scope.row.id)" v-popover:popover5>删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"

      :before-close="addClose">
      <el-form ref="empAdds" :model="empAdd" label-width="100px">
        <el-form-item label="员工名字:" prop="ename">
          <el-input placeholder="请输入内容" v-model="empAdd.ename"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="10">
            <el-form-item label="员工年龄:" prop="age">
              <el-input-number style="width: 210px" :max="50" :min="18" placeholder="请输入内容"
                               v-model="empAdd.age"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="10" class="el-col-offset-2">
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
          <el-input type="password" placeholder="请输入内容" v-model="empAdd.password"></el-input>
        </el-form-item>

        <el-form-item label="确认密码:" prop="password1">
          <el-input type="password" placeholder="请输入内容" v-model="empAdd.password1"></el-input>
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
        <el-button @click="empAddqu">取 消</el-button>
        <el-button type="primary" @click="empadd">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="upts"
      width="50%"
      :before-close="uptClose">
      <el-form ref="empUpts" :model="empUpt" label-width="100px">
        <el-form-item label="员工名字:" prop="ename">
          <el-input placeholder="请输入内容" v-model="empUpt.ename"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="10">
            <el-form-item label="员工年龄:" prop="age">
              <el-input-number :max="50" :min="18" style="width: 210px" placeholder="请输入内容"
                               v-model="empUpt.age"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="10" class="el-col-offset-2">
            <el-form-item label="员工性别:" prop="sex">
              <el-select style="width: 210px" v-model="empUpt.sex" placeholder="请选择">
                <el-option value="男">男</el-option>
                <el-option value="女">女</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="用户名:" prop="username">
          <el-input placeholder="请输入内容" v-model="empUpt.username" disabled="disabled"></el-input>
        </el-form-item>

        <el-form-item label="密码:" prop="password">
          <el-input type="password" placeholder="请输入内容" v-model="empUpt.password"></el-input>
        </el-form-item>

        <el-form-item label="确认密码:" prop="password1">
          <el-input type="password" placeholder="请输入内容" v-model="empUpt.password1"></el-input>
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
        <el-button @click="empUptqu">取 消</el-button>
        <el-button type="primary" @click="empupt(empUpt.id)">确 定</el-button>
      </span>
    </el-dialog>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="pagechange"
      :current-page="page"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="rows"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
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
        address: "",
        id: 0,
      },
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
    tableRowClassName({row, rowIndex}) {
      if (rowIndex % 2 === 0) {
        return 'warning-row';
      }
      return '';
    },
    empsou() {
      var _this = this;
      var pamar = new URLSearchParams();
      pamar.append("page", this.page);
      pamar.append("rows", this.rows);
      pamar.append("employees", this.search);

      this.$axios.post("/queryEmployeeCount.action", pamar).then(function (result) {
        _this.tableData = result.data.rows;
        _this.total = result.data.total;
      }).catch(function (error) {
        alert(error)
      });
    },
    empAddqu() {
      this.dialogVisible = false;
      this.$refs.empAdds.resetFields();
    },
    empUptqu(){
      this.upts = false;
      this.$refs.empUpts.resetFields();
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
        _this.$message({
          message: result.data.msg,
          type: 'success'
        });
        _this.$refs.empAdds.resetFields();
      }).catch(function (error) {
        alert(error)
      })
    },
    empEdit(id) {
      let _this = this;
      this.$confirm('此操作将编辑该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post("/queryEmployeeById.action?id=" + id).then(function (reust) {
          _this.empUpt.ename = reust.data.ename;
          _this.empUpt.sex = reust.data.sex;
          _this.empUpt.age = reust.data.age;
          _this.empUpt.username = reust.data.username;
          _this.empUpt.password = reust.data.password;
          _this.empUpt.phone = reust.data.phone;
          _this.empUpt.idCard = reust.data.idCard;
          _this.empUpt.address = reust.data.address;
          _this.empUpt.id = reust.data.id;
        }).catch(function (erreo) {
          alert(erreo)
        })
        this.upts = true
      }).catch(function (error) {
        _this.$message({
          message: "已撤消编辑",
          type: 'success'
        });
      });
    },
    empupt(id) {
      let _this = this;
      let pamer = new URLSearchParams();
      pamer.append("id", _this.empUpt.id);
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
        _this.$message({
          message: result.data.msg,
          type: 'success'
        });
        _this.$refs.empUpts.resetFields();
      }).catch(function (error) {
        alert(error)
      })
    },
    empDelete(id) {
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
          this.$refs.empAdds.resetFields()
          done();
        })
    },
    uptClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$refs.empUpts.resetFields()
          done();
        })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    empdeleteall() {
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
    pagechange(pageindex) {
      this.page = pageindex;
      var _this = this;
      var pamar = new URLSearchParams();
      pamar.append("page", this.page);
      pamar.append("rows", this.rows);
      pamar.append("employees", this.search);

      this.$axios.post("/queryEmployeeCount.action", pamar).then(function (result) {
        _this.tableData = result.data.rows;
        _this.total = result.data.total;
      }).catch(function (error) {
        alert(error)
      });
    },
    handleSizeChange(size) {
      this.rows = size;

      var _this = this;
      var pamar = new URLSearchParams();
      pamar.append("page", this.page);
      pamar.append("rows", this.rows);
      pamar.append("employees", this.search);

      this.$axios.post("/queryEmployeeCount.action", pamar).then(function (result) {
        _this.tableData = result.data.rows;
        _this.total = result.data.total;
      }).catch(function (error) {
        alert(error)
      });
    },
  },
  created() {
    this.getData();
  }
}
</script>

<style scoped>
.el-pagination {
  text-align: center;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
