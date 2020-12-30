<template>
 <div>
   <el-form :inline="true"  lclass="demo-form-inine">
     <el-button type="primary" @click="shezhi()">确认设置</el-button>
     <el-button type="primary" @click="addbig()">添加类型</el-button>
     <el-button type="primary" @click="addsma()">添加所属分类</el-button>
   </el-form>
   <el-col :span="12">
     <el-table :data="tableDatabig" stripe style="width: 100%"
               :header-cell-style="{'text-align':'center'}"
               :cell-style="{'text-align':'center'}"
               highlight-current-row
               @row-click="handleCurrentChange"
               v-loading="loading"
               element-loading-text="拼命加载中"
               element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(0, 0, 0, 0.8)">

       <el-table-column label="请选择类型">
       <el-table-column prop="gbsname" label="商品类型">
       </el-table-column>
         <el-table-column label="操作">
           <template slot-scope="scope">
             <el-button type="success" @click.stop="editbig(scope.row)">编辑</el-button>

             <el-popconfirm title="确定删除这条记录吗？" @confirm="delbig(scope.row.gbsid)">
               <el-button type="danger" slot="reference" @click.stop>删除</el-button>
             </el-popconfirm>
           </template>
         </el-table-column>
       </el-table-column>
     </el-table>
   </el-col>
   <el-col :span="11" class="el-col-offset-1">
     <el-table :data="tableDatasma" stripe style="width: 100%"
               ref="multipleTable"
               :header-cell-style="{'text-align':'center'}"
               :cell-style="{'text-align':'center'}"
               v-loading="loading"
               @selection-change="handleSelectionChange2"
               element-loading-text="拼命加载中"
               element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(0, 0, 0, 0.8)">
       <el-table-column label="请选择所属分类">

       <el-table-column
         type="selection"
         width="55">
       </el-table-column>
       <el-table-column prop="gssname" label="商品所属分类">
       </el-table-column>
         <el-table-column label="操作">
           <template slot-scope="scope">
             <el-button type="success" @click.stop="editsma(scope.row)">编辑</el-button>
             <el-popconfirm title="确定删除这条记录吗？" @confirm="delsma(scope.row.gssid)">
               <el-button type="danger" slot="reference" @click.stop>删除</el-button>
             </el-popconfirm>
           </template>
         </el-table-column>
       </el-table-column>
     </el-table>
   </el-col>

   <el-dialog title="添加类型" :visible.sync="dialogFormVisiblebigadd" width="30%">
     <!-- <edit-goods :data="selectData" ref="editgoods"></edit-goods>-->
     <add-bigsort :data="Databigadd" ref="bigadd"></add-bigsort>
     <!--将编辑页面子组件加入到列表页面 -->
     <div slot="footer" class="dialog-footer">
       <el-button @click="dialogFormVisiblebigadd = false">取 消</el-button>
       <el-button type="primary" @click="subaddbig">确 定</el-button>
     </div>
   </el-dialog>
   <el-dialog title="修改类型" :visible.sync="dialogFormVisiblebigedit" width="30%">
     <edit-bigsort :data="Databigedit"></edit-bigsort>
     <!-- <edit-goods :data="selectData" ref="editgoods"></edit-goods>-->
     <!--将编辑页面子组件加入到列表页面 -->
     <div slot="footer" class="dialog-footer">
       <el-button @click="dialogFormVisiblebigedit = false">取 消</el-button>
       <el-button type="primary" @click="subeditbig">确 定</el-button>
     </div>
   </el-dialog>

   <el-dialog title="添加所属分类" :visible.sync="dialogFormVisiblesmaadd" width="30%">
     <add-smasort :data="Datasmaadd" ref="smaadd"></add-smasort>
     <!-- <edit-goods :data="selectData" ref="editgoods"></edit-goods>-->

     <!--将编辑页面子组件加入到列表页面 -->
     <div slot="footer" class="dialog-footer">
       <el-button @click="dialogFormVisiblesmaadd = false">取 消</el-button>
       <el-button type="primary" @click="subaddsma">确 定</el-button>
     </div>
   </el-dialog>
   <el-dialog title="修改所属分类" :visible.sync="dialogFormVisiblesmaedit" width="30%">
     <edit-smasort :data="Datasmaedit"></edit-smasort>
     <!-- <edit-goods :data="selectData" ref="editgoods"></edit-goods>-->
     <!--将编辑页面子组件加入到列表页面 -->
     <div slot="footer" class="dialog-footer">
       <el-button @click="dialogFormVisiblesmaedit = false">取 消</el-button>
       <el-button type="primary" @click="subeditsma">确 定</el-button>
     </div>
   </el-dialog>
 </div>
</template>

