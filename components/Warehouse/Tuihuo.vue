<template>
  <div>
    <el-table :data="data"
              border
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}"
              @selection-change="tableSelected"
              stripe style="width: 100%">
      <el-table-column label="请选择你要退货的商品以及数量"  >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <
        <el-table-column prop="goods.gname" label="商品名称" width="180"  >
        </el-table-column>
        <el-table-column label="商品图片"  >
          <template width="90" slot-scope="scope">
            <img style="width:80px;height:80px;border:none;" :src="$host + scope.row.goods.gimage">
          </template>
        </el-table-column>
        <el-table-column prop="suinventory" label="库存数量" width="180" >
        </el-table-column>
        <el-table-column label="退货数量"  >
          <template slot-scope="scope">
            <el-input  text-align="center"
              placeholder="退货数量"
              v-model="scope.row.xuancount"
              type="number"
              :max="scope.row.suinventory"
                       :min="0"
            >
            </el-input>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "Tuihuo",
      props: ['data'],
      data(){
        return{
          tuicount:0,
          suidstr:"",
          selectlength:0,
          cangstr:"",
          countstr:"",
        }
      },
      methods:{
        tableSelected(val){
          console.log("人员信息val-",val);
          if(val.length<1){
            this.selectlength=0;
          }
          this.selectlength=val.length;
          this.multipleSelection = [];
          this.multipleSelectioncount = [];
          this.multipleSelectioncang = [];
          for (let i = 0; i < val.length; i++) {
            if (this.multipleSelection.indexOf(val[i].suid) === -1) {
              this.multipleSelection.push(val[i].suid)
              this.multipleSelectioncount.push(val[i].xuancount)
              this.multipleSelectioncang.push(val[i].warehouse.wid)
            }
          }
          let str="";
          this.multipleSelection.forEach((item)=> {
            str=str+item+","
          })
          this.suidstr=str;
        /*  alert("id"+this.suidstr)*/

          let strcang="";
          this.multipleSelectioncang.forEach((item)=> {
            strcang=strcang+item+","
          })
          this.cangstr=strcang;
         /* alert("cang"+this.cangstr)*/

          let strcount="";
          this.multipleSelectioncount.forEach((item)=> {
            strcount=strcount+item+","
          })
          this.countstr=strcount;
          /*alert("shu"+this.countstr)*/
        },
        /*  numberChange(val,suid){
          let index=arrayFindIndex(this.data,{suid:suid})
            this.data[index].suinventory=toNumber(val)
          }*/
      }
    }
</script>

<style scoped>

</style>
