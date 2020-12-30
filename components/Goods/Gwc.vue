<template>
  <div>
    <div id="da" style="overflow:auto">
    <!--<el-button @click="innerDrawer = true">打开里面的!</el-button>
    <el-drawer
      title="我是里面的"
      :append-to-body="true"
      :before-close="handleClose"
      :visible.sync="innerDrawer">
      <p>_(:зゝ∠)_</p>
    </el-drawer>-->
    <el-row>
      <el-col>
        <div style="overflow:auto">
          <a href="#">
              <el-table
                :data="msg2"
                ref="gwcb"
                @selection-change="fxk"
                style="width: 770px">
                <el-table-column
                  type="selection"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  width="600" align="center" label="购物车">
                  <template slot-scope="scope">
                    <a href="#" @click="jrxq(scope.row.gwname)">
                    <img style="width:200px;height:200px;border:none;" :src="$host+scope.row.gwimage"><br>
                    <label>{{scope.row.gwname}}</label><br>
                    <label style="font-size: 18px"><font color="red">￥</font>{{scope.row.gwprice}}【{{scope.row.gwunit}}】</label><br>
                    </a>
                      <el-input
                      placeholder="请输入你要采购的数量"
                      v-model="scope.row.gwsl"
                      type="number"
                      :min="1"
                      style="width: 85px;text-align: center"
                    >
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
            <!--<table style="text-align: center" width="100%">
              <tr v-for="cu in msg2"
                  class="list">
                <td>
                  <div>
                    <a href="#">
                      <img :src="cu.ims" class="imgs"><br>
                      <label>{{ cu.id | fmatter }}</label><br>
                      <label style="font-size: 18px"><font color="red">￥</font>{{ cu.price  }}</label>
                    </a>
                  </div>
                </td>
              </tr>
            </table>-->
          </a>
        </div>
      </el-col>
    </el-row>
    </div>
    <el-col style="padding-top: 25px" :span="24">
      <el-button type="danger" style="width: 200px;height: 60px" class="el-button"  icon="el-icon-shopping-cart-2" @click="dpd">购买</el-button>
      <el-button type="danger" style="width: 200px;height: 60px" class="el-button"  icon="el-icon-delete" @click="scgwc">删除</el-button>
    </el-col>
    <label>共选择：<font style="color: red">{{xz}}</font>条</label>
    <label>总计：￥<font style="color: red">{{zprice}}</font></label>
    <el-dialog append-to-body title="确认订单" :visible.sync="ddym" width="30%">
      <goumai v-if="bo" ref="gm"></goumai>
      <!--将编辑页面子组件加入到列表页面 -->
      <div>
        <el-col style="padding-top: 25px" :span="24">
          <el-button type="danger" style="width: 200px;height: 60px" class="el-button"  icon="el-icon-shopping-cart-2" @click="tj">提交</el-button>
          <el-button type="danger" style="width: 200px;height: 60px" class="el-button"  icon="el-icon-delete" @click="qx">取消</el-button>
        </el-col>
        <label>共选择：<font style="color: red">{{xz}}</font>条</label>
        <label>总计：￥<font style="color: red">{{zprice}}</font></label>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Goumai from "./goumai";
  export default {
    name: "Gwc",
    components: {Goumai},
    props:['drawer'],
    data() {
      return {
        ddym:false,
        zprice:0,
        xz:0,
        gid:0,
        id:"",
        msg2: [],
        count: 1,
        innerDrawer: false,
        dd:[],
        bo:true,
        uid:sessionStorage.getItem('id'),
      }
    },
    methods: {
      tj(){
        var _this=this
        if(this.$refs.gm.shanghu==""){
          _this.$message({
            message: '请选择商户',
            type: 'error'
          });
        }else {
          var _this=this
          var params = new URLSearchParams();
          //订单
          //总金额 zprice
          params.append("oprice",this.zprice);
          //订单详情
          //商品ID this.$refs.gm.msg2
          //单个金额 // 单个数量
          var dmoney="";
          var dcount="";
          var gname="";
           this.$refs.gm.msg2.forEach(i=>{
             dmoney+=i.gwprice+",";
             dcount+=i.gwsl+",";
             gname+=i.gwname+",";
           })
          params.append("dmoney",dmoney);
          params.append("dcount",dcount);
          params.append("gname",gname);
          params.append("shang",parseInt(_this.$refs.gm.shanghu));
          params.append("uid",parseInt(_this.uid));
          this.$axios.post("/addOrder.action",params).
          then(function(result) {
            _this.$message({
              type: 'success',
              message: result.data
            });
            _this.ddym=false
            _this.scgwc();
            _this.drawer.gwc.hide();
          }).
          catch(function(error) {
            alert(error)
          });

        }
      },
      qx(){
        this.ddym=false
      },
      jrxq(val){
        var _this=this
        var gname=val;
        var params = new URLSearchParams();
        params.append("gname",gname);
        this.$axios.post("/goodscx.action",params).
        then(function(result) {
          sessionStorage.setItem("gid",result.data.gid)
          _this.$router.push("/navigation/particulars");
        }).
        catch(function(error) {
          alert(error)
        });
        this.drawer.gwc.hide();
      },
      scgwc(){
        var _this=this;
        if(_this.$refs.gwcb.selection.length<1){
          _this.$message({
            message: '至少选择一条数据',
            type: 'error'
          });
        }else {
          var params = new URLSearchParams();
          params.append("gwid", this.gid);
          this.$axios.post("scgwc.action", params).
          then(function(result) {
            _this.$message({
              message: result.data,
              type: 'success'
            });
            //刷新数据
            _this.getData();
          }).
          catch(function() {
            _this.$message({
              message: '删除失败！',
              type: 'error'
            });
          })
        }
      },
      dpd(){
        var _this=this;
        if(_this.$refs.gwcb.selection.length<1){
          _this.$message({
            message: '至少选择一条数据',
            type: 'error'
          });
        }else {
          sessionStorage.setItem("dd",this.dd)
          var _this=this
          this.bo =false
          this.$nextTick(function(){
            this.bo = true
          })
          this.ddym=true
        alert("aaaa")
        }
      },
      handleClose(done) {
        this.$confirm('还有未保存的工作哦确定关闭吗？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      fxk(val){
        this.msg=[];
        this.dd=[]
        var num=0;
        for (let i = 0; i < val.length; i++) {
          if (this.msg.indexOf(val[i].gwid) === -1) {
            this.dd.push(val[i].gwid)
            this.msg.push(val[i].gwid)
            num+=(val[i].gwprice*val[i].gwsl)
          }
        }
        let str="";
        this.msg.forEach((item)=> {
          str=str+item+","
        })
        this.gid=str;
        this.xz=this.msg.length
        this.zprice=num
      },
      getData() { //获取数据方法
        this.msg2=[];
        var _this = this;
        var params = new URLSearchParams();
        params.append("uid", this.id);
        this.$axios.post("/gwcx.action",params).
        then(function(result) {
          _this.loading=false;
          _this.msg2 = result.data;
        }).
        catch(function(error) {
          alert(error)
        });
      },
    },created() { //钩子函数  vue对象初始化完成后执行
      this.id=sessionStorage.getItem("id")
      this.getData();
    }
  }
</script>

<style scoped>
  #da{
    width: 770px;
    height: 770px;
  }
  .imgs {
    height: 200px;
    width: 300px;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 750px;
    display: block;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  *{
    text-align: center;
  }
  a{
    text-decoration: none;
  }
</style>
