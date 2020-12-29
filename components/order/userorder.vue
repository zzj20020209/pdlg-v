<template>
  <div>
  <!-- 添加模态框-->
    <el-dialog id="paydialog" title="支付" :visible.sync="dialogFormVisible">
      <div id="mydiv">

      </div>
    </el-dialog>
  <el-tabs type="border-card" stretch style="width: 100%"  @tab-click="handleClick">
    <el-tab-pane label="全部订单">
      <el-table :data="tableDatauser1" stripe style="width: 100%" border :cell-style="{background:'#fff'}" :show-header="false" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <template slot="empty">
          <img class="data-pic" src="img/wushu.png" alt="" /><br>你还没有相关的订单<br>可以去看看有哪些想买的</template>
        <el-table-column  >
          <template  slot-scope="scope" >
            <el-row>
              <el-col :span="12">
                <el-tag>{{scope.row.id}}</el-tag>
              </el-col>
              <el-col :span="12">
                <div style="text-align: right">
                  <el-tag :type="scope.row.oYogistics!='待付款' ?'success':'info'" >{{scope.row.oYogistics}}</el-tag>
                </div>
              </el-col>

           </el-row>
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
            <div style="text-align: right">
            <span>总价:{{scope.row.oprice}}</span>
            <el-button type="success" v-if="scope.row.oYogistics=='待付款'" @click="fukuan(scope.row)">付款</el-button>
            <el-button type="success" v-if="scope.row.oYogistics!='已完成' "@click="quxiao(scope.row.id)">取消订单</el-button>
            <el-button type="success" v-if="scope.row.oSLogistics=='待提货'"@click="queren(scope.row.id)">确认收货</el-button>
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

    <el-tab-pane label="待付款">
      <el-table :data="tableDatauser1" stripe style="width: 100%" border :cell-style="{background:'#fff'}" :show-header="false" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <template slot="empty">
          <img class="data-pic" src="img/wushu.png" alt="" /><br>你还没有相关的订单<br>可以去看看有哪些想买的</template>
        <el-table-column  >
          <template  slot-scope="scope" >
            <el-row>
              <el-col :span="12">
                <el-tag>{{scope.row.id}}</el-tag>
              </el-col>
              <el-col :span="12">
                <div style="text-align: right">
                  <el-tag :type="scope.row.oYogistics!='待付款' ?'success':'info'" >{{scope.row.oYogistics}}</el-tag>
                </div>
              </el-col>

            </el-row>
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
            <div style="text-align: right">
              <span>总价:{{scope.row.oprice}}</span>
              <el-button type="success" v-if="scope.row.oYogistics=='待付款'" @click="fukuan(scope.row)">付款</el-button>
              <el-button type="success" v-if="scope.row.oYogistics!='已完成' "@click="quxiao(scope.row.id)">取消订单</el-button>
              <el-button type="success" v-if="scope.row.oSLogistics=='待提货'"@click="queren(scope.row.id)">确认收货</el-button>
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

    <el-tab-pane label="待发货">
      <el-table :data="tableDatauser1" stripe style="width: 100%" border :cell-style="{background:'#fff'}" :show-header="false" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <template slot="empty">
          <img class="data-pic" src="img/wushu.png" alt="" /><br>你还没有相关的订单<br>可以去看看有哪些想买的</template>
        <el-table-column  >
          <template  slot-scope="scope" >
            <el-row>
              <el-col :span="12">
                <el-tag>{{scope.row.id}}</el-tag>
              </el-col>
              <el-col :span="12">
                <div style="text-align: right">
                  <el-tag :type="scope.row.oYogistics!='待付款' ?'success':'info'" >{{scope.row.oYogistics}}</el-tag>
                </div>
              </el-col>

            </el-row>
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
            <div style="text-align: right">
              <span>总价:{{scope.row.oprice}}</span>
              <el-button type="success" v-if="scope.row.oYogistics=='待付款'" @click="fukuan(scope.row)">付款</el-button>
              <el-button type="success" v-if="scope.row.oYogistics!='已完成' "@click="quxiao(scope.row.id)">取消订单</el-button>
              <el-button type="success" v-if="scope.row.oSLogistics=='待提货'"@click="queren(scope.row.id)">确认收货</el-button>
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

    <el-tab-pane label="待配送">
      <el-table :data="tableDatauser1" stripe style="width: 100%" border :cell-style="{background:'#fff'}" :show-header="false" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <template slot="empty">
          <img class="data-pic" src="img/wushu.png" alt="" /><br>你还没有相关的订单<br>可以去看看有哪些想买的</template>
        <el-table-column  >
          <template  slot-scope="scope" >
            <el-row>
              <el-col :span="12">
                <el-tag>{{scope.row.id}}</el-tag>
              </el-col>
              <el-col :span="12">
                <div style="text-align: right">
                  <el-tag :type="scope.row.oYogistics!='待付款' ?'success':'info'" >{{scope.row.oYogistics}}</el-tag>
                </div>
              </el-col>

            </el-row>
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
            <div style="text-align: right">
              <span>总价:{{scope.row.oprice}}</span>
              <el-button type="success" v-if="scope.row.oYogistics=='待付款'" @click="fukuan(scope.row)">付款</el-button>
              <el-button type="success" v-if="scope.row.oYogistics!='已完成' "@click="quxiao(scope.row.id)">取消订单</el-button>

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

    <el-tab-pane label="待提货">
      <el-table :data="tableDatauser1" stripe style="width: 100%" border :cell-style="{background:'#fff'}" :show-header="false" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <template slot="empty">
          <img class="data-pic" src="img/wushu.png" alt="" /><br>你还没有相关的订单<br>可以去看看有哪些想买的</template>
        <el-table-column  >
          <template  slot-scope="scope" >
            <el-row>
              <el-col :span="12">
                <el-tag>{{scope.row.id}}</el-tag>
              </el-col>
              <el-col :span="12">
                <div style="text-align: right">
                  <el-tag :type="scope.row.oYogistics!='待付款' ?'success':'info'" >{{scope.row.oYogistics}}</el-tag>
                </div>
              </el-col>

            </el-row>
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
            <div style="text-align: right">
              <span>总价:{{scope.row.oprice}}</span>
              <el-button type="success" v-if="scope.row.oYogistics=='待付款'" @click="fukuan(scope.row)">付款</el-button>
              <el-button type="success" v-if="scope.row.oYogistics!='已完成' "@click="quxiao(scope.row.id)">取消订单</el-button>

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

    <el-tab-pane label="已提货">
      <el-table :data="tableDatauser1" stripe style="width: 100%" border :cell-style="{background:'#fff'}" :show-header="false" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <template slot="empty">
          <img class="data-pic" src="img/wushu.png" alt="" /><br>你还没有相关的订单<br>可以去看看有哪些想买的</template>
        <el-table-column  >
          <template  slot-scope="scope" >
            <el-row>
              <el-col :span="12">
                <el-tag>{{scope.row.id}}</el-tag>
              </el-col>
              <el-col :span="12">
                <div style="text-align: right">
                  <el-tag :type="scope.row.oYogistics!='待付款' ?'success':'info'" >{{scope.row.oYogistics}}</el-tag>
                </div>
              </el-col>

            </el-row>
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
            <div style="text-align: right">
              <span>总价:{{scope.row.oprice}}</span>
              <el-button type="success" v-if="scope.row.oYogistics=='待付款'" @click="fukuan(scope.row)">付款</el-button>
              <el-button type="success" v-if="scope.row.oYogistics!='已完成' "@click="quxiao(scope.row.id)">取消订单</el-button>

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
  </div>
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
            uid:sessionStorage.getItem('id'),
            dialogFormVisible:false
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
            params.append("uid", this.uid);
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
          fukuan(row){
            var _this = this;
            var params = new URLSearchParams();
            params.append("tradeno",row.id);  //订单号
            params.append("price",row.oprice);    //价格
            params.append("tradename",'哈哈订单');  //订单名字
            this.$axios.post("pay.action",params).then(function (result) {
              var bodystr = result.data;  //后端返回的支付页面代码
              console.log(bodystr)
              bodystr=bodystr.substr(0,bodystr.indexOf("<script>"));
              console.log(bodystr)
              document.getElementById("mydiv").innerHTML=bodystr;
              document.forms[0].submit();   //返回代码中需要表单提交得到真实的支付页面

            }).catch();

            this.dialogFormVisible=true;

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
