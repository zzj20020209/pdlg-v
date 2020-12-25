<template>
 <div>
   <el-form :inline="true"  lclass="demo-form-inine">
     <el-button type="primary" @click="shezhi()">确认设置</el-button></el-form>
   <el-col :span="12">
     <el-table :data="tableDatabig" stripe style="width: 100%"
               :header-cell-style="{'text-align':'center'}"
               :cell-style="{'text-align':'center'}"
               highlight-current-row
               @current-change="handleCurrentChange"
               v-loading="loading"
               element-loading-text="拼命加载中"
               element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(0, 0, 0, 0.8)">
       <el-table-column label="请选择类型">
       <el-table-column prop="gbsname" label="商品类型">
       </el-table-column>
       </el-table-column>
     </el-table>
   </el-col>
   <el-col :span="11" class="el-col-offset-1">
     <el-table :data="tableDatasma" stripe style="width: 100%"
               ref="multipleTable"
               :header-cell-style="{'text-align':'center'}"
               :cell-style="{'text-align':'center'}"
               @selection-change="tableSelected2"
               v-loading="loading"
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
       </el-table-column>
     </el-table>
   </el-col>
 </div>
</template>

<script>
    export default {
        name: "goodsort",
        data(){
          return{
            loading: true,
            tableDatabig: [],
            tableDatasma: [],
            selectlength1:0,
            selectlength2:0,
          }
        },
      methods:{
        getbigsort(){
          var _this=this;
          this.$axios.post("/queryAllGoodBigSortall.action").
          then(function(result) {
            _this.loading=false;
            _this.tableDatasma = result.data;
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
          alert(val.gbsid)
          var _this=this;
          var params = new URLSearchParams();
          params.append("gbsid", val.gbsid);
          this.$axios.post("/queryGoodSmallsortBygbsid.action",params).
          then(function(result) {
            let tableDatasm= result.data;
            this.tableDatasma.forEach(i =>{
              if(i.gssid==tableDatasm[i].gssid){

              }
            })
          }).
          catch(function(error) {
            alert(error)
          });
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
        tableSelected2(val){
         /* if(val.length<1){
            this.selectlength1=0;
          }
          this.selectlength1=val.length;
          this.multipleSelection = [];
          for (let i = 0; i < val.length; i++) {
            if (this.multipleSelection.indexOf(val[i].gbsid) === -1) {
              this.multipleSelection.push(val[i].gbsid)
            }
          }*/
        },
        shezhi(){

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
