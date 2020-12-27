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
      ref="multipleTable"
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
      <el-table-column label="采购数量">
        <template slot-scope="scope">
          <el-input
            placeholder="请输入你要采购的数量"
            v-model="scope.row.num"
            type="number"
            :min="1"
          >
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label="转移仓库">
        <template slot-scope="scope">
          <el-select  v-model="scope.row.ids"
                      placeholder="请选择" >
            <el-option v-for="e in zhuancangku"
                       :key="e.wid"
                       :label="e.wname"
                       :value="e.wid"></el-option>
            <!--     {{scope.row.warehouse.wid}}-->
          </el-select>
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
          goodsname:"",
          str:"",
          sl:"",
          cid:"",
          zhuancangku:[]
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

          this.$axios.post("/queryAllWarehouseall.action").
          then(function(result) {
            _this.zhuancangku=result.data
          }).
          catch(function(error) {
            alert(error)
          });
        },
        onSubmit(){
          this.getData()
        },
        add(){
          var _this=this;
          if(_this.$refs.multipleTable.selection.length<1){
            _this.$message({
              message: '至少选择一条数据',
              type: 'error'
            });
          }else {
            var params = new URLSearchParams();
            params.append("str", this.str);
            params.append("sl", this.sl);
            params.append("cid", this.cid);
            this.$axios.post("cg.action", params).
            then(function(result) {
              _this.$message({
                message: result.data,
                type: 'success'
              });
              _this.dialogFormVisiblezhuan=false
              //刷新数据
              _this.getData();

            }).
            catch(function() {
              _this.$message({
                message: '采购错误',
                type: 'success'
              });
            })
          }
        },
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
          this.multipleSelection = [];
          this.cgsl=[];
          this.cangku=[];
          for (let i = 0; i < val.length; i++) {
            if (this.multipleSelection.indexOf(val[i].gid) === -1) {
              this.multipleSelection.push(val[i].gid)
              this.cgsl.push(val[i].num)
              this.cangku.push(val[i].ids)
            }
          }
          let str="";
          this.multipleSelection.forEach((item)=> {
            str=str+item+","
          })
          this.str=str;

          let num1="";
          this.cgsl.forEach((item)=> {
            num1=num1+item+","
          })
          this.sl=num1;

          let idss="";
          this.cangku.forEach((item)=> {
            idss=idss+item+","
          })
          this.cid=idss;
          alert(num1+"|"+str+"|"+idss)
        }
      },
      created() { //钩子函数  vue对象初始化完成后  执行
        this.getData();
      }
    }
</script>

<style scoped>

</style>
