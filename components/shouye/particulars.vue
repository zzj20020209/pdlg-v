<template>
  <div>
    <div style="padding-top: 60px;" class="el-col-offset-2">
    </div>
    <div style="padding-top: 5px;">
      <div style="width:100%;height:2px;margin:0px auto;padding:0px;background-color:gray;overflow:hidden;"></div>
      <el-row style="padding-top: 5px">
        <el-card style="background-color: whitesmoke" body-style="border-radius: 15px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);height:500px">
          <el-row>
            <el-col :span="10" class="el-col-offset-1">
              <div class="block">
                <el-carousel height="475px">
                  <el-carousel-item v-for="item in tableData.goodsImagelist" :key="item">
                    <img width="100%" height="100%" :src="$host + item.giurl" alt="">
                  </el-carousel-item>
                </el-carousel>
              </div>
            </el-col>
            <el-col :span="12" class="el-col-offset-1">
              <div align="left">
                <span style="font-size: 20px;font-weight: bold;">{{tableData.gname}}</span>
                <br>
                <br>
                <div style="background-color: white;margin-top: 30px;border-radius:8px;width: 90%;height: 75px">
                  <span style="padding-left: 10px">价格:</span><span style="font-size: 30px;font-weight: bold;color: red;padding-left: 30px">￥{{tableData.gshangjiaprice}}</span>
                  <div style="width:60%;height:1px;padding:0px;background-color:gray;overflow:hidden;"></div>
                  <span class="zi" style="padding-left: 10px;padding-top: 20px">更多商品优惠，尽在胖达乐购APP</span>
                </div>
                <div>
                  <el-row  style="padding-top: 50px">
                    <el-col :span="2">规格:</el-col>
                    <el-col :span="3"><table id="tab"><tr>{{tableData.gunit}}</tr></table></el-col>
                  </el-row>

                  <el-row style="padding-top: 50px">
                    <el-col :span="2">数量:</el-col>
                    <el-col :span="4"><el-input-number style="width: 100px;text-align: left" v-model="num" controls-position="right" @change="handleChange" :min="1" :max=kc></el-input-number><br>当前剩余库存：{{kc}}</el-col>
                  </el-row>
                  <el-col style="padding-top: 75px" :span="24">
                      <el-button type="danger" style="width: 200px;height: 60px" class="el-button"  icon="el-icon-shopping-cart-2">购买</el-button>
                    <el-button type="danger" style="width: 200px;height: 60px" class="el-button"  icon="el-icon-shopping-cart-2" @click="jrgwc">加入购物车</el-button>
                  </el-col>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-row>
    </div>
    <div>
      <img src="img/weibu.png" width="1918" height="324">
    </div>
  </div>
</template>

<script>

export default {
  name: "particulars",
  data() {
    return {
      selectIndex:0,
      selectData:{},
      tableData: [],
      kc:0,
      gname:"",
      gid:5,
      currentDate: new Date(),
      num: 1,
      dialogVisible: false,
      user:null,
      circleUrl:"./img/2.png"
    };
  },methods: {
    getData() { //获取数据方法
      this.tableData=[];
      var _this = this;
      var params = new URLSearchParams();
      params.append("gid", this.gid);
      this.$axios.post("/queryGoodsBygid.action",params).
      then(function(result) {
        _this.tableData = result.data;
      }).
      catch(function(error) {

      });

      this.$axios.post("/kccx.action",params).
        then(function (result) {
        if(result.data.suinventory=="" || result.data.suinventory==null){
          _this.kc=0;
        }else {
          _this.kc=result.data.suinventory;
        }
      })
    },
    jrgwc(){
      this.user=sessionStorage.getItem("yhname");
      var _this=this;
      if(this.user!=null){

        if(this.kc==0){
          _this.$message({
            message: "该商品库存不足",
            type: 'error'
          });
        }else {
          var param=new URLSearchParams();
          var pa=new URLSearchParams();
          param.append("gid", this.gid);
          this.$axios.post("/queryGoodsBygid.action",param).then(function (result) {
            pa.append("uid",sessionStorage.getItem("id"));
            pa.append("gwname",result.data.gname);
            pa.append("gwunit",result.data.gunit);
            pa.append("gwprice",result.data.gshangjiaprice);
            pa.append("gwimage",result.data.gimage);
            pa.append("gwsl",_this.num)
            _this.$axios.post("/gw.action",pa).then(function (result) {
              _this.$message({
                message: result.data,
                type: 'success'
              });
              _this.$router.push("/navigation/shouyemian")
            }).catch(function (error) {
              alert(error)
            })
          }).catch(function (error) {
            alert(error)
          })
        }
      }else {
        _this.$message({
          message: "请先登录",
          type: 'error'
        });
      }
    },
    handleChange(value) {
      console.log(value);
    }
  },
  created() { //钩子函数  vue对象初始化完成后  执行
    this.gid=sessionStorage.getItem("gid")
    this.getData();
  }
}
</script>

<style scoped>

.image {
  width: 80px;
  height: 70px;
  display: block;
  padding-left: 25px;
}

.zi{
  padding-top: 5px;
  color: gray;
}

#tab tr td{
  border: 1px red solid;
  padding: 0px;
}
.el-image{
  width: 560px;
  height: 400px;
}
</style>
