<template>
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
</template>

<script>
export default {
  name: "classify",
  data() {
    return {
      tabs: "left",
    }
  }
}
</script>

<style scoped>

</style>
