<template>
    <div>
      <div style="  position: fixed;width: 100%;top: 60px;z-index: 999;">
      <el-container>
        <el-col :span="24">
          <el-collapse accordion>
            <el-collapse-item>
              <template slot="title" style="text-center:center">
                全部商品<i class="header-icon el-icon-info"></i>
              </template>
              <div align="left" style="padding-left:20px">
                <el-tabs type="border-card" :tab-position="tabs" style="height: 250px;">
                  <el-tab-pane label="精选肉类"><h4>精选肉类</h4></el-tab-pane>
                  <el-tab-pane label="绿色鲜蔬"><h4>绿色鲜蔬</h4></el-tab-pane>
                  <el-tab-pane label="粮油杂货"><h4>粮油杂货</h4></el-tab-pane>
                  <el-tab-pane label="食品饮料"><h4>食品饮料</h4></el-tab-pane>
                  <el-tab-pane label="新鲜水果"><h4>新鲜水果</h4></el-tab-pane>
                </el-tabs>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-container>
    </div>
      <div>
        <el-drawer
          title="我是标题"
          :visible.sync="tk"
          :with-header="false"
          size="40%">
          <router-view>
          </router-view>
        </el-drawer>
      </div>
      <div style="padding-top:90px">
        <el-container>
          <el-col :span="22" class="el-col-offset-1">
            <el-carousel :interval="4000" type="card" height="350px">
              <el-carousel-item v-for="item in imagebox" :key="item.id">
                <img :src="item.idView" class="image">
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-container>
      </div>

      <div style="width:94%;height:2px;margin:0px auto;padding:0px;background-color:gray;overflow:hidden;"></div>
      <h1>蔬菜区</h1>
      <el-row>
        <el-col :span="4" class="el-col-offset-1">
          <div><img src="imgs/10.jpg" class="log"></div>
        </el-col>
        <el-col :span="17" class="el-col-offset-1">
          <table>
            <tr v-for="(chapter,index) in msg2" v-if="index%4==0">
              <td>
                <div>
                  <el-card shadow="hover">
                  <a href="#" @click="spxq(msg2[index].gid)">

                    <img :src="$host + msg2[index].gimage" class="imgs"><br>

                    <label>{{ msg2[index].gname | fmatter }}</label><br>
                    <label style="font-size: 18px"><font color="red">￥</font>{{ msg2[index].gprice}}</label>
                  </a>
                  </el-card>
                </div>
              </td>
              <td>
                <el-card shadow="hover">
                <a href="#" @click="spxq(msg2[index + 1].gid)"><img :src="$host+msg2[index+1].gimage" class="imgs"><br>
                  <label>{{ msg2[index + 1].gname }}</label><br>
                  <label style="font-size: 18px"><font color="red">￥</font>{{ msg2[index+1].gprice}}</label>
                </a>
                </el-card>
              </td>
              <td>
                <el-card shadow="hover">
                <a href="#" @click="spxq(msg2[index + 2].gid)">
                  <img :src="$host+msg2[index+2].gimage" class="imgs"><br>
                  <label>{{ msg2[index + 2].gname }}</label><br>
                  <label style="font-size: 18px"><font color="red">￥</font>{{ msg2[index+2].gprice}}</label>
                </a>
                </el-card>
              </td>
              <td>
                <el-card shadow="hover">
                <a href="#" @click="spxq(msg2[index + 3].gid)"><img :src="$host+msg2[index+3].gimage" class="imgs"><br>
                <label>{{ msg2[index + 3].gname }}</label><br>
                <label style="font-size: 18px"><font color="red">￥</font>{{ msg2[index+3].gprice}}</label>
              </a>
                </el-card>
              </td>
            </tr>
          </table>
        </el-col>
      </el-row>

      <div style="width:94%;height:2px;margin:0px auto;padding:0px;background-color:gray;overflow:hidden;"></div>
      <h1>水果区</h1>
      <el-row>
        <el-col :span="4" class="el-col-offset-1">
          <div><img src="imgs/7.jpg" class="log"></div>
        </el-col>
        <el-col :span="17" class="el-col-offset-1">
          <table style="table-layout:fixed">
            <tr v-for="(chapter,index) in msg2" v-if="index%4==0">
              <td>
                <el-card shadow="hover">
                <a href="#">
                  <img :src=msg2[index].ims class="imgs"><br>
                    <label>{{ msg2[index].id }}</label><br>
                    <label>{{ msg2[index].price }}</label>

                </a>
                </el-card>
              </td>
              <td>
                <el-card shadow="hover">
                <a href="#"><img :src=msg2[index+1].ims class="imgs"><br>
                  <label>{{ msg2[index + 1].id }}</label><br>
                  <label>{{ msg2[index + 1].price}}</label>
                </a>
                </el-card>
              </td>
              <td>
                <el-card shadow="hover">
                <a href="#"><img :src=msg2[index+2].ims class="imgs"><br>
                <label>{{ msg2[index + 2].id }}</label><br>
                <label>{{ msg2[index + 2].price}}</label>
              </a>
                </el-card>
              </td>
              <td>
                <el-card shadow="hover">
                <a href="#"><img :src=msg2[index+3].ims class="imgs"><br>
                <label>{{ msg2[index + 3].id }}</label><br>
                <label>{{ msg2[index + 3].price}}</label>
              </a>
                </el-card>
              </td>
            </tr>
          </table>
        </el-col>
      </el-row>
      <img src="imgs/11.jpg" style="width: 100%">
    </div>
</template>

<script>
    export default {
        name: "shouyemian",
      data(){
          return{
            count:0,
            total:1,
            page:1,
            pagesize:8,
            tabs: "left",
            imagebox: [
              {id: 0, idView: 'imgs/1.jpg'},
              {id: 1, idView: 'imgs/2.jpg'},
              {id: 2, idView: 'imgs/3.jpg'}
            ],
            msg2: []
          }
      },
      methods: {
        load () {
          this.count += 2
        },
        getData() { //获取数据方法
          this.msg2=[];
          var _this = this;
          var params = new URLSearchParams();
          params.append("page", this.page);
          params.append("size", this.pagesize);
          params.append("gbsname","水果蔬菜")
          this.$axios.post("/queryGoods.action",params).
          then(function(result) {
            _this.loading=false;
            _this.msg2 = result.data.rows;
            _this.total = result.data.total;
          }).
          catch(function(error) {
            alert(error)
          });
        },
        spxq(val){
          this.$router.push("/navigation/particulars")
          sessionStorage.setItem("gid",val)
        },
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        }
      },
      created() { //钩子函数  vue对象初始化完成后  执行
        this.getData();
        this.load();
      }
    }
</script>

<style scoped>

  .image {
    /*设置图片宽度和浏览器宽度一致*/
    width: 100%;
    height: inherit;
  }

  .log {
    width: 260px;
    height: 544px
  }

  a{
    text-decoration: none;
  }

  table tr td {
    align-content: center;
    width: 5%;
    height: 270px;
  }

  table tr td label {
    word-break: break-all;
    overflow: hidden;
  }

  .imgs {
    height: 200px;
    width: 210px;
  }

  .el-row {
    margin-top: 30px;
  }

  body {
    background-color: gainsboro;
  }

  #yhdl{
    text-align: center;
  }

  #yhzc{
    text-align: center;
  }
  *{
    text-align: center;
  }
</style>
