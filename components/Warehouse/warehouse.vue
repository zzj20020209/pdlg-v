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
  <el-table :data="tableData" stripe style="width: 100%"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
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
        <el-button type="primary" v-if="scope.row.supplyList.length>0" @click="zhuanyi(scope.row.wid)">转移</el-button>
        <el-button type="primary" v-if="scope.row.supplyList.length>0" @click="tuihuo(scope.row.wid)">退货</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination style="text-align: center;margin-top: 20px"
                 @size-change="handleSizeChange" @current-change="pagechange"   :current-page="page"
                 layout="total, prev, pager, next,jumper,sizes" :total="total"
                 :page-size="pagesize" :page-sizes="[2,3,4]">
  </el-pagination>

  <el-dialog title="添加页面" :visible.sync="dialogFormVisible">
    <add-warehouse :data="addData"></add-warehouse>
    <!--将编辑页面子组件加入到列表页面 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="subAdd">确 定</el-button>
    </div>
  </el-dialog>
  <el-dialog title="编辑页面" :visible.sync="dialogFormVisibleedit">
    <edit-warehouse :data="selectData"></edit-warehouse>
    <!--将编辑页面子组件加入到列表页面 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisibleedit = false">取 消</el-button>
      <el-button type="primary" @click="subEdit">确 定</el-button>
    </div>
  </el-dialog>
  <el-dialog title="转移界面" :visible.sync="dialogFormVisiblezhuan" width="100%" >
    <zhuanyi :data="zhuantuidata" ref="zhuanyi"></zhuanyi>
    <!--将编辑页面子组件加入到列表页面 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisiblezhuan = false">取 消</el-button>
      <el-button type="primary" @click="zhuanbtn">确 定</el-button>
    </div>
  </el-dialog>
  <el-dialog title="退货界面" :visible.sync="dialogFormVisibletui" width="80%" >
    <tuihuo :data="zhuantuidata" ref="tuihuo"></tuihuo>
    <!--将编辑页面子组件加入到列表页面 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisibletui = false">取 消</el-button>
      <el-button type="primary" @click="tuihuobtn">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
    import AddWarehouse from "./addWarehouse";
    import Zhuanyi from "./Zhuanyi";
    import Tuihuo from "./Tuihuo";
    import EditWarehouse from "./editWarehouse";
    export default {
        name: "warehouse",
      components: {EditWarehouse, Tuihuo, Zhuanyi, AddWarehouse},
      data(){
          return{
            loading: true,
            tableData: [],
            total:1,
            page:1,
            pagesize:2,
            wname:"",
            dialogFormVisible:false,
            addData:{},
            dialogFormVisiblezhuan:false,
            zhuantuidata:[],
            dialogFormVisibletui:false,
            zhuancangku:[],
            dialogFormVisibleedit:false,
            selectIndex:0,
            selectData:[],
            editForm:[],
            xwid:0,
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
            _this.loading=false;
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
        },
        zhuanyi(id){
          this.dialogFormVisiblezhuan=true;
          var _this = this;
          var params = new URLSearchParams();
          params.append("wid", id);
          _this.xwid=id;
          this.$axios.post("/querySupplyBywid.action",params).
          then(function(result) {
            _this.zhuantuidata = result.data;
          }).
          catch(function(error) {
            alert(error)
          });
         /* this.$axios.post("/queryAllWarehouseNOInwid.action",params).
          then(function(result) {
            _this.zhuancangku=result.data;
           /!* alert("aa"+_this.zhuancangku[0].wid)*!/
          }).
          catch(function(error) {
            alert(error)
          });*/

        },
        tuihuo(id){
          this.dialogFormVisibletui=true;
          var _this = this;
          var params = new URLSearchParams();
          params.append("wid", id);
          this.$axios.post("/querySupplyBywid.action",params).
          then(function(result) {
            _this.zhuantuidata = result.data;
          }).
          catch(function(error) {
            alert(error)
          });
        },
        editwar(val){
          this.dialogFormVisibleedit=true;
          for (let i = 0; i < this.tableData.length; i++) {
            if(this.tableData[i].wid == val){
              this.selectIndex = i;
              this.selectData = {...this.tableData[i]};
            }
          }
        },
        subEdit(){
          var _this = this;
          var params = new URLSearchParams();
          params.append("wid", this.selectData.wid);
          params.append("wname", this.selectData.wname);
          params.append("waddress", this.selectData.waddress);
         /* params.append("wzkucun", this.selectData.wzkucun);
          params.append("wskucun", this.selectData.wskucun);*/
          this.$axios.post("updateWarehouse.action", params).
          then(function(result) {
            _this.$message({
              message: result.data,
              type: 'success'
            });
            _this.dialogFormVisibleedit=false
            //刷新数据
            _this.getData();

          }).
          catch(function() {
            _this.$message({
              message: '修改失败',
              type: 'success'
            });
          })
        },
        delwar(val){
          var _this = this;
          var params = new URLSearchParams();
          params.append("wid", val);
          this.$axios.post("deleteWarehouse.action", params).
          then(function(result) {
            _this.$message({
              message: result.data,
              type: 'success'
            });
            //刷新数据
            _this.getData();

          }).
          catch(function() {
            _this.$message({
              message: '删除失败',
              type: 'success'
            });
          })
         /* this.$axios.post("queryAllGoodsBywid.action", params).
          then(function(result) {
              console.log("hhh",result.data)
              if(result.data.length>0){
                _this.$message({
                  message: '请先将仓库清空在删除!',
                  type: 'error'
                });
              }else{

                this.$axios.post("deleteWarehouse.action",params).
                then(function(result) {
                  _this.$message({
                    message: result.data,
                    type: 'success'
                  });

                }).
                catch(function() {
                  _this.$message({
                    message: '删除失败',
                    type: 'success'
                  });
                });
              }



          }).
          catch(function() {
            _this.$message({
              message: '转移失败',
              type: 'success'
            });
          })*/
        },
        zhuanbtn(){
          var _this = this;
          if(this.$refs.zhuanyi.selectlength<1){
            _this.$message({
              message: '至少选择一条数据',
              type: 'error'
            });
          }
          var num=0;
          var countstrids =this.$refs.zhuanyi.countstr.split(",");
          var m1 = [];
          for(var i = 0; i < countstrids.length - 1; i++){
            m1.push(countstrids[i]);
          }
          m1.some(function(item){
            if(item==0) {
              num++;
              _this.$message({
                message: '请输入你要转移的数量',
                type: 'error'
              });
              return true;
            }
          });
          var cangstrids =this.$refs.zhuanyi.cangstr.split(",");
          var m2 = [];
          for(var i = 0; i < cangstrids.length - 1; i++){
            m2.push(cangstrids[i]);
          }
          m2.some(function(item){
            if(item==_this.xwid) {
              num++;
              _this.$message({
                message: '请选择你要转移的仓库',
                type: 'error'
              });
              return true;
            }
          });
          if(num==2){
            _this.$message({
              message: '转移数量以及转移仓库均不能为空!',
              type: 'error'
            });
          }
         /* var params = new URLSearchParams();
          params.append("suidstr", this.$refs.zhuanyi.suidstr);
          params.append("gidstr", this.$refs.zhuanyi.gidstr);
          params.append("countstr", this.$refs.zhuanyi.countstr);
          params.append("cangstr", this.$refs.zhuanyi.cangstr);
          params.append("wid", this.xwid);
          this.$axios.post("zhuanyi.action", params).
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
              message: '转移失败',
              type: 'success'
            });
          })*/

        },
        tuihuobtn(){
           /*   alert(this.$refs.tuihuo.suidstr)
                    //countstr
          //cangstr*/
          var _this = this;
          var params = new URLSearchParams();
          params.append("suidstr", this.$refs.tuihuo.suidstr);
          params.append("countstr", this.$refs.tuihuo.countstr);
          params.append("cangstr", this.$refs.tuihuo.cangstr);
          this.$axios.post("tuihuo.action", params).
          then(function(result) {
            _this.$message({
              message: result.data,
              type: 'success'
            });
            _this.dialogFormVisibletui=false
            //刷新数据
            _this.getData();

          }).
          catch(function() {
            _this.$message({
              message: '退货失败',
              type: 'success'
            });
          })

        }

      },
      created() { //钩子函数  vue对象初始化完成后  执行
        //this.getData();
      },
      mounted(){
        this.getData();
      },
      watch:{
          data(){
          this.getData();
        }
        //this.getData();
      }
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
