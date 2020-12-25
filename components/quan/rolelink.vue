<template>
  <div>
    <el-button @click="rolShou" class="el-button el-icon-eleme el-button--success">
      点击授权
    </el-button>
    <el-row>
      <el-col :span="11">
        <el-table
          ref="singleTable"
          :data="tableData"
          highlight-current-row
          max-height="634px"
          :row-class-name="tableRowClassName"
          @row-click="employeeSearch"
        >
          <el-table-column
            width="60px">
          </el-table-column>
          <el-table-column
            type="index"
            label="ID"
            width="150px">
          </el-table-column>
          <el-table-column
            prop="ename"
            label="员工名称">
          </el-table-column>
        </el-table>
        <el-pagination
          style="width: 50%"
          @size-change="handleSizeChange"
          @current-change="pagechange"
          :current-page="page"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="rows"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-col>
      <el-col :span="1" class="el-col-offset-1">
        <hr
          style="float: left;height: 510px;margin-top:10px;margin-bottom:10px;margin-right: 30px;border: 1px solid #aaa;">
      </el-col>
      <el-col :span="8">
        <el-tree
          ref="tree"
          :data="treeData"
          show-checkbox
          node-key="rid"
          :default-expanded-keys="[1]"
        >
        </el-tree>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "rolelink",
  data() {
    return {
      tableData: [],
      treeData: [],
      total: 1,
      page: 1,
      rows: 5,
      eids: 0,
    }
  }, methods: {
    tableRowClassName({row, rowIndex}) {
      if (rowIndex % 2 === 0) {
        return 'warning-row';
      }
      return '';
    },
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

      this.$axios.post("/queryRole.action").then(function (result) {
        result.data.forEach((item) => {
          _this.treeData.push({"rid": item.rid, "label": item.rolename});
        })
      }).catch(function (error) {
        alert(error)
      });
    },
    employeeSearch(row) {
      this.eids = row.id;
      this.$axios.post("/queryQuan.action?id=" + row.id).then(result => {
        let list = [];
        result.data.forEach((item) => {
          list.push(item.rid);
        })
        this.$refs.tree.setCheckedKeys(list);
      }).catch(erreo => {
        alert(erreo);
      })
    },
    rolShou() {
      let ids = this.$refs.tree.getCheckedKeys().sort(function (a, b) {
        return a - b
      })
      let rids = "";
      for (var i = 0; i < ids.length; i++) {
        rids += ids[i] + ",";
      }
      let pamer = new URLSearchParams();
      pamer.append("eid", this.eids);
      pamer.append("rids", rids);
      this.$axios.post("/addEmployeeJurisdiction.action", pamer).then(result => {
        this.$message({
          message: result.data.msg,
          type: 'success'
        });
      }).catch(erreo => {
        alert(erreo);
      })
    },
    pagechange(pageindex) {
      this.page = pageindex;
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
    }
    ,
    handleSizeChange(size) {
      this.rows = size;

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
    }
  }, created() {
    this.getData();
  }
}
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

</style>
