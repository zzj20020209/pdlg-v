<template>
<div id="Warehouse">
  <el-form :inline="true"  class="demo-form-inline">
    <el-form-item label="仓库名称">
      <el-input v-model="wname" placeholder="仓库名称"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button @click="add()" type="warning">添加仓库</el-button>
     <!-- <el-button @click="delduo()" type="warning">批量删除</el-button>-->
    </el-form-item>
  </el-form>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-table :data="props.row.supplyList">

          <el-table-column prop="goods.gname" label="商品名称">
          </el-table-column>
          <el-table-column prop="goods.gimage" label="商品图片">
            <template width="90" slot-scope="scope">
              <img style="width:80px;height:80px;border:none;" :src="$host + scope.row.goods.gimage">
            </template>
          </el-table-column>
          <el-table-column prop="goods.gsid.goodBigSort.gbsname" label="商品类型">
          </el-table-column>
          <el-table-column prop="goods.gsid.goodSmallsort.gssname" label="商品所属分类">
          </el-table-column>
          <el-table-column prop="suinventory" label="商品库存">
          </el-table-column>
        </el-table>
      </template>
    </el-table-column>
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column prop="wid" label="ID" width="180">
    </el-table-column>
    <el-table-column prop="wname" label="仓库名称" width="180">
    </el-table-column>
    <el-table-column prop="waddress" label="仓库地址">
    </el-table-column>
    <el-table-column prop="wzkucun" label="仓库总库存">
    </el-table-column>
    <el-table-column prop="wskucun" label="仓库剩余库存">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="success" @click="editwar(scope.row.wid)">编辑</el-button>

        <el-popconfirm title="确定删除这条记录吗？" @confirm="delwar(scope.row.wid)">
          <el-button type="danger" slot="reference">删除</el-button>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination style="text-align: center;margin-top: 20px"
                 @size-change="handleSizeChange" @current-change="pagechange"   :current-page="page"
                 layout="total, prev, pager, next,sizes" :total="total"
                 :page-size="pagesize" :page-sizes="[2,3,4]">
  </el-pagination>

  <el-dialog title="添加页面" :visible.sync="dialogFormVisible">
    <add-warehouse :data="addData"></add-warehouse>
    <!--将编辑页面子组件加入到列表页面 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="subAdd">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
    import AddWarehouse from "./addWarehouse";
    export default {
        name: "warehouse",
      components: {AddWarehouse},
      data(){
          return{
            tableData: [],
            total:1,
            page:1,
            pagesize:2,
            wname:"",
            dialogFormVisible:false,
            addData:{}
          }
        },
      methods:{
        getData() { //获取数据方法
          this.tableData=[];
          var _this = this;
          var params = new URLSearchParams();
          params.append("page", this.page);
          params.append("size", this.pagesize);
          params.append("wname", this.wname);
          this.$axios.post("/queryWarehouse.action",params).
          then(function(result) {
            _this.tableData = result.data.rows;
            _this.total = result.data.total;
          }).
          catch(function(error) {
            alert(error)
          });

        },

      pagechange(pageindex){
        this.tableData=[];
        //页码变更时
        //console.log(pageindex)
        this.page = pageindex;
        //根据pageindex  获取数据
        this.getData();
      },handleSizeChange(size){
        this.tableData=[];
        //页码变更时
        //console.log(pageindex)
        this.pagesize = size;
        //根据pageindex  获取数据
        this.getData();
      },
      onSubmit(){
        this.getData();
      },
        add(){
          this.dialogFormVisible=true;
        },
        subAdd(){
          let data = this.addData;
          var _this = this;
          var params = new URLSearchParams();
          params.append("wname", data.wname);
          params.append("waddress", data.waddress);
          params.append("wzkucun", data.wzkucun);
          this.$axios.post("addWarehouse.action", params).
          then(function(result) {
            _this.$message({
              message: result.data,
              type: 'success'
            });
            _this.dialogFormVisible = false;
            _this.addData={};
            //刷新数据
            _this.getData();

          }).
          catch(function() {
            _this.$message({
              message: '添加失败',
              type: 'success'
            });
          })
        }

      },
      created() { //钩子函数  vue对象初始化完成后  执行
        this.getData();
      },
    }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 100px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
