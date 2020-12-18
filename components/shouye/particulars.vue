<template>
  <div>
    <div>
      <dhl></dhl>
      <fl></fl>
    </div>
    <div style="padding-top: 115px;" class="el-col-offset-2">
      <a href="#">首页</a><span>>{{ sname }}</span>
    </div>
    <div style="padding-top: 5px;">
      <div style="width:100%;height:2px;margin:0px auto;padding:0px;background-color:gray;overflow:hidden;"></div>
      <el-row style="padding-top: 5px">
        <el-card style="background-color: whitesmoke" body-style="border-radius: 15px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);height:500px">
          <el-row>
            <el-col :span="10" class="el-col-offset-1">
              <el-image src="imgs/1.jpg"></el-image>
            </el-col>
            <el-col :span="12" class="el-col-offset-1">
              <div align="left">
                <span style="font-size: 20px;font-weight: bold;">新鲜蔬菜1kg/把</span>
                <p class="zi">绿色营养  身体健康</p>
                <div style="background-color: white;margin-top: 30px;border-radius:8px;width: 90%;height: 75px">
                  <span style="padding-left: 10px">价格:</span><span style="font-size: 30px;font-weight: bold;color: red;padding-left: 30px">￥100</span>
                  <div style="width:60%;height:1px;padding:0px;background-color:gray;overflow:hidden;"></div>
                  <span class="zi" style="padding-left: 10px;padding-top: 20px">更多商品优惠，尽在胖达乐购APP</span>
                </div>
                <div>
                  <el-row  style="padding-top: 25px">
                    <el-col :span="2">规格:</el-col>
                    <el-col :span="3"><table id="tab"><tr><td>￥38.9</td></tr><tr><td>1把/份</td></tr></table></el-col>
                  </el-row>

                  <el-row style="padding-top: 25px">
                    <el-col :span="2">数量:</el-col>
                    <el-col :span="4"><el-input-number style="width: 100px;text-align: left" v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number></el-col>
                  </el-row>
                  <el-col style="padding-top: 25px" :span="24"><el-button type="danger" style="width: 600px;height: 60px" class="el-button"  icon="el-icon-shopping-cart-2">购买</el-button></el-col>
                </div>
              </div>
            </el-col>
          </el-row>
          <div>
            <el-row style="padding-top: 5px">
              <el-col :span="22" class="el-col-offset-1">
                <table>
                  <tr>
                    <td>
                      <img src="imgs/2.jpg" style="width: 80px;height: 70px;">
                    </td>
                    <td>
                      <img src="imgs/2.jpg" class="image">
                    </td>
                    <td>
                      <img src="imgs/2.jpg" class="image">
                    </td>
                  </tr>
                </table>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-row>
    </div>
  </div>
</template>

<script>
import dhl from './navigation';
import fl from './classify';

export default {
  name: "particulars",
  data() {
    return {
      currentDate: new Date(),
      num: 1
    };
  }, components: {
    dhl,
    fl
  } ,methods: {
    handleChange(value) {
      console.log(value);
    }
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
