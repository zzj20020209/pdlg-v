<template>
  <el-tabs type="border-card" stretch>
    <el-tab-pane label="全部订单">全部订单</el-tab-pane>
    <el-tab-pane label="待付款">待付款</el-tab-pane>
    <el-tab-pane label="待发货">待提货</el-tab-pane>
    <el-tab-pane label="待收货">已提货</el-tab-pane>
  </el-tabs>
</template>

<script>
    export default {
        name: "userorder"
    }
</script>

<style scoped>
  .el-tabs__nav-wrap
  .el-tabs__nav-scroll
  .el-tabs__nav {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
</style>
