<template>
  <div>
    <el-row style="margin-left: 8px;padding-top: 60px">
      <el-col :span="12" class="el-col-offset-6">
        <div style="overflow:auto">
            <ul v-for="cu in msg2"
                class="list"
                v-infinite-scroll="load"
                infinite-scroll-disabled="disabled">
              <a href="#" @click="spxq(cu.gid)">
                <el-card :body-style="{ padding: '0px' }">
                  <img :src="$host+cu.gimage" class="imgs">
                  <div style="padding: 14px;">
                    <time class="time">名称:{{ cu.gname }}</time>
                    <br>
                    <time class="time">价格:{{ cu.gprice }}/{{cu.gunit}}</time>
                  </div>
                </el-card>
              </a>
            </ul>
          <p v-if="loading">加载中...</p>
          <p v-if="noMore">没有更多了</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      circleUrl:"./img/2.png",
      gName:this.$route.query.goodsName,
        // sessionStorage.getItem("gname"),
      msg2: [],
      count: 1,
      loading: false,
      tabs: "left"
    }
  }, computed: {
    noMore() {
      return this.count >= 1;
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  methods: {
    load() {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 1500)
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    getData() { //获取数据方法
      this.msg2=[];
      var _this = this;
      var params = new URLSearchParams();
      params.append("gname",this.gName);
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
    }
  },
  created() { //钩子函数  vue对象初始化完成后  执行
    this.getData();
    this.load();
  },
  watch:{
    gName() {
      this.getData();
    },
    immediate: true
  }
}
</script>

<style scoped>
.imgs {
  height: 400px;
  width: 800px;
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
  width: 100%;
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
