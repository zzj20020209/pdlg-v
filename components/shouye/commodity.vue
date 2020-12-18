<template>
  <div>
    <div style="width:94%;height:2px;margin:0px auto;padding:0px;background-color:gray;overflow:hidden;"></div>
    <h1>水果区</h1>
    <el-row>
      <el-col :span="4" class="el-col-offset-1">
        <div><img src="imgs/7.jpg" class="log"></div>
      </el-col>
      <el-col :span="17" class="el-col-offset-1">
        <table>
          <tr v-for="(chapter,index) in msg2" v-if="index%4==0">
            <td>
              <div>
                <a href="#">
                  <img :src=msg2[index].ims class="imgs"><br>
                  <label>{{ msg2[index].id | fmatter }}</label>
                </a>
              </div>
            </td>
            <td>
              <a href="#"><img :src=msg2[index+1].ims class="imgs"><br>
                <label>{{ msg2[index + 1].id }}</label>
              </a></td>
            <td><a href="#"><img :src=msg2[index+2].ims class="imgs"><br>
              <label>{{ msg2[index + 2].id }}</label>
            </a>
            </td>
            <td><a href="#"><img :src=msg2[index+3].ims class="imgs"><br>
              <label>{{ msg2[index + 3].id }}</label>
            </a>
            </td>
          </tr>
        </table>
      </el-col>
    </el-row>

    <div style="width:94%;height:2px;margin:0px auto;padding:0px;background-color:gray;overflow:hidden;"></div>
    <h1>蔬菜区</h1>
    <el-row>
      <el-col :span="4" class="el-col-offset-1">
        <div><img src="imgs/10.jpg" class="log"></div>
      </el-col>
      <el-col :span="17" class="el-col-offset-1">
        <table style="table-layout:fixed">
          <tr v-for="(chapter,index) in msg2" v-if="index%4==0">
            <td>
              <a href="#">
                <div><img :src=msg2[index].ims class="imgs"><br>
                  <label>{{ msg2[index].id }}</label><br>
                  <label>{{ msg2[index].price }}</label>
                </div>
              </a>
            </td>
            <td>
              <a href="#"><img :src=msg2[index+1].ims class="imgs"><br>
                <label>{{ msg2[index + 1].id }}</label><br>
                <label>{{ msg2[index + 1].price }}</label>
              </a></td>
            <td><a href="#"><img :src=msg2[index+2].ims class="imgs"><br>
              <label>{{ msg2[index + 2].id }}</label><br>
              <label>{{ msg2[index + 2].price }}</label>
            </a>
            </td>
            <td><a href="#"><img :src=msg2[index+3].ims class="imgs"><br>
              <label>{{ msg2[index + 3].id }}</label><br>
              <label>{{ msg2[index + 3].price }}</label>
            </a>
            </td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <div style="width:94%;height:2px;margin:0px auto;padding:0px;background-color:gray;overflow:hidden;"></div>

  </div>
</template>

<script>
export default {
  name: "commodity",
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
        {id: 8, price: 13.5, ims: "imgs/3.jpg"}
      ]
    }
  },

  filters: { //过滤器
    fmatter: function (obj) {
      if (obj.length > 12) {
        return obj.substr(0, 20) + "...";
      } else {
        return obj;
      }
    }
  }
}
</script>

<style scoped>
.log {
  width: 260px;
  height: 544px
}


table tr td {
  background-color: lightgreen;
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
</style>
