<template>
  <div>
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="商品名">
        <el-input v-model="goodsname" placeholder="请输入商品名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="add()" type="warning">采购</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      stripe
      style="width: 100%;text-align: center"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column label="商品图片">
        <template width="90" slot-scope="scope">
          <img style="width:80px;height:80px;border:none;" :src="$host + scope.row.gimage">
        </template>
      </el-table-column>
      <el-table-column prop="gname" label="商品名称">
      </el-table-column>
      <el-table-column prop="gunit" label="商品规格">
      </el-table-column>
      <el-table-column prop="gprice" label="商品价格">
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
  </div>
</template>

<script>
    export default {
        name: "caigou",
      data () {
        return {
          tableData: [],
          total: 1,
          page: 1,
          rows: 5,
          goodsname:""
        }
      },
      methods:{
        getData() { //获取数据方法
          this.tableData=[];
          var _this = this;
          var params = new URLSearchParams();
          params.append("page", this.page);
          params.append("size", this.rows);
          params.append("gname", this.goodsname);
          this.$axios.post("/queryGoods.action",params).
          then(function(result) {
            _this.loading=false;
            _this.tableData = result.data.rows;
            _this.total = result.data.total;
          }).
          catch(function(error) {
            alert(error)
          });
        },
        onSubmit(){
          this.getData()
        },
        add(){},
        pagechange(pageindex) {
          this.page = pageindex;
          var _this = this;
          var pamar = new URLSearchParams();
          pamar.append("page", this.page);
          pamar.append("size", this.rows);
          pamar.append("gname", this.goodsname);

          this.$axios.post("/queryGoods.action", pamar).then(function (result) {
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
          pamar.append("size", this.rows);
          pamar.append("gname", this.goodsname);

          this.$axios.post("/queryGoods.action", pamar).then(function (result) {
            _this.tableData = result.data.rows;
            _this.total = result.data.total;
          }).catch(function (error) {
            alert(error)
          });
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        }
      },
      created() { //钩子函数  vue对象初始化完成后  执行
        this.getData();
      }
    }
</script>

<style scoped>

</style>
