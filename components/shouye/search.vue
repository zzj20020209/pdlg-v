<template>
  <div>
    <div>
      <dhl></dhl>
    </div>
    <el-row style="padding-top: 62px;margin-left: 8px">
      <el-col :span="6">
        <div align="left">
          <el-tabs type="border-card" :tab-position="tabs"
                   style="position:fixed;z-index:998;height: 630px;width: 340px">
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
import dhl from './navigation';
import fl from './classify';

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
    }
  }, components: {
    dhl,
    fl
  }
  , computed: {
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
