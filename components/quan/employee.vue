<template>
  <div align="left">

    <el-button class="el-button el-icon-plus el-button--success" @click="dialogVisible = true">
      添加新的员工
    </el-button>

    <el-button class="el-button el-icon-plus el-button--danger" @click="deleteall">
      批量删除
    </el-button>

    <el-row>
      <el-col :span="22" class="el-col-offset-1">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="ename"
            label="员工名字"
            width="180">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            width="180">
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="电话"
            width="180">
          </el-table-column>
          <el-table-column
            prop="idCard"
            label="身份证"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            width="180">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
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
      </el-col>
    </el-row>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="addClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
    }
  },
  methods: {
    getData() {
      var _this = this;
      var pamar = new URLSearchParams();
      pamar.append("page", 1);
      pamar.append("rows", 5);
      this.$axios.post("/queryEmployeeCount.action", pamar).then(function (result) {
        _this.tableData = result.data.rows;
        _this.total = result.data.total;
      }).catch(function (error) {
        alert(error)
      });
    },
    Edit(){

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
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = "";
        if(_this.$refs.multipleTable.selection.length==0){
          _this.$message("请选择至少一条记录");
        }else{
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
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped>

</style>
