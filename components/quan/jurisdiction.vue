<template>
  <div>
    <el-button @click="shou" class="el-button el-icon-eleme el-button--success">
      点击授权
    </el-button>
    <el-row>
      <el-col :span="11">
        <el-table
          ref="singleTable"
          :data="tabData"
          highlight-current-row
          max-height="634px"
          :row-class-name="tableRowClassName"
          @row-click="roleSearch"
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
            prop="rolename"
            label="角色名称">
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
      </el-col>
      <el-col :span="2" class="el-col-offset-2">
        <hr
          style="float: left;height: 510px;margin-top:10px;margin-bottom:10px;margin-right: 30px;border: 1px solid #aaa;">
      </el-col>
      <el-col :span="8">
        <el-tree
          ref="tree"
          :data="treeData"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[1]"
        >
        </el-tree>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "jurisdiction",
  data() {
    return {
      tabData: [],
      treeData: [],
      rids: 0,
      page: 1,
      rows: 5,
      total: 1,
    }
  }, methods: {
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

      let pamer = new URLSearchParams();
      pamer.append("id", sessionStorage.getItem("id"))
      this.$axios.post("/queryMenuAlls.action").then(function (result) {
        _this.treeData = result.data;
      }).catch(function (erreo) {
        alert(erreo)
      })
    },
    roleSearch(row) {
      this.rids = row.rid;
      let _this = this
      _this.$axios.post("/queryRoleQuan.action?rid=" + row.rid).then(result => {
        let list = [];
        result.data.forEach((item) => {
          item.children.forEach((citem) => {
            list.push(citem.id);
          })
        })
        this.$refs.tree.setCheckedKeys(list);
      }).catch(erreo => {
        alert(erreo);
      })
    },
    shou() {
      let fid = this.$refs.tree.getHalfCheckedKeys().sort(function (a, b) {
        return a - b
      })
      let zid = this.$refs.tree.getCheckedKeys().sort(function (a, b) {
        return a - b
      })
      let mid = "";
      let mids = "";
      for (var i = 0; i < fid.length; i++) {
        mids += fid[i] + ","
      }
      for (var i = 0; i < zid.length; i++) {
        mid += zid[i] + ","
      }
      let pamer = new URLSearchParams();
      pamer.append("rid", this.rids);
      pamer.append("mids", mids + mid);
      this.$axios.post("/addRoleJurisdiction.action", pamer).then(result => {
        this.$message({
          message: result.data.msg,
          type: 'success'
        });
      }).catch(erreo => {
        alert(erreo);
      })
    },
    pagechange(page) {
      this.page = page;
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
    handleSizeChange(size) {
      this.rows = size;
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
    }
  },
  created() {
    this.getData()
  }
}

</script>

<style scoped>
.centerdiv {
  float: left;
  width: 60px;
  border-right: 1px solid gainsboro;
  padding-bottom: 1600px; /*关键*/
  margin-bottom: -1600px; /*关键*/
}
</style>
