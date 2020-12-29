<template>
    <div>
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
      <h1>蔬菜水果区</h1>
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
                    <label style="font-size: 18px"><font color="red">￥</font>{{ msg2[index].gshangjiaprice}}</label>
                  </a>
                  </el-card>
                </div>
              </td>
              <td>
                <el-card shadow="hover">
                <a href="#" @click="spxq(msg2[index + 1].gid)"><img :src="$host+msg2[index+1].gimage" class="imgs"><br>
                  <label>{{ msg2[index + 1].gname }}</label><br>
                  <label style="font-size: 18px"><font color="red">￥</font>{{ msg2[index+1].gshangjiaprice}}</label>
                </a>
                </el-card>
              </td>
              <td>
                <el-card shadow="hover">
                <a href="#" @click="spxq(msg2[index + 2].gid)">
                  <img :src="$host+msg2[index+2].gimage" class="imgs"><br>
                  <label>{{ msg2[index + 2].gname }}</label><br>
                  <label style="font-size: 18px"><font color="red">￥</font>{{ msg2[index+2].gshangjiaprice}}</label>
                </a>
                </el-card>
              </td>
              <td>
                <el-card shadow="hover">
                <a href="#" @click="spxq(msg2[index + 3].gid)"><img :src="$host+msg2[index+3].gimage" class="imgs"><br>
                <label>{{ msg2[index + 3].gname }}</label><br>
                <label style="font-size: 18px"><font color="red">￥</font>{{ msg2[index+3].gshangjiaprice}}</label>
              </a>
                </el-card>
              </td>
            </tr>
          </table>
        </el-col>
      </el-row>

      <div style="width:94%;height:2px;margin:0px auto;padding:0px;background-color:gray;overflow:hidden;"></div>
      <h1>海鲜生肉区</h1>
      <el-row>
        <el-col :span="4" class="el-col-offset-1">
          <div><img src="imgs/竖着.jpg" class="log"></div>
        </el-col>
        <el-col :span="17" class="el-col-offset-1">
          <table style="table-layout:fixed">
            <tr v-for="(chapter,index) in msg3" v-if="index%4==0">
              <td>
                <el-card shadow="hover">
                <a href="#" @click="spxq(msg3[index].gid)">
                  <img :src="$host+msg3[index].gimage" class="imgs"><br>
                    <label>{{ msg3[index].gname }}</label><br>
                    <label>{{ msg3[index].gshangjiaprice }}</label>

                </a>
                </el-card>
              </td>
              <td>
                <el-card shadow="hover">
                <a href="#" @click="spxq(msg3[index + 1].gid)"><img :src="$host+msg3[index+1].gimage" class="imgs"><br>
                  <label>{{ msg3[index + 1].gname }}</label><br>
                  <label>{{ msg3[index + 1].gshangjiaprice}}</label>
                </a>
                </el-card>
              </td>
              <td>
                <el-card shadow="hover">
                <a href="#" @click="spxq(msg3[index + 2].gid)"><img :src="$host+msg3[index+2].gimage" class="imgs"><br>
                <label>{{ msg3[index + 2].gname }}</label><br>
                <label>{{ msg3[index + 2].gshangjiaprice}}</label>
              </a>
                </el-card>
              </td>
              <td>
                <el-card shadow="hover">
                <a href="#" @click="spxq(msg3[index + 3].gid)"><img :src="$host+msg3[index+3].gimage" class="imgs"><br>
                <label>{{ msg3[index + 3].gname }}</label><br>
                <label>{{ msg3[index + 3].gshangjiaprice}}</label>
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
            imagebox: [
              {id: 0, idView: 'imgs/走马灯1.jpg'},
              {id: 1, idView: 'imgs/走马灯2.jpg'},
              {id: 2, idView: 'imgs/走马灯3.jpg'}
            ],
            msg2: [],
            msg3:[],

          }
      },
      methods: {
        load () {
          this.count += 2
        },
        getData() { //获取数据方法
          this.msg2=[];
          this.msg3=[];
          var _this = this;
          var params = new URLSearchParams();
          var pa=new URLSearchParams();
          params.append("page", this.page);
          params.append("size", this.pagesize);
          params.append("gbsname","水果蔬菜")
          params.append("gisshangjia",1)
          pa.append("page", this.page);
          pa.append("size", this.pagesize);
          pa.append("gbsname","海鲜生肉")
          pa.append("gisshangjia",1)
          this.$axios.post("/queryGoods.action",params).
          then(function(result) {
            _this.loading=false;
            _this.msg2 = result.data.rows;
            _this.total = result.data.total;
          }).
          catch(function(error) {
            alert(error)
          });

          this.$axios.post("/queryGoods.action",pa).
          then(function(result) {
            _this.loading=false;
            _this.msg3 = result.data.rows;
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
        this.gname=sessionStorage.getItem("gname")
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
