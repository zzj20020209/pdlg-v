<template>
    <div>
      <el-table :data="data"

                border
                :header-cell-style="{'text-align':'center'}"
                :cell-style="{'text-align':'center'}"
                @selection-change="tableSelected"
                stripe style="width: 100%">
        <el-table-column label="请选择你要转移的商品以及数量">
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
          <el-table-column prop="suinventory" label="库存数量" width="180">
          </el-table-column>
          <el-table-column label="转移数量">
        <template slot-scope="scope">
                        <el-input
                          placeholder="请输入你要转移的数量"
                          v-model="scope.row.xuancount"
                          type="number"
                         :max="scope.row.suinventory"
                          :min="0"
                       >
                        </el-input>
                      </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
            <el-select  v-model="scope.row.warehouse.wid"
                        placeholder="请选择" >
            <el-option v-for="e in zhuancangku" v-if="e.wid!=scope.row.warehouse.wid"
                       :key="e.wid"
                       :label="e.wname"
                       :value="e.wid"></el-option>
              {{scope.row.warehouse.wid}}
            </el-select>
            </template>
            <!--<el-select  v-model="wid" placeholder="请选择" >
              <el-option v-for="e in zhuancangku"
                         :key="e.wid"
                         :label="e.wname"
                         :value="e.wid"></el-option>
            </el-select>-->
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
        name: "Zhuanyi",
        props: ['data','cangku'],
        data(){
          return{
              zhuancount:0,
              str:"",
              selectlength:0,
              zhuancangku:[],
              suidstr:"",
              countstr:"",
              cangstr:""
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
          /*this.multipleSelectionn = [];*/
          for (let i = 0; i < val.length; i++) {
            if (this.multipleSelection.indexOf(val[i].suid) === -1) {
              this.multipleSelection.push(val[i].suid)
          /*    this.multipleSelectionn.push(val[i].suinventory)*/
            }
          }
          let str="";
          this.multipleSelection.forEach((item)=> {
            str=str+item+","
          })
          this.suidstr=str;

          console.log("人员信息val--人员选中-",str);
        },
        getcangku(){
         // alert("jjs"+this.data[0].suid)
         var _this = this;
          var params = new URLSearchParams();
          this.$axios.post("/queryAllWarehouseall.action").
          then(function(result) {
            _this.zhuancangku= result.data;
          }).
          catch(function(error) {
            alert(error)
          });
        },
      /*  numberChange(val,suid){
        let index=arrayFindIndex(this.data,{suid:suid})
          this.data[index].suinventory=toNumber(val)
        }*/
      }
      ,
      created() { //钩子函数  vue对象初始化完成后  执行
        /*alert("已经有了"+this.data.warehouse.wid)*/
      },
      mounted() {
          this.getcangku()
      }
    }
</script>

<style scoped>

</style>
