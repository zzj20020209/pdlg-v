<template>
<div>
  <el-row>
    <el-button type="primary" @click="onSubmit">供货更改</el-button>
  </el-row>
  <el-row>
  <el-col :span="12">

    <el-table :data="tableDatac"

              border
              highlight-current-row
              @current-change="handleCurrentChange"
              stripe style="width: 100%"
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)">
    <!--  <el-table-column prop="wid" label="ID" width="180">
      </el-table-column>-->
      <el-table-column label="仓库选择">

      <el-table-column prop="wname" label="仓库名称" width="180">
      </el-table-column>
      <el-table-column prop="wzkucun" label="仓库总库存">
      </el-table-column>
      <el-table-column prop="wskucun" label="仓库剩余库存">
      </el-table-column>
      </el-table-column>
    </el-table>
  </el-col>
  <el-col :span="11" class="el-col-offset-1">
    <el-table :data="tableDatag"
              border
              @selection-change="tableSelected"
              stripe style="width: 100%"
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-table-column label="商品选择">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
     <!-- <el-table-column prop="gid" label="ID" width="180">
      </el-table-column>-->
      <el-table-column prop="gname" label="商品名称" width="180">
      </el-table-column>
      <!--<el-table-column label="商品图片">
        <template width="90" slot-scope="scope">
          <img style="width:80px;height:80px;border:none;" :src="$host + scope.row.gimage">
        </template>
      </el-table-column>-->
      </el-table-column>
    </el-table>
  </el-col>
  </el-row>
</div>
</template>

<script>
    export default {
        name: "Supply",
        data(){
          return{
            loading: true,
            tableDatac:[],
            tableDatag:[],
            currentRow: null,
            str:"",
            selectlength:0,
          }
        },
        methods:{
          handleCurrentChange(val) {
            this.currentRow = val;

          },
          getData(){
            var _this = this;
            this.$axios.post("/queryAllWarehouseall.action").
            then(function(result) {
              _this.loading=false;
              _this.tableDatac = result.data;
            }).
            catch(function(error) {
              alert(error)
            });
            this.$axios.post("/queryAllGoodsall.action").
            then(function(result) {
              _this.loading=false;
              _this.tableDatag = result.data;
            }).
            catch(function(error) {
              alert(error)
            });
          },
          tableSelected(val){
            /*console.log("人员信息val-",val);*/
            if(val.length<1){
              this.selectlength=0;
            }
            this.selectlength=val.length;
            this.multipleSelection = [];
            for (let i = 0; i < val.length; i++) {
              if (this.multipleSelection.indexOf(val[i].gid) === -1) {
                this.multipleSelection.push(val[i].gid)
              }
            }
            let str="";
            this.multipleSelection.forEach((item)=> {
              str=str+item+","
            })
            this.str=str;
            console.log("人员信息val--人员选中-",str);
          },
          onSubmit(){
            if(this.selectlength<1){
              this.$message.error('请至少选择一条数据');
            }
          }
        },
      created() { //钩子函数  vue对象初始化完成后  执行
        this.getData();

      },
    }
</script>

<style scoped>

</style>
