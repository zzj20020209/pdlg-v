<template>
  <el-tabs type="border-card" stretch style="width: 80%"  @tab-click="handleClick">
    <el-tab-pane label="全部订单">
      <el-table :data="tableDatauser1" stripe style="width: 100%" border :cell-style="{background:'#fff'}" :show-header="false" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <template slot="empty">
          <img class="data-pic" src="img/wushu.png" alt="" /><br>你还没有相关的订单<br>可以去看看有哪些想买的</template>
        <el-table-column  >
          <template  slot-scope="scope">
            <span>{{scope.row.orid}}</span>
            <el-tag :type="scope.row.oYogistics!='待付款' ?'success':'info'" >{{scope.row.oYogistics}}</el-tag>
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
            <el-button type="success" v-if="scope.row.oYogistics=='待付款'" @click="fukuan(scope.row.id)">付款</el-button>
            <el-button type="success" v-if="scope.row.oYogistics!='已完成' "@click="quxiao(scope.row.id)">取消订单</el-button>
            <el-button type="success" v-if="scope.row.oSLogistics=='待提货'"@click="queren(scope.row.id)">确认收货</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>

    <el-tab-pane label="待付款">
      <el-table :data="tableDatauser1" stripe style="width: 100%" border :cell-style="{background:'#fff'}" :show-header="false" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <template slot="empty">
          <img class="data-pic" src="img/wushu.png" alt="" /><br><span>你还没有相关的订单!可以去看看有哪些想买的</span></template>
        <el-table-column  >
          <template  slot-scope="scope">
            <span>{{scope.row.orid}}</span>
            <el-tag :type="scope.row.oYogistics!='待付款' ?'success':'info'" >{{scope.row.oYogistics}}</el-tag>
            <el-divider></el-divider>
            <div v-for="e in scope.row.orderXiangList">
              <el-row>
                <el-col :span="8">
                  <img style="width:80px;height:80px;border:none;" :src="$host +e.goods.gimage">
                </el-col>
                <el-col :span="8">
                  <span>{{e.goods.gname}}</span><br>
                  <span>{{e.goods.gunit}}</span>
                </el-col>
                <el-col :span="8">
                  <span>￥{{e.goods.gshangjiaprice}}</span><br>
                  <span>x{{e.oxcount}}</span>
                </el-col>
              </el-row>
              <el-divider></el-divider>
            </div>
            <span>总价:{{scope.row.oprice}}</span>
            <el-button type="success" v-if="scope.row.oYogistics=='待付款'" @click="fukuan(scope.row.id)">付款</el-button>
            <el-button type="success" v-if="scope.row.oYogistics!='已完成' "@click="quxiao(scope.row.id)">取消订单</el-button>
            <el-button type="success" v-if="scope.row.oSLogistics=='待提货'"@click="queren(scope.row.id)">确认收货</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>

    <el-tab-pane label="待配送">
      <el-table :data="tableDatauser1" stripe style="width: 100%" border :cell-style="{background:'#fff'}" :show-header="false" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <template slot="empty">
          <img class="data-pic" src="img/wushu.png" alt="" /><br><span>你还没有相关的订单!</span></template>
        <el-table-column  >
          <template  slot-scope="scope">
            <span>{{scope.row.orid}}</span>
            <el-tag :type="scope.row.oYogistics!='待付款' ?'success':'info'" >{{scope.row.oYogistics}}</el-tag>
            <el-divider></el-divider>
            <div v-for="e in scope.row.orderXiangList">
              <el-row>
                <el-col :span="8">
                  <img style="width:80px;height:80px;border:none;" :src="$host +e.goods.gimage">
                </el-col>
                <el-col :span="8">
                  <span>{{e.goods.gname}}</span><br>
                  <span>{{e.goods.gunit}}</span>
                </el-col>
                <el-col :span="8">
                  <span>￥{{e.goods.gshangjiaprice}}</span><br>
                  <span>x{{e.oxcount}}</span>
                </el-col>
              </el-row>
              <el-divider></el-divider>
            </div>
            <span>总价:{{scope.row.oprice}}</span>
            <el-button type="success" v-if="scope.row.oYogistics=='待付款'" @click="fukuan(scope.row.id)">付款</el-button>
            <el-button type="success" v-if="scope.row.oYogistics!='已完成' "@click="quxiao(scope.row.id)">取消订单</el-button>
            <el-button type="success" v-if="scope.row.oSLogistics=='待提货'"@click="queren(scope.row.id)">确认收货</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>

    <el-tab-pane label="待提货">
      <el-table :data="tableDatauser1" stripe style="width: 100%" border :cell-style="{background:'#fff'}" :show-header="false" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <template slot="empty">
          <img class="data-pic" src="img/wushu.png" alt="" /><br><span>你还没有相关的订单!可以去看看有哪些想买的</span></template>
        <el-table-column  >
          <template  slot-scope="scope">
            <span>{{scope.row.orid}}</span>
            <el-tag :type="scope.row.oYogistics!='待付款' ?'success':'info'" >{{scope.row.oYogistics}}</el-tag>
            <el-divider></el-divider>
            <div v-for="e in scope.row.orderXiangList">
              <el-row>
                <el-col :span="8">
                  <img style="width:80px;height:80px;border:none;" :src="$host +e.goods.gimage">
                </el-col>
                <el-col :span="8">
                  <span>{{e.goods.gname}}</span><br>
                  <span>{{e.goods.gunit}}</span>
                </el-col>
                <el-col :span="8">
                  <span>￥{{e.goods.gshangjiaprice}}</span><br>
                  <span>x{{e.oxcount}}</span>
                </el-col>
              </el-row>
              <el-divider></el-divider>
            </div>
            <span>总价:{{scope.row.oprice}}</span>
            <el-button type="success" v-if="scope.row.oYogistics=='待付款'" @click="fukuan(scope.row.id)">付款</el-button>
            <el-button type="success" v-if="scope.row.oYogistics!='已完成' "@click="quxiao(scope.row.id)">取消订单</el-button>
            <el-button type="success" v-if="scope.row.oSLogistics=='待提货'"@click="queren(scope.row.id)">确认收货</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>

    <el-tab-pane label="已提货">
      <el-table :data="tableDatauser1" stripe style="width: 100%" border :cell-style="{background:'#fff'}" :show-header="false" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <template slot="empty">
          <img class="data-pic" src="img/wushu.png" alt="" /><br><span>你还没有相关的订单!可以去看看有哪些想买的</span></template>
        <el-table-column  >
          <template  slot-scope="scope">
            <span>{{scope.row.orid}}</span>
            <el-tag :type="scope.row.oYogistics!='待付款' ?'success':'info'" >{{scope.row.oYogistics}}</el-tag>
            <el-divider></el-divider>
            <div v-for="e in scope.row.orderXiangList">
              <el-row>
                <el-col :span="8">
                  <img style="width:80px;height:80px;border:none;" :src="$host +e.goods.gimage">
                </el-col>
                <el-col :span="8">
                  <span>{{e.goods.gname}}</span><br>
                  <span>{{e.goods.gunit}}</span>
                </el-col>
                <el-col :span="8">
                  <span>￥{{e.goods.gshangjiaprice}}</span><br>
                  <span>x{{e.oxcount}}</span>
                </el-col>
              </el-row>
              <el-divider></el-divider>
            </div>
            <span>总价:{{scope.row.oprice}}</span>
            <el-button type="success" v-if="scope.row.oYogistics=='待付款'" @click="fukuan(scope.row.id)">付款</el-button>
            <el-button type="success" v-if="scope.row.oYogistics!='已完成' "@click="quxiao(scope.row.id)">取消订单</el-button>
            <el-button type="success" v-if="scope.row.oSLogistics=='待提货'"@click="queren(scope.row.id)">确认收货</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>

</template>

<script>
    export default {
        name: "userorder",
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
            params.append("uid", 1);
            params.append("oYogistics", this.tabname);
            this.$axios.post("/queryAllOrderUser.action",params).
            then(function(result) {
              _this.loading=false;
              _this.tableDatauser1 = result.data.rows;
              _this.total = result.data.total;
            }).
            catch(function(error) {
              alert(error)
            });

          },
          fukuan(id){
          },
          quxiao(id){
            this.$confirm('你确认取消该订单吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '取消成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: id
              });
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