<script>
    import AddBigsort from "./addBigsort";
    import EditBigsort from "./editBigsort";
    import AddSmasort from "./addSmasort";
    import EditSmasort from "./editSmasort";
    export default {
        name: "goodsort",
      components: {EditSmasort, AddSmasort, EditBigsort, AddBigsort},
      data(){
          return{
            loading: true,
            tableDatabig: [],
            tableDatasma: [],
            selectlength1:0,
            selectlength2:0,
            dialogFormVisiblebigadd:false,
            dialogFormVisiblebigedit:false,
            dialogFormVisiblesmaadd:false,
            dialogFormVisiblesmaedit:false,
            Databigadd:{},
            Databigedit:{},
            Datasmaadd:{},
            Datasmaedit:{},
            selectIndex:0,
            shegbsid:0,
            multipleSelection: [],
          }
        },
      methods:{
        getbigsort(){
          var _this=this;
          this.$axios.post("/queryAllGoodBigSortall.action").
          then(function(result) {
            _this.loading=false;
            _this.tableDatabig = result.data;
          }).
          catch(function(error) {
            alert(error)
          });
        },
        getsmasort(){
          var _this=this;
          this.$axios.post("/queryAllGoodSmallsortall.action").
          then(function(result) {
            _this.tableDatasma = result.data;
          }).
          catch(function(error) {
            alert(error)
          });
        },
        handleCurrentChange(val){
          var _this=this;
          var a=[];
          _this.toggleSelection()
          var params = new URLSearchParams();
          params.append("gbsid", val.gbsid);
          this.shegbsid=val.gbsid;
          this.$axios.post("/queryGoodSmallsortBygbsid.action",params).
          then(function(result) {
            let tableDatasm= result.data;
            var num=0;
            for(var i=0;i<_this.tableDatasma.length;i++){
              for(var j=0;j<tableDatasm.length;j++){
                if(_this.tableDatasma[i].gssid==tableDatasm[j].gssid){
                  a.push(_this.tableDatasma[i])
                }
              }
            }
           // alert(a.length)
            _this.toggleSelection(a)
          }).
          catch(function(error) {
            alert(error)
          });
        },
        handleSelectionChange2(val){
          this.multipleSelection = val;
          console.log(val)
        },
        toggleSelection(rows) {
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);
            });
          } else {
            this.$refs.multipleTable.clearSelection();
          }
        },
        shezhi(){
          var _this=this;
          var smalist=this.$refs.multipleTable.selection
          var gssidstr="";
          smalist.forEach(item => {
            gssidstr=gssidstr+item.gssid+","
          });
          var params = new URLSearchParams();
          params.append("gbsid", this.shegbsid);
          params.append("mids", gssidstr);
          this.$axios.post("addGoodSort.action", params).
          then(function(result) {
            _this.$message({
              message: result.data,
              type: 'success'
            });
            //刷新数据
            _this.getbigsort();
            _this.getsmasort();
            _this.toggleSelection()

          }).
          catch(function() {
            _this.$message({
              message: '设置失败',
              type: 'success'
            });
          })
        },
        addbig(){
          this.dialogFormVisiblebigadd=true;
        },
        subaddbig(){
          var _this=this;
          var params = new URLSearchParams();
          params.append("gbsname", this.Databigadd.gbsname);
          this.$axios.post("addGoodBigSort.action", params).
          then(function(result) {
            _this.$message({
              message: result.data,
              type: 'success'
            });
            _this.dialogFormVisiblebigadd=false
            //刷新数据
            _this.getbigsort();
            _this.toggleSelection()

          }).
          catch(function() {
            _this.$message({
              message: '添加失败',
              type: 'success'
            });
          })
        },
        editbig(val){
          this.dialogFormVisiblebigedit=true;
          this.selectIndex = val.gbsid;
          this.Databigedit = {...val};
        },
        subeditbig(){
          var _this=this;
          var params = new URLSearchParams();
          params.append("gbsid", this.selectIndex);
          params.append("gbsname", this.Databigedit.gbsname);
          this.$axios.post("updateGoodBigSort.action", params).
          then(function(result) {
            _this.$message({
              message: result.data,
              type: 'success'
            });
            _this.dialogFormVisiblebigedit=false
            //刷新数据
            _this.getsmasort();
            _this.getbigsort();
            _this.toggleSelection()
          }).
          catch(function() {
            _this.$message({
              message: '修改失败',
              type: 'success'
            });
          })
        },
        delbig(val){
          var _this = this;
          var params = new URLSearchParams();
          params.append("gbsid", val);
          this.$axios.post("deleteGoodBigSort.action", params).
          then(function(result) {
            _this.$message({
              message: result.data,
              type: 'success'
            });
            //刷新数据
            _this.getbigsort();

          }).
          catch(function() {
            _this.$message({
              message: '删除失败',
              type: 'success'
            });
          })
        },
        addsma(){
          this.dialogFormVisiblesmaadd=true;
        },
        subaddsma(){
          var _this=this;
          var params = new URLSearchParams();
          params.append("gssname", this.Datasmaadd.gssname);
          this.$axios.post("addGoodSmallsort.action", params).
          then(function(result) {
            _this.$message({
              message: result.data,
              type: 'success'
            });
            _this.dialogFormVisiblesmaadd=false
            //刷新数据
            _this.getsmasort();
            _this.getbigsort();
            _this.toggleSelection()
          }).
          catch(function() {
            _this.$message({
              message: '添加失败',
              type: 'success'
            });
          })
        },
        editsma(val){
          this.dialogFormVisiblesmaedit=true;
          this.selectIndex = val.gssid;
          this.Datasmaedit = {...val};
        },
        subeditsma(){
          var _this=this;
          var params = new URLSearchParams();
          params.append("gssid", this.selectIndex);
          params.append("gssname", this.Datasmaedit.gssname);
          this.$axios.post("updateGoodSmallsort.action", params).
          then(function(result) {
            _this.$message({
              message: result.data,
              type: 'success'
            });
            _this.dialogFormVisiblesmaedit=false
            //刷新数据
            _this.getsmasort();
            _this.getbigsort();
            _this.toggleSelection()
          }).
          catch(function() {
            _this.$message({
              message: '修改失败',
              type: 'success'
            });
          })
        },
        delsma(val){
          var _this = this;
          var params = new URLSearchParams();
          params.append("gssid", val);
          this.$axios.post("deleteGoodSmallsort.action", params).
          then(function(result) {
            _this.$message({
              message: result.data,
              type: 'success'
            });
            //刷新数据
            _this.getsmasort();
            _this.getbigsort();

          }).
          catch(function() {
            _this.$message({
              message: '删除失败',
              type: 'success'
            });
          })
        },
      },
      created() {
        this.getbigsort();
        this.getsmasort();
      }
    }
</script>

<style scoped>

</style>
