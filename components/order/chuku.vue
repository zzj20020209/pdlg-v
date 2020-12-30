<template>
<div>
  <el-divider>商品信息</el-divider>
      <el-row>
    <el-col :span="12">
      商品名称:<span>{{this.data.goods.gname}}</span><br>
    </el-col>
    <el-col :span="12">
      所需数量:<span> {{this.data.oxcount}}</span>
    </el-col>
      </el-row>
  <el-divider>仓库选择</el-divider>
  <el-table :data="supplydata"
            border
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            @selection-change="tableSelected"
            stripe >
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column prop="warehouse.wname" label="仓库名称" >
    </el-table-column>
    <el-table-column prop="suinventory" label="仓库库存" >
    </el-table-column>
    <el-table-column  label="请选择你要出库的数量" prop="xuancount" >
      <template slot-scope="scope">
        <el-input
          @input.native="inputshu"
          placeholder="出库数量"
          v-model="scope.row.xuancount"
          type="number"
          :max="scope.row.suinventory"
          :min="0">
        </el-input>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
    export default {
        name: "chuku",
        props: ['data'],
        data () {
          return{
            supplydata:[],
            selectlength:0,
            cangstr:"",
            countstr:"",
            suidstr:"",
            gidstr:"",
            num:0,

          }
        },
      methods:{
        inputshu({target}){
            target.value=target.value.replace(/\[^0-9\]/gi,"");

        },
          getcang(){
            var _this = this;
            var params = new URLSearchParams();
            params.append("gid", this.data.goods.gid);
            this.$axios.post("/querySupplyBygid.action",params).
            then(function(result) {
              _this.supplydata = result.data;

            }).
            catch(function(error) {
              alert(error)
            });

          },
        tableSelected(val){
          if(val.length<1){
            this.selectlength=0;
          }
          this.selectlength=val.length;

          this.multipleSelectionsuid = [];
          this.multipleSelectionwid = [];
          this.multipleSelectioncount = [];
          this.multipleSelectiongid = [];
          for (let i = 0; i < val.length; i++) {
            if (this.multipleSelectionwid.indexOf(val[i].suid) === -1) {
              this.multipleSelectionsuid.push(val[i].suid)
              this.multipleSelectionwid.push(val[i].warehouse.wid)
              this.multipleSelectioncount.push(val[i].xuancount)
              this.multipleSelectiongid.push(val[i].goods.gid)
            }
          }
          let suidstr="";
          this.multipleSelectionsuid.forEach((item)=> {
            suidstr=suidstr+item+","
          })
          this.suidstr=suidstr;
          let widstr="";
          this.multipleSelectionwid.forEach((item)=> {
            widstr=widstr+item+","
          })
          this.cangstr=widstr;
          let xuancountstr="";
          var num=0;
          this.multipleSelectioncount.forEach((item)=> {
            num=num+item;
            xuancountstr=xuancountstr+item+","
          })
          this.num=num;

          this.countstr=xuancountstr;
          let strgid="";
          this.multipleSelectiongid.forEach((item)=> {
            strgid=strgid+item+","
          })
          this.gidstr=strgid;

        }
      },
      created() {


      },
      mounted(){
        this.getcang();
      },
      watch:{
        data(){
          this.getcang();
        }
        //this.getData();
      }
    }
</script>

<style scoped>

</style>
