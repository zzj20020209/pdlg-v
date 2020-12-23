<template>
  <div>
    <el-button class="el-button el-icon-plus el-button el-button--success" @click="addRoles = true">
      添加新的角色
    </el-button>
    <el-input style="width: 200px;margin-left: 250px" placeholder="请输入要查询的关键字" v-model="search"
              @blur="rolesou"></el-input>

    <el-table
      :data="tabData"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="rolename"
        label="角色名称"
      >
      </el-table-column>
      <el-table-column
        prop="explain"
        label="权限介绍"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="warning"
            size="mini"
            @click="roleEdit(scope.row.rid)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="roleDelete(scope.row.rid)" v-popover:popover5>删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="pagechange"
      :current-page="page"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="rows"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <el-dialog
      title="提示"
      :visible.sync="addRoles"
      width="50%"
      :before-close="addRoleClose">
      <el-form ref="roleaddDialog" :model="roleadd" label-width="100px">
        <el-form-item label="角色名称:" prop="rolename">
          <el-input placeholder="请输入内容" v-model="roleadd.rolename"></el-input>
        </el-form-item>
        <el-form-item label="权限说明:" prop="explain">
          <el-input placeholder="请输入内容" v-model="roleadd.explain"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleAddqu">取 消</el-button>
        <el-button type="primary" @click="roleAdd">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="uptRoles"
      width="50%"
      :before-close="uptRoleClose">
      <el-form ref="roleuptDialog" :model="roleupt" label-width="100px">
        <el-form-item label="角色名称:" prop="rolename">
          <el-input placeholder="请输入内容" v-model="roleupt.rolename"></el-input>
        </el-form-item>
        <el-form-item label="权限说明:" prop="explain">
          <el-input placeholder="请输入内容" v-model="roleupt.explain"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleUptqu">取 消</el-button>
        <el-button type="primary" @click="roleUpt(roleupt.rid)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Role",
  data() {
    return {
      tabData: [],
      page: 1,
      rows: 5,
      total: 1,
      search: "",
      addRoles: false,
      uptRoles: false,
      roleadd: {
        rolename: "",
        explain: ""
      },
      roleupt: {
        rid: "",
        rolename: "",
        explain: ""
      }
    }
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (rowIndex % 2 === 0) {
        return 'warning-row';
      }
      return '';
    },
    getData() {
      let _this = this;
      let parmer = new URLSearchParams();
      parmer.append("page", this.page);
      parmer.append("rows", this.rows);
      _this.$axios.post("/queryRoleCount.action", parmer).then(function (reuslt) {
        _this.tabData = reuslt.data.rows;
        _this.total = reuslt.data.total;
      }).catch(function (error) {
        alert(error)
      })
    },
    rolesou() {
      let _this = this;
      let parmer = new URLSearchParams();
      parmer.append("page", this.page);
      parmer.append("rows", this.rows);
      parmer.append("rolename", this.search);
      _this.$axios.post("/queryRoleCount.action", parmer).then(function (reuslt) {
        _this.tabData = reuslt.data.rows;
        _this.total = reuslt.data.total;
      }).catch(function (error) {
        alert(error)
      })
    },
    roleAdd() {
      let _this = this;
      let parmer = new URLSearchParams();
      parmer.append("rid", 0);
      parmer.append("rolename", this.roleadd.rolename);
      parmer.append("explain", this.roleadd.explain);
      this.$axios.post("/addRole.action", parmer).then(result => {
        this.addRoles = false;
        this.$refs.roleaddDialog.resetFields();
        this.getData();
        if (!this.$message({
          message: result.data.msg,
          type: 'success'
        })) {
          this.$message({
            message: result.data.msg,
            type: 'warning'
          })
        }
      }).catch(error => {
        alert(error)
      })
    },
    roleAddqu() {
      this.addRoles = false;
      this.$refs.roleaddDialog.resetFields();
    },
    addRoleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$refs.roleaddDialog.resetFields()
          done();
        })
    },
    roleEdit(rid) {
      this.$confirm('此操作将编辑该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post("/queryRoleById.action?rid=" + rid).then(result => {
          this.uptRoles = true;
          this.roleupt.rid = result.data.rid;
          this.roleupt.rolename = result.data.rolename;
          this.roleupt.explain = result.data.explain;
        }).catch(error => {
          alert(error);
        })
      }).catch(error => {
        this.$message({
          message: "已撤消编辑",
          type: 'success'
        });
      })
    },
    roleUpt(rid) {
      let parmer = new URLSearchParams();
      parmer.append("rid", this.roleupt.rid);
      parmer.append("rolename", this.roleupt.rolename);
      parmer.append("explain", this.roleupt.explain);

      this.$axios.post("/uptRole.action", parmer).then(result => {
        this.uptRoles = false;
        this.$refs.roleuptDialog.resetFields();
        this.getData();
        if (!this.$message({
          message: result.data.msg,
          type: 'success'
        })){
          this.$message({
            message: result.data.msg,
            type: 'warning'
          })
        }
      }).catch(function (error) {
        _this.$message({
          message: "已撤消编辑",
          type: 'success'
        });
      })
    },
    roleUptqu() {
      this.uptRoles = false;
      this.$refs.roleuptDialog.resetFields();
    },
    uptRoleClose() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$refs.roleuptDialog.resetFields()
          this.uptRoles = false;
        })
    },
    roleDelete(id) {
      var _this = this;
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post("/delRole.action?rid=" + id).then(function (result) {
          if (!_this.$message({
            message: result.data.msg,
            type: 'success'
          })) {
            !_this.$message({
              message: result.data.msg,
              type: 'warning'
            })
          }
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
    pagechange(page) {
      this.page = page;
      let _this = this;
      let parmer = new URLSearchParams();
      parmer.append("page", this.page);
      parmer.append("rows", this.rows);
      parmer.append("rolename", this.search);
      _this.$axios.post("/queryRoleCount.action", parmer).then(function (reuslt) {
        _this.tabData = reuslt.data.rows;
        _this.total = reuslt.data.total;
      }).catch(function (error) {
        alert(error)
      })
    },
    handleSizeChange(size) {
      this.rows = size;
      let _this = this;
      let parmer = new URLSearchParams();
      parmer.append("page", this.page);
      parmer.append("rows", this.rows);
      parmer.append("rolename", this.search);
      _this.$axios.post("/queryRoleCount.action", parmer).then(function (reuslt) {
        _this.tabData = reuslt.data.rows;
        _this.total = reuslt.data.total;
      }).catch(function (error) {
        alert(error)
      })
    }
  }, created() {
    this.getData();
  }
}
</script>

<style>
.el-table {
  text-align: center;
}

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
