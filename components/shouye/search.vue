<template>
  <div>
    <div style="position: fixed;width: 100%;z-index: 999;">
      <el-container>
        <el-col :span="24">
          <el-menu active-text-color="red" text-color="black"
                   background-color="gainsboro" show-timeout="3000"
                   :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item disabled class="el-icon-success">欢迎光临胖达乐购:</el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <el-avatar :size="size" :src="circleUrl"></el-avatar>
                雪梦情
              </template>
              <el-menu-item index="1-1">个人中心</el-menu-item>
            </el-submenu>

            <el-menu-item index="6" style="margin-left: 350px">
              <el-input v-model="shang" placeholder="请输入要搜索的商品" @change="search" style="width: 500px"></el-input>
            </el-menu-item>
            <el-menu-item index="2" style="margin-left: 140px"><a href="#">【登录】|</a><a href="#">【注册】</a></el-menu-item>
            <el-menu-item index="3"><i class="el-icon-phone-outline"></i>拨打热线:13787499481</el-menu-item>
            <el-submenu index="4">
              <template slot="title">更多</template>
              <el-menu-item index="4-1">进入商户</el-menu-item>
              <el-menu-item index="4-2" @click="houduan">进入后端</el-menu-item>
            </el-submenu>
            <el-menu-item index="5">
              <i class="el-icon-shopping-cart-1"></i>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-container>
    </div>
    <el-row style="margin-left: 8px;padding-top: 60px">
      <el-col :span="6">
        <div align="left">
          <el-tabs type="border-card" :tab-position="tabs"
                   style="position:fixed;z-index:998;height: 500px;width: 470px">
            <el-tab-pane label="精选肉类"><h4>精选肉类</h4></el-tab-pane>
            <el-tab-pane label="绿色鲜蔬"><h4>绿色鲜蔬</h4></el-tab-pane>
            <el-tab-pane label="粮油杂货"><h4>粮油杂货</h4></el-tab-pane>
            <el-tab-pane label="食品饮料"><h4>食品饮料</h4></el-tab-pane>
            <el-tab-pane label="新鲜水果"><h4>新鲜水果</h4></el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="18" class="el-col-offset-6">
        <div style="overflow:auto">
          <a href="#">
            <ul v-for="cu in msg2"
                class="list"
                v-infinite-scroll="load"
                infinite-scroll-disabled="disabled">
              <li v-for="i in count" class="list-item">
                <el-card :body-style="{ padding: '0px' }" style="background-color: greenyellow">
                  <img :src="cu.ims" class="imgs">
                  <div style="padding: 14px;">
                    <time class="time">名称:{{ cu.id }}</time>
                    <br>
                    <time class="time">价格:{{ cu.price }}/1个</time>
                  </div>
                </el-card>
              </li>
            </ul>
          </a>
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
      loading: false,
      tabs: "left",
      drawer: false,
      shang: ""
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
    houduan() {
      this.$router.push("/login");
    }
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
</style>
