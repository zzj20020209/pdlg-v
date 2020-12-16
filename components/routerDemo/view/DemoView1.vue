<template>
    <div>
      这是DemoView1首页
      <br>
      第一种样式跳转
      <router-link to="/demo2">跳转到DemoView2页面</router-link>
      第二种样式跳转
      <el-button @click="click">跳转到DemoView2页面</el-button>
      跳转到商品管理
      <router-link to="/goods">跳转到商品管理页面</router-link>
      <hr>
      子路由
      <el-button @click="tiaozhaun('/demo1/v1')">跳转到子页面1</el-button>
      <el-button @click="tiaozhaun('/demo1/v2')">跳转到子页面2</el-button>
      <el-button @click="tiaozhaun('/demo1')">关闭子路由</el-button>
      <hr>
      <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "DemoView1",
      methods: {
          click() {
            //跳转页面
            this.$router.replace("/demo2");
          },
          tiaozhaun(url) {
            //跳转页面
            this.$router.replace(url);
          }
      }
    }
</script>

<style scoped>

</style>
