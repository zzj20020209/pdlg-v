<template>
  <el-tabs type="border-card" stretch style="width: 80%"  @tab-click="handleClick">
    <el-tab-pane label="全部订单">
      <el-table :data="tableDatauser1" stripe style="width: 100%" border :cell-style="{background:'#fff'}" :show-header="false" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <template slot="empty">
          <img class="data-pic" src="img/wushu.png" alt="" /><br>你还没有相关的订单</template>
        <el-table-column  >
          <template  slot-scope="scope">
            <span>{{scope.row.orid}}</span>
           <el-tag :type="scope.row.oSLogistics!='待收货' ?'success':'info'" >{{scope.row.oSLogistics}}</el-tag>
            <el-divider></el-divider>
            <div v-for="e in scope.row.orderXiangList">
              <el-row>
                <el-col :span="8">
                  <img style="width:80px;height:80px;border:none;" :src="$host +e.goods.gimage">
                </el-col>
                <el-col :span="8">
                  <span>{{e.goods.gname}}</span><br>
                  <span> {{e.goods.gunit}}</span>
                </el-col>
                <el-col :span="8">
                  <span>￥{{e.goods.gshangjiaprice}}</span><br>
                  <span> x{{e.oxcount}}</span>
                </el-col>
              </el-row>
              <el-divider></el-divider>
            </div>
            <span>总价:{{scope.row.oprice}}</span>
            <el-button type="success" v-if="scope.row.oZLogistics=='已发货'"@click="queren(scope.row.id)">确认收货</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="待收货">
      <el-table :data="tableDatauser1" stripe style="width: 100%" border :cell-style="{background:'#fff'}" :show-header="false" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <template slot="empty">
          <img class="data-pic" src="img/wushu.png" alt="" /><br>你还没有相关的订单</template>
        <el-table-column  >
          <template  slot-scope="scope">
            <span>{{scope.row.orid}}</span>
            <el-tag :type="scope.row.oSLogistics!='待收货' ?'success':'info'" >{{scope.row.oSLogistics}}</el-tag>
            <el-divider></el-divider>
            <div v-for="e in scope.row.orderXiangList">
              <el-row>
                <el-col :span="8">
                  <img style="width:80px;height:80px;border:none;" :src="$host +e.goods.gimage">
                </el-col>
                <el-col :span="8">
                  <span>{{e.goods.gname}}</span><br>
                  <span> {{e.goods.gunit}}</span>
                </el-col>
                <el-col :span="8">
                  <span>￥{{e.goods.gshangjiaprice}}</span><br>
                  <span> x{{e.oxcount}}</span>
                </el-col>
              </el-row>
              <el-divider></el-divider>
            </div>
            <span>总价:{{scope.row.oprice}}</span>
            <el-button type="success" v-if="scope.row.oZLogistics=='已发货'"@click="queren(scope.row.id)">确认收货</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="待提货">
      <el-table :data="tableDatauser1" stripe style="width: 100%" border :cell-style="{background:'#fff'}" :show-header="false" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <template slot="empty">
          <img class="data-pic" src="img/wushu.png" alt="" /><br>你还没有相关的订单</template>
        <el-table-column  >
          <template  slot-scope="scope">
            <span>{{scope.row.orid}}</span>
            <el-tag :type="scope.row.oSLogistics!='待收货' ?'success':'info'" >{{scope.row.oSLogistics}}</el-tag>
            <el-divider></el-divider>
            <div v-for="e in scope.row.orderXiangList">
              <el-row>
                <el-col :span="8">
                  <img style="width:80px;height:80px;border:none;" :src="$host +e.goods.gimage">
                </el-col>
                <el-col :span="8">
                  <span>{{e.goods.gname}}</span><br>
                  <span> {{e.goods.gunit}}</span>
                </el-col>
                <el-col :span="8">
                  <span>￥{{e.goods.gshangjiaprice}}</span><br>
                  <span> x{{e.oxcount}}</span>
                </el-col>
              </el-row>
              <el-divider></el-divider>
            </div>
            <span>总价:{{scope.row.oprice}}</span>
            <el-button type="success" v-if="scope.row.oZLogistics=='已发货'"@click="queren(scope.row.id)">确认收货</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="已提货">
      <el-table :data="tableDatauser1" stripe style="width: 100%" border :cell-style="{background:'#fff'}" :show-header="false" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <template slot="empty">
          <img class="data-pic" src="img/wushu.png" alt="" /><br>你还没有相关的订单</template>
        <el-table-column  >
          <template  slot-scope="scope">
            <span>{{scope.row.orid}}</span>
            <el-tag :type="scope.row.oSLogistics!='待收货' ?'success':'info'" >{{scope.row.oSLogistics}}</el-tag>
            <el-divider></el-divider>
            <div v-for="e in scope.row.orderXiangList">
              <el-row>
                <el-col :span="8">
                  <img style="width:80px;height:80px;border:none;" :src="$host +e.goods.gimage">
                </el-col>
                <el-col :span="8">
                  <span>{{e.goods.gname}}</span><br>
                  <span> {{e.goods.gunit}}</span>
                </el-col>
                <el-col :span="8">
                  <span>￥{{e.goods.gshangjiaprice}}</span><br>
                  <span> x{{e.oxcount}}</span>
                </el-col>
              </el-row>
              <el-divider></el-divider>
            </div>
            <span>总价:{{scope.row.oprice}}</span>
            <el-button type="success" v-if="scope.row.oZLogistics=='已发货'"@click="queren(scope.row.id)">确认收货</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
    export default {
        name: "shangorder",
        data(){
          return{
            tableDatauser1:[],
            total:1,
            page:1,
            pagesize:4,
            loading: true,
            tabname:"",
          }
        },
        methods:{
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
            params.append("sid", 1);
            params.append("oSLogistics", this.tabname);
            this.$axios.post("/queryAllOrderShang.action",params).
            then(function(result) {
              _this.loading=false;
              _this.tableDatauser1 = result.data.rows;
              _this.total = result.data.total;
            }).
            catch(function(error) {
              alert(error)
            });

          },
          queren(id){
            this.$confirm('你确认收货吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '订单已完成!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消取消'
              });
            });
          }
      },
      created(){
        this.getData();
      },
    }
</script>

<style scoped>
  .el-tabs__nav-wrap
  .el-tabs__nav-scroll
  .el-tabs__nav {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

</style>
