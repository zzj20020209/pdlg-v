<template>
  <div>
    <el-table :data="data"
              border
              @selection-change="tableSelected"
              stripe style="width: 100%">
      <el-table-column label="请选择你要退货的商品以及数量">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="suid" label="编号" width="180">
        </el-table-column>
        <el-table-column prop="goods.gname" label="商品名称" width="180">
        </el-table-column>
        <el-table-column label="商品图片">
          <template width="90" slot-scope="scope">
            <img style="width:80px;height:80px;border:none;" :src="$host + scope.row.goods.gimage">
          </template>
        </el-table-column>
        <el-table-column label="转移数量">
          <template slot-scope="scope">
            <el-input
              placeholder="请输入你要转移的数量"
              v-model="scope.row.suinventory"
              type="number"
              :max="scope.row.suinventory"
              :min="2"
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
          str:"",
          selectlength:0,
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
          for (let i = 0; i < val.length; i++) {
            if (this.multipleSelection.indexOf(val[i].suid) === -1) {
              this.multipleSelection.push(val[i].suid)
            }
          }
          let str="";
          this.multipleSelection.forEach((item)=> {
            str=str+item+","
          })
          this.str=str;
          console.log("人员信息val--人员选中-",str);
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
