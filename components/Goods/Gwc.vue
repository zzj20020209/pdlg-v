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
            <!--<ul v-for="cu in msg2"
                class="list"
                v-infinite-scroll="load"
                infinite-scroll-disabled="disabled">
              <li v-for="i in count" class="list-item">
                <el-card :body-style="{ padding: '0px' }">
                  <img :src="cu.ims" class="imgs">
                  <div style="padding: 14px;">
                    <time class="time">名称:{{ cu.id }}</time>
                    <br>
                    <time class="time">价格:{{ cu.price }}/1个</time>
                  </div>
                </el-card>
              </li>
            </ul>-->

              <el-table
                :data="msg2"
                @selection-change="fxk"
                style="width: 770px">
                <el-table-column
                  type="selection"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  width="650" align="center" label="购物车">
                  <template slot-scope="scope">
                    <img style="width:200px;height:200px;border:none;" :src="scope.row.ims"><br>
                    <label>{{ scope.row.id | fmatter }}</label><br>
                    <label style="font-size: 18px"><font color="red">￥</font>{{scope.row.price}}</label>
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
      <el-button type="danger" style="width: 200px;height: 60px" class="el-button"  icon="el-icon-shopping-cart-2">购买</el-button>
      <el-button type="danger" style="width: 200px;height: 60px" class="el-button"  icon="el-icon-shopping-cart-2">删除</el-button>
    </el-col>
  </div>
</template>

<script>
  export default {
    name: "Gwc",
    data() {
      return {
        msg2: [
          {id: 1, price: 13.5, ims: "imgs/1.jpg"},
          {id: 2, price: 13.5, ims: "imgs/2.jpg"},
          {id: 3, price: 13.5, ims: "imgs/3.jpg"},
          {id: 4, price: 13.5, ims: "imgs/3.jpg"},
          {id: 5, price: 13.5, ims: "imgs/3.jpg"},
          {id: 6, price: 13.5, ims: "imgs/3.jpg"},
          {id: 7, price: 13.5, ims: "imgs/3.jpg"},
          {id: 8, price: 13.5, ims: "imgs/3.jpg"},
        ],
        count: 1,
        innerDrawer: false,
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('还有未保存的工作哦确定关闭吗？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      fxk(val){

      }
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
</style>
