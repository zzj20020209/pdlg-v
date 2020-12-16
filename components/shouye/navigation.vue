<template>
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

            <el-menu-item index="6">
              <el-input v-model="shang" placeholder="请输入要搜索的商品" @change="search"></el-input>
            </el-menu-item>

            <el-menu-item index="2" style="padding-left: 140px"><a href="#">【登录】|</a><a href="#">【注册】</a></el-menu-item>
            <el-menu-item index="3"><i class="el-icon-phone-outline"></i>拨打热线:13787499481</el-menu-item>
            <el-submenu index="4">
              <template slot="title">更多</template>
              <el-menu-item index="4-1">疑问解答</el-menu-item>
              <el-menu-item index="4-2">客服中心</el-menu-item>
            </el-submenu>
            <el-menu-item index="5">
              <i class="el-icon-shopping-cart-1"></i>
            </el-menu-item>
          </el-menu>
        </el-col>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "navigation",
  data() {
    return {
      activeIndex: '1',
      shang: ""
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    search(){

    }
  }
}
</script>

<style scoped>


</style>
