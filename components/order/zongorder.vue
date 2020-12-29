<template>
  <div>
  <el-tabs type="border-card" stretch style="width: 100%"  @tab-click="handleClick">
    <el-tab-pane label="全部订单">
      <el-table :data="tableDatauser1" stripe style="width: 100%" border :cell-style="{background:'#fff'}" :show-header="false" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <template slot="empty">
          <img class="data-pic" src="img/wushu.png" alt="" /><br>你还没有相关的订单</template>
        <el-table-column  >
          <template  slot-scope="scope">
            <el-row>
              <el-col :span="12">
                <el-tag>{{scope.row.id}}</el-tag>
              </el-col>
              <el-col :span="12">
                <div style="text-align: right">
                  <el-tag :type="scope.row.oZLogistics!='待出库' ?'success':'info'" v-if="scope.row.oZLogistics!=''">{{scope.row.oZLogistics}}</el-tag>
                </div>
              </el-col>
            </el-row>

            <el-divider></el-divider>
            <div v-for="e in scope.row.orderXiangList">
              <el-row>
                <el-col :span="6">
                  <img style="width:80px;height:80px;border:none;" :src="$host +e.goods.gimage">
                </el-col>
                <el-col :span="6">
                  <span>{{e.goods.gname}}</span><br>
                  <span> {{e.goods.gunit}}</span>
                </el-col>
                <el-col :span="6">
                  <span>￥{{e.goods.gshangjiaprice}}</span><br>
                  <span> x{{e.oxcount}}</span>
                </el-col>
                <el-col :span="6">
                  <el-button type="success" v-if="scope.row.oYogistics=='待发货'"@click="chuku(e,scope.row.id)">出库</el-button>
                </el-col>

              </el-row>
              <el-divider></el-divider>
            </div>
            <span>总价:{{scope.row.oprice}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="text-align: center;margin-top: 20px" background
                     @size-change="handleSizeChange" @current-change="pagechange"   :current-page="page"
                     layout="total, prev, pager, next,jumper,sizes" :total="total"
                     :page-size="pagesize" :page-sizes="[4,5,6]">
      </el-pagination>
    </el-tab-pane>
    <el-tab-pane label="待出库">
      <el-table :data="tableDatauser1" stripe style="width: 100%" border :cell-style="{background:'#fff'}" :show-header="false" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <template slot="empty">
          <img class="data-pic" src="img/wushu.png" alt="" /><br>你还没有相关的订单</template>
        <el-table-column  >
          <template  slot-scope="scope">
            <el-row>
              <el-col :span="12">
                <el-tag>{{scope.row.id}}</el-tag>
              </el-col>
              <el-col :span="12">
                <div style="text-align: right">
                  <el-tag :type="scope.row.oZLogistics!='待出库' ?'success':'info'" v-if="scope.row.oZLogistics!=''">{{scope.row.oZLogistics}}</el-tag>
                </div>
              </el-col>
            </el-row><el-divider></el-divider>
            <div v-for="e in scope.row.orderXiangList">
              <el-row>
                <el-col :span="6">
                  <img style="width:80px;height:80px;border:none;" :src="$host +e.goods.gimage">
                </el-col>
                <el-col :span="6">
                  <span>{{e.goods.gname}}</span><br>
                  <span> {{e.goods.gunit}}</span>
                </el-col>
                <el-col :span="6">
                  <span>￥{{e.goods.gshangjiaprice}}</span><br>
                  <span> x{{e.oxcount}}</span>
                </el-col>
                <el-col :span="6">
                  <el-button type="success" v-if="scope.row.oYogistics=='待发货'"@click="chuku(e,scope.row.id)">出库</el-button>
                </el-col>

              </el-row>
              <el-divider></el-divider>
            </div>
            <div style="text-align: right">
            <span>总价:{{scope.row.oprice}}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="text-align: center;margin-top: 20px" background
                     @size-change="handleSizeChange" @current-change="pagechange"   :current-page="page"
                     layout="total, prev, pager, next,jumper,sizes" :total="total"
                     :page-size="pagesize" :page-sizes="[4,5,6]">
      </el-pagination>
    </el-tab-pane>
    <el-tab-pane label="已出库">
      <el-table :data="tableDatauser1" stripe style="width: 100%" border :cell-style="{background:'#fff'}" :show-header="false" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <template slot="empty">
          <img class="data-pic" src="img/wushu.png" alt="" /><br>你还没有相关的订单</template>
        <el-table-column  >
          <template  slot-scope="scope">
            <el-row>
              <el-col :span="12">
                <el-tag>{{scope.row.id}}</el-tag>
              </el-col>
              <el-col :span="12">
                <div style="text-align: right">
                  <el-tag :type="scope.row.oZLogistics!='待出库' ?'success':'info'" v-if="scope.row.oZLogistics!=''">{{scope.row.oZLogistics}}</el-tag>
                </div>
              </el-col>
            </el-row><el-divider></el-divider>
            <div v-for="e in scope.row.orderXiangList">
              <el-row>
                <el-col :span="6">
                  <img style="width:80px;height:80px;border:none;" :src="$host +e.goods.gimage">
                </el-col>
                <el-col :span="6">
                  <span>{{e.goods.gname}}</span><br>
                  <span> {{e.goods.gunit}}</span>
                </el-col>
                <el-col :span="6">
                  <span>￥{{e.goods.gshangjiaprice}}</span><br>
                  <span> x{{e.oxcount}}</span>
                </el-col>
                <el-col :span="6">
                  <el-button type="success" v-if="scope.row.oYogistics=='待发货'&&e.warehouse==null"@click="chuku(e,scope.row.id)">出库</el-button>
                </el-col>

              </el-row>
              <el-divider></el-divider>
            </div>
            <div style="text-align: right">
            <span>总价:{{scope.row.oprice}}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="text-align: center;margin-top: 20px" background
                     @size-change="handleSizeChange" @current-change="pagechange"   :current-page="page"
                     layout="total, prev, pager, next,jumper,sizes" :total="total"
                     :page-size="pagesize" :page-sizes="[4,5,6]">
      </el-pagination>
    </el-tab-pane>
  </el-tabs>
  <el-dialog title="出库" :visible.sync="dialogFormVisiblechuku" width="100%">
    <chuku :data="chukudata" ref="chuku"></chuku>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisiblechuku = false">取 消</el-button>
      <el-button type="primary" @click="subchuku">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
    import Chuku from "./chuku";
    export default {
        name: "zongorder",
      components: {Chuku},
      data(){
          return{
            tableDatauser1:[],
            total:1,
            page:1,
            pagesize:4,
            loading: true,
            tabname:"",
            dialogFormVisiblechuku:false,
            chukudata:[],
            coid:0,
            chucount:0,
            cnum:0,
            clength:0,
          }
        },
      methods:{
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
        handleClick(tab, event){
          if(tab.label=='全部订单'){
            this.tabname="";
          }else{
            this.tabname=tab.label;
          }
          this.getData();
        },
        getData() { //获取数据方法
          this.tableDatauser1=[];
          var _this = this;
          var params = new URLSearchParams();
          params.append("page", this.page);
          params.append("size", this.pagesize);
          params.append("oZLogistics", this.tabname);
          this.$axios.post("/queryAllOrderZong.action",params).
          then(function(result) {
            _this.loading=false;
            _this.tableDatauser1 = result.data.rows;
            _this.total = result.data.total;
          }).
          catch(function(error) {
            alert(error)
          });

        },
        chuku(val,id){
         this.dialogFormVisiblechuku = true;
          this.chukudata = {...val};
          this.coid= id
         // this.cnum=val.num;
        /*  this.clength=val.order.orderXiangList.lengt;*/
          var _this = this;
          var params = new URLSearchParams();
          params.append("oid", id);
          this.$axios.post("/queryAllOrderXiangByoid.action",params).
          then(function(result) {
            _this.clength = result.data.length;
          }).
          catch(function(error) {
            alert(error)
          });

        },
        subchuku(){
          alert("选"+this.$refs.chuku.num)
          alert("顶"+this.chukudata.oxcount)
          var _this = this;
          var cuo=true;
          if(this.$refs.chuku.selectlength<1){
            _this.$message({
              message: '至少选择一条数据',
              type: 'error'
            });
            cuo=false
          }
          if(this.$refs.chuku.num!=this.chukudata.oxcount){
            _this.$message({
              message: '出库量应与订单数量一致',
              type: 'error'
            });
            cuo=false
          }
          var num=0;
          var countstrids =this.$refs.chuku.countstr.split(",");
          var m1 = [];
          for(var i = 0; i < countstrids.length - 1; i++){
            m1.push(countstrids[i]);
          }
          m1.some(function(item){
            if(item==0) {
              num++;
              _this.$message({
                message: '请选择仓库的出库量',
                type: 'error'
              });
              cuo=false
            }
          });
          if(cuo==true){
            var num=0;
            var params = new URLSearchParams();
            params.append("suidstr", this.$refs.chuku.suidstr);
            params.append("gidstr", this.$refs.chuku.gidstr);
            params.append("countstr", this.$refs.chuku.countstr);
            params.append("cangstr", this.$refs.chuku.cangstr);
            params.append("id",  this.coid);
            this.$axios.post("chuku.action", params).
            then(function(result) {
              _this.$message({
                message: result.data,
                type: 'success'
              });

              _this.dialogFormVisiblechuku=false
             //刷新数据
              _this.getData();

            }).
            catch(function() {
              _this.$message({
                message: '出库失败',
                type: 'success'
              });
            })
          }
        }
      },
      created(){
        this.getData();
      },
    }
</script>

<style scoped>

</style>
